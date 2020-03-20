import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector, Provider} from 'react-redux';

import controlActions from '../actions/controls';
import formActions from '../actions/form';
import reducers, {getFormValues/*, hasFormErrors*/} from '../store/reducers';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

interface PropTypes {
  afterSubmitState?: {} | undefined;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  initialState?: {};
  onChange?: (_: React.ChangeEvent<HTMLFormElement>) => void;
  onReset?: Function;
  onResetState?: {} | undefined;
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
    event.stopPropagation();

    // if (hasFormErrors) {
    //   showErrors();
    //   return;
    // }

    // this.props.setPending(this.props.model);
    // setSubmitting();
    Promise.resolve()
      .then(() => onSubmit(values))
      .then(() => {
        if (afterSubmitState && false) {
          dispatch(controlActions.initializeState(afterSubmitState, validators));
        }
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
    event.stopPropagation();

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

function StoreProvider(props: PropTypes) {
  const [store] = useState(createStore(reducers, applyMiddleware(thunk)));

  return (
    <Provider store={store}>
      <Form {...props as PropTypes} />
    </Provider>
  );
}

export default StoreProvider;
