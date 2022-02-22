import { ethers } from "hardhat";
import { MVPToken } from "../types";

const TOKEN_CONTRACT = process.env.TOKEN_CONTRACT ?? "";

async function main() {
  const [account] = await ethers.getSigners();

  const tokenContractFactory = await ethers.getContractFactory("MVPToken");
  const tokenContract = (
    (await tokenContractFactory.attach(TOKEN_CONTRACT)) as MVPToken
  ).connect(account);

  console.log(`Total Supply: ${await tokenContract.totalSupply()}`);
  console.log(
    `Current token balance: ${await tokenContract.balanceOf(account.address)}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
