import { Box, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import crewPhoto from '../../../shared/assets/images/CrewPhoto.png';
import mvpLogo from '../../../shared/assets/images/MVP-Workshop-black-logovertical.png';
import { ICrewSectionProps } from './crewSection.types';

const CrewSection: FC<ICrewSectionProps> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.crewSectionWrapper}>
      <Box className={classes.letterWrapper}>
        <Typography className={classes.letterHeading}>
          A word from our captain...
        </Typography>
        <Box mt={4}>
          <Typography className={classes.letterText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu erat
            molestie, egestas nibh id, scelerisque purus. Pellentesque
            sollicitudin, quam eu iaculis tempus, mauris velit sagittis mauris,
            sit amet volutpat leo tortor ut tortor. Etiam et risus justo. Aenean
            pulvinar posuere diam, eget tincidunt libero tincidunt euismod.
            Fusce nec magna felis. Integer lacinia, velit at ultrices eleifend,
            augue dui bibendum justo, vel volutpat nisl dui ut lorem. Duis
            fringilla velit augue, sed rutrum nibh rhoncus a.
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <Typography className={classes.letterSignature}>
            Lazar Travica
          </Typography>
          <Box display={'flex'} alignItems={'center'} ml={'auto'}>
            <Typography>An</Typography>
            <img src={mvpLogo} className={classes.partnerLogo} />
            <Typography>Alliance partner</Typography>
          </Box>
        </Box>
      </Box>
      <img src={crewPhoto} className={classes.crewPhoto} />
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    crewSectionWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    },
    letterWrapper: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: theme.palette.custom.darkWhite,
      width: '60%',
      height: '430px',
      borderRadius: '15px',
      boxShadow: theme.palette.boxShadows.darker,
      padding: '40px'
    },
    letterHeading: {
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(24),
      color: theme.palette.secondary.main
    },
    letterText: {
      fontSize: theme.typography.pxToRem(16)
    },
    letterSignature: {
      fontFamily: 'Dancing Script',
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(32)
    },
    partnerLogo: {
      width: '80px',
      height: 'auto'
    },
    crewPhoto: {
      width: 'auto',
      height: 'auto',
      maxHeight: '430px',
      maxWidth: '40%'
    }
  };
});

export default CrewSection;
