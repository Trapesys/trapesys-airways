import { Box, makeStyles } from '@material-ui/core';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../shared/assets/icons/LogoAlt.svg';
import UserMenu from '../../molecules/UserMenu/UserMenu';
import { ITopBarProps } from './topBar.types';

const TopBar: FC<ITopBarProps> = () => {
  const classes = useStyles();
  return (
    <Box className={classes.topBarWrapper}>
      <Link to={'/'}>
        <Logo className={classes.logo} />
      </Link>

      <UserMenu />
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    topBarWrapper: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: '30px',
      alignItems: 'center'
    },
    logo: {
      width: '250px',
      height: 'auto'
    }
  };
});

export default TopBar;
