import React from 'react';
interface PropTypes {
    type?: 'button' | 'reset' | 'submit';
    text: string;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    onClick?: () => void;
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
