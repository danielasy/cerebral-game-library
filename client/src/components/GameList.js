import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gamesFetchData } from '../actions/games';

class GameList extends Component {
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
      <ul>
        {this.props.games.map((game) => (
          <li key={game.id}>
            {game.title}
          </li>
        ))}
      </ul>
    );
  }
}

GameList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  hasFailedLoading: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    games: state.games,
    hasFailedLoading: state.gamesHasFailedLoading,
    isLoading: state.gamesIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(gamesFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
