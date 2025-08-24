import { ethers } from "hardhat";

// Example usage: npx hardhat run scripts/approveAndDonate.ts --network sepolia
// Set these before running
const REQUEST_ID = 0;
const USDC_ADDRESS = process.env.USDC || "";
const PERIOD_AID_ADDRESS = process.env.PERIOD_AID || "";
const AMOUNT_USDC = "50.0"; // 50 USDC

async function main() {
  if (!USDC_ADDRESS || !PERIOD_AID_ADDRESS) throw new Error("Set USDC and PERIOD_AID env vars");
  const [signer] = await ethers.getSigners();
  const erc20 = await ethers.getContractAt("IERC20", USDC_ADDRESS);
  const pad = await ethers.getContractAt("PeriodAidDonations", PERIOD_AID_ADDRESS);
  const decimals = 6; // adjust if not 6
  const amt = ethers.parseUnits(AMOUNT_USDC, decimals);
  console.log("Approving...");
  await (await erc20.approve(PERIOD_AID_ADDRESS, amt)).wait();
  console.log("Donating...");
  await (await pad.donate(REQUEST_ID, amt)).wait();
  console.log("Done");
}

main().catch((e)=>{ console.error(e); process.exit(1); });
