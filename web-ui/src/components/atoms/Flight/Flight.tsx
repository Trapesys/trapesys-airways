import { Box, makeStyles, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import AirlineSeatReclineNormalRoundedIcon from '@material-ui/icons/AirlineSeatReclineNormalRounded';
import { FC } from 'react';
import { ReactComponent as FlightPath } from '../../../shared/assets/icons/flightPath.svg';
import FlightUtils from '../../../shared/flightUtils';
import theme from '../../../theme/theme';
import PlaceInfo from '../PlaceInfo/PlaceInfo';
import { IFlightProps } from './flight.types';

const Flight: FC<IFlightProps> = (props) => {
  const { flightInfo } = props;

  const classes = useStyles();

  return (
    <Box className={classes.flightWrapper}>
      <div className={classes.economyTag} />
      <Box
        display={'flex'}
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        ml={6}
      >
        <Box className={classes.flightInfoWrapper}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Typography className={classes.infoLabel}>From</Typography>
            <PlaceInfo
              place={'Jagodina, RS'}
              airport={'JGD'}
              dateTime={flightInfo.departDateTime}
            />
          </Box>

          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            mx={6}
          >
            <Box mb={2}>
              <Typography className={classes.infoLabel}>
                Flight duration
              </Typography>
            </Box>
            <FlightPath />
            <Box>
              <Typography className={classes.infoLabel}>
                {`${FlightUtils.formatHoursAndMinutes(flightInfo.duration)}h`}
              </Typography>
            </Box>
          </Box>

          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Typography className={classes.infoLabel}>To</Typography>
            <PlaceInfo
              place={'Jagodina, RS'}
              airport={'JGD'}
              dateTime={flightInfo.departDateTime}
            />
          </Box>

          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            ml={8}
          >
            <Box mb={2}>
              <Typography className={classes.infoLabel}>
                Available Seats
              </Typography>
            </Box>
            <Box display={'flex'} alignItems={'center'}>
              <AirlineSeatReclineNormalRoundedIcon
                style={{
                  fill: theme.palette.secondary.main,
                  width: '35px',
                  height: 'auto'
                }}
              />
              <Box>
                <Typography className={classes.seats}>
                  {flightInfo.availableSeats}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    flightWrapper: {
      display: 'flex',
      width: '100%',
      height: '230px',
      backgroundColor: theme.palette.custom.darkWhite,
      borderRadius: '15px',
      boxShadow: theme.palette.boxShadows.main
    },
    flightInfoWrapper: {
      display: 'flex'
    },
    economyTag: {
      backgroundColor: theme.palette.secondary.main,
      height: '100%',
      width: '20px',
      borderRadius: '15px 0 0 15px'
    },
    businessTag: {
      backgroundColor: theme.palette.custom.crayolaOrange,
      height: '100%',
      width: '20px',
      borderRadius: '15px 0 0 15px'
    },
    infoLabel: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(14),
      color: '#A4A4A4'
    },
    placeName: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(22),
      color: theme.palette.secondary.main
    },
    time: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(18)
    },
    seats: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(18)
    }
  };
});

export default Flight;
