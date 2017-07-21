import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gamesCloseDialog, gamesAdd, gamesDelete } from '../actions/games';
import { genresFetchData } from '../actions/genres';
import { platformsFetchData } from '../actions/platforms';
import Dialog from 'material-ui/Dialog';
import GameForm from './GameForm';

const apiUrl = 'http://localhost:5000/api/games';

class GameDialog extends React.Component {
  render() {
    return (
      <Dialog
        title='Adicionar Jogo'
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.handleClose}
        autoScrollBodyContent={true}
      >
        <GameForm
          onSubmit={this.props.add}
          genres={this.props.genres}
          platforms={this.props.platforms}
          fetchGenres={this.props.fetchGenres}
          fetchPlatforms={this.props.fetchPlatforms}
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
    fetchGenres: url => dispatch(genresFetchData(url)),
    fetchPlatforms: url => dispatch(platformsFetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameDialog);
