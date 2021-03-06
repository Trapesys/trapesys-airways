import { Box, makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchContext from '../../../context/SearchContext';
import sharedValues from '../../../shared/sharedValues';
import ActionButton from '../../atoms/ActionButton/ActionButton';
import TripClassSelector from '../../atoms/TripClassSelector/TripClassSelector';
import { ETripClass } from '../../atoms/TripClassSelector/tripClassSelector.types';
import TripDateRange from '../../atoms/TripDateRange/TripDateRange';
import TripPersonSelector from '../../atoms/TripPersonSelector/TripPersonSelector';
import TripPlaceRange from '../../atoms/TripPlaceRange/TripPlaceRange';
import { IAirportInfo } from '../../atoms/TripPlaceRange/tripPlaceRange.types';
import TripTypeSelector from '../../atoms/TripTypeSelector/TripTypeSelector';
import { ETripType } from '../../atoms/TripTypeSelector/tripTypeSelector.types';
import useSnackbar from '../Snackbar/useSnackbar.hook';
import { IFlightSearchProps } from './flightSearch.types';

const FlightSearch: FC<IFlightSearchProps> = () => {
  const classes = useStyles();

  const { setFlightSearchParams } = useContext(SearchContext);

  const [tripType, setTripType] = useState<ETripType>(ETripType.ONE_WAY);
  const [personCount, setPersonCount] = useState<number>(1);
  const [tripClass, setTripClass] = useState<ETripClass>(ETripClass.ECONOMY);

  const [origin, setOrigin] = useState<IAirportInfo | null>(null);
  const [destination, setDestination] = useState<IAirportInfo | null>(null);

  const [departDate, setDepartDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(new Date());

  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const handleFlightSearch = () => {
    // Sanity checks
    if (!origin || !destination) {
      openSnackbar('Origin or destination not provided', 'error');
      return;
    }

    if (origin.objectID === destination.objectID) {
      openSnackbar('Invalid origin and destination', 'error');
      return;
    }

    setFlightSearchParams({
      tripClass,
      tripType,
      departDate,
      returnDate,
      personCount,

      origin,
      destination
    });

    navigate('/flights');
  };

  return (
    <Box className={classes.searchBoxWrapper}>
      <Box className={classes.topSelectorWrapper}>
        <TripTypeSelector setTripType={setTripType} tripType={tripType} />
        <TripPersonSelector
          setPersonCount={setPersonCount}
          personCount={personCount}
        />
        <TripClassSelector setTripClass={setTripClass} tripClass={tripClass} />
      </Box>
      <Box mt={4} display={'flex'} alignItems={'flex-end'}>
        <TripPlaceRange
          origin={origin}
          destination={destination}
          setOrigin={setOrigin}
          setDestination={setDestination}
        />
        <Box ml={4}>
          <TripDateRange
            departDate={departDate}
            returnDate={returnDate}
            setDepartDate={setDepartDate}
            setReturnDate={setReturnDate}
            tripType={tripType}
          />
        </Box>
        <Box ml={'auto'}>
          <ActionButton
            text={'Search'}
            endIcon={<SearchRoundedIcon />}
            chunky={true}
            onClick={() => handleFlightSearch()}
          />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    searchBoxWrapper: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 'auto',
      marginBottom: `-${sharedValues.flightSearchHeight / 2}px`,
      height: `${sharedValues.flightSearchHeight}px`,
      width: '100%',
      backgroundColor: theme.palette.custom.darkWhite,
      borderRadius: '20px',
      boxShadow: theme.palette.boxShadows.darker,
      padding: '30px 40px'
    },
    topSelectorWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '70px'
    }
  };
});

export default FlightSearch;
