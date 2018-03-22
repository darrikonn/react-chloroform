import React from 'react';
import PropTypes from 'prop-types';
import {withReactChloroform, ChloroformError} from 'react-chloroform';

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
      component={({error}) => <p style={{color: 'red', fontSize: '10px'}}>{error}</p>}
    />
  </div>;

MyInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  model: PropTypes.string.isRequired,
};

export default withReactChloroform(MyInput);
