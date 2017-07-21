import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';

class GenreInput extends React.Component {
  render() {
    return (
      <ChipInput
        hintText='Esporte, RPG, FPS...'
        floatingLabelText='Gêneros'
        floatingLabelFixed={true}
        onChange={values => this.props.onChange(values)}
        dataSource={this.props.genres}
        openOnFocus
        fullWidth
      />
    );
  }
}

GenreInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  genres: PropTypes.array,
};

GenreInput.defaultProps = {
  genres: [],
};

export default GenreInput;
