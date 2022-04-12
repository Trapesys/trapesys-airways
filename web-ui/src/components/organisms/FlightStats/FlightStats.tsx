import { Box, makeStyles, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { FC, useContext, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { AbiItem } from 'web3-utils';
import Config from '../../../config';
import Web3Context from '../../../context/Web3Context';
import MVPTicket from '../../../contract/MVPTicketSale.json';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import { IFlightStatsProps } from './flightStats.types';

ChartJS.register(ArcElement, Tooltip, Legend);

const FlightStats: FC<IFlightStatsProps> = () => {
  const classes = useStyles();

  const [totalTickets, setTotalTickets] = useState<number>(0);
  const [totalSoldTickets, setTotalSoldTickets] = useState<number>(0);

  const { web3Context, web3Account } = useContext(Web3Context);

  const fetchAvailableSeats = async (eventData: any, contract: any) => {
    const numAvail = await contract.methods
      .numAvailableSeats(eventData['returnValues']['flightId'])
      .call();

    return +numAvail;
  };

  const subscribeToEvents = () => {
    if (web3Context && web3Account) {
      let contract = new web3Context.eth.Contract(
        MVPTicket.abi as AbiItem[],
        Config.TICKET_SALE_ADDRESS,
        {
          from: web3Account
        }
      );

      let t1 = totalTickets;
      let t2 = totalSoldTickets;
      contract.events.AddedFlight(
        {
          fromBlock: 0,
          toBlock: 'latest'
        },
        function (error: any, events: any) {
          fetchAvailableSeats(events, contract).then((seats) => {
            t1 = t1 + seats;
            setTotalTickets(t1);
          });
        }
      );

      contract.events.PurchasedTicket(
        {
          fromBlock: 0,
          toBlock: 'latest'
        },
        function (error: any, events: any) {
          t2 = t2 + 1;
          setTotalSoldTickets(t2);
        }
      );
    }
  };

  useEffect(() => {
    subscribeToEvents();
  }, []);

  useEffect(() => {
    setChartData({
      labels: ['Available Tickets', 'Sold Tickets'],
      datasets: [
        {
          data: [
            totalTickets < 1 ? 1 : totalTickets,
            totalSoldTickets < 1 ? 1 : totalSoldTickets
          ],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
          hoverOffset: 4
        }
      ]
    });
  }, [totalTickets, totalSoldTickets]);

  const [chartData, setChartData] = useState<any>({
    labels: ['Available Tickets', 'Sold Tickets'],
    datasets: [
      {
        data: [1, 1],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
        hoverOffset: 4
      }
    ]
  });

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <SectionTitle title={'Flight Stats'} />
      <Box display={'flex'} width={'100%'} mt={8} alignItems={'center'}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Typography className={classes.counterText}>
              {totalTickets}
            </Typography>
            <Typography className={classes.counterSubtext}>
              Available Tickets
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            mt={8}
          >
            <Typography className={classes.counterText}>
              {totalSoldTickets}
            </Typography>
            <Typography className={classes.counterSubtext}>
              Sold Tickets
            </Typography>
          </Box>
        </Box>
        <Box display={'flex'} ml={16}>
          <Pie data={chartData} />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    counterText: {
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(36),
      color: theme.palette.secondary.main
    },
    counterSubtext: {
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(24),
      color: theme.palette.secondary.main
    }
  };
});

export default FlightStats;