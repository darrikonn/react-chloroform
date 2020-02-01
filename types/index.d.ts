// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExplicitAny = any;

type Scalar = string | number | boolean;

type Primitive = boolean | null | undefined | number | bigint | string | symbol;

type ValueControl = {
  validateOn: string,
  validated: boolean,
  errors: string[],
  parseValue: Function,
};

type ScalarValue = ValueControl & {
  value: Scalar
};

type ObjectValue = ValueControl & {
  value: {[key: string]: ArrayValue | ObjectValue | ScalarValue}
};

type ArrayValue = ValueControl & {
  maxIndex: number,
  value: ArrayValue[] | ObjectValue[] | ScalarValue[]
};

declare namespace Store {
  type ControlState = {
    [key: string]: ScalarValue | ArrayValue | ObjectValue;
  };

  type FormState = {
    status?: string,
    initialized: boolean,
  };

  interface CombinedState {
    form: FormState;
    control: ControlState;
  }

  type Action = {
    type: string,
    payload: ExplicitAny,
  };
}
