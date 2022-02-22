import { ethers } from "hardhat";
import { MVPToken } from "../types";

const TOKEN_CONTRACT = process.env.TOKEN_CONTRACT ?? "";
const TOKEN_AMOUNT = 1000;
const TOKEN_RECIPIENT = "0x9aFc51c7867f369371F238674ee4459556c5D2b5";

async function main() {
  const [account] = await ethers.getSigners();

  const tokenContractFactory = await ethers.getContractFactory("MVPToken");
  const tokenContract = (
    (await tokenContractFactory.attach(TOKEN_CONTRACT)) as MVPToken
  ).connect(account);

  console.log(`Transfer ${TOKEN_AMOUNT} token to ${TOKEN_RECIPIENT}`);
  console.log(
    `Current balance: ${await tokenContract.balanceOf(account.address)}`
  );

  const tx = await tokenContract.transfer(TOKEN_RECIPIENT, TOKEN_AMOUNT);
  console.log("tx hash", tx.hash);

  const receipt = await tx.wait();
  console.log("receipt", receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
