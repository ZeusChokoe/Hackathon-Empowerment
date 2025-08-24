// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PeriodAidDonations is AccessControl, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant TREASURY_ROLE = keccak256("TREASURY_ROLE");

    enum Status { Pending, Fundraising, Funded, Released, Cancelled, Refunding }

    struct AidRequest {
        address creator;
        address beneficiary; // can be NGO or stealth wallet
        IERC20  stable;      // USDC/DAI/etc.
        uint256 targetAmount;
        uint256 totalRaised;
        uint64  createdAt;
        uint64  expiresAt;   // 0 = no expiry
        Status  status;
        string  cid;         // IPFS CID of encrypted details
        string  category;    // e.g., MenstrualProducts
    }

    struct Donation {
        uint256 amount;
        address donor;
    }

    AidRequest[] public requests;
    mapping(uint256 => Donation[]) public donations;

    event RequestCreated(uint256 indexed id, address indexed creator, address stable, uint256 target, string cid, string category);
    event RequestVerified(uint256 indexed id, address indexed verifier);
    event Donated(uint256 indexed id, address indexed donor, uint256 amount, uint256 totalRaised);
    event FundingApproved(uint256 indexed id, address indexed verifier, address beneficiary);
    event Released(uint256 indexed id, address indexed beneficiary, uint256 amount);
    event Cancelled(uint256 indexed id, address indexed by);
    event Refunded(uint256 indexed id, address indexed donor, uint256 amount);

    constructor(address admin, address treasury) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(VERIFIER_ROLE, admin);
        _grantRole(TREASURY_ROLE, treasury == address(0) ? admin : treasury);
    }

    function createRequest(
        address stable,
        uint256 targetAmount,
        string calldata cid,
        string calldata category,
        address beneficiary,
        uint64  expiresAt
    ) external whenNotPaused returns (uint256 id) {
        require(targetAmount > 0, "target=0");
        require(stable != address(0), "stable=0");
        id = requests.length;
        requests.push(AidRequest({
            creator: msg.sender,
            beneficiary: beneficiary,
            stable: IERC20(stable),
            targetAmount: targetAmount,
            totalRaised: 0,
            createdAt: uint64(block.timestamp),
            expiresAt: expiresAt,
            status: Status.Pending,
            cid: cid,
            category: category
        }));
        emit RequestCreated(id, msg.sender, stable, targetAmount, cid, category);
    }

    function verifyRequest(uint256 id) external whenNotPaused onlyRole(VERIFIER_ROLE) {
        AidRequest storage r = requests[id];
        require(r.status == Status.Pending, "bad status");
        r.status = Status.Fundraising;
        emit RequestVerified(id, msg.sender);
    }

    function donate(uint256 id, uint256 amount) external nonReentrant whenNotPaused {
        AidRequest storage r = requests[id];
        require(r.status == Status.Fundraising, "not fundraising");
        require(amount > 0, "amount=0");
        r.stable.safeTransferFrom(msg.sender, address(this), amount);
        r.totalRaised += amount;
        donations[id].push(Donation({ amount: amount, donor: msg.sender }));
        emit Donated(id, msg.sender, amount, r.totalRaised);
        if (r.totalRaised >= r.targetAmount) {
            r.status = Status.Funded;
        }
    }

    function approveForRelease(uint256 id, address newBeneficiary) external whenNotPaused onlyRole(VERIFIER_ROLE) {
        AidRequest storage r = requests[id];
        require(r.status == Status.Funded || r.status == Status.Fundraising, "bad status");
        if (newBeneficiary != address(0)) {
            r.beneficiary = newBeneficiary;
        }
        r.status = Status.Funded;
        emit FundingApproved(id, msg.sender, r.beneficiary);
    }

    function release(uint256 id) external nonReentrant whenNotPaused onlyRole(TREASURY_ROLE) {
        AidRequest storage r = requests[id];
        require(r.status == Status.Funded, "not funded");
        require(r.beneficiary != address(0), "beneficiary=0");
        uint256 amount = r.totalRaised;
        r.totalRaised = 0;
        r.status = Status.Released;
        r.stable.safeTransfer(r.beneficiary, amount);
        emit Released(id, r.beneficiary, amount);
    }

    function cancel(uint256 id) external whenNotPaused {
        AidRequest storage r = requests[id];
        require(hasRole(VERIFIER_ROLE, msg.sender) || hasRole(DEFAULT_ADMIN_ROLE, msg.sender) || msg.sender == r.creator, "no auth");
        require(r.status == Status.Pending || r.status == Status.Fundraising, "bad status");
        r.status = Status.Refunding;
        emit Cancelled(id, msg.sender);
    }

    function claimRefund(uint256 id) external nonReentrant whenNotPaused {
        AidRequest storage r = requests[id];
        require(r.status == Status.Refunding || (r.expiresAt != 0 && block.timestamp > r.expiresAt), "not refundable");
        Donation[] storage ds = donations[id];
        uint256 owed;
        for (uint256 i = 0; i < ds.length; i++) {
            if (ds[i].donor == msg.sender && ds[i].amount > 0) {
                owed += ds[i].amount;
                ds[i].amount = 0;
            }
        }
        require(owed > 0, "nothing owed");
        r.stable.safeTransfer(msg.sender, owed);
        emit Refunded(id, msg.sender, owed);
    }

    // Admin controls
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) { _pause(); }
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) { _unpause(); }

    // Views
    function requestCount() external view returns (uint256) { return requests.length; }
    function donationsOf(uint256 id) external view returns (Donation[] memory) { return donations[id]; }
}
