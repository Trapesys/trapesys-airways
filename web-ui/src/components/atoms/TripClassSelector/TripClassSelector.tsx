import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';
import { FC, Fragment, useState } from 'react';
import theme from '../../../theme/theme';
import { ETripClass, ITripClassSelectorProps } from './tripClassSelector.types';

const TripClassSelector: FC<ITripClassSelectorProps> = (props) => {
  const { tripClass, setTripClass } = props;

  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClassSelect = (selectedClass: ETripClass) => {
    setTripClass(selectedClass);

    handleClose();
  };

  return (
    <Fragment>
      <Box display={'flex'} alignItems={'center'}>
        <LocalOfferRoundedIcon
          style={{
            fill: theme.palette.secondary.main
          }}
        />
        <Button
          color={'primary'}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownRoundedIcon />}
        >
          <Typography className={'flightSearchDropdown'}>
            {tripClass}
          </Typography>
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => handleClassSelect(ETripClass.ECONOMY)}
            className={'flightSearchDropdown'}
          >
            {ETripClass.ECONOMY}
          </MenuItem>
          <MenuItem
            onClick={() => handleClassSelect(ETripClass.BUSINESS)}
            className={'flightSearchDropdown'}
          >
            {ETripClass.BUSINESS}
          </MenuItem>
        </Menu>
      </Box>
    </Fragment>
  );
};

export default TripClassSelector;
