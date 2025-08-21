declare const _default: import('vue').DefineComponent<{
    id: {
        default: null;
    };
    type: {
        default: null;
        type: StringConstructor;
    };
    value: {
        default: null;
    };
    name: {
        type: StringConstructor;
        default: null;
    };
    names: {
        type: {
            (arrayLength: number): string[];
            (...items: string[]): string[];
            new (arrayLength: number): string[];
            new (...items: string[]): string[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
            fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: null;
    };
    group: {
        type: StringConstructor;
        default: null;
    };
    metadata: {
        type: ObjectConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    id: null;
    type: string;
    value: null;
    name: string;
    names: string[];
    group: string;
    metadata: Record<string, any>;
    disabled: boolean;
    readonly: boolean;
    click: (...args: any[]) => void;
    save: (...args: any[]) => void;
    Components: import('vue').ComputedRef<any[]>;
    Value: import('vue').WritableComputedRef<null>;
}, {}, {}, {}, import('vue/types/v3-component-options').ComponentOptionsMixin, import('vue/types/v3-component-options').ComponentOptionsMixin, {}, string, Readonly<import('vue').ExtractPropTypes<{
    id: {
        default: null;
    };
    type: {
        default: null;
        type: StringConstructor;
    };
    value: {
        default: null;
    };
    name: {
        type: StringConstructor;
        default: null;
    };
    names: {
        type: {
            (arrayLength: number): string[];
            (...items: string[]): string[];
            new (arrayLength: number): string[];
            new (...items: string[]): string[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
            fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>, index: number) => U, thisArg?: any): Promise<Awaited<U>[]>;
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: null;
    };
    group: {
        type: StringConstructor;
        default: null;
    };
    metadata: {
        type: ObjectConstructor;
        default: null;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    name: string;
    value: null;
    id: null;
    type: string;
    names: string[];
    group: string;
    metadata: Record<string, any>;
    disabled: boolean;
    readonly: boolean;
}>;
export default _default;
