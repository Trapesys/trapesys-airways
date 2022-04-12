import moment from 'moment';
import { ETripClass } from '../components/atoms/TripClassSelector/tripClassSelector.types';
import { IAirportInfo } from '../components/atoms/TripPlaceRange/tripPlaceRange.types';
import { IFlightSearchParams } from '../context/searchContext.types';
import airportInfo from './assets/data/airports.json';
import countryCodes from './assets/data/countriesAlfaTwo.json';

export interface IFlightInfo {
  flightID: number;

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
  flightID: number;
  saleStatus: EContractFlightSaleStatus;
  flightNumber: string;
  class: number;
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

  static SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

  public static formatNumber(num: number) {
    const tier = (Math.log10(Math.abs(num)) / 3) | 0;

    if (tier == 0) return num;

    const suffix = FlightUtils.SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    const scaled = num / scale;

    return scaled.toFixed(1) + suffix;
  }

  public static getCountryCode(country: string): string {
    for (let i = 0; i < countryCodes.length; i++) {
      if (countryCodes[i].name === country) {
        return countryCodes[i].code;
      }
    }

    return 'UN'; // Unknown
  }

  public static formatHoursAndMinutes(minutes: number): string {
    let h: string | number = Math.floor(minutes / 60);
    let m: string | number = minutes % 60;

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return h + ':' + m;
  }

  public static convertFromContractClass(contractClass: number): ETripClass {
    if (contractClass > 0) {
      return ETripClass.BUSINESS;
    }

    return ETripClass.ECONOMY;
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
        this.convertFromContractClass(contractFlight.class) ===
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
      const tripClass: ETripClass = this.convertFromContractClass(
        contractFlight.class
      );

      convertedFlights.push({
        flightID: +contractFlight.flightID,

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
