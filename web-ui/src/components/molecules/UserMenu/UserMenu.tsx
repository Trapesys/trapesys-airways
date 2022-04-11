import {
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { FC, Fragment, useContext, useEffect, useRef, useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import Config from '../../../config';
import Web3Context from '../../../context/Web3Context';
import MVPToken from '../../../contract/IMVPToken.json';
import { ReactComponent as MyBookings } from '../../../shared/assets/icons/airplane_ticket_black_24dp.svg';
import { ReactComponent as Logout } from '../../../shared/assets/icons/logout_black_24dp.svg';
import theme from '../../../theme/theme';
import ActionButton from '../../atoms/ActionButton/ActionButton';
import BookingsModal from '../BookingsModal/BookingsModal';
import useSnackbar from '../Snackbar/useSnackbar.hook';
import { IUserMenuProps } from './userMenu.types';

const UserMenu: FC<IUserMenuProps> = () => {
  const { web3Context, setWeb3Context, web3Account, setWeb3Account } =
    useContext(Web3Context);

  const handleWeb3Disconnect = async () => {
    setWeb3Account(null);
    setWeb3Context(null);
  };

  const handleWeb3Connect = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.requestAccounts();

    return {
      web3Context: web3,
      account: accounts[0]
    };
  };

  const handleLogin = () => {
    handleWeb3Connect()
      .then(async (data) => {
        await handleNetworkAddition(data.web3Context);

        setWeb3Account(data.account);
        setWeb3Context(data.web3Context);

        openSnackbar('Successfully signed in!', 'success');
      })
      .catch((err) => {
        openSnackbar('Unable to connect to web3 provider', 'error');

        console.log(err);
      });

    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const classes = useStyles();

  const handleToggle = () => {
    if (!open) {
      getTokenBalance().then((balance) => {
        setTokenBalance(balance);
      });
    }

    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const [bookingsModalOpen, setBookingsModalOpen] = useState<boolean>(false);

  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    if (web3Context) {
      const handleSignInCheck = async () => {
        await web3Context.eth.net.isListening();

        const accounts = await web3Context.eth.requestAccounts();

        setWeb3Account(accounts[0]);
      };

      handleSignInCheck()
        .then(() => {
          openSnackbar('Successfully signed in!', 'success');
        })
        .catch((err) => {
          openSnackbar('Unable to sign in', 'error');
          console.log(err);
        });
    }
  }, []);

  const handleNetworkAddition = async (web3Context: Web3) => {
    try {
      // @ts-ignore
      await web3Context.currentProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Config.POLYGON_EDGE_CHAIN_ID }]
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // @ts-ignore
        await web3Context.currentProvider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: Config.POLYGON_EDGE_CHAIN_ID,
              chainName: 'Trapesys Airways',
              rpcUrls: [Config.POLYGON_EDGE_API],
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
              }
            }
          ]
        });
      }
    }
  };

  const [tokenBalance, setTokenBalance] = useState<number>(0);

  useEffect(() => {
    getTokenBalance().then((balance) => {
      setTokenBalance(balance);
    });
  }, [web3Context, web3Account]);

  const getTokenBalance = async () => {
    if (web3Context && web3Account) {
      let contract = new web3Context.eth.Contract(
        MVPToken.abi as AbiItem[],
        Config.MVPT_ADDRESS,
        {
          from: web3Account
        }
      );

      return await contract.methods.balanceOf(web3Account).call();
    }

    return 0;
  };

  const renderUserInfo = (accountAddress: string) => {
    return (
      <Fragment>
        <Box
          display={'flex'}
          mr={1}
          style={{
            overflow: 'hidden',
            width: '120px'
          }}
        >
          <Typography className={'truncate'}>{accountAddress}</Typography>
        </Box>
      </Fragment>
    );
  };

  if (web3Account) {
    return (
      <div ref={anchorRef}>
        <BookingsModal
          open={bookingsModalOpen}
          setOpen={setBookingsModalOpen}
        />
        <Button
          onClick={handleToggle}
          color={'secondary'}
          variant={'contained'}
          className={'actionButtonBase'}
        >
          <Box className={classes.userMenuWrapper}>
            {renderUserInfo(web3Account)}
            {open ? (
              <KeyboardArrowUpRoundedIcon />
            ) : (
              <KeyboardArrowDownRoundedIcon />
            )}
          </Box>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom'
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    style={{
                      background: 'white',
                      borderRadius: '5px',
                      boxShadow: theme.palette.boxShadows.darker
                    }}
                  >
                    <MenuItem>
                      <Box display={'flex'} flexDirection={'column'}>
                        <Typography className={classes.balanceLabel}>
                          MVPT Balance
                        </Typography>
                        <Typography className={classes.balance}>
                          {`${tokenBalance} MVPT`}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <Divider variant={'middle'} />
                    <MenuItem
                      className={classes.userMenuItem}
                      onClick={() => {
                        setOpen(false);
                        setBookingsModalOpen(true);
                      }}
                    >
                      <Box display={'flex'}>
                        <MyBookings />
                        <Box ml={1}>My Bookings</Box>
                      </Box>
                    </MenuItem>
                    <MenuItem
                      className={classes.userMenuItem}
                      onClick={() => handleWeb3Disconnect()}
                    >
                      <Box display={'flex'}>
                        <Logout />
                        <Box ml={1}>Log out</Box>
                      </Box>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }

  return (
    <Box>
      <ActionButton
        text={'Log in'}
        square={true}
        startIcon={<PersonRoundedIcon />}
        onClick={() => handleLogin()}
      />
    </Box>
  );
};

export default UserMenu;

const useStyles = makeStyles((theme: Theme) => {
  return {
    userMenuWrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    userMenuItem: {
      fontFamily: 'Poppins',
      fontWeight: 500,
      fontSize: '0.875rem',
      color: 'black'
    },
    balanceLabel: {
      color: '#A4A4A4',
      fontSize: theme.typography.pxToRem(11)
    },
    balance: {
      fontWeight: 500,
      fontSize: '0.875rem'
    }
  };
});
