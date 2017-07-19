import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PriceEstimate extends Component {
  getPriceEstimate(games) {
    return games
      .reduce((total, game) => {
        return total + (game.price !== null ? Number(game.price) : 0);
      }, 0)
      .toFixed(2);
  }

  render() {
    return (
      <section className='price-estimate'>
        O preço estimado da sua coleção é R$ {this.getPriceEstimate(this.props.games)}.
      </section>
    );
  }
}

PriceEstimate.propTypes = {
  games: PropTypes.array,
};

PriceEstimate.defaultProps = {
  games: [],
};

const mapStateToProps = (state) => {
  return {
    games: state.games,
  };
};

export default connect(mapStateToProps)(PriceEstimate);
