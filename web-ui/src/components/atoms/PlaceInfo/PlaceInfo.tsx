import { Box, Chip, makeStyles, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import moment from 'moment';
import { FC } from 'react';
import theme from '../../../theme/theme';
import { IPlaceInfoProps } from './placeInfo.types';

const PlaceInfo: FC<IPlaceInfoProps> = (props) => {
  const classes = useStyles();

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box my={1}>
        <Typography className={classes.placeName}>{props.place}</Typography>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <Chip
          label={props.airport}
          color={'secondary'}
          style={{
            fontWeight: 500,
            fontSize: theme.typography.pxToRem(18),
            backgroundColor: '#0E4DA4'
          }}
        />
        <Box ml={2}>
          <Typography className={classes.time}>
            {moment(props.dateTime).format('HH:mm')}
          </Typography>
        </Box>
      </Box>
      <Box mt={1}>
        <Typography className={classes.infoLabel}>
          {moment(props.dateTime).format('DD.MM.YYYY.')}
        </Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    infoLabel: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(14),
      color: '#A4A4A4'
    },
    placeName: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(22),
      color: theme.palette.secondary.main
    },
    time: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(18)
    }
  };
});

export default PlaceInfo;
