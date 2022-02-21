import { Box, makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchContext from '../../../context/SearchContext';
import FlightUtils, { IFlightInfo } from '../../../shared/flightUtils';
import Flight from '../../atoms/Flight/Flight';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import { IFlightsProps } from './flights.types';

const Flights: FC<IFlightsProps> = () => {
  const { flightSearchParams } = useContext(SearchContext);

  const classes = useStyles();

  const navigate = useNavigate();

  useEffect(() => {
    if (!flightSearchParams) {
      // Nothing to display if the params are not set
      navigate('/');
    }
  }, [flightSearchParams]);

  const [foundFlights, setFoundFlights] = useState<IFlightInfo[]>([]);

  useEffect(() => {
    if (flightSearchParams) {
      setFoundFlights(
        FlightUtils.generateRandomFlightData(flightSearchParams, 30)
      );
    }
  }, [flightSearchParams]);

  return (
    <Box className={classes.flightsWrapper}>
      <SectionTitle title={'Search results'} />
      {foundFlights.map((foundFlight: IFlightInfo) => {
        return (
          <Flight
            key={`flight-${foundFlight.departDateTime.getTime()}`}
            flightInfo={foundFlight}
          />
        );
      })}
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
