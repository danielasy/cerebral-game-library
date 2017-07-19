import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { genresOpenDialog } from '../actions/genres';
import { platformsOpenDialog } from '../actions/platforms';
import { Toolbar as CoreToolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

class Toolbar extends Component {
  render() {
    return (
      <CoreToolbar>
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle text='Cerebral' />
          <FlatButton
            label='Adicionar jogo'
            primary={true}
            icon={<FontIcon className='material-icons'>add_circle</FontIcon>}
          />
          <FlatButton
            label='Adicionar gênero'
            icon={<FontIcon className='material-icons'>games</FontIcon>}
            onTouchTap={this.props.handleOpenGenresDialog}
          />
          <FlatButton
            label='Adicionar plataforma'
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
    handleOpenGenresDialog: () => dispatch(genresOpenDialog()),
    handleOpenPlatformDialog: () => dispatch(platformsOpenDialog()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
