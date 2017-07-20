import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gamesOpenDialog } from '../actions/games';
import { genresOpenDialog } from '../actions/genres';
import { platformsOpenDialog } from '../actions/platforms';
import { Toolbar as CoreToolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

class Toolbar extends Component {
  style = {
    toolbar: {
      paddingLeft: '7.5%',
      paddingRight: '7.5%',
    },
  }

  render() {
    return (
      <CoreToolbar style={this.style.toolbar}>
        <ToolbarGroup>
          <ToolbarTitle text='Cerebral' />
          <FlatButton
            label='Adicionar jogo'
            primary={true}
            icon={<FontIcon className='material-icons'>add_circle</FontIcon>}
            onTouchTap={this.props.handleOpenGamesDialog}
          />
          <FlatButton
            label='Gêneros'
            icon={<FontIcon className='material-icons'>games</FontIcon>}
            onTouchTap={this.props.handleOpenGenresDialog}
          />
          <FlatButton
            label='Plataformas'
            icon={<FontIcon className='material-icons'>videogame_asset</FontIcon>}
            onTouchTap={this.props.handleOpenPlatformDialog}
          />
        </ToolbarGroup>
      </CoreToolbar>
    );
  }
}

Toolbar.propTypes = {};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleOpenGamesDialog: () => dispatch(gamesOpenDialog()),
    handleOpenGenresDialog: () => dispatch(genresOpenDialog()),
    handleOpenPlatformDialog: () => dispatch(platformsOpenDialog()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
