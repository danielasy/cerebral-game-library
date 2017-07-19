import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, destroy } from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import RatingStars from 'react-stars';

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
};

class GameForm extends React.Component {
  constructor() {
    super();
    this.state = {rating: 0};
  }

  onChangeRating(value) {
    this.setState({rating: value});
  }

  normalizeFormValues(values) {
    const keys = Object.keys(values);
    const length = keys.length;
    values.genres = [];
    values.platforms = [];

    for (let i = 0; i < length; i++) {
      if (keys[i].includes('genres-')) {
        values.genres.push(keys[i].split('-')[1]);
      }
      if (keys[i].includes('platforms-')) {
        values.platforms.push(keys[i].split('-')[1]);
      }
    }

    if (this.state.rating) {
      values.review = {rating: this.state.rating};
    }

    return values;
  }

  renderGenres() {
    return this.props.genres.map((genre, i) =>{
      return (
        <Field
          key={genre.id}
          name={`genres-${genre.id}`}
          component={Checkbox}
          label={genre.name}
        />
      )
    })
  }

  renderPlatforms() {
    return this.props.platforms.map((platform, i) =>{
      return (
        <Field
          key={platform.id}
          name={`platforms-${platform.id}`}
          component={Checkbox}
          label={platform.name}
          value={platform.id.toString()}
        />
      )
    })
  }

  render() {
    return (
      <form
        onSubmit={
          this.props.handleSubmit(
            values => this.props.onSubmit(this.normalizeFormValues(values))
          )
        }
        style={style.form}
      >
        <Field name='title'
          component={TextField}
          hintText='Rocket League®'
          floatingLabelText='Título'
          floatingLabelFixed={true}
          style={style.field}
        />
        Gêneros
        {this.renderGenres()}
        Plataformas
        {this.renderPlatforms()}
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
          value={this.state.ratng}
          onChange={value => this.onChangeRating(value)}
        />
        <RaisedButton
          label='Adicionar'
          primary={true}
          onTouchTap={
            this.props.handleSubmit(
              values => this.props.onSubmit(this.normalizeFormValues(values))
            )
          }
        />
      </form>
    );
  }
}

GameForm.propTypes = {
  genres: PropTypes.array.isRequired,
  platforms: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

GameForm = reduxForm({
  form: 'addGame',
  onSubmitFail: (result, dispatch) => { dispatch(destroy('addGame')) },
  onSubmitSuccess: (result, dispatch) => { dispatch(destroy('addGame')) },
  validate,
})(GameForm)

export default GameForm;
