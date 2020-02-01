const camelCase = (str: string) => str.toLowerCase().replace(/(_\w)/g, m => m[1].toUpperCase());

const actionCreator = ({type, payload}: Store.Action) => (dispatch: Function) =>
  dispatch({
    type,
    payload,
  });

const createActions = (actions: {[key: string]: Function}): {[key: string]: Function} =>
  Object.keys(actions).reduce(
    (createdActions: {}, type: string) => ({
      ...createdActions,
      [camelCase(type)]: (...args: Store.Action[]) =>
        actionCreator({type, payload: actions[type](...args)}),
    }),
    {}
  );

export default createActions;
