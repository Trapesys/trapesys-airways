import { Box, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import cryptoImg from '../../../shared/assets/images/cryptocurrency.png';
import earthImg from '../../../shared/assets/images/earth.png';
import seatImg from '../../../shared/assets/images/seat.png';
import staffImg from '../../../shared/assets/images/stewardess.png';
import Offer from '../../atoms/Offer/Offer';
import { IOffer } from '../../atoms/Offer/offer.types';
import { IOffersProps } from './offers.types';

const Offers: FC<IOffersProps> = () => {
  const classes = useStyles();

  const offers: IOffer[] = [
    {
      title: 'First-class Seating',
      description: 'Sit back and relax, we have the best seats around',
      image: seatImg
    },
    {
      title: 'Crypto Payments',
      description: 'Book your tickets with ease using MVPT',
      image: cryptoImg
    },
    {
      title: 'Friendly Flight Staff',
      description: 'Our experienced flight staff is there for you',
      image: staffImg
    },
    {
      title: '100+ Destinations',
      description: 'If it has a runway - we fly there',
      image: earthImg
    }
  ];

  return (
    <Box className={classes.offersWrapper}>
      {offers.map((offer: IOffer, index) => {
        return (
          <Offer
            key={`offer-${index}`}
            title={offer.title}
            description={offer.description}
            image={offer.image}
          />
        );
      })}
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    offersWrapper: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  };
});

export default Offers;
