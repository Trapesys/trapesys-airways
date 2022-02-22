import { createContext } from 'react';
import { IFlightSearchParams } from './searchContext.types';

export interface ISearchContext<searchParams = IFlightSearchParams | null> {
  flightSearchParams: searchParams;
  setFlightSearchParams: (params: IFlightSearchParams | null) => void;
}

const SearchContext = createContext<ISearchContext>({
  flightSearchParams: null,
  setFlightSearchParams: (params: IFlightSearchParams | null) => {}
});

export default SearchContext;

export const SearchContextConsumer = SearchContext.Consumer;
