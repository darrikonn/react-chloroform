import React, {memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import controlActions from '../actions/controls';
import formActions from '../actions/form';
import {withLocalStore, compose} from '../store';
import {getFormValues/*, hasFormErrors*/} from '../store/reducers';

interface PropTypes {
  afterSubmitState?: {};
  children?: React.ReactNode;
  className?: string;
  id?: string;
  initialState?: {};
  onChange?: (_: React.ChangeEvent<HTMLFormElement>) => void;
  onReset?: Function;
  onResetState?: {};
  onSubmit: Function;
  onSubmitFailed?: Function;
  style?: React.CSSProperties;
  validators?: {[key: string]: Function};
}

function Form({
  afterSubmitState,
  children,
  className,
  id,
  initialState = {},
  onChange = () => {},
  onReset = () => {},
  onResetState,
  onSubmit,
  onSubmitFailed = () => {},
  style,
  validators = {},
}: PropTypes) {
  // console.log('RENDERING: form');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(controlActions.initializeState(initialState, validators));
  }, []);
  const values = useSelector((state: Store.CombinedState) => getFormValues(state));

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (hasFormErrors) {
    //   showErrors();
    //   return;
    // }

    // this.props.setPending(this.props.model);
    // setSubmitting();
    Promise.resolve()
      .then(() => onSubmit(values))
      .then(() => {
        dispatch(controlActions.initializeState(afterSubmitState || initialState, validators));
        // setSubmitted();
      })
      .catch(err => {
        // setSubmitFailed();
        onSubmitFailed(err);
      })
      .finally(() => dispatch(formActions.resetSubmit()));
  };

  const handleReset = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(controlActions.initializeState(onResetState || initialState, validators));
    onReset();
  };

  return (
    <form
      className={className}
      onChange={onChange}
      onReset={handleReset}
      onSubmit={handleSubmit}
      style={style}
      id={id}
    >
      {children}
    </form>
  );
}

/*
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
*/

export default compose(
  withLocalStore(),
  memo,
)(Form);
