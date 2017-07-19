import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gamesFetchData } from '../actions/games';
import { List } from 'material-ui/List';
import Game from './Game';

class GameList extends Component {
  style = {
    list: {
      paddingLeft: '10%',
      paddingRight: '10%',
    },
  }

  componentDidMount() {
    this.props.fetchData('http://localhost:5000/api/games');
  }

  render() {
    if (this.props.hasFailedLoading) {
      return <p>Desculpe, houve um problema ao tentar carregar seus jogos :(</p>;
    }

    if (this.props.isLoading) {
      return <p>Carregando seus jogos…</p>;
    }

    return (
      <List style={this.style.list}>
        {this.props.games.map((game) => (
          <Game
            key={game.id}
            id={game.id}
            title={game.title}
            price={game.price}
            release={game.release}
            genres={game.genres}
            platforms={game.platforms}
          />
        ))}
      </List>
    );
  }
}

GameList.propTypes = {
  games: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasFailedLoading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    games: state.games,
    isLoading: state.gamesIsLoading,
    hasFailedLoading: state.gamesLoadHasFailed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(gamesFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
