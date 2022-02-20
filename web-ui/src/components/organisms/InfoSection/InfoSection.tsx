import { Box, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import PopularDestinations from '../../molecules/PopularDestinations/PopularDestinations';
import { IInfoSectionProps } from './infoSection.types';

const InfoSection: FC<IInfoSectionProps> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.infoSectionWrapper}>
      <SectionTitle title={'Popular Destinations'} />
      <Box mt={6}>
        <PopularDestinations />
      </Box>

      <Box mt={6}>
        <SectionTitle title={'What We Offer'} />
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
