import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';
import { ReactComponent as LinkedIn } from '../../../shared/assets/icons/linkedin.svg';
import { ReactComponent as Logo } from '../../../shared/assets/icons/lockup_horizontal_negative_2_no_bg.svg';
import { ReactComponent as Twitter } from '../../../shared/assets/icons/twitter.svg';
import { IFooterProps } from './footer.types';

const Footer: FC<IFooterProps> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.footerWrapper}>
      <Container maxWidth={'lg'} fixed={true}>
        <Box className={classes.footerInner}>
          <Logo className={classes.footerLogo} />
          <Box display={'flex'} alignItems={'center'}>
            <a href={'https://twitter.com/trapesys'}>
              <Twitter className={classes.footerIcon} />
            </a>
            <Box display={'flex'} mx={2}>
              <a href={'https://trapesys.io'} className={classes.footerLink}>
                <Typography>trapesys.io</Typography>
              </a>
            </Box>
            <a href={'https://www.linkedin.com/company/trapesys/'}>
              <LinkedIn className={classes.footerIcon} />
            </a>
          </Box>
          <Box>
            <Typography>Made with ❤️ from the engineers at Trapesys</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme) => {
  return {
    footerWrapper: {
      display: 'flex',
      marginTop: 'auto',
      width: '100%',
      height: '190px',
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
      padding: '20px'
    },
    footerInner: {
      display: 'flex',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    footerLogo: {
      width: '30%',
      height: 'auto'
    },
    footerIcon: {
      width: '22px',
      height: 'auto'
    },
    footerLink: {
      textDecoration: 'underline',
      color: 'white'
    }
  };
});

export default Footer;
