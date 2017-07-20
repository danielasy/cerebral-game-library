import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import RatingStars from 'react-stars';

const style = {
  iconStyle: {
    fontSize: '24px',
    lineHeight: '24px',
    marginRight: '5px',
    veticalAlign: 'middle',
  },
};

class Game extends Component {
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

  getRating() {
    if (this.props.rating) {
      return (
        <span className='game-info'>
          <RatingStars
            count={5}
            size={16}
            color2={'#FDD835'}
            edit={false}
            value={this.props.rating}
          />
        </span>
      )
    }
  }

  renderGameInfo = () => {
    return (
      <article>
        <span className='game-info'>
          <FontIcon className='material-icons' style={style.iconStyle}>videogame_asset</FontIcon>
          {this.getPlatforms()}
        </span>
        <span className='game-info'>
          <FontIcon className='material-icons' style={style.iconStyle}>description</FontIcon>
          {this.getGenres()}
        </span>
        <span className='game-info'>
          <FontIcon className='material-icons' style={style.iconStyle}>attach_money</FontIcon>
          {this.props.price ? `R$ ${this.props.price}` : 'N/A'}
        </span>
        <span className='game-info'>
          <FontIcon className='material-icons' style={style.iconStyle}>date_range</FontIcon>
          Ano de lançamento: {this.getReleaseYear(this.props.release)}
        </span>
        {this.getRating()}
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
