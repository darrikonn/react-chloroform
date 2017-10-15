import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {updateValue} from '../actions/controls';
import {connect} from '../store';

class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      }),
    ).isRequired,
    style: PropTypes.string,
    initialValue: PropTypes.string,
    placeholder: PropTypes.string,
  };

  componentDidMount() {
    const {initialValue, name} = this.props;

    if (initialValue) {
      // this.props.updateValue(name, initialValue); TODO
    }
  }

  render() {
    const {className, id, name, style, placeholder} = this.props;

    const options = this.props.options.map(option => (
      <option key={option.value} value={option.value}>
        {option.name}
      </option>
    ));

    if (placeholder) {
      options.unshift(
        <option key={placeholder} value="" disabled>
          {placeholder}
        </option>,
      );
    }

    return (
      <select
        id={id}
        name={name}
        value={this.props.value || ""}
        className={className}
        style={style}
        onChange={e => this.props.updateValue(name, e.target.value)}
      >
        {options}
      </select>
    );
  }
}

const mapStateToProps = ({controls}, props) => ({
  value: controls.get(props.name),
});

const mapDispatchToProps = {
  updateValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Select);
