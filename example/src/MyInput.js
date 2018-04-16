import React from 'react';
import PropTypes from 'prop-types';
import {withReactChloroform} from 'react-chloroform';

const MyInput = ({model, chloroformStatus, value, onChange, startValidating, showError, error}) => (
  <div>
    {chloroformStatus === 'submitting' ? (
      <div>Submitting...</div>
    ) : (
      <div>
        <label htmlFor="myInput">Custom Input: </label>
        <input
          type="text"
          id="myInput"
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={startValidating}
        />
      </div>
    )}
    {showError &&
      error && (
        <div>
          <p style={{color: 'red', fontSize: '10px'}}>{error}</p>
        </div>
      )}
  </div>
);

MyInput.propTypes = {
  error: PropTypes.arrayOf(PropTypes.string),
  showError: PropTypes.bool,
  chloroformStatus: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  startValidating: PropTypes.func.isRequired,
  value: PropTypes.string,
  model: PropTypes.string.isRequired,
};

export default withReactChloroform(MyInput);
