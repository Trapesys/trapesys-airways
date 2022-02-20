export interface ITripPlaceRangeProps {
  origin: string;
  destination: string;

  setOrigin: (fromID: string) => void;
  setDestination: (toID: string) => void;
}
