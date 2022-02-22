import { ethers } from "hardhat";
import { MVPToken, MVPTicketSale } from "../types";

const TOKEN_CONTRACT = process.env.TOKEN_CONTRACT ?? "";
const TICKET_SALE_CONTRACT = process.env.TICKET_SALE_CONTRACT ?? "";
const FLIGHT_ID = 0;

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

  const flight = await ticketSaleContract.flightById(FLIGHT_ID);
  const price = flight.price.toNumber();
  console.log(`Buy new ticket of the flight ${FLIGHT_ID}, price=${price}`);

  await (await tokenContract.approve(TICKET_SALE_CONTRACT, price)).wait();
  console.log(
    `Approved token transfer by MVPTicketSale ${TICKET_SALE_CONTRACT}`
  );

  const tx = await ticketSaleContract.buyTicket(FLIGHT_ID);
  console.log("tx hash", tx.hash);

  const receipt = await tx.wait();
  console.log("receipt", receipt);

  for (const log of receipt.logs) {
    try {
      const parsed = ticketSaleContract.interface.parseLog(log);
      if (parsed.name === "PurchasedTicket") {
        console.log(
          `Bought ticket, Flight ID=${parsed.args.flightId}, Ticket ID=${parsed.args.ticketId}`
        );
      }
    } catch (e) {
      // ignore other error
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
