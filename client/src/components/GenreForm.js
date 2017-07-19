import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, destroy } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';

const validate = values => {
  const errors = {};
  const requiredFields = ['name'];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Obrigatório';
    }
  });

  return errors;
};

class GenreForm extends React.Component {
  style = {
    field: {
      width: '100%',
    },
    form: {
      marginBottom: '20px',
    },
  }

  render() {
    return (
      <form
        onSubmit={
          this.props.handleSubmit(values => this.props.onSubmit(values.name))
        }
        style={this.style.form}
      >
        <Field name='name'
          component={TextField}
          hintText='Adicionar novo gênero de jogo...'
          style={this.style.field}
        />
        <RaisedButton
          label='Adicionar'
          primary={true}
          onTouchTap={this.props.handleSubmit(values => this.props.onSubmit(values.name))}
        />
      </form>
    );
  }
}

GenreForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

GenreForm = reduxForm({
  form: 'addGenre',
  onSubmitFail: (result, dispatch) => { dispatch(destroy('addGenre')) },
  onSubmitSuccess: (result, dispatch) => { dispatch(destroy('addGenre')) },
  validate,
})(GenreForm)

export default GenreForm;
