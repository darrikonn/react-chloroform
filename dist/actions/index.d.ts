declare const createActions: (actions: {
    [key: string]: Function;
}) => {
    [key: string]: Function;
};
export default createActions;
