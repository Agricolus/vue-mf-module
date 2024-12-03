declare namespace MessageService {
  type AnyFunction = (...args: any) => any
  type ExtractMessageKey<T, k> = [T] extends [never] ? string : k extends keyof T ? k & string : never;

  type AskFunctionParameters<T, k> = [T] extends [never] ? [...any[]] :
    (k extends keyof T ?
      (T[k] extends AnyFunction ? Parameters<T[k]> : never) :
      [...unknown[]]);

  type AskFunctionReturnType<T, k> = [T] extends [never] ? Promise<any> :
    (k extends keyof T ?
      (T[k] extends ((...args: any) => infer U) ? Promise<Awaited<U>> : never) :
      never);

  type ReplyFunctionCbReturnType<T, k> = [T] extends [never] ? any :
    (k extends keyof T ?
      (T[k] extends ((...args: any) => infer U) ? U : never) :
      never);

  type ReplyFunctionCb<T, k> = (...args: [...AskFunctionParameters<T, k>]) => ReplyFunctionCbReturnType<T, k>

  type SendFunctionParameters<T, k> = [T] extends [never] ? [...any[]] :
    (k extends keyof T ? T[k] extends Array<any> ? T[k] : [T[k]] : never);


  type AskFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, ...args: AskFunctionParameters<T, k>) => AskFunctionReturnType<T, k>;
  type ReplyFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, cb: ReplyFunctionCb<T, k>, opts?: { force: boolean }) => () => void;
  type SendFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, ...args: SendFunctionParameters<T, k>) => void;
  type SubscribeFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, cb: (...args: SendFunctionParameters<T, k>) => void) => () => void;
  type OnceFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, cb: (...args: SendFunctionParameters<T, k>) => void) => void;
  type UnsubsribeFunction = <T = never, k = keyof T & string>(name: ExtractMessageKey<T, k>, cb: (...args: SendFunctionParameters<T, k>) => void) => void;

  interface MessageService {
    Instance: {
      ask: AskFunction,//<T extends keyof AskMessageTypes & string>(name: T, ...args: Parameters<AskMessageTypes[T]>) => Promise<Awaited<ReturnType<AskMessageTypes[T]>>>;
      reply: ReplyFunction,
      send: SendFunction,
      subscribe: SubscribeFunction,
      once: OnceFunction
      unsubscribe: UnsubsribeFunction
    };
  }
}


const askReplyChannels = new Map<string, MessageChannel>();
const sendSubscribeChannels = new Map<string, MessageChannel>();
const sendSubscribeCallbacks = new Map<Function, (...args: any[]) => any>();

// const ask: AskFunction = <T extends keyof AskMessageTypes & string>(name: T, ...args: Parameters<AskMessageTypes[T]>): Promise<Awaited<ReturnType<AskMessageTypes[T]>>> => {
//@ts-expect-error
const ask: MessageService.AskFunction = (name, ...args) => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject("timeout for message " + name);
    }, 30000);
    let askPort = askReplyChannels.get(name)?.port1
    if (!askPort) {
      const c = new MessageChannel();
      askReplyChannels.set(name, c);
      askPort = c.port1
    }
    let replyChannel = new MessageChannel();
    const l = (evt: MessageEvent) => {
      clearTimeout(timeout);
      resolve(evt.data);
      replyChannel = null!;
    }
    replyChannel.port1.onmessage = l;
    askPort.postMessage(args, [replyChannel.port2]);
  });
}

// const reply = <T extends keyof AskMessageTypes & string>(name: T, cb: AskMessageTypes[T], opts: { force: boolean } = { force: false }) => {
const reply: MessageService.ReplyFunction = (name, cb, opts = { force: false }) => {
  if (typeof cb !== "function") throw "reply callback for message " + name + " is not a function";
  let askingPort = askReplyChannels.get(name)?.port2
  if (!askingPort) {
    const c = new MessageChannel();
    askReplyChannels.set(name, c);
    askingPort = c.port2
  }
  if (!opts.force && askingPort.onmessage) throw "reply already set for message " + name
  const l = async (evt: MessageEvent) => {
    const replyPort = evt.ports[0]
    const r = await cb(...evt.data);
    replyPort.postMessage(r);
    replyPort.close();
  }
  askingPort.onmessage = l;
  return () => {
    askingPort!.onmessage = null!;
  }
}

// const send = <T extends keyof SubscriptionMessageTypes & string>(name: T, ...args: Parameters<SubscriptionMessageTypes[T]>) => {
const send: MessageService.SendFunction = (name, ...args) => {
  let port = sendSubscribeChannels.get(name)?.port1
  if (!port) {
    const c = new MessageChannel();
    sendSubscribeChannels.set(name, c);
    port = c.port1
  }
  port.postMessage(args);
}

const subscribe: MessageService.SubscribeFunction = (name: string, cb: (...args: any[]) => any) => {
  if (typeof cb !== "function") throw "reply callback for message " + name + " is not a function";
  let port = sendSubscribeChannels.get(name)?.port2
  if (!port) {
    const c = new MessageChannel();
    sendSubscribeChannels.set(name, c);
    port = c.port2
  }
  const l = (evt: MessageEvent) => {
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

// const once = <T extends keyof SubscriptionMessageTypes & string>(name: T, cb: SubscriptionMessageTypes[T]) => {
const once: MessageService.OnceFunction = (name, cb) => {
  if (typeof cb !== "function") throw "reply callback for message " + name + " is not a function";
  const unsubscribe = subscribe(name, (...args) => {
    cb(...args);
    unsubscribe();
  });
}

const unsubscribe: MessageService.UnsubsribeFunction = (name: string, cb) => {
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

export const MessageService: MessageService.MessageService = {
  Instance: {
    ask,
    reply,
    send,
    subscribe,
    once,
    unsubscribe
  }
}