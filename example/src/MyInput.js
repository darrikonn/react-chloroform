import React from 'react';
import PropTypes from 'prop-types';
import {withReactChloroform, ChloroformError} from 'react-chloroform';

class Errors extends React.Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
  };

  render() {
    const {error} = this.props;

    return (
      <p style={{color: 'red', fontSize: '10px'}}>{error}</p>
    );
  }
}

const MyInput = ({model, value, onChange}) =>
  <div>
    <label htmlFor="myInput">Custom Input: </label>
    <input
      type="text"
      id="myInput"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <ChloroformError
      model={model}
      component={Errors}
    />
  </div>;

MyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  model: PropTypes.string.isRequired,
};

export default withReactChloroform(MyInput);