declare const _default: (state: {
    [key: string]: Store.FormState & Store.ControlState;
} | undefined, action: Store.Action) => {};
export default _default;
export declare const getFormStatus: (state: Store.CombinedState) => string;
export declare const canBeSubmitted: (state: Store.CombinedState) => boolean;
export declare const isFormInitialized: (state: Store.CombinedState) => boolean;
export declare const getError: (state: Store.CombinedState, model: string) => any;
export declare const getFormValues: (state: Store.CombinedState) => {};
export declare const getValue: (state: Store.CombinedState, model: string) => any;
export declare const hasBeenValidated: (state: Store.CombinedState, model: string) => any;
export declare const hasError: (state: Store.CombinedState, model: string) => boolean;
export declare const hasFormErrors: (state: Store.CombinedState) => boolean;
