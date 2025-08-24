import { ethers } from "hardhat";

// Usage:
// USAGE: npx hardhat run scripts/grantRoles.ts --network sepolia
// Env:
//   PERIOD_AID=0x...
//   VERIFIER=0x...
//   TREASURY=0x...
function roleHash(name: string) {
  return ethers.keccak256(ethers.toUtf8Bytes(name));
}

async function main() {
  const addr = process.env.PERIOD_AID || "";
  const verifier = process.env.VERIFIER || "";
  const treasury = process.env.TREASURY || "";
  if (!addr) throw new Error("Set PERIOD_AID");
  const pad = await ethers.getContractAt("PeriodAidDonations", addr);
  if (verifier) {
    const tx = await pad.grantRole(roleHash("VERIFIER_ROLE"), verifier);
    await tx.wait();
    console.log("Granted VERIFIER_ROLE to", verifier);
  }
  if (treasury) {
    const tx = await pad.grantRole(roleHash("TREASURY_ROLE"), treasury);
    await tx.wait();
    console.log("Granted TREASURY_ROLE to", treasury);
  }
}

main().catch((e)=>{ console.error(e); process.exit(1); });
