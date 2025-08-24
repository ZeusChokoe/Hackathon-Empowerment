
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PeriodAidDonations", function () {
  it("creates and funds a request", async () => {
    const [admin, donor, beneficiary] = await ethers.getSigners();
    const SR = await ethers.getContractFactory("SafeReportRegistry");
    await SR.deploy();

    const PAD = await ethers.getContractFactory("PeriodAidDonations");
    const pad = await PAD.deploy(admin.address, admin.address);

    // Deploy mock ERC20
    const ERC20 = await ethers.getContractFactory("contracts/mocks/MockERC20.sol:MockERC20");
    const token = await ERC20.deploy("MockUSDC", "mUSDC", 6);
    await token.mint(donor.address, 100_000_000); // 100 USDC (6 decimals)

    // donor approve
    await token.connect(donor).approve(await pad.getAddress(), 50_000_000);

    // create & verify
    await pad.connect(admin).createRequest(await token.getAddress(), 50_000_000, "cid123", "MenstrualProducts", beneficiary.address, 0);
    await pad.connect(admin).verifyRequest(0);

    // donate
    await pad.connect(donor).donate(0, 50_000_000);
    const req = await pad.requests(0);
    expect(req.totalRaised).to.equal(50_000_000);
  });
});
