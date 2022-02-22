import { Box, makeStyles } from '@material-ui/core';
import { FC, useContext, useEffect } from 'react';
import SearchContext from '../../../context/SearchContext';
import CrewSection from '../../atoms/CrewSection/CrewSection';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import Offers from '../../molecules/Offers/Offers';
import PopularDestinations from '../../molecules/PopularDestinations/PopularDestinations';
import { IInfoSectionProps } from './infoSection.types';

const InfoSection: FC<IInfoSectionProps> = () => {
  const classes = useStyles();

  const { setFlightSearchParams } = useContext(SearchContext);

  useEffect(() => {
    // On component load, reset the flight search params
    setFlightSearchParams(null);
  }, []);

  return (
    <Box className={classes.infoSectionWrapper}>
      <SectionTitle title={'Popular Destinations'} />
      <Box mt={6}>
        <PopularDestinations />
      </Box>

      <Box mt={10}>
        <SectionTitle title={'What We Offer'} />
        <Box mt={6}>
          <Offers />
        </Box>
      </Box>

      <Box mt={10}>
        <SectionTitle title={'Meet the crew'} />
        <Box mt={6}>
          <CrewSection />
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    infoSectionWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }
  };
});

export default InfoSection;
