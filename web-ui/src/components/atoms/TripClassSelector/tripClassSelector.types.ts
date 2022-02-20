export interface ITripClassSelectorProps {
  tripClass: ETripClass;

  setTripClass: (tripClass: ETripClass) => void;
}

export enum ETripClass {
  ECONOMY = 'Economy',
  BUSINESS = 'Business'
}
