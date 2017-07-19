import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Toolbar from './Toolbar';
import GenreDialog from './GenreDialog';
import PlatformDialog from './PlatformDialog';
import GameList from './GameList';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className='app-container'>
          <Toolbar />
          <GenreDialog />
          <PlatformDialog />
          <GameList />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {};

export default App;
