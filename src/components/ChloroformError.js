import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import {connect} from '../store';
import {getError} from '../store/reducers';

const ChloroformError = ({error, showError, component}) => {
  if (!error || error.size === 0 || !showError) {
    return null;
  }

  return React.createElement(component, {error});
};

ChloroformError.propTypes = {
  model: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  error: PropTypes.instanceOf(Immutable.List),
  showError: PropTypes.bool,
};

const mapStateToProps = (state, {model}) => ({
  error: getError(state, model),
  showError: true,
});

export default connect(mapStateToProps)(ChloroformError);
