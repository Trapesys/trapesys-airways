import {ethers} from 'hardhat';
import FlightGenerator, {EContractFlightClass, IContractFlight} from '../helper/flightGenerator';
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

  const numFlights = 5; // Per class
  const departureCode = 'BEG';
  const arrivalCode = 'AMS';
  const departDate = new Date();

  async function createNewFlight(flight: IContractFlight, nonce: number) {
    const tx = await ticketSaleContract.addFlight(
      flight.flightNumber,
      flight.flightClass,
      flight.availableSeats,
      flight.departureCode,
      flight.departureTime,
      flight.arrivalCode,
      flight.arrivalTime,
      flight.price,
      {nonce: nonce}
    );

    const receipt = await tx.wait();

    for (const log of receipt.logs) {
      const parsed = ticketSaleContract.interface.parseLog(log);
      if (parsed.name === 'AddedFlight') {
        console.log(`Added new flight {
        flightNumber: ${flight.flightNumber},
        flightClass: ${flight.flightClass},
        numSeats: ${flight.availableSeats},
        departureCode: ${flight.departureCode},
        departureTime: ${flight.departureTime},
        arrivalCode: ${flight.arrivalCode},
        arrivalTime: ${flight.arrivalTime},
        price: ${flight.price},
      }`);

        return parsed.args.flightId;
      }
    }
  }

  const economyFlights = FlightGenerator.generateRandomFlightData({
    departureCode, arrivalCode, departDate, tripClass: EContractFlightClass.ECONOMY
  }, numFlights);

  const businessFlights = FlightGenerator.generateRandomFlightData({
    departureCode, arrivalCode, departDate, tripClass: EContractFlightClass.BUSINESS
  }, numFlights);

  const combinedFlights = economyFlights.concat(businessFlights);

  const initialNonce = await ethers.provider.getTransactionCount(account.address);

  await Promise.all(
    combinedFlights.map(
      (f, i) => createNewFlight(f, initialNonce + i)
    )
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
