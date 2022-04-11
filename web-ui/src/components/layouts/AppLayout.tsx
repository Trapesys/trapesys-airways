import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import backgroundImage from '../../shared/assets/images/homepageBannerAlt.jpg';
import sharedValues from '../../shared/sharedValues';
import Footer from '../atoms/Footer/Footer';
import FlightSearch from '../molecules/FlightSearch/FlightSearch';
import TopBar from '../organisms/TopBar/TopBar';
import { IAppLayoutProps } from './appLayout.types';

const AppLayout: FC<IAppLayoutProps> = (props) => {
  const classes = useStyles();

  return (
    <Box width={'100%'} height={'100%'}>
      <Box className={classes.bannerWrapper}>
        <Container
          maxWidth={'lg'}
          fixed={true}
          style={{
            height: '100%'
          }}
        >
          <Box display={'flex'} height={'100%'} flexDirection={'column'}>
            <TopBar />
            <Box mt={'auto'} mb={'auto'}>
              <Typography className={classes.bannerText}>
                Let's fly to the Moon.
              </Typography>
            </Box>
            <FlightSearch />
          </Box>
        </Container>
      </Box>

      <Box display={'flex'} flexDirection={'column'} width={'100%'} mb={15}>
        <Container
          maxWidth={'lg'}
          fixed={true}
          style={{
            height: '100%'
          }}
        >
          {
            // Offset the search box that has a negative bottom margin, and add 50px
          }
          <Box mt={`${sharedValues.flightSearchHeight / 2 + 50}px`}>
            <Outlet />
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    bannerWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '70%',
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    bannerText: {
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(42),
      color: 'white'
    }
  };
});

export default AppLayout;
