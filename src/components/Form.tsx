import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import controlActions from '../actions/controls';
import formActions from '../actions/form';
import {withNewLocalStore, connect} from '../store';
import reducers, {getFormValues, hasFormErrors} from '../store/reducers';

interface PropTypes {
  afterSubmitState?: {};
  children?: React.ReactNode;
  className?: string;
  hasFormErrors?: boolean;
  initialState?: {};
  initializeState: Function;
  onChange?: Function;
  onReset?: Function;
  onResetState?: {};
  onSubmit: Function;
  onSubmitFailed?: Function;
  resetSubmit: Function;
  resetValues: Function;
  setSubmitFailed: Function;
  setSubmitted: Function;
  setSubmitting: Function;
  showErrors: Function;
  style?: React.CSSProperties;
  values?: {};
}

function Form({
  afterSubmitState = {},
  children,
  className,
  hasFormErrors,
  initialState = {},
  initializeState,
  onChange = () => {},
  onReset = () => {},
  onResetState,
  onSubmit,
  onSubmitFailed = () => {},
  resetSubmit,
  resetValues,
  setSubmitFailed,
  setSubmitted,
  setSubmitting,
  showErrors,
  style,
  values,
}: PropTypes) {
  useEffect(() => {
    initializeState(initialState);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    onChange(event);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hasFormErrors) {
      showErrors();
      return;
    }

    // this.props.setPending(this.props.model);
    setSubmitting();
    Promise.resolve()
      .then(() => onSubmit(values))
      .then(() => {
        initializeState(afterSubmitState);
        setSubmitted();
      })
      .catch(err => {
        setSubmitFailed();
        onSubmitFailed(err);
      })
      .finally(() => resetSubmit());
  };

  const handleReset = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    resetValues(onResetState || initialState);
    onReset();
  };
  console.log("***", values);

  return (
    <form
      className={className}
      onChange={handleChange}
      onReset={handleReset}
      onSubmit={handleSubmit}
      style={style}
    >
      {children}
    </form>
  );
}

const mapStateToProps = (state: Store.CombinedState) => ({
  hasFormErrors: hasFormErrors(state),
  values: getFormValues(state),
});

const mapDispatchToProps = {
  initializeState: controlActions.initializeState,
  resetValues: controlActions.resetValues,
  setPending: controlActions.setPending,
  showErrors: controlActions.showErrors,

  resetSubmit: formActions.resetSubmit,
  setSubmitFailed: formActions.setSubmitFailed,
  setSubmitted: formActions.setSubmitted,
  setSubmitting: formActions.setSubmitting,
};

export default withNewLocalStore(reducers)(connect(mapStateToProps, mapDispatchToProps)(Form));
