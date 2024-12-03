declare namespace Module2 {
  interface Messages {
    "TEST-ASK": (v: number) => string
    "xippy": (v: number) => string | undefined
  }

  interface SubscriptionMessageTypes {
    [k: string]: (...args: any) => any;
    "TEST-SUB": (v: string) => void
  }
}