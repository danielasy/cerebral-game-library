import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Toolbar from './Toolbar';
import GenreDialog from './GenreDialog';
import GameList from './GameList';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className='app-container'>
          <Toolbar />
          <GenreDialog />
          <GameList />
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {};

export default App;
