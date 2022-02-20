import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import FlightRoundedIcon from '@material-ui/icons/FlightRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import { FC, Fragment, useState } from 'react';
import theme from '../../../theme/theme';
import { ETripType, ITripTypeSelectorProps } from './tripTypeSelector.types';

const TripTypeSelector: FC<ITripTypeSelectorProps> = (props) => {
  const { tripType, setTripType } = props;

  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTypeSelect = (tripType: ETripType) => {
    setTripType(tripType);

    handleClose();
  };

  return (
    <Fragment>
      <Box display={'flex'} alignItems={'center'}>
        <FlightRoundedIcon
          style={{
            transform: 'rotate(45deg)',
            fill: theme.palette.secondary.main
          }}
        />
        <Button
          color={'primary'}
          onClick={handleClick}
          endIcon={<KeyboardArrowDownRoundedIcon />}
        >
          <Typography className={'flightSearchDropdown'}>{tripType}</Typography>
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => handleTypeSelect(ETripType.ONE_WAY)}
            className={'flightSearchDropdown'}
          >
            {ETripType.ONE_WAY}
          </MenuItem>
          <MenuItem
            onClick={() => handleTypeSelect(ETripType.ROUND_TRIP)}
            className={'flightSearchDropdown'}
          >
            {ETripType.ROUND_TRIP}
          </MenuItem>
        </Menu>
      </Box>
    </Fragment>
  );
};

export default TripTypeSelector;
