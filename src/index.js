import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#33691e',
    },
    secondary: lightGreen,

  },
});


ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
    document.getElementById('root')
);


