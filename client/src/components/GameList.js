import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gamesFetchData, gamesSort } from '../actions/games';
import { List } from 'material-ui/List';
import Game from './Game';
import GameListToolbar from './GameListToolbar';
import { getPriceEstimate } from '../helpers/price';

class GameList extends Component {
  style = {
    list: {
      paddingLeft: '7.5%',
      paddingRight: '7.5%',
    },
  };

  componentDidMount() {
    this.props.fetchData('/api/games');
  }

  render() {
    if (this.props.hasFailedLoading) {
      return (
        <section className='game-list'>
          <div className='game-list-message'>
            Desculpe, houve um problema ao tentar carregar seus jogos :(
          </div>
        </section>
      );
    }

    if (this.props.isLoading) {
      return (
        <section className='game-list'>
          <div className='game-list-message'>
            Carregando seus jogos…
          </div>
        </section>
      );
    }

    return (
      <section className='game-list'>
        <GameListToolbar
          sortBy={this.props.sortBy}
          handleSortByChange={this.props.handleSortByChange}
          priceEstimate={getPriceEstimate(this.props.games)}
        />
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
              rating={game.Review ? game.Review.rating : 0}
            />
          ))}
        </List>
      </section>
    );
  }
}

GameList.propTypes = {
  games: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasFailedLoading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  handleSortByChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    games: state.games,
    isLoading: state.gamesIsLoading,
    hasFailedLoading: state.gamesLoadHasFailed,
    sortBy: state.gamesSortBy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: url => dispatch(gamesFetchData(url)),
    handleSortByChange: (event, index, sortBy) => dispatch(gamesSort(sortBy)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
