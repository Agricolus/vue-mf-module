declare const ask: <T extends string>(name: T, ...args: any[]) => Promise<any>;
declare const reply: <T extends string>(name: T, cb: (...args: any[]) => any, opts?: {
    force: boolean;
}) => () => void;
declare const send: <T extends string>(name: T, ...args: any[]) => void;
declare const subscribe: <T extends string>(name: T, cb: (...args: any[]) => any) => () => void;
declare const once: <T extends string>(name: T, cb: (...args: any[]) => any) => void;
declare const unsubscribe: <T extends string>(name: T, cb: (...args: any[]) => any) => void;
export { ask, reply, send, subscribe, once, unsubscribe };
export declare const MessageService: MessageService;
export interface AskMessageTypes {
    [name: string]: (...args: any[]) => any;
}
export interface SubscriptionMessageTypes {
    [name: string]: (...args: any[]) => any;
}
export declare type MessageService = {
    Instance: {
        ask: <T extends keyof AskMessageTypes & string>(name: T, ...parameters: Parameters<AskMessageTypes[T]>) => Promise<ReturnType<AskMessageTypes[T]>>;
        reply: <T extends keyof AskMessageTypes & string>(name: T, cb: AskMessageTypes[T], opts?: {
            force: boolean;
        }) => () => void;
        send: <T extends keyof SubscriptionMessageTypes & string>(name: T, ...args: Parameters<SubscriptionMessageTypes[T]>) => void;
        subscribe: <T extends keyof SubscriptionMessageTypes & string>(name: T, cb: SubscriptionMessageTypes[T]) => () => void;
        once: <T extends keyof SubscriptionMessageTypes & string>(name: T, cb: SubscriptionMessageTypes[T]) => void;
        unsubscribe: <T extends keyof SubscriptionMessageTypes & string>(name: T, cb: SubscriptionMessageTypes[T]) => void;
    };
};
