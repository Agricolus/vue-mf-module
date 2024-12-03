export { }

declare namespace MessageService {
    type AnyFunction = (...args: any) => any;
    type ExtractMessageKey<T, k> = [T] extends [never] ? string : k extends keyof T ? k & string : never;
    type AskFunctionParameters<T, k> = [T] extends [never] ? [...any[]] : (k extends keyof T ? (T[k] extends AnyFunction ? Parameters<T[k]> : never) : [
        ...unknown[]
    ]);
    type AskFunctionReturnType<T, k> = [T] extends [never] ? Promise<any> : (k extends keyof T ? (T[k] extends ((...args: any) => infer U) ? Promise<Awaited<U>> : never) : never);
    type ReplyFunctionCbReturnType<T, k> = [T] extends [never] ? any : (k extends keyof T ? (T[k] extends ((...args: any) => infer U) ? U : never) : never);
    type ReplyFunctionCb<T, k> = (...args: [...AskFunctionParameters<T, k>]) => ReplyFunctionCbReturnType<T, k>;
    type SendFunctionParameters<T, k> = [T] extends [never] ? [...any[]] : (k extends keyof T ? T[k] extends Array<any> ? T[k] : [T[k]] : never);
    type AskFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, ...args: AskFunctionParameters<T, k>) => AskFunctionReturnType<T, k>;
    type ReplyFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, cb: ReplyFunctionCb<T, k>, opts?: {
        force: boolean;
    }) => () => void;
    type SendFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, ...args: SendFunctionParameters<T, k>) => void;
    type SubscribeFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, cb: (...args: SendFunctionParameters<T, k>) => void) => () => void;
    type OnceFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, cb: (...args: SendFunctionParameters<T, k>) => void) => void;
    type UnsubsribeFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, cb: (...args: SendFunctionParameters<T, k>) => void) => void;
    interface MessageService {
        Instance: {
            ask: AskFunction;
            reply: ReplyFunction;
            send: SendFunction;
            subscribe: SubscribeFunction;
            once: OnceFunction;
            unsubscribe: UnsubsribeFunction;
        };
    }
}