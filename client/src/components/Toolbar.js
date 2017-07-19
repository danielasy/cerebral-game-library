import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { genresOpenDialog } from '../actions/genres';
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
            onTouchTap={this.props.handleOpen}
          />
          <FlatButton
            label='Adicionar plataforma'
            icon={<FontIcon className='material-icons'>videogame_asset</FontIcon>}
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
    handleOpen: () => dispatch(genresOpenDialog()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
