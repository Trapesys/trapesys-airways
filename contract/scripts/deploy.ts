import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract from the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const contractFactory = await ethers.getContractFactory("TestERC20");
  const contract = await contractFactory.deploy();

  console.log("Contract address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
