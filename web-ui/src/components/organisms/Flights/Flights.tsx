import { Box, makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchContext from '../../../context/SearchContext';
import FlightUtils, { IFlightInfo } from '../../../shared/flightUtils';
import Flight from '../../atoms/Flight/Flight';
import Pagination from '../../atoms/Pagination/Pagination';
import usePagination from '../../atoms/Pagination/pagination.hook';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import { IFlightsProps } from './flights.types';

const Flights: FC<IFlightsProps> = () => {
  const { flightSearchParams } = useContext(SearchContext);

  const classes = useStyles();

  const navigate = useNavigate();

  const numFlightsPerPage = 30;

  const { page, count, setCount, limit, handlePageChange } = usePagination({
    limit: 5
  });

  const [allFlights, setAllFlights] = useState<IFlightInfo[]>([]);
  const [flightsToShow, setFlightsToShow] = useState<IFlightInfo[]>([]);

  const paginateFlights = (flights: IFlightInfo[]) => {
    return flights.slice((page - 1) * limit, page * limit);
  };

  useEffect(() => {
    if (!flightSearchParams) {
      // Nothing to display if the params are not set
      navigate('/');
    }
  }, [flightSearchParams]);

  useEffect(() => {
    setFlightsToShow(paginateFlights(allFlights));
  }, [page, count]);

  useEffect(() => {
    if (flightSearchParams) {
      const randomFlights = FlightUtils.generateRandomFlightData(
        flightSearchParams,
        numFlightsPerPage
      );

      setAllFlights(randomFlights);

      setFlightsToShow(paginateFlights(randomFlights));

      setCount(numFlightsPerPage);
    }
  }, [flightSearchParams]);

  return (
    <Box className={classes.flightsWrapper}>
      <SectionTitle title={'Search results'} />
      {flightsToShow.map((foundFlight: IFlightInfo) => {
        return (
          <Flight
            key={`flight-${foundFlight.departDateTime.getTime()}`}
            flightInfo={foundFlight}
          />
        );
      })}
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'100%'}
        mt={4}
      >
        <Pagination
          count={count}
          limit={limit}
          page={page}
          onPageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    flightsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    }
  };
});

export default Flights;
