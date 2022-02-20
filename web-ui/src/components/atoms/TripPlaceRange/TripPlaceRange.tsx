import { Box, makeStyles, TextField, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import { FC } from 'react';
import theme from '../../../theme/theme';
import { ITripPlaceRangeProps } from './tripPlaceRange.types';

const TripPlaceRange: FC<ITripPlaceRangeProps> = (props) => {
  const { origin, destination, setOrigin, setDestination } = props;

  const classes = useStyles();

  return (
    <Box className={classes.selectorWrapper}>
      <Box className={classes.singleSelectorWrapper}>
        <Typography className={classes.label}>From</Typography>
        <Box mt={2}>
          <TextField
            id={'origin'}
            placeholder={'New York City, USA'}
            color={'secondary'}
            variant={'outlined'}
            value={origin}
            onChange={(data: any) => setOrigin(data.target.value)}
            className={classes.inputField}
            InputProps={{
              classes: {
                root: classes.input
              }
            }}
          />
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
          <TextField
            id={'destination'}
            placeholder={'Belgrade, RS'}
            color={'secondary'}
            variant={'outlined'}
            value={destination}
            onChange={(data: any) => setDestination(data.target.value)}
            className={classes.inputField}
            InputProps={{
              classes: {
                root: classes.input
              }
            }}
          />
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
    },
    input: {
      borderRadius: '10px'
    }
  };
});

export default TripPlaceRange;
