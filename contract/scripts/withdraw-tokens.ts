import { ethers } from "hardhat";
import { MVPToken, MVPTicketSale } from "../types";

const TOKEN_CONTRACT = process.env.TOKEN_CONTRACT ?? "";
const TICKET_SALE_CONTRACT = process.env.TICKET_SALE_CONTRACT ?? "";

async function main() {
  const [account] = await ethers.getSigners();

  const tokenContractFactory = await ethers.getContractFactory("MVPToken");
  const tokenContract = (
    (await tokenContractFactory.attach(TOKEN_CONTRACT)) as MVPToken
  ).connect(account);

  const ticketSaleContractFactory = await ethers.getContractFactory(
    "MVPTicketSale"
  );
  const ticketSaleContract = (
    (await ticketSaleContractFactory.attach(
      TICKET_SALE_CONTRACT
    )) as MVPTicketSale
  ).connect(account);

  const tokenAmount = await tokenContract.balanceOf(ticketSaleContract.address);

  console.log(
    `Withdraw ${tokenAmount} MVPTokens from MVPTicketSale ${ticketSaleContract.address} to ${account.address}`
  );
  const tx = await ticketSaleContract.withdrawTokens(
    account.address,
    tokenAmount
  );
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
