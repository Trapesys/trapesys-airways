import moment from 'moment';

export enum EContractFlightSaleStatus {
  NOT_READY,
  OPEN,
  CLOSE,
}

export enum EContractFlightClass {
  ECONOMY,
  BUSINESS,
  FIRST,
}

// Flights as they are represented on the Smart Contract
export interface IContractFlight {
  saleStatus: number;
  flightNumber: string;
  flightClass: EContractFlightClass;
  availableSeats: number;
  departureCode: string;
  departureTime: number;
  arrivalCode: string;
  arrivalTime: number;
  price: number;
}

class FlightGenerator {
  public static getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  public static generateRandomFlightData(
    params: {
      departureCode: string;
      arrivalCode: string;
      departDate: Date;
      tripClass: EContractFlightClass;
    },
    count: number
  ): IContractFlight[] {
    if (count < 1) {
      return [];
    }

    let resultFlights: IContractFlight[] = [];

    for (let i = 0; i < count; i++) {
      // Generate a random available seat numbers
      const availableSeats = FlightGenerator.getRandomNumber(5, 100);

      // Get a random value between [1h, 10h]
      const randomFlightDuration = FlightGenerator.getRandomNumber(60, 600);

      // Get a random ticket price
      const ticketPrice =
        params.tripClass === EContractFlightClass.ECONOMY
          ? FlightGenerator.getRandomNumber(100, 300)
          : FlightGenerator.getRandomNumber(500, 1000);

      // Get a random flight takeoff time
      const randomTakeoffTime = new Date(params.departDate);
      randomTakeoffTime.setHours(
        FlightGenerator.getRandomNumber(0, 23),
        FlightGenerator.getRandomNumber(0, 59)
      );

      // Find the arrival time
      const arrivalTime = moment(randomTakeoffTime)
        .add(randomFlightDuration, 'minutes');

      resultFlights.push({
        saleStatus: EContractFlightSaleStatus.OPEN,
        departureCode: params.departureCode,
        arrivalCode: params.arrivalCode,

        departureTime: moment(randomTakeoffTime).unix(),
        arrivalTime: arrivalTime.unix(),

        flightClass: params.tripClass,
        availableSeats,

        price: ticketPrice,
        flightNumber: `MVP-${FlightGenerator.getRandomNumber(0, 50)}`
      });
    }

    return resultFlights;
  }
}

export default FlightGenerator;
