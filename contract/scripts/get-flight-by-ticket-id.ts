import { ethers } from "hardhat";
import { MVPTicketSale } from "../types";

const TICKET_SALE_CONTRACT = process.env.TICKET_SALE_CONTRACT ?? "";
const TICKET_ID = 0;

async function main() {
  const [account] = await ethers.getSigners();

  console.log(`Get flight by Ticket ID ${TICKET_ID}`);

  const ticketSaleContractFactory = await ethers.getContractFactory(
    "MVPTicketSale"
  );
  const ticketSaleContract = (
    (await ticketSaleContractFactory.attach(
      TICKET_SALE_CONTRACT
    )) as MVPTicketSale
  ).connect(account);

  const flight = await ticketSaleContract.flightByTicketId(TICKET_ID);
  console.log("flight", flight);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
