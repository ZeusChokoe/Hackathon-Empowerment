import { ethers } from "hardhat";

async function main() {
  // Get first signer (deployer)
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  // Change "SafeReportRegistry" to the contract you want to deploy
  const ContractFactory = await ethers.getContractFactory("SafeReportRegistry");
  const contract = await ContractFactory.deploy();

  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});