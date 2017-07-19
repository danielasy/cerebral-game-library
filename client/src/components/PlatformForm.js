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

class PlatformForm extends React.Component {
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
          hintText='Adicionar nova plataforma de jogos...'
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

PlatformForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

PlatformForm = reduxForm({
  form: 'addPlatform',
  onSubmitFail: (result, dispatch) => { dispatch(destroy('addPlatform')) },
  onSubmitSuccess: (result, dispatch) => { dispatch(destroy('addPlatform')) },
  validate,
})(PlatformForm)

export default PlatformForm;
