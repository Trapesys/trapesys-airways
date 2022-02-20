import { Box, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import { IPopularDestinationProps } from './popularDestination.types';

const PopularDestination: FC<IPopularDestinationProps> = (props) => {
  const { name, image } = props;

  const classes = useStyles();

  return (
    <Box
      className={classes.popularDestinationWrapper}
      style={{
        backgroundImage: ` linear-gradient(to bottom, rgba(13, 28, 82, 0), rgba(13, 28, 82, 0.6)),
      url(${image})`
      }}
    >
      <Box mt={'auto'}>
        <Typography className={classes.name}>{name}</Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    popularDestinationWrapper: {
      display: 'flex',
      borderRadius: '15px',
      width: '210px',
      height: '130px',
      backgroundSize: 'cover',
      padding: '15px',
      cursor: 'pointer'
    },
    name: {
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(16),
      color: 'white'
    }
  };
});

export default PopularDestination;
