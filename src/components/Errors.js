import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import {connect} from '../store';
import {getError} from '../store/reducers';

const Errors = ({error, showErrors, component}) => {
  if (!error || error.size === 0 || !showErrors) {
    return null;
  }

  return React.createElement(component, {error});
};

Errors.propTypes = {
  model: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  component: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  error: PropTypes.instanceOf(Immutable.List),
  showErrors: PropTypes.bool,
};

const mapStateToProps = (state, {model}) => ({
  error: getError(state, model),
  showErrors: true,
});

export default connect(mapStateToProps)(Errors);
