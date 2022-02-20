import { ETripType } from '../TripTypeSelector/tripTypeSelector.types';

export interface ITripDateRangeProps {
  departDate: Date | undefined;
  returnDate: Date | undefined;

  setDepartDate: (date: Date) => void;
  setReturnDate: (date: Date) => void;

  tripType: ETripType;
}
