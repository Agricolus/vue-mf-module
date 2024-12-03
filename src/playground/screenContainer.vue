<template>
  <div>
    <div style="border: 1px solid rebeccapurple;">
      <button @click="project">project</button>
      <button @click="projectAsync">project async</button>
      <button @click="stopproject">stop projecting</button>
      <h1>below is the screen</h1>
      <screen></screen>
    </div>
    <div style="border: 1px solid fuchsia;">
      <h1>messages</h1>
      <p>
        <input v-model="asking" />
        <button @click="ask">ask</button>
        <span>reply: <strong>{{ replying }}</strong></span>
      </p>
      <p>
        <input v-model="asking" readonly />
        <button @click="send">send</button>
        <br />
        <span>subscribtion result: <strong>{{ subscribb }}</strong></span>
        <br />
        <span>other subscribtion result: <strong>{{ osubscribb }}</strong></span>
      </p>
      <span>once value: <strong>{{ once }}</strong></span>
      <p>
        <button @click="unsubscribeByR">unsubscribe by return handler</button>
        <button @click="unsubscribeByC">explicit unsubscribe</button>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Projector } from '../helpers/Projector';
import injectedComponent from './injectedComponent.vue';
import { MessageService } from '../helpers/MessageService';
import { Equal } from 'vue/types/common';


// interface AskMessageTypes {
//   [k: string]: (...args: any) => any;
//   "TEST-ASK": (v: string) => string;
// }

// interface SubscriptionMessageTypes {
//   "TEST-SUB": (v: string) => void
// }

export default defineComponent({
  setup() {
    let count = ref(0);
    const project = () => {
      Projector.Instance.projectTo(injectedComponent, { starting: count });
      count.value++
    }

    const stopproject = () => {
      Projector.Instance.stopProjecting()
    }

    const projectAsync = async () => {
      const returnvalue = await Projector.Instance.projectAsyncTo(injectedComponent, { starting: 1 });
      console.debug("returning from async projection", returnvalue)
    }


    const asking = ref("?");
    const replying = ref("");
    const ask = async () => {
      const f0 = await MessageService.Instance.ask("TEST-ASK", asking.value, "33");
      type t0 = Equal<typeof f0, any>
      const tt0: t0 = true;

      const f1 = await MessageService.Instance.ask<Module1.Messages, "TEST-ASK">("TEST-ASK", asking.value);
      type t1 = Equal<typeof f1, string>
      const tt1: t1 = true;

      const f2 = await MessageService.Instance.ask<Module1.Messages>("TEST-ASK", asking.value);
      type t2 = Equal<typeof f2, string>
      //@ts-expect-error
      const tt2: t2 = true;
      //@ts-expect-error
      const f3 = await MessageService.Instance.ask<Module1.Messages, "TEST-ASK2">("TEST-ASK2", asking.value);
      //@ts-expect-error
      const f4 = await MessageService.Instance.ask<Module1.Messages, "TEST-ASK2">("TEST-ASK3", asking.value);

      const f5 = await MessageService.Instance.ask<Module1.Messages, "TEST-ASK3">("TEST-ASK3", [asking.value, "ciao"]);
      //@ts-expect-error
      const f6 = await MessageService.Instance.ask<Module2.Messages>("TEST-ASKsss", asking.value);

      const f7 = await MessageService.Instance.ask<Module2.Messages, "xippy">("xippy", 32);
      //@ts-expect-error
      const f8 = await MessageService.Instance.ask<Module1.Subscriptions>("TEST-ASK", asking.value);
      //@ts-expect-error
      const f8 = await MessageService.Instance.ask<Module1.Subscriptions>("TEST-SUB", asking.value);
    }
    MessageService.Instance.reply<Module1.Messages, "TEST-ASK">("TEST-ASK", (v) => v + "" + v);
    MessageService.Instance.reply<Module1.Messages, "TEST-ASK2">("TEST-ASK2", (v) => ["" + v]);
    MessageService.Instance.reply<Module1.Messages, "TEST-ASK3">("TEST-ASK3", (v) => v.includes("ciao"));

    const subscribb = ref("")
    const stf = (v: number, a: string) => [false, false, true];
    const stf2 = (v: string) => { subscribb.value = "value from subscruption: " + v; return false };
    const stf3 = (v: string) => { subscribb.value = "value from subscruption: " + v; };
    //@ts-expect-error
    const r = MessageService.Instance.subscribe<Module1.Subscriptions, "TEST-SUB">("TEST-SUB", stf);
    const r2 = MessageService.Instance.subscribe<Module1.Subscriptions, "TEST-SUB">("TEST-SUB", stf2);
    const r3 = MessageService.Instance.subscribe<Module1.Subscriptions, "TEST-SUB">("TEST-SUB", stf3);
    const send = () => {
      MessageService.Instance.send<Module1.Subscriptions, "TEST-SUB">("TEST-SUB", asking.value, 3);
      MessageService.Instance.send("TEST-SUB", asking.value);

    }

    const osubscribb = ref("")
    MessageService.Instance.subscribe("TEST-SUB", (v) => osubscribb.value = "osubcribb " + v);

    const unsubscribeByR = () => r();
    const unsubscribeByC = () => MessageService.Instance.unsubscribe("TEST-SUB", stf)
    const once = ref("")
    MessageService.Instance.once("TEST-SUB", (v) => once.value = "once " + v)



    return {
      project,
      projectAsync,
      stopproject,
      asking,
      ask,
      replying,
      send,
      subscribb,
      unsubscribeByR,
      unsubscribeByC,
      once,
      osubscribb
    }
  }
})

</script>