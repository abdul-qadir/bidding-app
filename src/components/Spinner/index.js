import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  margin: '5% auto',
  padding: '5%',
  textAlign: 'center',
  display: 'inline-block',
};

export default () => (
  <MuiThemeProvider>
    <div style={style}>
      <CircularProgress size={100} thickness={10} />
    </div>
  </MuiThemeProvider>
);
