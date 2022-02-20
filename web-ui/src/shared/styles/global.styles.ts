import theme from '../../theme/theme';

export const globalStyles = {
  '@global': {
    html: {
      height: '100%'
    },
    body: {
      height: '100%',
      backgroundColor: theme.palette.custom.backgroundGray
    },
    '#root': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    '.pointer': {
      cursor: 'pointer'
    },
    '.ellipsis': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '.noDecoration': {
      '&:hover': {
        textDecoration: 'none'
      }
    },
    '.truncate': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    '.actionButtonBase': {
      fontFamily: 'Poppins',
      fontWeight: 500,
      padding: '8px 16px',
      borderRadius: '20px',
      boxShadow: 'none'
    },
    '.flightSearchDropdown': {
      fontFamily: 'Poppins',
      fontWeight: 400,
      fontSize: '1rem'
    },
    '.MuiPickersModal-dialogRoot': {
      fontFamily: 'Poppins'
    },
    '.MuiPickersToolbarText-toolbarTxt': {
      fontFamily: 'Poppins'
    },
    '.MuiPickersToolbar-toolbar': {
      backgroundColor: theme.palette.custom.navyBlue
    },
    '.MuiPickerDTTabs-tabs': {
      backgroundColor: theme.palette.custom.navyBlue
    },
    '.MuiPickersDay-daySelected': {
      backgroundColor: theme.palette.custom.navyBlue,

      '&:hover': {
        backgroundColor: theme.palette.custom.navyBlue
      }
    }
  }
};
