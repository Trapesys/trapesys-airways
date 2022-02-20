import { Box, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import belgradeImg from '../../../shared/assets/images/Belgrade.jpg';
import noviSadImg from '../../../shared/assets/images/NoviSad.jpg';
import parisImg from '../../../shared/assets/images/Paris.jpg';
import sendaiImg from '../../../shared/assets/images/Sendai.jpg';
import valenciaImg from '../../../shared/assets/images/Valencia.jpg';
import PopularDestination from '../../atoms/PopularDestination/PopularDestination';
import {
  IPopularDestination,
  IPopularDestinationsProps
} from './popularDestinations.types';

const PopularDestinations: FC<IPopularDestinationsProps> = () => {
  const classes = useStyles();

  const popularDestinations: IPopularDestination[] = [
    {
      name: 'Belgrade, RS',
      image: belgradeImg
    },
    {
      name: 'Novi Sad, RS',
      image: noviSadImg
    },
    {
      name: 'Paris, FR',
      image: parisImg
    },
    {
      name: 'Sendai, JP',
      image: sendaiImg
    },
    {
      name: 'Valencia, ES',
      image: valenciaImg
    }
  ];

  return (
    <Box className={classes.popularDestinationsWrapper}>
      {popularDestinations.map((popularDestination, index) => {
        return (
          <PopularDestination
            key={`popular-${index}`}
            name={popularDestination.name}
            image={popularDestination.image}
          />
        );
      })}
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    popularDestinationsWrapper: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  };
});

export default PopularDestinations;
