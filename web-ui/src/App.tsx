import MomentUtils from '@date-io/moment';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import './App.css';
import SearchContext, { ISearchContext } from './context/SearchContext';
import { IFlightSearchParams } from './context/searchContext.types';
import AppRouter from './router/AppRouter';
import { globalStyles } from './shared/styles/global.styles';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  const [flightSearchParams, setFlightSearchParams] =
    useState<IFlightSearchParams | null>(null);

  const searchContextValue: ISearchContext = {
    flightSearchParams,
    setFlightSearchParams
  };

  return (
    <SearchContext.Provider value={searchContextValue}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ThemeProvider>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </SearchContext.Provider>
  );
}

export default withStyles(globalStyles)(App);
