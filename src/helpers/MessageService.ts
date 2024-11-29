interface AskMessageTypes {
}
interface SubscriptionMessageTypes {
}

export type MessageService = {
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


const askReplyChannels = new Map<string, MessageChannel>();
const sendSubscribeChannels = new Map<string, MessageChannel>();
const sendSubscribeCallbacks = new Map<Function, (...args: any[]) => any>();

const ask = <T extends keyof AskMessageTypes & string>(name: T, ...args: Parameters<AskMessageTypes[T]>): Promise<ReturnType<AskMessageTypes[T]>> => {
  return new Promise(resolve => {
    let port = askReplyChannels.get(name)?.port1
    if (!port) {
      const c = new MessageChannel();
      askReplyChannels.set(name, c);
      port = c.port1
    }
    let innerchannel = new MessageChannel();
    const l = (evt: MessageEvent) => {
      resolve(evt.data);
      innerchannel = null!;
    }
    innerchannel.port1.onmessage = l;
    port.postMessage(args, [innerchannel.port2]);
  });
}

const reply = <T extends keyof AskMessageTypes & string>(name: T, cb: AskMessageTypes[T], opts: { force: boolean } = { force: false }) => {
  if (typeof cb !== "function") throw "reply callback for message " + name + " is not a function";
  let port = askReplyChannels.get(name)?.port2
  if (!port) {
    const c = new MessageChannel();
    askReplyChannels.set(name, c);
    port = c.port2
  }
  if (!opts.force && port.onmessage) throw "reply already set for message " + name
  const l = async (evt: MessageEvent) => {
    const innerport = evt.ports[0]
    //@ts-expect-error
    const r = await cb(...evt.data);
    innerport.postMessage(r);
    innerport.close();
  }
  port.onmessage = l;
  return () => {
    port!.onmessage = null!;
  }
}

const send = <T extends keyof SubscriptionMessageTypes & string>(name: T, ...args: Parameters<SubscriptionMessageTypes[T]>) => {
  let port = sendSubscribeChannels.get(name)?.port1
  if (!port) {
    const c = new MessageChannel();
    sendSubscribeChannels.set(name, c);
    port = c.port1
  }
  port.postMessage(args);
}

const subscribe = <T extends keyof SubscriptionMessageTypes & string>(name: T, cb: SubscriptionMessageTypes[T]) => {
  if (typeof cb !== "function") throw "reply callback for message " + name + " is not a function";
  let port = sendSubscribeChannels.get(name)?.port2
  if (!port) {
    const c = new MessageChannel();
    sendSubscribeChannels.set(name, c);
    port = c.port2
  }
  const l = (evt: MessageEvent) => {
    //@ts-expect-error
    cb(...evt.data);
  }
  sendSubscribeCallbacks.set(cb, l);
  port.addEventListener("message", l);
  port.start();
  return () => {
    port?.removeEventListener("message", l);
    sendSubscribeCallbacks.delete(cb);
  }
}

const once = <T extends keyof SubscriptionMessageTypes & string>(name: T, cb: SubscriptionMessageTypes[T]) => {
  if (typeof cb !== "function") throw "reply callback for message " + name + " is not a function";
  //@ts-expect-error
  const unsubscribe = subscribe(name, (...args: unknown[]) => {
    //@ts-expect-error
    cb(...args);
    unsubscribe();
  });
}

const unsubscribe = <T extends keyof SubscriptionMessageTypes & string>(name: T, cb: SubscriptionMessageTypes[T]) => {
  let port = sendSubscribeChannels.get(name)?.port2
  if (!port) return;
  const l = sendSubscribeCallbacks.get(cb);
  if (l) {
    port.removeEventListener("message", l);
    sendSubscribeCallbacks.delete(cb);
  }
}

export {
  ask,
  reply,
  send,
  subscribe,
  once,
  unsubscribe
}

export const MessageService: MessageService = {
  Instance: {
    ask,
    reply,
    send,
    subscribe,
    once,
    unsubscribe
  }
}