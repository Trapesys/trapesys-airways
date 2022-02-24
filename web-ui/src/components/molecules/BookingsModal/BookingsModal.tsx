import {
  Backdrop,
  Box,
  Divider,
  Fade,
  IconButton,
  makeStyles,
  Modal,
  Typography
} from '@material-ui/core';
import AirlineSeatReclineNormalRoundedIcon from '@material-ui/icons/AirlineSeatReclineNormalRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import FlightRoundedIcon from '@material-ui/icons/FlightRounded';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import clsx from 'clsx';
import { FC, useContext, useEffect, useState } from 'react';
import { AbiItem } from 'web3-utils';
import Config from '../../../config';
import Web3Context from '../../../context/Web3Context';
import MVPTicketSale from '../../../contract/MVPTicketSale.json';
import FlightUtils, {
  IContractFlight,
  IFlightInfo
} from '../../../shared/flightUtils';
import theme from '../../../theme/theme';
import NoData from '../../atoms/NoData/NoData';
import Pagination from '../../atoms/Pagination/Pagination';
import usePagination from '../../atoms/Pagination/pagination.hook';
import PlaceInfo from '../../atoms/PlaceInfo/PlaceInfo';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import { ETripClass } from '../../atoms/TripClassSelector/tripClassSelector.types';
import { IBookingsModalProps } from './bookingsModal.types';

const BookingsModal: FC<IBookingsModalProps> = (props) => {
  const { open, setOpen } = props;

  const classes = useStyles();

  const [allBookings, setAllBookings] = useState<IFlightInfo[]>([]);
  const [bookingsToShow, setBookingsToShow] = useState<IFlightInfo[]>([]);

  const { page, count, setCount, limit, handlePageChange } = usePagination({
    limit: 3
  });

  const paginateFlights = (flights: IFlightInfo[]) => {
    return flights.slice((page - 1) * limit, page * limit);
  };

  useEffect(() => {
    setBookingsToShow(paginateFlights(allBookings));
  }, [page, count]);

  const { web3Context, web3Account } = useContext(Web3Context);

  const fetchAllBookings = async () => {
    if (web3Context && web3Account) {
      let contract = new web3Context.eth.Contract(
        MVPTicketSale.abi as AbiItem[],
        Config.TICKET_SALE_ADDRESS,
        {
          from: web3Account
        }
      );

      const ticketIDs: number[] = await contract.methods
        .accountTicketIds(web3Account)
        .call();

      let foundBookings: IContractFlight[] = [];
      for (let i = 0; i < ticketIDs.length; i++) {
        foundBookings.push(
          await contract.methods.flightByTicketId(ticketIDs[i]).call()
        );
      }

      return foundBookings;
    }

    return [];
  };

  useEffect(() => {
    fetchAllBookings().then((foundBookings: IContractFlight[]) => {
      const convertedFlights =
        FlightUtils.convertContractFlights(foundBookings);
      setAllBookings(convertedFlights);

      setBookingsToShow(paginateFlights(convertedFlights));

      setCount(convertedFlights.length);
    });
  }, [open]);

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.modalWrapper}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <SectionTitle title={'My Bookings'} />
            <IconButton
              classes={{
                root: 'iconButtonRoot'
              }}
              onClick={() => setOpen(false)}
            >
              <CloseRoundedIcon
                style={{
                  width: '20px',
                  height: 'auto'
                }}
              />
            </IconButton>
          </Box>
          <Box display={'flex'} mt={4} width={'100%'} flexDirection={'column'}>
            {bookingsToShow.length < 1 ? (
              <Box my={8}>
                <NoData text={'No bookings found'} />
              </Box>
            ) : (
              <Box>
                {bookingsToShow.map((booking, index) => {
                  return (
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      key={`booking-${index}`}
                    >
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        my={2.5}
                        justifyContent={'space-between'}
                      >
                        <Box display={'flex'} alignItems={'center'}>
                          <PlaceInfo
                            place={`${
                              booking.origin.city
                            }, ${FlightUtils.getCountryCode(
                              booking.origin.country
                            )}`}
                            airport={booking.origin.iataCode}
                            dateTime={booking.departDateTime}
                          />
                          <Box mx={2}>
                            <SwapHorizRoundedIcon />
                          </Box>
                          <PlaceInfo
                            place={`${
                              booking.destination.city
                            }, ${FlightUtils.getCountryCode(
                              booking.destination.country
                            )}`}
                            airport={booking.destination.iataCode}
                            dateTime={booking.arrivalDateTime}
                          />
                        </Box>

                        <Box display={'flex'} flexDirection={'column'}>
                          <Box display={'flex'} alignItems={'center'}>
                            <FlightRoundedIcon
                              style={{
                                transform: 'rotate(45deg)',
                                fill: theme.palette.secondary.main
                              }}
                            />
                            <Typography>{booking.flightNumber}</Typography>
                          </Box>
                          <Box display={'flex'} alignItems={'center'}>
                            <AirlineSeatReclineNormalRoundedIcon
                              style={{
                                fill: theme.palette.secondary.main,
                                width: '35px',
                                height: 'auto'
                              }}
                            />
                            <Typography>
                              {FlightUtils.getRandomSeat()}
                            </Typography>
                          </Box>
                        </Box>
                        <Box mr={4}>
                          <Typography
                            className={clsx(classes.classBase, {
                              [classes.economyText]:
                                booking.tripClass === ETripClass.ECONOMY,
                              [classes.businessText]:
                                booking.tripClass === ETripClass.BUSINESS
                            })}
                          >
                            {booking.tripClass}
                          </Typography>
                        </Box>
                      </Box>
                      {index !== bookingsToShow.length - 1 && <Divider />}
                    </Box>
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
            )}
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalWrapper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.palette.boxShadows.darker,
      padding: '20px 30px',
      width: '800px',
      height: 'auto',
      border: 'none',
      outline: 'none',
      borderRadius: '15px'
    },
    classBase: {
      fontWeight: 500
    },
    economyText: {
      color: theme.palette.secondary.main
    },
    businessText: {
      color: theme.palette.custom.crayolaOrange
    }
  };
});

export default BookingsModal;