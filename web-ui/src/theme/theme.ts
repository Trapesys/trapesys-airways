import { createTheme, Theme } from '@material-ui/core/styles';

// Create a theme instance
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '#777',
      contrastText: '#FFF'
    },
    text: {
      primary: '#101010',
      secondary: '#9A9FA5'
    },
    background: {
      default: '#FFF'
    },
    error: {
      main: '#f53b56'
    },
    custom: {
      navyBlue: '#0D1C52',
      crayolaOrange: '#FF5A5F',
      darkWhite: '#FDFDFD',
      backgroundGray: '#F5F5F5'
    },
    boxShadows: {
      main: '1px 3px 6px 0px rgba(128,142,155,0.1)',
      darker: '1px 3px 6px 0px rgba(128,142,155,0.3)'
    }
  }
});

export default theme;
