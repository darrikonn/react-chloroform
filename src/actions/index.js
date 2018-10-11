const camelCase = string => string.toLowerCase().replace(/(_\w)/g, m => m[1].toUpperCase());

const actionCreator = ({type, payload}) => dispatch =>
  dispatch({
    type,
    payload,
  });

const createActions = actions =>
  Object.keys(actions).reduce(
    (createdActions, type) => ({
      ...createdActions,
      [camelCase(type)]: (...args) => actionCreator({type, payload: actions[type](...args)}),
    }),
    {}
  );

export default createActions;
