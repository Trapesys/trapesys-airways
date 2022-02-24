import { Box, makeStyles, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import AirlineSeatReclineNormalRoundedIcon from '@material-ui/icons/AirlineSeatReclineNormalRounded';
import clsx from 'clsx';
import { FC, useContext, useState } from 'react';
import { AbiItem } from 'web3-utils';
import Config from '../../../config';
import Web3Context from '../../../context/Web3Context';
import MVPTicketSale from '../../../contract/MVPTicketSale.json';
import { ReactComponent as FlightPath } from '../../../shared/assets/icons/flightPath.svg';
import FlightUtils from '../../../shared/flightUtils';
import theme from '../../../theme/theme';
import useSnackbar from '../../molecules/Snackbar/useSnackbar.hook';
import ActionButton from '../ActionButton/ActionButton';
import PlaceInfo from '../PlaceInfo/PlaceInfo';
import { ETripClass } from '../TripClassSelector/tripClassSelector.types';
import { IFlightProps } from './flight.types';

const Flight: FC<IFlightProps> = (props) => {
  const { flightInfo } = props;

  const classes = useStyles();

  const { openSnackbar } = useSnackbar();

  const [buyInProgress, setBuyInProgress] = useState<boolean>(false);

  const { web3Context, web3Account } = useContext(Web3Context);

  const handleTicketBuy = async () => {
    if (web3Context && web3Account) {
      let contract = new web3Context.eth.Contract(
        MVPTicketSale.abi as AbiItem[],
        Config.TICKET_SALE_ADDRESS,
        {
          from: web3Account
        }
      );

      return await contract.methods.buyTicket(flightInfo.flightID).send({
        gas: 0
      });
    }
  };

  const buyTicket = () => {
    setBuyInProgress(true);

    handleTicketBuy()
      .then(() => {
        openSnackbar('Successfully booked ticket!', 'success');

        setBuyInProgress(false);
      })
      .catch((err) => {
        console.log(err);

        openSnackbar('Unable to book ticket', 'error');
        setBuyInProgress(false);
      });
  };

  return (
    <Box className={classes.flightWrapper}>
      <div
        className={clsx({
          [classes.economyTag]: flightInfo.tripClass === ETripClass.ECONOMY,
          [classes.businessTag]: flightInfo.tripClass === ETripClass.BUSINESS
        })}
      />
      <Box
        display={'flex'}
        width={'70%'}
        height={'100%'}
        alignItems={'center'}
        ml={6}
      >
        <Box className={classes.flightInfoWrapper}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Typography className={classes.infoLabel}>From</Typography>
            <PlaceInfo
              place={`${flightInfo.origin.city}, ${FlightUtils.getCountryCode(
                flightInfo.origin.country
              )}`}
              airport={flightInfo.origin.iataCode}
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
              place={`${
                flightInfo.destination.city
              }, ${FlightUtils.getCountryCode(flightInfo.destination.country)}`}
              airport={flightInfo.destination.iataCode}
              dateTime={flightInfo.arrivalDateTime}
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

      <div className={classes.ticketDots} />

      <Box
        display={'flex'}
        flexDirection={'column'}
        width={'30%'}
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography className={classes.tripClass}>
          {flightInfo.tripClass}
        </Typography>
        <Typography
          className={classes.tripCost}
        >{`${flightInfo.price} MVPT`}</Typography>
        <Box mt={1}>
          <ActionButton
            disabled={buyInProgress}
            text={'Book now'}
            chunky={true}
            onClick={() => buyTicket()}
          />
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
    },
    ticketDots: {
      border: '4px solid #EBEBEB',
      borderStyle: 'none none none dotted'
    },
    tripClass: {
      fontWeight: 500,
      color: theme.palette.secondary.main,
      fontSize: theme.typography.pxToRem(18)
    },
    tripCost: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(14),
      color: '#A4A4A4'
    }
  };
});

export default Flight;
