import React from 'react';
import PropTypes from 'prop-types';

import {connect} from '../store';
import {getError, hasBeenValidated} from '../store/reducers';

const ChloroformError = ({error, showError, component}) => {
  if (!error || error.size === 0 || !showError) {
    return null;
  }

  return React.createElement(component, {error});
};

ChloroformError.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  error: PropTypes.arrayOf(PropTypes.string),
  model: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  showError: PropTypes.bool,
};

const mapStateToProps = (state, {model}) => ({
  error: getError(state, model),
  showError: hasBeenValidated(state, model),
});

export default connect(mapStateToProps)(ChloroformError);
