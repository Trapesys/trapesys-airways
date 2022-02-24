import { Box, makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AbiItem } from 'web3-utils';
import Config from '../../../config';
import SearchContext from '../../../context/SearchContext';
import Web3Context from '../../../context/Web3Context';
import MVPTicketSale from '../../../contract/MVPTicketSale.json';
import FlightUtils, {
  IContractFlight,
  IFlightInfo
} from '../../../shared/flightUtils';
import Flight from '../../atoms/Flight/Flight';
import NoData from '../../atoms/NoData/NoData';
import Pagination from '../../atoms/Pagination/Pagination';
import usePagination from '../../atoms/Pagination/pagination.hook';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import useSnackbar from '../../molecules/Snackbar/useSnackbar.hook';
import { IFlightsProps } from './flights.types';

const Flights: FC<IFlightsProps> = () => {
  const { flightSearchParams } = useContext(SearchContext);

  const classes = useStyles();

  const { openSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { page, count, setCount, limit, handlePageChange } = usePagination({
    limit: 5
  });

  const [allFlights, setAllFlights] = useState<IFlightInfo[]>([]);
  const [flightsToShow, setFlightsToShow] = useState<IFlightInfo[]>([]);

  const { web3Account, web3Context } = useContext(Web3Context);

  const paginateFlights = (flights: IFlightInfo[]) => {
    return flights.slice((page - 1) * limit, page * limit);
  };

  const getFlights = async () => {
    if (web3Context && web3Account) {
      let contract = new web3Context.eth.Contract(
        MVPTicketSale.abi as AbiItem[],
        Config.TICKET_SALE_ADDRESS,
        {
          from: web3Account
        }
      );

      return await contract.methods.flights().call();
    }
  };

  useEffect(() => {
    if (!flightSearchParams) {
      // Nothing to display if the params are not set
      navigate('/');
    }
  }, [flightSearchParams]);

  useEffect(() => {
    if (!web3Context) {
      navigate('/');
      openSnackbar('Web3 provider not initialized', 'error');
    }
  }, [web3Context]);

  useEffect(() => {
    setFlightsToShow(paginateFlights(allFlights));
  }, [page, count]);

  useEffect(() => {
    if (flightSearchParams) {
      getFlights()
        .then((flights: IContractFlight[]) => {
          const filteredFlights = FlightUtils.convertContractFlights(
            FlightUtils.filterContractFlights(flights, flightSearchParams)
          );

          setAllFlights(filteredFlights);

          setFlightsToShow(paginateFlights(filteredFlights));

          setCount(filteredFlights.length);
        })
        .catch((err) => {
          console.log(err);
          openSnackbar('Unable to fetch flight data', 'error');

          navigate('/');
        });
    }
  }, [flightSearchParams]);

  return (
    <Box className={classes.flightsWrapper}>
      <SectionTitle title={'Search results'} />
      {flightsToShow.map((foundFlight: IFlightInfo) => {
        return (
          <Flight
            key={`flight-${foundFlight.departDateTime.getTime()}-${
              foundFlight.flightNumber
            }`}
            flightInfo={foundFlight}
          />
        );
      })}
      {count < 1 && <NoData text={'No flights found'} />}
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
