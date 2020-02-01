declare const _default: (state: Store.ControlState | undefined, action: Store.Action) => Store.ControlState;
export default _default;
export declare const getError: (state: Store.ControlState, model: string) => any;
export declare const getValue: (state: Store.ControlState, model: string) => any;
export declare const getValues: (state: Store.ControlState) => {};
export declare const hasBeenValidated: (state: Store.ControlState, model: string) => any;
export declare const hasError: (state: Store.ControlState, model: string) => boolean;
export declare const hasErrors: (state: Store.ControlState) => boolean;
