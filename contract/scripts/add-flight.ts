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

  const flightNumber = "MVP-01";
  const flightClass = 0; // economy
  const numSeats = 100;
  const departureCode = "NRT";
  const departureTime = new Date(2022, 3, 1, 9, 0, 0, 0);
  const arrivalCode = "BEG";
  const arrivalTime = new Date(2022, 3, 1, 21, 0, 0, 0);
  const price = 1000;

  console.log(`Add new flight {
    flightNumber: ${flightNumber},
    flightClass: ${flightClass},
    numSeats: ${numSeats},
    departureCode: ${departureCode},
    departureTime: ${departureTime},
    arrivalCode: ${arrivalCode},
    arrivalTime: ${arrivalTime},
    price: ${price},
  }`);

  const tx = await ticketSaleContract.addFlight(
    flightNumber,
    flightClass,
    numSeats,
    departureCode,
    departureTime.getTime(),
    arrivalCode,
    arrivalTime.getTime(),
    price
  );
  console.log("tx hash", tx.hash);

  const receipt = await tx.wait();
  console.log("receipt", receipt);

  for (const log of receipt.logs) {
    const parsed = ticketSaleContract.interface.parseLog(log);
    if (parsed.name === "AddedFlight") {
      console.log(parsed.args.flightId);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
