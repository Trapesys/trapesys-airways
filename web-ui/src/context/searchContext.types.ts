import { ETripClass } from '../components/atoms/TripClassSelector/tripClassSelector.types';
import { IAirportInfo } from '../components/atoms/TripPlaceRange/tripPlaceRange.types';
import { ETripType } from '../components/atoms/TripTypeSelector/tripTypeSelector.types';

export interface IFlightSearchParams {
  tripType: ETripType;
  tripClass: ETripClass;
  departDate: Date;
  returnDate: Date;
  personCount: number;

  origin: IAirportInfo;
  destination: IAirportInfo;
}
