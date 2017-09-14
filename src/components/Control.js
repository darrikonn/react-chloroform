import {Component} from 'react';
import PropTypes from 'prop-types';

import {UPDATE_VALUE} from '../store/action-types';

class Control extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  static contextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func,
      dispatch: PropTypes.func,
      getState: PropTypes.func,
    }),
  };

  constructor(props, {store}) {
    super(props);

    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _onChange = (value) => {
    const {store} = this.context;
    store.dispatch({
      type: UPDATE_VALUE,
      payload: {
        name: this.props.name,
        value,
      },
    });
  };

  _getValue = () => this.context.store.getState().get(this.props.name);
}

export default Control;
