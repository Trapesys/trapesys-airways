import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import './App.css';
import Homepage from './components/pages/Homepage/Homepage';
import { globalStyles } from './shared/styles/global.styles';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Homepage />
    </ThemeProvider>
  );
}

export default withStyles(globalStyles)(App);
