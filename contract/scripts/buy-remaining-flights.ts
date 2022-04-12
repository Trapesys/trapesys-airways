import { ethers } from "hardhat";
import { MVPTicketSale, MVPToken } from "../types";

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

  const flights = await ticketSaleContract.flights();

  console.log(`Found a total of ${flights.length} flights!`);

  // Find the total number of available seats per flight
  let flightSeats: {
    flightID: number;
    availableSeats: number;
  }[] = [];

  let totalPriceApprove = 0;

  flights.forEach((flight) => {
    if (flight.availableSeats > 0) {
      flightSeats.push({
        flightID: flight.flightID.toNumber(),
        availableSeats: flight.availableSeats,
      });

      totalPriceApprove += flight.price.toNumber();
    }
  });

  async function buyFlightTickets(flightInfo: {
    flightID: number;
    nonce: number;
  }) {
    await ticketSaleContract.buyTicket(flightInfo.flightID, {
      nonce: flightInfo.nonce,
    });

    console.log("Bought flight!");
  }

  // Approve the wholesale of all tickets
  await (
    await tokenContract.approve(TICKET_SALE_CONTRACT, totalPriceApprove)
  ).wait();
  console.log(
    `Approved token transfer by MVPTicketSale ${TICKET_SALE_CONTRACT}`
  );

  // Get the initial nonce
  const initialNonce = await ethers.provider.getTransactionCount(
    account.address
  );

  let allTickets: {
    flightID: number;
    nonce: number;
  }[] = [];
  let nextNonce = initialNonce;
  flightSeats.forEach((flight) => {
    if (flight.availableSeats > 0) {
      for (let i = 0; i < flight.availableSeats; i++) {
        allTickets.push({
          flightID: flight.flightID,
          nonce: nextNonce,
        });

        nextNonce++;
      }
    }
  });

  console.log(`About to buy ${allTickets.length} tickets`);

  // Send out transactions concurrently
  await Promise.all(allTickets.map((f) => buyFlightTickets(f)));

  console.log(`Bought ${allTickets.length} tickets`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
