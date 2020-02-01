import React from 'react';
import PropTypes from 'prop-types';
import { BLUR, FOCUS, INPUT, MOUNT } from '../constants/events';
interface PropTypes {
    autoFocus?: boolean;
    className?: string;
    cols?: number;
    disabled?: boolean;
    hasError: boolean;
    id?: string;
    isValidated: boolean;
    model: string;
    mountModel: Function;
    onChange: Function;
    parseValue: Function;
    placeholder?: string;
    rows?: number;
    setValidated: Function;
    setValue: Function;
    style?: React.CSSProperties;
    validateOn?: typeof BLUR | typeof FOCUS | typeof INPUT | typeof MOUNT;
    value?: string | number;
}
declare const _default: {
    new (props: PropTypes, { store }: {
        store: import("../store").ContextStore;
    }): {
        unsubscribe: Function;
        store: import("../store").ContextStore;
        componentWillUnmount(): void;
        mapStateToProps: () => any;
        mapDispatchToProps: () => {};
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<PropTypes>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<PropTypes> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<PropTypes>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<PropTypes>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<PropTypes>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<PropTypes>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<PropTypes>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<PropTypes>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<PropTypes>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextTypes: {
        store: import("../store").ContextStore;
    };
    contextType?: React.Context<any> | undefined;
};
export default _default;
