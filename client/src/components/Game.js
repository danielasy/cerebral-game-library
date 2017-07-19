import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

class Game extends Component {
  iconStyle = {
    fontSize: '24px',
    lineHeight: '24px',
    marginRight: '5px',
    veticalAlign: 'middle',
  }

  getPlatforms() {
    if (!this.props.platforms || !this.props.platforms.length) {
      return 'N/A';
    }

    return this.props.platforms.map(platform => platform.name).join(', ');
  }

  getGenres() {
    if (!this.props.genres || !this.props.genres.length) {
      return 'N/A';
    }

    return this.props.genres.map(genre => genre.name).join(', ');
  }

  getReleaseYear(dateString) {
    if (!dateString) {
      return 'N/A';
    }
    return dateString.split('-')[0];
  }

  renderGameInfo = () => {
    return (
      <article>
        <span className='game-info'>
          <FontIcon className='material-icons' style={this.iconStyle}>videogame_asset</FontIcon>
          {this.getPlatforms()}
        </span>
        <span className='game-info'>
          <FontIcon className='material-icons' style={this.iconStyle}>description</FontIcon>
          {this.getGenres()}
        </span>
        <span className='game-info'>
          <FontIcon className='material-icons' style={this.iconStyle}>attach_money</FontIcon>
          {this.props.price ? `R$ ${this.props.price}` : 'N/A'}
        </span>
        <span className='game-info'>
          <FontIcon className='material-icons' style={this.iconStyle}>date_range</FontIcon>
          Ano de lançamento: {this.getReleaseYear(this.props.release)}
        </span>
        <span className='game-info'>
          <FontIcon className='material-icons' style={this.iconStyle}>stars</FontIcon>
          {this.props.rating ? `${this.props.rating}/5` : 'N/A'}
        </span>
      </article>
    )
  }

  render() {
    return (
      <ListItem
        key={this.props.id}
      >
        <h1 className='game-title'>{this.props.title}</h1>
        {this.renderGameInfo()}
      </ListItem>
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
