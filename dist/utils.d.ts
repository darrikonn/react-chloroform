export declare const isString: (val: any) => boolean;
export declare const isObject: (obj: any) => boolean;
export declare const isArray: (arr: any) => boolean;
export declare const isNumber: (number: any) => boolean;
export declare const getIndex: (str: string) => string;
export declare const merge: (arr: [], value: Primitive, path: string) => string | number | bigint | boolean | symbol | any[] | null | undefined;
export declare const mergeDeep: (...objects: {
    [key: string]: any;
}[]) => {
    [key: string]: any;
};
export declare const getIn: (obj: {
    [key: string]: any;
}, ...path: string[]) => any;
export declare const arrayToObject: (array: [], value: string | number | boolean | []) => {};
export declare const fromDotProp: (name: string) => string;
