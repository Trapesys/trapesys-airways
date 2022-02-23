import {
  Box,
  makeStyles,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import { Autocomplete } from '@material-ui/lab';
import { FC, useState } from 'react';
import theme from '../../../theme/theme';
import airportData from './../../../shared/assets/data/airports.json';
import { IAirportInfo, ITripPlaceRangeProps } from './tripPlaceRange.types';

const TripPlaceRange: FC<ITripPlaceRangeProps> = (props) => {
  const { origin, destination, setOrigin, setDestination } = props;

  const classes = useStyles();

  const [airports, setAirports] = useState<IAirportInfo[]>(airportData);

  const options = airports.map((option) => {
    const firstLetter = option.city[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option
    };
  });

  const renderAutocomplete = (
    placeholder: string,
    id: string,
    setter: (value: IAirportInfo | null) => void
  ) => {
    return (
      <Autocomplete
        id={id}
        getOptionSelected={(option: IAirportInfo, value: IAirportInfo) =>
          option.objectID === value.objectID
        }
        getOptionLabel={(option: IAirportInfo) =>
          `${option.city}, ${option.country}`
        }
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={(option) => option.firstLetter}
        onChange={(event, value: IAirportInfo | null) => setter(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            color={'secondary'}
            variant={'outlined'}
            className={classes.inputField}
          />
        )}
      />
    );
  };

  return (
    <Box className={classes.selectorWrapper}>
      <Box className={classes.singleSelectorWrapper}>
        <Typography className={classes.label}>From</Typography>
        <Box mt={2}>
          {renderAutocomplete(
            'New York, USA',
            'origin-autocomplete',
            setOrigin
          )}
        </Box>
      </Box>
      <Box display={'flex'} mx={2} mt={4}>
        <SwapHorizRoundedIcon
          style={{
            fill: theme.palette.custom.navyBlue
          }}
        />
      </Box>
      <Box className={classes.singleSelectorWrapper}>
        <Typography className={classes.label}>To</Typography>
        <Box mt={2}>
          {renderAutocomplete(
            'Belgrade, RS',
            'destination-autocomplete',
            setDestination
          )}
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    selectorWrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    singleSelectorWrapper: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      color: theme.palette.custom.navyBlue,
      fontWeight: 500
    },
    inputField: {
      width: '230px'
    }
  };
});

export default TripPlaceRange;
