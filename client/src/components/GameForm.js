import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, destroy } from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';
import FlatButton from 'material-ui/FlatButton';
import RatingStars from 'react-stars';
import GenreInput from './GenreInput';
import PlatformInput from './PlatformInput';

const apiUrlGenres = 'http://localhost:5000/api/genres';
const apiUrlPlatforms = 'http://localhost:5000/api/platforms';

const validate = values => {
  const errors = {};
  const requiredFields = ['title'];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Obrigatório';
    }
  });

  return errors;
};

const style = {
  field: {
    width: '100%',
  },
  form: {
    marginBottom: '20px',
  },
  submitButton: {
    float: 'right',
  },
};

class GameForm extends React.Component {
  constructor() {
    super();
    this.state = {genres: [], platforms: [], rating: 0};
  }

  componentDidMount() {
    this.props.fetchGenres(apiUrlGenres);
    this.props.fetchPlatforms(apiUrlPlatforms);
  }

  onChangeGenres(genres) {
    this.setState(Object.assign({}, this.state, {genres}));
  }

  onChangePlatforms(platforms) {
    this.setState(Object.assign({}, this.state, {platforms}));
  }

  onChangeRating(rating) {
    this.setState(Object.assign({}, this.state, {rating}));
  }

  // Normalize genre, platoform and rating information before submitting form
  normalizeFormValues(formValues) {
    formValues.genres = [];
    formValues.newGenres = [];
    formValues.platforms = [];
    formValues.newPlatforms = [];

    // Verify which genres already exist
    for (let i = 0; i < this.state.genres.length; i++) {
      const registeredGenre = this.props.genres.find(genre => genre.name === this.state.genres[i]);

      if (registeredGenre) {
        formValues.genres.push(registeredGenre.id);
      } else {
        formValues.newGenres.push(this.state.genres[i]);
      }
    }

    // Verify which platforms already exist
    for (let i = 0; i < this.state.platforms.length; i++) {
      const registeredPlatform = this.props.platforms.find(platform => platform.name === this.state.platforms[i]);

      if (registeredPlatform) {
        formValues.platforms.push(registeredPlatform.id);
      } else {
        formValues.newPlatforms.push(this.state.platforms[i]);
      }
    }

    // Save rating only if set
    if (this.state.rating) {
      formValues.review = {rating: this.state.rating};
    }

    return formValues;
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(
          values => this.props.onSubmit(this.normalizeFormValues(values))
        )}
        style={style.form}
      >
        <Field name='title'
          component={TextField}
          hintText='Rocket League®'
          floatingLabelText='Título'
          floatingLabelFixed={true}
          style={style.field}
        />
        <GenreInput
          component={GenreInput}
          onChange={genres => this.onChangeGenres(genres)}
          genres={this.props.genres.map(genre => genre.name)}
        />
        <PlatformInput
          component={PlatformInput}
          onChange={platforms => this.onChangePlatforms(platforms)}
          platforms={this.props.platforms.map(platform => platform.name)}
        />
        <Field name='price'
          component={TextField}
          hintText='36.99'
          floatingLabelText='Preço'
          floatingLabelFixed={true}
          style={style.field}
        />
        <Field name='release'
          component={TextField}
          hintText='2015'
          floatingLabelText='Ano de Lançamento'
          floatingLabelFixed={true}
          style={style.field}
        />
        Avaliação
        <RatingStars
          count={5}
          size={24}
          color2={'#FDD835'}
          value={this.state.rating}
          onChange={value => this.onChangeRating(value)}
        />
        <FlatButton
          primary={true}
          label='Adicionar Jogo'
          onTouchTap={this.props.handleSubmit(
            values => this.props.onSubmit(this.normalizeFormValues(values))
          )}
          style={style.submitButton}
        />
      </form>
    );
  }
}

GameForm.propTypes = {
  genres: PropTypes.array.isRequired,
  platforms: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fetchGenres: PropTypes.func.isRequired,
  fetchPlatforms: PropTypes.func.isRequired,
};

GameForm = reduxForm({
  form: 'addGame',
  onSubmitFail: (result, dispatch) => { dispatch(destroy('addGame')) },
  onSubmitSuccess: (result, dispatch) => { dispatch(destroy('addGame')) },
  validate,
})(GameForm)

export default GameForm;
