import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gamesOpenDialog } from '../actions/games';
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
