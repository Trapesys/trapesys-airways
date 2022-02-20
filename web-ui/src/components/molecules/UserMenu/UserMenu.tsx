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
import { FC, Fragment, useRef, useState } from 'react';
import { ReactComponent as MyBookings } from '../../../shared/assets/icons/airplane_ticket_black_24dp.svg';
import { ReactComponent as Logout } from '../../../shared/assets/icons/logout_black_24dp.svg';
import ActionButton from '../../atoms/ActionButton/ActionButton';
import { IUserMenuProps } from './userMenu.types';

const UserMenu: FC<IUserMenuProps> = () => {
  // TODO: Temporary state management until we connect Metamask
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const classes = useStyles();

  const handleToggle = () => {
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

  const renderUserInfo = () => {
    return (
      <Fragment>
        <Box display={'flex'} mr={1}>
          {
            // TODO grab the address from the injected provider
          }
          <Typography>0x2bc2a4a...</Typography>
        </Box>
      </Fragment>
    );
  };

  if (isLoggedIn) {
    return (
      <div ref={anchorRef}>
        <Button
          onClick={handleToggle}
          color={'secondary'}
          variant={'contained'}
          className={'actionButtonBase'}
        >
          <Box className={classes.userMenuWrapper}>
            {renderUserInfo()}
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
                      boxShadow: 'none'
                    }}
                  >
                    <MenuItem>
                      <Box display={'flex'} flexDirection={'column'}>
                        <Typography className={classes.balanceLabel}>
                          MVPT Balance
                        </Typography>
                        <Typography className={classes.balance}>
                          {`${0} MVPT`}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <Divider variant={'middle'} />
                    <MenuItem
                      className={classes.userMenuItem}
                      onClick={() => {
                        setOpen(false);
                        // TODO implement modal opens
                      }}
                    >
                      <Box display={'flex'}>
                        <MyBookings />
                        <Box ml={1}>My Bookings</Box>
                      </Box>
                    </MenuItem>
                    <MenuItem
                      className={classes.userMenuItem}
                      onClick={() => {
                        // TODO implement logout
                      }}
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
