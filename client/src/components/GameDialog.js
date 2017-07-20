import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gamesFetchData, gamesCloseDialog, gamesAdd, gamesDelete } from '../actions/games';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import GameForm from './GameForm';

const apiUrl = '/api/games';

class GameDialog extends React.Component {
  render() {
    const dialogActions = [
      <FlatButton
        key='close'
        label='Fechar'
        onTouchTap={this.props.handleClose}
      />,
    ]

    return (
      <Dialog
        title='Adicionar Jogo'
        actions={dialogActions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.handleClose}
        autoScrollBodyContent={true}
      >
        <GameForm
          onSubmit={this.props.add}
          genres={this.props.genres}
          platforms={this.props.platforms}
        />
      </Dialog>
    );
  }
}

GameDialog.propTypes = {
  genres: PropTypes.array.isRequired,
  platforms: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  addHasFailed: PropTypes.bool.isRequired,
  deleteHasFailed: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    genres: state.genres,
    platforms: state.platforms,
    isOpen: state.gamesIsDialogOpen,
    addHasFailed: state.gamesAddHasFailed,
    deleteHasFailed: state.gamesDeleteHasFailed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleClose: () => dispatch(gamesCloseDialog()),
    add: game => dispatch(gamesAdd(game, apiUrl)),
    remove: id => dispatch(gamesDelete(id, apiUrl)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameDialog);
