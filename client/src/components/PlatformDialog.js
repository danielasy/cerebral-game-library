import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { platformsFetchData, platformsCloseDialog, platformsAdd, platformsDelete } from '../actions/platforms';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import PlatformForm from './PlatformForm';

const apiUrl = 'http://localhost:5000/api/platforms';

class PlatformDialog extends React.Component {
  renderGenres() {
    if (this.props.hasFailedLoading) {
      return <p>Desculpe, houve um problema ao tentar carregar as plataformas :(</p>;
    }

    if (this.props.isLoading) {
      return <p>Carregando as plataformas…</p>;
    }

    return (
      <List>
        {this.props.platforms.map(platform => (
          <ListItem
            key={platform.id}
            primaryText={platform.name}
            rightIcon={<FontIcon className='material-icons'>delete</FontIcon>}
            onTouchTap={() => this.props.remove(platform.id)}
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
        title='Plataformas'
        actions={dialogActions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.handleClose}
        autoScrollBodyContent={true}
      >
        <PlatformForm onSubmit={this.props.add} />
        {this.renderGenres()}
      </Dialog>
    );
  }
}

PlatformDialog.propTypes = {
  platforms: PropTypes.array.isRequired,
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
    platforms: state.platforms,
    isLoading: state.platformsIsLoading,
    hasFailedLoading: state.platformsLoadHasFailed,
    isOpen: state.platformsIsDialogOpen,
    addHasFailed: state.platformsAddHasFailed,
    deleteHasFailed: state.platformsDeleteHasFailed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(platformsFetchData(url)),
    handleClose: () => dispatch(platformsCloseDialog()),
    add: (name) => dispatch(platformsAdd(name, apiUrl)),
    remove: (id) => dispatch(platformsDelete(id, apiUrl)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDialog);
