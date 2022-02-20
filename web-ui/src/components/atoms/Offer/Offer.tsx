import { Box, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import { IOfferProps } from './offer.types';

const Offer: FC<IOfferProps> = (props) => {
  const classes = useStyles();

  const { title, description, image } = props;

  return (
    <Box className={classes.offerWrapper}>
      <Box mb={4} mt={4}>
        <img src={image} className={classes.offerImg} />
      </Box>
      <Typography className={classes.offerTitle}>{title}</Typography>
      <Typography className={classes.offerDescription}>
        {description}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    offerWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '290px',
      height: '420px',
      backgroundColor: theme.palette.custom.darkWhite,
      borderRadius: '15px',
      padding: '15px 20px',
      boxShadow: theme.palette.boxShadows.darker
    },
    offerImg: {
      width: '200px',
      height: 'auto'
    },
    offerTitle: {
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(24),
      textAlign: 'center',
      color: theme.palette.secondary.main
    },
    offerDescription: {
      textAlign: 'center'
    }
  };
});

export default Offer;
