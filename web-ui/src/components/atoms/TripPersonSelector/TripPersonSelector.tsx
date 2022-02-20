import { Box, Button, Menu, MenuItem, Typography } from '@material-ui/core';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { FC, Fragment, useState } from 'react';
import theme from '../../../theme/theme';
import { ITripPersonSelectorProps } from './tripPersonSelector.types';

const TripPersonSelector: FC<ITripPersonSelectorProps> = (props) => {
  const { personCount, setPersonCount } = props;

  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCountSelect = (count: number) => {
    setPersonCount(count);

    handleClose();
  };

  const renderPersonOutput = (count: number): string => {
    return `${count} ${count > 1 ? 'Adults' : 'Adult'}`;
  };

  return (
    <Fragment>
      <Box display={'flex'} alignItems={'center'}>
        <PersonRoundedIcon
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
            {renderPersonOutput(personCount)}
          </Typography>
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {[...Array(5)].map((x, i) => (
            <MenuItem
              key={`person-${i}`}
              onClick={() => handleCountSelect(i + 1)}
              className={'flightSearchDropdown'}
            >
              {renderPersonOutput(i + 1)}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Fragment>
  );
};

export default TripPersonSelector;
