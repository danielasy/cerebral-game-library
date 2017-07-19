import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Toolbar from './Toolbar';
import GameDialog from './GameDialog';
import GenreDialog from './GenreDialog';
import PlatformDialog from './PlatformDialog';
import GameList from './GameList';
import PriceEstimate from './PriceEstimate';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className='app-container'>
          <Toolbar />
          <GameDialog />
          <GenreDialog />
          <PlatformDialog />
          <GameList />
          <PriceEstimate />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {};

export default App;
