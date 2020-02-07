import React, {memo, useEffect} from 'react';

import controlActions from '../actions/controls';
import formActions from '../actions/form';
import {withLocalStore, connect, compose} from '../store';
import {getFormValues/*, hasFormErrors*/} from '../store/reducers';

interface PropTypes {
  afterSubmitState?: {};
  children?: React.ReactNode;
  className?: string;
  getValues: Function;
  // hasFormErrors?: boolean;
  id?: string;
  initialState?: {};
  initializeState: Function;
  onChange?: Function;
  onReset?: Function;
  onResetState?: {};
  onSubmit: Function;
  onSubmitFailed?: Function;
  resetSubmit: Function;
  // setSubmitFailed: Function;
  // setSubmitted: Function;
  // setSubmitting: Function;
  // showErrors: Function;
  style?: React.CSSProperties;
}

function Form({
  afterSubmitState,
  children,
  className,
  getValues,
  // hasFormErrors,
  id,
  initialState = {},
  initializeState,
  onChange = () => {},
  onReset = () => {},
  onResetState,
  onSubmit,
  onSubmitFailed = () => {},
  resetSubmit,
  // setSubmitFailed,
  // setSubmitted,
  // setSubmitting,
  // showErrors,
  style,
}: PropTypes) {
  console.log('RENDERING: form');
  useEffect(() => {
    initializeState(initialState);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    onChange(event);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (hasFormErrors) {
    //   showErrors();
    //   return;
    // }

    // this.props.setPending(this.props.model);
    // setSubmitting();
    Promise.resolve()
      .then(() => onSubmit(getValues()))
      .then(() => {
        initializeState(afterSubmitState || initialState);
        // setSubmitted();
      })
      .catch(err => {
        // setSubmitFailed();
        onSubmitFailed(err);
      })
      .finally(() => resetSubmit());
  };

  const handleReset = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    initializeState(onResetState || initialState);
    onReset();
  };

  return (
    <form
      className={className}
      onChange={handleChange}
      onReset={handleReset}
      onSubmit={handleSubmit}
      style={style}
      id={id}
    >
      {children}
    </form>
  );
}

const mapStateToProps = (state: Store.CombinedState) => ({
  // hasFormErrors: hasFormErrors(state),
  getValues: () => getFormValues(state),
});

const mapDispatchToProps = {
  initializeState: controlActions.initializeState,
  // setPending: controlActions.setPending,
  // showErrors: controlActions.showErrors,

  resetSubmit: formActions.resetSubmit,
  // setSubmitFailed: formActions.setSubmitFailed,
  // setSubmitted: formActions.setSubmitted,
  // setSubmitting: formActions.setSubmitting,
};

export default compose(
  withLocalStore(),
  connect(mapStateToProps, mapDispatchToProps),
  memo,
)(Form);
