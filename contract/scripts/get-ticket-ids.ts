import { ethers } from "hardhat";
import { MVPTicketSale } from "../types";

const TICKET_SALE_CONTRACT = process.env.TICKET_SALE_CONTRACT ?? "";

async function main() {
  const [account] = await ethers.getSigners();

  const ticketSaleContractFactory = await ethers.getContractFactory(
    "MVPTicketSale"
  );
  const ticketSaleContract = (
    (await ticketSaleContractFactory.attach(
      TICKET_SALE_CONTRACT
    )) as MVPTicketSale
  ).connect(account);

  const ticketIDs = await ticketSaleContract.accountTicketIds(account.address);

  console.log("Ticket IDs", ticketIDs);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
