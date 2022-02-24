import {ethers} from 'hardhat';
import FlightGenerator, {EContractFlightClass} from '../helper/flightGenerator';
import {MVPTicketSale} from '../types';

const TICKET_SALE_CONTRACT = process.env.TICKET_SALE_CONTRACT ?? '';

async function main() {
  const [account] = await ethers.getSigners();

  const ticketSaleContractFactory = await ethers.getContractFactory(
    'MVPTicketSale'
  );
  const ticketSaleContract = (
    (await ticketSaleContractFactory.attach(
      TICKET_SALE_CONTRACT
    )) as MVPTicketSale
  ).connect(account);

  const numFlights = 20; // Per class
  const departureCode = 'BEG';
  const arrivalCode = 'AMS';
  const departDate = new Date();

  const economyFlights = FlightGenerator.generateRandomFlightData({
    departureCode, arrivalCode, departDate, tripClass: EContractFlightClass.ECONOMY
  }, numFlights);

  const businessFlights = FlightGenerator.generateRandomFlightData({
    departureCode, arrivalCode, departDate, tripClass: EContractFlightClass.BUSINESS
  }, numFlights);

  const combinedFlights = economyFlights.concat(businessFlights);

  for (let i = 0; i < combinedFlights.length; i++) {
    const combinedFlight = combinedFlights[i];

    console.log(`Add new flight {
        flightNumber: ${combinedFlight.flightNumber},
        flightClass: ${combinedFlight.flightClass},
        numSeats: ${combinedFlight.availableSeats},
        departureCode: ${combinedFlight.departureCode},
        departureTime: ${combinedFlight.departureTime},
        arrivalCode: ${combinedFlight.arrivalCode},
        arrivalTime: ${combinedFlight.arrivalTime},
        price: ${combinedFlight.price},
      }`);

    const tx = await ticketSaleContract.addFlight(
      combinedFlight.flightNumber,
      combinedFlight.flightClass,
      combinedFlight.availableSeats,
      combinedFlight.departureCode,
      combinedFlight.departureTime,
      combinedFlight.arrivalCode,
      combinedFlight.arrivalTime,
      combinedFlight.price
    );

    console.log('tx hash', tx.hash);

    const receipt = await tx.wait();
    console.log('receipt', receipt);

    for (const log of receipt.logs) {
      const parsed = ticketSaleContract.interface.parseLog(log);
      if (parsed.name === 'AddedFlight') {
        console.log(parsed.args.flightId);
      }
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
