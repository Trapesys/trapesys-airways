import { ethers } from "hardhat";
import { MVPToken } from "../types";

const TOKEN_CONTRACT = process.env.TOKEN_CONTRACT ?? "";
const TICKET_SALE_CONTRACT = process.env.TICKET_SALE_CONTRACT ?? "";
const ALLOWANCE = 1000;

async function main() {
  const [account] = await ethers.getSigners();

  const tokenContractFactory = await ethers.getContractFactory("MVPToken");
  const tokenContract = (
    (await tokenContractFactory.attach(TOKEN_CONTRACT)) as MVPToken
  ).connect(account);

  console.log(
    `Approve ${ALLOWANCE} token transfer by MVPTicketSale ${TICKET_SALE_CONTRACT}`
  );

  const tx = await tokenContract.approve(TICKET_SALE_CONTRACT, ALLOWANCE);
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
