export interface ITripPlaceRangeProps {
  origin: IAirportInfo | null;
  destination: IAirportInfo | null;

  setOrigin: (from: IAirportInfo | null) => void;
  setDestination: (to: IAirportInfo | null) => void;
}

export interface IAirportInfo {
  name: string;
  city: string;
  country: string;
  iataCode: string;
  geoLocation: {
    lat: number;
    lng: number;
  };
  linksCount: number;
  objectID: string;
}
