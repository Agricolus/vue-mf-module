declare namespace Module1 {
  interface Messages {
    "TEST-ASK": (v: string) => string;
    "TEST-ASK2": (v: number) => string[];
    "TEST-ASK3": (v: string[]) => boolean;
  }

  interface Subscriptions {
    "TEST-SUB": [string, number]
  }
}