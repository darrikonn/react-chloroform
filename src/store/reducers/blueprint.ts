// import {
//   MOUNT_MODEL,
// } from '../action-types';
// import {isNumber, getIn} from '../../utils';
//
// const constructBlueprint = (arr: string[], state: ExplicitAny = {}): ExplicitAny => {
//   if (arr.length == 0) {
//     return undefined;
//   } else if (arr[0] === "*" || isNumber(arr[0])) {
//     return {
//       ...state,
//       '*': {
//         length: Math.max(isNumber(arr[0]) ? parseInt(arr[0]) + 1 : 0, getIn(state, '*', 'length') || 0),
//         value: constructBlueprint(arr.slice(1), getIn(state, '*', 'value')),
//       }
//     };
//   } else {
//     if ('*' in state) {
//       if (process.env.NODE_ENV !== 'production') {
//         console.error("Usage Error!\nYou're mixing Arrays and Objects within the same model value");
//       }
//     }
//
//     return {
//       ...state,
//       [arr[0]]: constructBlueprint(arr.slice(1), state[arr[0]]),
//     } as ObjectValue;
//   }
// };
//
//
// export default (state: Store.BlueprintState = {}, action: Store.Action): Store.BlueprintState => {
//   const {payload} = action;
//   switch (action.type) {
//     case MOUNT_MODEL: {
//       const model = payload.model.split('.');
//       const x: ExplicitAny = {
//         ...state,
//         ...constructBlueprint(model, state),
//       };
//       console.log(x);
//       return x;
//     }
//     default:
//       return state;
//   }
// };
//
// export const getBlueprint = (state: Store.BlueprintState): Store.BlueprintState => state;
