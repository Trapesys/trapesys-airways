export interface ITripTypeSelectorProps {
  tripType: ETripType;

  setTripType: (tripType: ETripType) => void;
}

export enum ETripType {
  ONE_WAY = 'One-way',
  ROUND_TRIP = 'Round-trip'
}
