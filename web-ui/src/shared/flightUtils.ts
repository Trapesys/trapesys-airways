import moment from 'moment';
import { ETripClass } from '../components/atoms/TripClassSelector/tripClassSelector.types';
import { IAirportInfo } from '../components/atoms/TripPlaceRange/tripPlaceRange.types';
import { IFlightSearchParams } from '../context/searchContext.types';
import airportInfo from './assets/data/airports.json';
import countryCodes from './assets/data/countriesAlfaTwo.json';

export interface IFlightInfo {
  origin: IAirportInfo;
  destination: IAirportInfo;

  duration: number; // Duration in minutes

  departDateTime: Date;
  arrivalDateTime: Date;

  tripClass: ETripClass;

  availableSeats: number;

  price: number;

  flightNumber: string;
}

export enum EContractFlightSaleStatus {
  NOT_READY,
  OPEN,
  CLOSE
}

export enum EContractFlightClass {
  ECONOMY,
  BUSINESS,
  FIRST
}

// Flights as they are represented on the Smart Contract
export interface IContractFlight {
  saleStatus: EContractFlightSaleStatus;
  flightNumber: string;
  flightClass: EContractFlightClass;
  availableSeats: number;
  departureCode: string;
  departureTime: number;
  arrivalCode: string;
  arrivalTime: number;
  price: number;
}

class FlightUtils {
  public static getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  public static getCountryCode(country: string): string {
    for (let i = 0; i < countryCodes.length; i++) {
      if (countryCodes[i].name === country) {
        return countryCodes[i].code;
      }
    }

    return 'UN'; // Unknown
  }

  public static generateRandomFlightData(
    params: IFlightSearchParams,
    count: number
  ): IFlightInfo[] {
    if (count < 1) {
      return [];
    }

    let resultFlights: IFlightInfo[] = [];

    for (let i = 0; i < count; i++) {
      // Generate a random available seat numbers
      const availableSeats = FlightUtils.getRandomNumber(5, 100);

      // Get a random value between [1h, 10h]
      const randomFlightDuration = FlightUtils.getRandomNumber(60, 600);

      // Get a random ticket price
      const ticketPrice =
        params.tripClass === ETripClass.ECONOMY
          ? FlightUtils.getRandomNumber(100, 300)
          : FlightUtils.getRandomNumber(500, 1000);

      // Get a random flight takeoff time
      const randomTakeoffTime = new Date(params.departDate);
      randomTakeoffTime.setHours(
        FlightUtils.getRandomNumber(0, 23),
        FlightUtils.getRandomNumber(0, 59)
      );

      // Find the arrival time
      const arrivalTime = moment(randomTakeoffTime)
        .add(randomFlightDuration, 'minutes')
        .toDate();

      resultFlights.push({
        origin: params.origin,
        destination: params.destination,

        duration: randomFlightDuration,

        departDateTime: randomTakeoffTime,
        arrivalDateTime: arrivalTime,

        tripClass: params.tripClass,
        availableSeats,

        price: ticketPrice,
        flightNumber: `MVP-${FlightUtils.getRandomNumber(0, 50)}`
      });
    }

    return resultFlights;
  }

  public static formatHoursAndMinutes(minutes: number): string {
    let h: string | number = Math.floor(minutes / 60);
    let m: string | number = minutes % 60;

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return h + ':' + m;
  }

  public static convertFromContractClass(
    contractClass: EContractFlightClass
  ): ETripClass {
    switch (contractClass) {
      case EContractFlightClass.BUSINESS:
        return ETripClass.BUSINESS;
      default:
        return ETripClass.ECONOMY;
    }
  }

  public static filterContractFlights(
    contractFlights: IContractFlight[],
    searchParams: IFlightSearchParams
  ): IContractFlight[] {
    return contractFlights.filter((contractFlight: IContractFlight) => {
      const contractFlightDate = moment(
        contractFlight.departureTime * 1000
      ).toDate();
      const areSameDay =
        contractFlightDate.getDay() === searchParams.departDate.getDay() &&
        contractFlightDate.getMonth() === searchParams.departDate.getMonth() &&
        contractFlightDate.getFullYear() ===
          searchParams.departDate.getFullYear();
      return (
        contractFlight.departureCode === searchParams.origin.iataCode &&
        contractFlight.arrivalCode === searchParams.destination.iataCode &&
        contractFlight.availableSeats >= searchParams.personCount &&
        this.convertFromContractClass(contractFlight.flightClass) ===
          searchParams.tripClass &&
        areSameDay
      );
    });
  }

  public static getAirportToPlaceMap(): Map<string, IAirportInfo> {
    let airportMap: Map<string, IAirportInfo> = new Map<string, IAirportInfo>();

    airportInfo.forEach((item: IAirportInfo) => {
      airportMap.set(item.iataCode, item);
    });

    return airportMap;
  }

  public static getRandomSeat(): string {
    const seatLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const seatNumber = this.getRandomNumber(1, 50);

    return `${seatLetter}${seatNumber}`;
  }

  public static convertContractFlights(
    contractFlights: IContractFlight[]
  ): IFlightInfo[] {
    let convertedFlights: IFlightInfo[] = [];

    const airportMap = this.getAirportToPlaceMap();
    contractFlights.forEach((contractFlight: IContractFlight) => {
      // Grab the origin info
      const originInfoRaw = airportMap.get(contractFlight.departureCode);
      if (!originInfoRaw) {
        throw new Error('Invalid origin info code');
      }

      const originInfo = originInfoRaw;

      // Grab the destination info
      const destinationInfoRaw = airportMap.get(contractFlight.arrivalCode);
      if (!destinationInfoRaw) {
        throw new Error('Invalid destination info code');
      }

      const destinationInfo = destinationInfoRaw;

      // Convert the times from unix to regular dates
      const departTime = moment(contractFlight.departureTime * 1000);
      const arrivalTime = moment(contractFlight.arrivalTime * 1000);

      const duration = arrivalTime.diff(departTime, 'minutes');

      let tripClass: ETripClass;
      switch (contractFlight.flightClass) {
        case EContractFlightClass.BUSINESS: {
          tripClass = ETripClass.BUSINESS;
          break;
        }
        default: {
          tripClass = ETripClass.ECONOMY;
        }
      }

      convertedFlights.push({
        origin: originInfo,
        destination: destinationInfo,
        departDateTime: departTime.toDate(),
        arrivalDateTime: arrivalTime.toDate(),
        duration: duration,
        availableSeats: contractFlight.availableSeats,
        price: contractFlight.price,
        flightNumber: contractFlight.flightNumber,
        tripClass
      });
    });

    return convertedFlights;
  }
}

export default FlightUtils;
