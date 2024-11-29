interface AskMessageTypes {
}
interface SubscriptionMessageTypes {
}
export declare type MessageService = {
    Instance: {
        ask: <T extends keyof AskMessageTypes & string>(name: T, ...args: Parameters<AskMessageTypes[T]>) => Promise<ReturnType<AskMessageTypes[T]>>;
        reply: <T extends keyof AskMessageTypes & string>(name: T, cb: AskMessageTypes[T], opts?: {
            force: boolean;
        }) => () => void;
        send: <T extends keyof SubscriptionMessageTypes & string>(name: T, ...args: Parameters<SubscriptionMessageTypes[T]>) => void;
        subscribe: <T extends keyof SubscriptionMessageTypes & string>(name: T, cb: SubscriptionMessageTypes[T]) => () => void;
        once: <T extends keyof SubscriptionMessageTypes & string>(name: T, cb: SubscriptionMessageTypes[T]) => void;
        unsubscribe: <T extends keyof SubscriptionMessageTypes & string>(name: T, cb: SubscriptionMessageTypes[T]) => void;
    };
};
declare const ask: <T extends never>(name: T, ...args: Parameters<AskMessageTypes[T]>) => Promise<ReturnType<AskMessageTypes[T]>>;
declare const reply: <T extends never>(name: T, cb: AskMessageTypes[T], opts?: {
    force: boolean;
}) => () => void;
declare const send: <T extends never>(name: T, ...args: Parameters<SubscriptionMessageTypes[T]>) => void;
declare const subscribe: <T extends never>(name: T, cb: SubscriptionMessageTypes[T]) => () => void;
declare const once: <T extends never>(name: T, cb: SubscriptionMessageTypes[T]) => void;
declare const unsubscribe: <T extends never>(name: T, cb: SubscriptionMessageTypes[T]) => void;
export { ask, reply, send, subscribe, once, unsubscribe };
export declare const MessageService: MessageService;
