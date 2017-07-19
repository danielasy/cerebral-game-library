import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

class Game extends Component {
  iconStyle = {
    fontSize: '24px',
    lineHeight: '24px',
    veticalAlign: 'middle',
  }

  getReleaseYear = (dateString) => {
    if (!dateString) {
      return 'N/A';
    }
    return dateString.split('-')[0];
  }

  renderGameInfo = () => {
    return (
      <p>
        <span className='game-info'><FontIcon className='material-icons' style={this.iconStyle}>videogame_asset</FontIcon> Plataformas</span>
        <span className='game-info'><FontIcon className='material-icons' style={this.iconStyle}>attach_money</FontIcon> R$ {this.props.price}</span>
        <span className='game-info'><FontIcon className='material-icons' style={this.iconStyle}>date_range</FontIcon> Ano de lançamento: {this.getReleaseYear(this.props.release)}</span>
      </p>
    )
  }

  render() {
    return (
      <ListItem
        key={this.props.id}
        primaryText={this.props.title}
        secondaryText={this.renderGameInfo()}
        secondaryTextLines={2}
        nestedItems={[<p>Review</p>]}
      />
    );
  }
}

Game.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string,
  release: PropTypes.string,
};

Game.defaultProps = {
  price: 0,
  release: '',
};

export default Game;
