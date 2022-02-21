import { ETripClass } from '../components/atoms/TripClassSelector/tripClassSelector.types';
import { ETripType } from '../components/atoms/TripTypeSelector/tripTypeSelector.types';

export interface IFlightSearchParams {
  tripType: ETripType;
  tripClass: ETripClass;
  departDate: Date;
  returnDate: Date;
  personCount: number;

  origin: IPlaceInformation;
  destination: IPlaceInformation;
}

export interface IPlaceInformation {
  id: string;
  name: string;
  airport: string;
}
