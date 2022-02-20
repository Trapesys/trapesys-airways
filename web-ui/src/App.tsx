import MomentUtils from '@date-io/moment';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import './App.css';
import Homepage from './components/pages/Homepage/Homepage';
import { globalStyles } from './shared/styles/global.styles';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ThemeProvider>
        <CssBaseline />
        <Homepage />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default withStyles(globalStyles)(App);
