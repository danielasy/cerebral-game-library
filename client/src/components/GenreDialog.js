import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { genresFetchData, genresCloseDialog, genresAdd, genresDelete } from '../actions/genres';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import GenreForm from './GenreForm';

const apiUrl = '/api/genres';

class GenreDialog extends React.Component {
  renderGenres() {
    if (this.props.hasFailedLoading) {
      return <p>Desculpe, houve um problema ao tentar carregar os gêneros :(</p>;
    }

    if (this.props.isLoading) {
      return <p>Carregando os gêneros…</p>;
    }

    return (
      <List>
        {this.props.genres.map(genre => (
          <ListItem
            key={genre.id}
            primaryText={genre.name}
            rightIcon={<FontIcon className='material-icons'>delete</FontIcon>}
            onTouchTap={() => this.props.remove(genre.id)}
          />))}
      </List>
    );
  }

  componentDidMount() {
    this.props.fetchData(apiUrl);
  }

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
        title='Gêneros'
        actions={dialogActions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.handleClose}
        autoScrollBodyContent={true}
      >
        <GenreForm onSubmit={this.props.add} />
        {this.renderGenres()}
      </Dialog>
    );
  }
}

GenreDialog.propTypes = {
  genres: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasFailedLoading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
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
    isLoading: state.genresIsLoading,
    hasFailedLoading: state.genresLoadHasFailed,
    isOpen: state.genresIsDialogOpen,
    addHasFailed: state.genresAddHasFailed,
    deleteHasFailed: state.genresDeleteHasFailed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(genresFetchData(url)),
    handleClose: () => dispatch(genresCloseDialog()),
    add: (name) => dispatch(genresAdd(name, apiUrl)),
    remove: (id) => dispatch(genresDelete(id, apiUrl)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenreDialog);
