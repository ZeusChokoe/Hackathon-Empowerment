// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SafeReportRegistry {
    event ReportSubmitted(uint256 indexed id, address indexed submitter, string category, string cid, uint256 timestamp);

    struct Report {
        address submitter;
        string  category; // e.g., Harassment, Violence
        string  cid;      // IPFS CID of encrypted report
        uint64  timestamp;
    }

    Report[] public reports;

    // Pause functionality
    bool public paused;
    modifier whenNotPaused() {
        require(!paused, "Paused");
        _;
    }
    function pause() external { paused = true; }
    function unpause() external { paused = false; }

    function submitReport(string calldata category, string calldata cid) external whenNotPaused returns (uint256 id) {
        id = reports.length;
        reports.push(Report({ submitter: msg.sender, category: category, cid: cid, timestamp: uint64(block.timestamp)}));
        emit ReportSubmitted(id, msg.sender, category, cid, block.timestamp);
    }

    function reportCount() external view returns (uint256) { return reports.length; }

    function reportsBySubmitter(address submitter) external view returns (Report[] memory) {
        uint256 count;
        for (uint256 i = 0; i < reports.length; i++) {
            if (reports[i].submitter == submitter) count++;
        }
        Report[] memory result = new Report[](count);
        uint256 idx;
        for (uint256 i = 0; i < reports.length; i++) {
            if (reports[i].submitter == submitter) {
                result[idx] = reports[i];
                idx++;
            }
        }
        return result;
    }

    function getReport(uint256 id) external view returns (Report memory) {
        require(id < reports.length, "Invalid report ID");
        return reports[id];
    }
}
        r.status = Status.Verified;
        emit RequestVerified(id, msg.sender);
    }

    function donate(uint256 id, uint256 amount) external whenNotPaused {
        AidRequest storage r = requests[id];
        require(r.status == Status.Verified, "bad status");
        require(r.expiresAt == 0 || block.timestamp < r.expiresAt, "expired");
        require(amount > 0, "amount=0");
        r.stable.transferFrom(msg.sender, address(this), amount);
        r.totalRaised += amount;
        donations[id].push(Donation({ amount: amount, donor: msg.sender }));
        emit Donated(id, msg.sender, amount, r.totalRaised);
    }

    function approveFunding(uint256 id) external whenNotPaused onlyRole(VERIFIER_ROLE) {
        AidRequest storage r = requests[id];
        require(r.status == Status.Verified, "bad status");
        require(r.totalRaised >= r.targetAmount, "not funded");
        r.status = Status.Approved;
        emit FundingApproved(id, msg.sender, r.beneficiary);
    }

    function release(uint256 id) external whenNotPaused {
        AidRequest storage r = requests[id];
        require(r.status == Status.Approved, "bad status");
        require(msg.sender == r.beneficiary || hasRole(TREASURY_ROLE, msg.sender), "not beneficiary/treasury");
        uint256 amount = r.totalRaised;
        r.totalRaised = 0;
        r.status = Status.Completed;
        r.stable.transfer(r.beneficiary, amount);
        emit Released(id, r.beneficiary, amount);
    }

    function cancel(uint256 id) external whenNotPaused {
        AidRequest storage r = requests[id];
        require(r.status == Status.Pending || r.status == Status.Verified, "bad status");
        require(msg.sender == r.creator || hasRole(TREASURY_ROLE, msg.sender), "not creator/treasury");
        r.status = Status.Cancelled;
        emit Cancelled(id, msg.sender);
    }

    function refund(uint256 id) external whenNotPaused {
        AidRequest storage r = requests[id];
        require(r.status == Status.Cancelled || (r.expiresAt != 0 && block.timestamp >= r.expiresAt && r.status == Status.Verified), "bad status");
        uint256 totalRefunded;
        Donation[] storage dons = donations[id];
        for (uint256 i = 0; i < dons.length; i++) {
            if (dons[i].amount > 0) {
                r.stable.transfer(dons[i].donor, dons[i].amount);
                totalRefunded += dons[i].amount;
                dons[i].amount = 0;
            }
        }
        r.totalRaised -= totalRefunded;
        emit Refunded(id, totalRefunded);
    }
