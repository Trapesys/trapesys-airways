import { Box, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import { ReactComponent as Clipboard } from '../../../shared/assets/icons/undraw_no_data_re_kwbl.svg';
import { INoBookingsProps } from './noBookings.types';

const NoBookings: FC<INoBookingsProps> = () => {
  const classes = useStyles();
  return (
    <Box className={classes.emptyWrapper}>
      <Clipboard className={classes.img} />
      <Box mt={2}>
        <Typography>No bookings found</Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    emptyWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: 0.5
    },
    img: {
      width: '180px',
      height: 'auto'
    }
  };
});

export default NoBookings;
