import React from 'react';
import PropTypes from 'prop-types';
import ChipInput from 'material-ui-chip-input';

class PlatformInput extends React.Component {
  render() {
    return (
      <ChipInput
        hintText='PlayStation 4, Nintendo 3DS, PC...'
        floatingLabelText='Plataformas'
        floatingLabelFixed={true}
        onChange={values => this.props.onChange(values)}
        dataSource={this.props.platforms}
        openOnFocus
        fullWidth
      />
    );
  }
}

PlatformInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  platforms: PropTypes.array,
};

PlatformInput.defaultProps = {
  platforms: [],
};

export default PlatformInput;
