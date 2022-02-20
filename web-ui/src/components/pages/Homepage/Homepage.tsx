import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import backgroundImage from '../../../shared/assets/images/homepageBanner.jpg';
import sharedValues from '../../../shared/sharedValues';
import FlightSearch from '../../molecules/FlightSearch/FlightSearch';
import InfoSection from '../../organisms/InfoSection/InfoSection';
import TopBar from '../../organisms/TopBar/TopBar';
import { IHomepageProps } from './homepage.types';

const Homepage: FC<IHomepageProps> = () => {
  const classes = useStyles();

  return (
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
              Fly to the Moon.
            </Typography>
          </Box>
          <FlightSearch />
        </Box>
        {
          // Offset the search box that has a negative bottom margin, and add 50px
        }
        <Box mt={`${sharedValues.flightSearchHeight / 2 + 50}px`}>
          <InfoSection />
        </Box>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    bannerWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '60%',
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

export default Homepage;
