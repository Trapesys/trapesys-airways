import { Box, Container, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import backgroundImage from '../../../shared/assets/images/homepageBanner.jpg';
import FlightSearch from '../../molecules/FlightSearch/FlightSearch';
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
          <FlightSearch />
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
    }
  };
});

export default Homepage;
