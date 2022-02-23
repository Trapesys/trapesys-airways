import moment from 'moment';
import { ETripClass } from '../components/atoms/TripClassSelector/tripClassSelector.types';
import {
  IFlightSearchParams,
  IPlaceInformation
} from '../context/searchContext.types';

export interface IFlightInfo {
  origin: IPlaceInformation;
  destination: IPlaceInformation;

  duration: number; // Duration in minutes

  departDateTime: Date;
  arrivalDateTime: Date;

  tripClass: ETripClass;

  availableSeats: number;

  price: number;
}

class FlightUtils {
  public static getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min)) + min;
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

        price: ticketPrice
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
}

export default FlightUtils;
