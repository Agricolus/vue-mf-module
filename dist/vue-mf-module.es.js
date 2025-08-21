var G = Object.defineProperty;
var X = (n, e, t) => e in n ? G(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var l = (n, e, t) => (X(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as E, computed as y, getCurrentInstance as z, ref as $, onMounted as B } from "vue";
var A = { exports: {} };
function S() {
}
S.prototype = {
  on: function(n, e, t) {
    var r = this.e || (this.e = {});
    return (r[n] || (r[n] = [])).push({
      fn: e,
      ctx: t
    }), this;
  },
  once: function(n, e, t) {
    var r = this;
    function i() {
      r.off(n, i), e.apply(t, arguments);
    }
    return i._ = e, this.on(n, i, t);
  },
  emit: function(n) {
    var e = [].slice.call(arguments, 1), t = ((this.e || (this.e = {}))[n] || []).slice(), r = 0, i = t.length;
    for (r; r < i; r++)
      t[r].fn.apply(t[r].ctx, e);
    return this;
  },
  off: function(n, e) {
    var t = this.e || (this.e = {}), r = t[n], i = [];
    if (r && e)
      for (var s = 0, a = r.length; s < a; s++)
        r[s].fn !== e && r[s].fn._ !== e && i.push(r[s]);
    return i.length ? t[n] = i : delete t[n], this;
  }
};
A.exports = S;
var K = A.exports.TinyEmitter = S, D = /* @__PURE__ */ ((n) => (n[n.drawer = 0] = "drawer", n[n.bottom = 1] = "bottom", n[n.header = 2] = "header", n))(D || {});
const R = {
  menuDefinitionAdded: "newmenuitem"
}, _ = class {
  constructor() {
    l(this, "menuDefinitions", []);
    l(this, "menuStructure", {});
    l(this, "notifications", new K());
  }
  get Notifications() {
    return this.notifications;
  }
  static get Instance() {
    return _.instance;
  }
  addMenuDefinition(e, ...t) {
    let r = this.menuDefinitions.find((i) => i.name == e.name);
    r ? e = r : this.menuDefinitions.push(e);
    for (const i of t)
      this.menuStructure[i.section] = this.menuStructure[i.section] || {}, this.menuStructure[i.section][i.parent || e.name] = this.menuStructure[i.section][i.parent || e.name] || [], i.parent && this.menuStructure[i.section][i.parent].push(e.name);
    this.notifications.emit(R.menuDefinitionAdded, e);
  }
  getMenuItem(e) {
    return this.menuDefinitions.find((t) => t.name == e);
  }
  getMenu(e) {
    let t = [], r = /* @__PURE__ */ new Set();
    for (const i in this.menuStructure[e]) {
      const s = this.menuStructure[e][i];
      let a = {
        item: this.menuDefinitions.find((o) => o.name == i && (!o.hidden || !o.hidden())),
        children: s.map((o) => this.menuDefinitions.find((c) => c.name == o && (!c.hidden || !c.hidden()))).filter((o) => !!o).sort((o, c) => o && c && o.orderIndex && c.orderIndex && o.orderIndex > c.orderIndex ? 1 : o && c && o.orderIndex && c.orderIndex && o.orderIndex < c.orderIndex ? -1 : 0)
      };
      a.item && (r.add(i), s.forEach((o) => r.add(o)), t.push(a));
    }
    return t.filter((i) => !!i.item).sort((i, s) => i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex > s.item.orderIndex ? 1 : i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex < s.item.orderIndex ? -1 : 0);
  }
};
let h = _;
l(h, "instance", new _());
const V = class {
  constructor() {
    l(this, "registry", /* @__PURE__ */ new Map());
    l(this, "groupedregistry", /* @__PURE__ */ new Map());
    l(this, "serviceregistry", /* @__PURE__ */ new Map());
    l(this, "groupedserviceregistry", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return this.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  provideComponent(e, t, r) {
    if (this.registry.set(r ? `${r}-${t}` : t, e), r) {
      this.groupedregistry.has(r) || this.groupedregistry.set(r, /* @__PURE__ */ new Map());
      let i = this.groupedregistry.get(r);
      i && i.set(t, e);
    }
  }
  getComponent(e, t) {
    return this.registry.get(t ? `${t}-${e}` : e) || null;
  }
  getComponents(...e) {
    return Array.from(this.registry.entries()).filter((t) => e.indexOf(t[0]) >= 0).map((t) => t[1]);
  }
  getGroupComponents(e, ...t) {
    let r = this.groupedregistry.get(e);
    return r ? Array.from(r.entries() || []).filter((i) => !t || t.length == 0 || t.indexOf(i[0]) >= 0).map((i) => i[1]) : [];
  }
  getGroupComponentsKeys(e) {
    let t = this.groupedregistry.get(e);
    return t ? Array.from(t.keys()) : [];
  }
  provideService(e, t, r) {
    if (this.serviceregistry.set(e, t), r) {
      this.groupedserviceregistry.has(r) || this.groupedserviceregistry.set(r, /* @__PURE__ */ new Map());
      let i = this.groupedserviceregistry.get(r);
      i && i.set(e, t);
    }
  }
  getService(e) {
    return this.serviceregistry.get(e) || null;
  }
  getGroupServices(e, ...t) {
    let r = this.groupedserviceregistry.get(e);
    return r ? Array.from(r.entries() || []).filter((i) => !t || t.length == 0 || t.indexOf(i[0]) >= 0).map((i) => i[1]) : [];
  }
};
let f = V;
l(f, "instance", new V());
const w = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), W = (n, ...e) => new Promise((t) => {
  var a;
  let r = (a = w.get(n)) == null ? void 0 : a.port1;
  if (!r) {
    const o = new MessageChannel();
    w.set(n, o), r = o.port1;
  }
  let i = new MessageChannel();
  const s = (o) => {
    t(o.data), i = null;
  };
  i.port1.onmessage = s, r.postMessage(e, [i.port2]);
}), J = (n, e, t = { force: !1 }) => {
  var s;
  let r = (s = w.get(n)) == null ? void 0 : s.port2;
  if (!r) {
    const a = new MessageChannel();
    w.set(n, a), r = a.port2;
  }
  if (!t.force && r.onmessage)
    throw "reply already set for message " + n;
  const i = async (a) => {
    const o = a.ports[0], c = await e(...a.data);
    o.postMessage(c), o.close();
  };
  return r.onmessage = i, () => {
    r.onmessage = null;
  };
}, Q = (n, ...e) => {
  var r;
  let t = (r = m.get(n)) == null ? void 0 : r.port1;
  if (!t) {
    const i = new MessageChannel();
    m.set(n, i), t = i.port1;
  }
  t.postMessage(e);
}, N = (n, e) => {
  var i;
  let t = (i = m.get(n)) == null ? void 0 : i.port2;
  if (!t) {
    const s = new MessageChannel();
    m.set(n, s), t = s.port2;
  }
  const r = (s) => {
    e(...s.data);
  };
  return I.set(e, r), t.addEventListener("message", r), t.start(), () => {
    t == null || t.removeEventListener("message", r), I.delete(e);
  };
}, Y = (n, e) => {
  const t = N(n, (...r) => {
    e(...r), t();
  });
}, Z = (n, e) => {
  var i;
  let t = (i = m.get(n)) == null ? void 0 : i.port2;
  if (!t)
    return;
  const r = I.get(e);
  r && (t.removeEventListener("message", r), I.delete(e));
}, x = {
  Instance: {
    ask: W,
    reply: J,
    send: Q,
    subscribe: N,
    once: Y,
    unsubscribe: Z
  }
}, q = E({
  name: "inject",
  props: {
    id: { default: null },
    type: { default: null, type: String },
    value: { default: null },
    name: { type: String, default: null },
    names: { type: Array, default: null },
    group: { type: String, default: null },
    metadata: { type: Object, default: null },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 }
  },
  setup(n, { emit: e }) {
    const t = y({
      get: () => n.value,
      set: (a) => {
        e("input", a);
      }
    }), r = y(() => n.name ? [f.Instance.getComponent(n.name, n.group)] : n.group ? f.Instance.getGroupComponents(n.group, ...n.names || []) : f.Instance.getComponents(...n.names || [])), i = (...a) => {
      e("click", ...a);
    }, s = (...a) => {
      e("save", ...a);
    };
    return {
      id: n.id,
      type: n.type,
      value: n.value,
      name: n.name,
      names: n.names,
      group: n.group,
      metadata: n.metadata,
      disabled: n.disabled,
      readonly: n.readonly,
      click: i,
      save: s,
      Components: r,
      Value: t
    };
  }
});
function O(n, e, t, r, i, s, a, o) {
  var c = typeof n == "function" ? n.options : n;
  e && (c.render = e, c.staticRenderFns = t, c._compiled = !0), r && (c.functional = !0), s && (c._scopeId = "data-v-" + s);
  var u;
  if (a ? (u = function(d) {
    d = d || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !d && typeof __VUE_SSR_CONTEXT__ < "u" && (d = __VUE_SSR_CONTEXT__), i && i.call(this, d), d && d._registeredComponents && d._registeredComponents.add(a);
  }, c._ssrRegister = u) : i && (u = o ? function() {
    i.call(
      this,
      (c.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), u)
    if (c.functional) {
      c._injectStyles = u;
      var j = c.render;
      c.render = function(F, T) {
        return u.call(T), j(F, T);
      };
    } else {
      var b = c.beforeCreate;
      c.beforeCreate = b ? [].concat(b, u) : [u];
    }
  return {
    exports: n,
    options: c
  };
}
var H = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", e._l(e.Components, function(r, i) {
    return t(r, { key: i, tag: "component", attrs: { disabled: e.disabled, readonly: e.readonly, id: e.id, type: e.type, metadata: e.metadata }, on: { click: e.click, save: e.save }, model: { value: e.Value, callback: function(s) {
      e.Value = s;
    }, expression: "Value" } });
  }), 1);
}, ee = [], te = /* @__PURE__ */ O(
  q,
  H,
  ee,
  !1,
  null,
  null,
  null,
  null
);
const L = te.exports, M = class {
  constructor() {
    l(this, "screens", /* @__PURE__ */ new Map());
    l(this, "projecting", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return M.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  setScreen(e, t = "defaultscreen") {
    this.screens.set(t, e);
  }
  projectTo(e, t = null, r = "defaultscreen", i = !0, s = !1) {
    const a = { data: t }, o = s ? new Promise((u, j) => {
      a.reject = j, a.resolve = u;
    }) : null;
    i ? (this.projecting.has(r) || this.projecting.set(r, []), (this.projecting.get(r) || []).push({ component: e, model: a, promise: o, queue: i })) : this.projecting.set(r, [{ component: e, model: a, promise: o, queue: i }]);
    const c = this.screens.get(r);
    return c ? (c.model = a, c.currentView = e, o && o.then(() => this.stopProjecting(r)).catch(() => this.stopProjecting(r)), o) : null;
  }
  projectAsyncTo(e, t, r = "defaultscreen", i = !0) {
    return this.projectTo(e, t, r, i, !0);
  }
  stopProjecting(e = "defaultscreen") {
    this.projecting.has(e) && (this.projecting.get(e) || []).pop();
    let t = this.screens.get(e);
    if (t && t.currentView) {
      if (t.model = null, t.screenModel = null, t.currentView = null, this.projecting.has(e)) {
        let r = this.projecting.get(e);
        if (r && r.length) {
          let i = r.pop();
          i && this.projectTo(i.component, i.model, e, i.queue, !!i.promise);
        }
      }
      return !0;
    }
    return !1;
  }
};
let p = M;
l(p, "instance", new M());
const ne = E({
  name: "screen",
  props: {
    name: { type: String, default: "defaultscreen" }
  },
  setup(n, { expose: e }) {
    const t = z(), r = $(null), i = $(null);
    e({ currentView: r, model: i });
    const s = y(() => r.value != null), a = y(() => {
      var o;
      return (o = r.value) == null ? void 0 : o.__file;
    });
    return B(() => {
      p.Instance.setScreen(t.proxy, n.name);
    }), {
      currentViewUID: a,
      currentView: r,
      model: i,
      isVisible: s
    };
  }
});
var re = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", { directives: [{ name: "show", rawName: "v-show", value: e.isVisible, expression: "isVisible" }] }, [e.currentView ? t(e.currentView, { key: e.currentViewUID, tag: "component", attrs: { value: e.model } }) : e._e()], 1);
}, ie = [], se = /* @__PURE__ */ O(
  ne,
  re,
  ie,
  !1,
  null,
  null,
  null,
  null
);
const P = se.exports, ae = {
  inserted: (n, e) => {
    g.Instance.injectTo(n, e.arg);
  },
  unbind: (n, e) => {
    g.Instance.removeFrom(n, e.arg);
  }
}, oe = {
  bind: (n, e) => {
    !n || g.Instance.setScreen(n, e.arg);
  }
}, k = {
  projectToDirective: ae,
  screenDirective: oe
}, C = class {
  constructor() {
    l(this, "screens", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return C.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  injectTo(e, t) {
    if (!(!e || !t)) {
      var r = this.screens.has(t) ? this.screens.get(t) : null;
      try {
        e.parentElement && e.removeChild(e);
      } catch {
      }
      r && r.append(e);
    }
  }
  removeFrom(e, t) {
    if (!(!e || !t)) {
      var r = this.screens.has(t) ? this.screens.get(t) : null;
      try {
        r && r.removeChild(e);
      } catch {
      }
    }
  }
  setScreen(e, t = "defaultscreen") {
    this.screens.set(t, e);
  }
};
let g = C;
l(g, "instance", new C());
function v(n, e) {
  if (n.target.validity) {
    let t = n.target;
    if (t.validity) {
      let r = [
        t.validity.badInput ? "bad input" : null,
        t.validity.customError ? "custom error" : null,
        t.validity.patternMismatch ? "pattern mismatch" : null,
        t.validity.rangeOverflow ? "range overflow" : null,
        t.validity.rangeUnderflow ? "range underflow" : null,
        t.validity.stepMismatch ? "step mismatch" : null,
        t.validity.tooLong ? "too long" : null,
        t.validity.tooShort ? "too short" : null,
        t.validity.typeMismatch ? "type mismatch" : null,
        t.validity.valueMissing ? "value missing" : null
      ].filter((i) => !!i);
      e(r, t.validity.valid != null ? t.validity.valid : !0);
    }
  }
}
const U = {
  inserted: (n, e) => {
    if (!(!n || !n.willValidate)) {
      switch (n.nodeName) {
        case "INPUT":
        case "TEXTAREA":
          n.onblur = (t) => v(t, e.value);
          break;
        case "SELECT":
          n.onchange = (t) => v(t, e.value);
          break;
      }
      n.oninvalid = (t) => v(t, e.value), n.form && n.form.addEventListener("invalid", () => v({ target: n }, e.value)), e.arg == "immediate" ? n.reportValidity() : v({ target: n }, e.value);
    }
  },
  unbind: (n) => {
  }
};
function ce(n) {
  n.component("screen", P), n.component("inject", L), n.directive("screen", k.screenDirective), n.directive("projectTo", k.projectToDirective), n.directive("validate", U);
}
async function de(n) {
  let e = n;
  typeof n == "function" && (e = await n());
  let t = {};
  return {
    init(r, i, s, a) {
      return a.registry && (f.Instance = a.registry), a.messageService && (x.Instance = a.messageService), a.projector && (p.Instance = a.projector), a.screens && (g.Instance = a.screens), t = s, e.init(r, i, s);
    },
    config(r, i) {
      return e.config ? e.config(r, i, t) : null;
    },
    run(r, i) {
      return e.run ? e.run(r, i, t) : null;
    },
    routes: e.routes
  };
}
async function fe(n, e, t) {
  const r = await (n.default.default || n.default);
  return r.init(
    h.Instance,
    e,
    t || {},
    {
      registry: f.Instance,
      messageService: x.Instance,
      projector: p.Instance,
      screens: g.Instance
    }
  ).then(() => r);
}
async function ge(n, e) {
  return (await (n.default.default || n.default)).config(h.Instance, e);
}
async function he(n, e) {
  return (await (n.default.default || n.default)).run(h.Instance, e);
}
async function pe(n) {
  return (await (n.default.default || n.default)).routes;
}
const ve = {
  install: ce,
  MenuHelper: new h(),
  menuType: D,
  CommonRegistry: new f(),
  MessageService: x,
  Inject: L,
  Screen: P,
  ValidateDirective: U,
  MenuNotifications: R,
  Projector: p
};
export {
  f as CommonRegistry,
  ge as ConfigModule,
  fe as InitModule,
  L as Inject,
  h as MenuHelper,
  R as MenuNotifications,
  x as MessageService,
  de as ModuleInitializer,
  pe as ModuleRoutes,
  p as Projector,
  he as RunModule,
  P as Screen,
  U as ValidateDirective,
  ve as default,
  D as menuType
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLW1mLW1vZHVsZS5lcy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qcyIsIi4uL3NyYy9oZWxwZXJzL01lbnVIZWxwZXIudHMiLCIuLi9zcmMvaGVscGVycy9Db21tb25SZWdpc3RyeS50cyIsIi4uL3NyYy9oZWxwZXJzL01lc3NhZ2VTZXJ2aWNlLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW5qZWN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZy50cyIsIi4uL3NyYy9oZWxwZXJzL1Byb2plY3Rvci50cyIsIi4uL3NyYy9jb21wb25lbnRzL3NjcmVlbi52dWU/dnVlJnR5cGU9c2NyaXB0JmxhbmcudHMiLCIuLi9zcmMvZGlyZWN0aXZlcy9zY3JlZW4udHMiLCIuLi9zcmMvZGlyZWN0aXZlcy92YWxpZGF0ZS50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBFICgpIHtcbiAgLy8gS2VlcCB0aGlzIGVtcHR5IHNvIGl0J3MgZWFzaWVyIHRvIGluaGVyaXQgZnJvbVxuICAvLyAodmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9saXBzbWFjayBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvaXNzdWVzLzMpXG59XG5cbkUucHJvdG90eXBlID0ge1xuICBvbjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuXG4gICAgKGVbbmFtZV0gfHwgKGVbbmFtZV0gPSBbXSkpLnB1c2goe1xuICAgICAgZm46IGNhbGxiYWNrLFxuICAgICAgY3R4OiBjdHhcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9uY2U6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIuXyA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRTtcbm1vZHVsZS5leHBvcnRzLlRpbnlFbWl0dGVyID0gRTtcbiIsImltcG9ydCB7IFRpbnlFbWl0dGVyIH0gZnJvbSAndGlueS1lbWl0dGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWVudURlZmluaXRpb24ge1xuICBuYW1lOiBzdHJpbmcsXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gIGljb24/OiBzdHJpbmcsXG4gIHJvdXRlTmFtZT86IHN0cmluZyxcbiAgcm91dGVQYXJhbXM/OiBvYmplY3QsXG4gIGZlYXR1cmVmbGFncz86IHN0cmluZ1tdLFxuICBvcmRlckluZGV4PzogbnVtYmVyLFxuICBjbGFzcz86IHN0cmluZyxcbiAgaGlkZGVuOiAoKSA9PiBib29sZWFuXG59XG5cblxuZXhwb3J0IGVudW0gbWVudVR5cGUge1xuICBkcmF3ZXIsICAgICAgIC8vIERyYXdlciBNZW51XG4gIGJvdHRvbSwgICAgICAgLy8gQm90dG9tIE1lbnVcbiAgaGVhZGVyXG59XG5cbmV4cG9ydCBjb25zdCBNZW51Tm90aWZpY2F0aW9ucyA9IHtcbiAgbWVudURlZmluaXRpb25BZGRlZDogJ25ld21lbnVpdGVtJ1xufVxuXG5leHBvcnQgY2xhc3MgTWVudUhlbHBlciB7XG5cbiAgcHJpdmF0ZSBtZW51RGVmaW5pdGlvbnM6IElNZW51RGVmaW5pdGlvbltdID0gW107XG4gIHByaXZhdGUgbWVudVN0cnVjdHVyZTogeyBba2V5OiBzdHJpbmddOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0gfSA9IHt9XG4gIHByaXZhdGUgbm90aWZpY2F0aW9uczogVGlueUVtaXR0ZXIgPSBuZXcgVGlueUVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgTWVudUhlbHBlcigpO1xuICBwdWJsaWMgZ2V0IE5vdGlmaWNhdGlvbnMoKSB7IHJldHVybiB0aGlzLm5vdGlmaWNhdGlvbnM7IH1cbiAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7IHJldHVybiBNZW51SGVscGVyLmluc3RhbmNlIH1cblxuICBwdWJsaWMgYWRkTWVudURlZmluaXRpb24obWVudURlZmluaXRpb246IElNZW51RGVmaW5pdGlvbiwgLi4ucG9zaXRpb25zOiB7IHNlY3Rpb246IG1lbnVUeXBlLCBwYXJlbnQ/OiBzdHJpbmcgfVtdKSB7XG5cbiAgICAvLyBBZ2dpdW5nbyBsYSBkaWNoaWFyYXppb25lIGRlbCBtZW51w7kgYWxsJ2VsZW5jbyBkZWkgbWVuw7kgZGlzcG9uaWJpbGkuXG4gICAgbGV0IGZvdW5kID0gdGhpcy5tZW51RGVmaW5pdGlvbnMuZmluZChtID0+IG0ubmFtZSA9PSBtZW51RGVmaW5pdGlvbi5uYW1lKTtcbiAgICBpZiAoIWZvdW5kKVxuICAgICAgdGhpcy5tZW51RGVmaW5pdGlvbnMucHVzaChtZW51RGVmaW5pdGlvbik7XG4gICAgZWxzZVxuICAgICAgbWVudURlZmluaXRpb24gPSBmb3VuZDtcblxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBwb3NpdGlvbnMpIHtcblxuICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl0gPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXSB8fCB7fTtcbiAgICAgIHRoaXMubWVudVN0cnVjdHVyZVtlbGVtZW50LnNlY3Rpb25dW2VsZW1lbnQucGFyZW50IHx8IG1lbnVEZWZpbml0aW9uLm5hbWVdID0gdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnQgfHwgbWVudURlZmluaXRpb24ubmFtZV0gfHwgW107XG5cbiAgICAgIGlmIChlbGVtZW50LnBhcmVudClcbiAgICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnRdLnB1c2gobWVudURlZmluaXRpb24ubmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5ub3RpZmljYXRpb25zLmVtaXQoTWVudU5vdGlmaWNhdGlvbnMubWVudURlZmluaXRpb25BZGRlZCwgbWVudURlZmluaXRpb24pO1xuICB9XG5cbiAgcHVibGljIGdldE1lbnVJdGVtKG5hbWU6IHN0cmluZyk6IElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMubWVudURlZmluaXRpb25zLmZpbmQoaSA9PiBpLm5hbWUgPT0gbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWVudShtZW51OiBtZW51VHlwZSk6IHsgaXRlbTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkLCBjaGlsZHJlbjogKElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZClbXSB9W10ge1xuICAgIGxldCByZXN1bHQ6IHsgaXRlbTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkLCBjaGlsZHJlbjogKElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZClbXSB9W10gPSBbXTtcbiAgICBsZXQgdXNlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5tZW51U3RydWN0dXJlW21lbnVdKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5tZW51U3RydWN0dXJlW21lbnVdW2tleV07XG5cblxuICAgICAgbGV0IHJyID0ge1xuICAgICAgICBpdGVtOiB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4ge1xuICAgICAgICAgIHJldHVybiBtLm5hbWUgPT0ga2V5ICYmXG4gICAgICAgICAgICAoIW0uaGlkZGVuIHx8ICFtLmhpZGRlbigpKVxuICAgICAgICB9KSxcblxuICAgICAgICBjaGlsZHJlbjogZWxlbWVudC5tYXAoaSA9PiB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4gbS5uYW1lID09IGkgJiYgKCFtLmhpZGRlbiB8fCAhbS5oaWRkZW4oKSkpKVxuICAgICAgICAgIC5maWx0ZXIoaSA9PiAhIWkpXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChhICYmIGIgJiYgYS5vcmRlckluZGV4ICYmIGIub3JkZXJJbmRleCAmJiBhLm9yZGVySW5kZXggPiBiLm9yZGVySW5kZXgpIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKGEgJiYgYiAmJiBhLm9yZGVySW5kZXggJiYgYi5vcmRlckluZGV4ICYmIGEub3JkZXJJbmRleCA8IGIub3JkZXJJbmRleCkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICB9KVxuICAgICAgfTtcblxuICAgICAgaWYgKCEhcnIuaXRlbSkge1xuICAgICAgICB1c2VkLmFkZChrZXkpO1xuICAgICAgICBlbGVtZW50LmZvckVhY2goaSA9PiB1c2VkLmFkZChpKSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5maWx0ZXIoaSA9PiAhIWkuaXRlbSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhICYmIGIgJiYgYS5pdGVtICYmIGIuaXRlbSAmJiBhLml0ZW0ub3JkZXJJbmRleCAmJiBiLml0ZW0ub3JkZXJJbmRleCAmJiBhLml0ZW0ub3JkZXJJbmRleCA+IGIuaXRlbS5vcmRlckluZGV4KSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEgJiYgYiAmJiBhLml0ZW0gJiYgYi5pdGVtICYmIGEuaXRlbS5vcmRlckluZGV4ICYmIGIuaXRlbS5vcmRlckluZGV4ICYmIGEuaXRlbS5vcmRlckluZGV4IDwgYi5pdGVtLm9yZGVySW5kZXgpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH0pO1xuICB9XG59XG5cbiIsIlxuZXhwb3J0IGNsYXNzIENvbW1vblJlZ2lzdHJ5IHtcblxuICBwcml2YXRlIHJlZ2lzdHJ5ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgcHJpdmF0ZSBncm91cGVkcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgYW55Pj4oKTtcbiAgcHJpdmF0ZSBzZXJ2aWNlcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICBwcml2YXRlIGdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgYW55Pj4oKTtcblxuXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb21tb25SZWdpc3RyeSA9IG5ldyBDb21tb25SZWdpc3RyeSgpO1xuICBzdGF0aWMgZ2V0IEluc3RhbmNlKCkgeyByZXR1cm4gdGhpcy5pbnN0YW5jZTsgfVxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IENvbW1vblJlZ2lzdHJ5KSB7IHRoaXMuaW5zdGFuY2UgPSB2IH07XG5cbiAgcHJvdmlkZUNvbXBvbmVudChjb21wb25lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBncm91cD86IHN0cmluZykge1xuICAgIHRoaXMucmVnaXN0cnkuc2V0KGdyb3VwID8gYCR7Z3JvdXB9LSR7bmFtZX1gIDogbmFtZSwgY29tcG9uZW50KTtcbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIGlmICghdGhpcy5ncm91cGVkcmVnaXN0cnkuaGFzKGdyb3VwKSkgdGhpcy5ncm91cGVkcmVnaXN0cnkuc2V0KGdyb3VwLCBuZXcgTWFwPHN0cmluZywgYW55PigpKTtcblxuICAgICAgbGV0IGdnID0gdGhpcy5ncm91cGVkcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICAgIGlmIChnZykgZ2cuc2V0KG5hbWUsIGNvbXBvbmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29tcG9uZW50KG5hbWU6IHN0cmluZywgZ3JvdXA/OiBzdHJpbmcpOiBhbnkgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5nZXQoZ3JvdXAgPyBgJHtncm91cH0tJHtuYW1lfWAgOiBuYW1lKSB8fCBudWxsO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50cyguLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucmVnaXN0cnkuZW50cmllcygpKS5maWx0ZXIoaSA9PiBuYW1lLmluZGV4T2YoaVswXSkgPj0gMCkubWFwKGkgPT4gaVsxXSk7XG4gIH1cblxuICBnZXRHcm91cENvbXBvbmVudHMoZ3JvdXA6IHN0cmluZywgLi4ubmFtZTogc3RyaW5nW10pOiAoYW55KVtdIHtcbiAgICBsZXQgZyA9IHRoaXMuZ3JvdXBlZHJlZ2lzdHJ5LmdldChncm91cCk7XG4gICAgaWYgKGcpXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShnLmVudHJpZXMoKSB8fCBbXSkuZmlsdGVyKGkgPT4gKCFuYW1lIHx8IG5hbWUubGVuZ3RoID09IDApIHx8IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcbiAgICByZXR1cm4gW11cbiAgfVxuXG4gIGdldEdyb3VwQ29tcG9uZW50c0tleXMoZ3JvdXA6IHN0cmluZyk6IChzdHJpbmcpW10ge1xuICAgIGxldCBnID0gdGhpcy5ncm91cGVkcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICBpZiAoZykgcmV0dXJuIEFycmF5LmZyb20oZy5rZXlzKCkpO1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgcHJvdmlkZVNlcnZpY2UobmFtZTogc3RyaW5nLCBzZXJ2aWNlOiBhbnksIGdyb3VwPzogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXJ2aWNlcmVnaXN0cnkuc2V0KG5hbWUsIHNlcnZpY2UpO1xuICAgIGlmIChncm91cCkge1xuICAgICAgaWYgKCF0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuaGFzKGdyb3VwKSkgdGhpcy5ncm91cGVkc2VydmljZXJlZ2lzdHJ5LnNldChncm91cCwgbmV3IE1hcDxzdHJpbmcsIGFueT4oKSk7XG4gICAgICBsZXQgZ2cgPSB0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICAgIGlmIChnZykgZ2cuc2V0KG5hbWUsIHNlcnZpY2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldFNlcnZpY2U8VD4obmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICh0aGlzLnNlcnZpY2VyZWdpc3RyeS5nZXQobmFtZSkgfHwgbnVsbCkgYXMgVDtcbiAgfVxuXG4gIGdldEdyb3VwU2VydmljZXMoZ3JvdXA6IHN0cmluZywgLi4ubmFtZTogc3RyaW5nW10pOiAoYW55KVtdIHtcbiAgICBsZXQgZyA9IHRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgIGlmIChnKVxuICAgICAgcmV0dXJuIEFycmF5LmZyb20oZy5lbnRyaWVzKCkgfHwgW10pLmZpbHRlcihpID0+ICghbmFtZSB8fCBuYW1lLmxlbmd0aCA9PSAwKSB8fCBuYW1lLmluZGV4T2YoaVswXSkgPj0gMCkubWFwKGkgPT4gaVsxXSk7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn0iLCJjb25zdCBhc2tSZXBseUNoYW5uZWxzID0gbmV3IE1hcDxzdHJpbmcsIE1lc3NhZ2VDaGFubmVsPigpO1xuY29uc3Qgc2VuZFN1YnNjcmliZUNoYW5uZWxzID0gbmV3IE1hcDxzdHJpbmcsIE1lc3NhZ2VDaGFubmVsPigpO1xuY29uc3Qgc2VuZFN1YnNjcmliZUNhbGxiYWNrcyA9IG5ldyBNYXA8RnVuY3Rpb24sICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PigpO1xuXG5jb25zdCBhc2sgPSA8VD4obmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8VD4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgbGV0IHBvcnQgPSBhc2tSZXBseUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDFcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgIGFza1JlcGx5Q2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgICAgcG9ydCA9IGMucG9ydDFcbiAgICB9XG4gICAgbGV0IGlubmVyY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGNvbnN0IGwgPSAoZXZ0OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgIHJlc29sdmUoZXZ0LmRhdGEpO1xuICAgICAgaW5uZXJjaGFubmVsID0gbnVsbCE7XG4gICAgfVxuICAgIGlubmVyY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsO1xuICAgIHBvcnQucG9zdE1lc3NhZ2UoYXJncywgW2lubmVyY2hhbm5lbC5wb3J0Ml0pO1xuICB9KTtcbn1cblxuY29uc3QgcmVwbHkgPSAobmFtZTogc3RyaW5nLCBjYjogKC4uLmFyZ3M6IGFueVtdKSA9PiBQcm9taXNlPGFueT4gfCBhbnksIG9wdHM6IHsgZm9yY2U6IGJvb2xlYW4gfSA9IHsgZm9yY2U6IGZhbHNlIH0pID0+IHtcbiAgbGV0IHBvcnQgPSBhc2tSZXBseUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFwb3J0KSB7XG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGFza1JlcGx5Q2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQyXG4gIH1cbiAgaWYgKCFvcHRzLmZvcmNlICYmIHBvcnQub25tZXNzYWdlKSB0aHJvdyBcInJlcGx5IGFscmVhZHkgc2V0IGZvciBtZXNzYWdlIFwiICsgbmFtZVxuICBjb25zdCBsID0gYXN5bmMgKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgaW5uZXJwb3J0ID0gZXZ0LnBvcnRzWzBdXG4gICAgY29uc3QgciA9IGF3YWl0IGNiKC4uLmV2dC5kYXRhKTtcbiAgICBpbm5lcnBvcnQucG9zdE1lc3NhZ2Uocik7XG4gICAgaW5uZXJwb3J0LmNsb3NlKCk7XG4gIH1cbiAgcG9ydC5vbm1lc3NhZ2UgPSBsO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHBvcnQhLm9ubWVzc2FnZSA9IG51bGwhO1xuICB9XG59XG5cbmNvbnN0IHNlbmQgPSAobmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkgPT4ge1xuICBsZXQgcG9ydCA9IHNlbmRTdWJzY3JpYmVDaGFubmVscy5nZXQobmFtZSk/LnBvcnQxXG4gIGlmICghcG9ydCkge1xuICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQxXG4gIH1cbiAgcG9ydC5wb3N0TWVzc2FnZShhcmdzKTtcbn1cblxuY29uc3Qgc3Vic2NyaWJlID0gKG5hbWU6IHN0cmluZywgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiB7XG4gIGxldCBwb3J0ID0gc2VuZFN1YnNjcmliZUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFwb3J0KSB7XG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHNlbmRTdWJzY3JpYmVDaGFubmVscy5zZXQobmFtZSwgYyk7XG4gICAgcG9ydCA9IGMucG9ydDJcbiAgfVxuICBjb25zdCBsID0gKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY2IoLi4uZXZ0LmRhdGEpO1xuICB9XG4gIHNlbmRTdWJzY3JpYmVDYWxsYmFja3Muc2V0KGNiLCBsKTtcbiAgcG9ydC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBsKTtcbiAgcG9ydC5zdGFydCgpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHBvcnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGwpO1xuICAgIHNlbmRTdWJzY3JpYmVDYWxsYmFja3MuZGVsZXRlKGNiKTtcbiAgfVxufVxuXG5jb25zdCBvbmNlID0gKG5hbWU6IHN0cmluZywgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiB7XG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gc3Vic2NyaWJlKG5hbWUsICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNiKC4uLmFyZ3MpO1xuICAgIHVuc3Vic2NyaWJlKCk7XG4gIH0pO1xufVxuXG5jb25zdCB1bnN1YnNjcmliZSA9IChuYW1lOiBzdHJpbmcsIGNiOiAoLi4uYXJnczogYW55W10pID0+IGFueSkgPT4ge1xuICBsZXQgcG9ydCA9IHNlbmRTdWJzY3JpYmVDaGFubmVscy5nZXQobmFtZSk/LnBvcnQyXG4gIGlmICghcG9ydCkgcmV0dXJuO1xuICBjb25zdCBsID0gc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5nZXQoY2IpO1xuICBpZiAobCkge1xuICAgIHBvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgbCk7XG4gICAgc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5kZWxldGUoY2IpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIGFzayxcbiAgcmVwbHksXG4gIHNlbmQsXG4gIHN1YnNjcmliZSxcbiAgb25jZSxcbiAgdW5zdWJzY3JpYmVcbn1cblxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VTZXJ2aWNlID0ge1xuICBJbnN0YW5jZToge1xuICAgIGFzayxcbiAgICByZXBseSxcbiAgICBzZW5kLFxuICAgIHN1YnNjcmliZSxcbiAgICBvbmNlLFxuICAgIHVuc3Vic2NyaWJlXG4gIH1cbn0iLCJcbmltcG9ydCB7IGNvbXB1dGVkLCBkZWZpbmVDb21wb25lbnQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBDb21tb25SZWdpc3RyeSB9IGZyb20gXCIuLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XG4gIG5hbWU6IFwiaW5qZWN0XCIsXG4gIHByb3BzOiB7XG4gICAgaWQ6IHsgZGVmYXVsdDogbnVsbCB9LFxuICAgIHR5cGU6IHsgZGVmYXVsdDogbnVsbCwgdHlwZTogU3RyaW5nIH0sXG4gICAgdmFsdWU6IHsgZGVmYXVsdDogbnVsbCB9LFxuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBudWxsIH0sXG4gICAgbmFtZXM6IHsgdHlwZTogQXJyYXk8c3RyaW5nPiwgZGVmYXVsdDogbnVsbCB9LFxuICAgIGdyb3VwOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogbnVsbCB9LFxuICAgIG1ldGFkYXRhOiB7IHR5cGU6IE9iamVjdCwgZGVmYXVsdDogbnVsbCB9LFxuICAgIGRpc2FibGVkOiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH0sXG4gICAgcmVhZG9ubHk6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfVxuICB9LFxuICBzZXR1cChwcm9wcywgeyBlbWl0IH0pIHtcblxuXG4gICAgY29uc3QgVmFsdWUgPSBjb21wdXRlZCh7XG4gICAgICBnZXQ6ICgpID0+IHsgcmV0dXJuIHByb3BzLnZhbHVlIH0sXG4gICAgICBzZXQ6ICh2KSA9PiB7IGVtaXQoXCJpbnB1dFwiLCB2KTsgfVxuICAgIH0pXG5cbiAgICBjb25zdCBDb21wb25lbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgaWYgKHByb3BzLm5hbWUpXG4gICAgICAgIHJldHVybiBbQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UuZ2V0Q29tcG9uZW50KHByb3BzLm5hbWUsIHByb3BzLmdyb3VwKV07XG4gICAgICBpZiAocHJvcHMuZ3JvdXApXG4gICAgICAgIHJldHVybiBDb21tb25SZWdpc3RyeS5JbnN0YW5jZS5nZXRHcm91cENvbXBvbmVudHMocHJvcHMuZ3JvdXAsIC4uLihwcm9wcy5uYW1lcyB8fCBbXSkpO1xuICAgICAgcmV0dXJuIENvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLmdldENvbXBvbmVudHMoLi4uKHByb3BzLm5hbWVzIHx8IFtdKSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjbGljayA9ICguLi5hcmdzOiBhbnlbXSkgPT4geyBlbWl0KCdjbGljaycsIC4uLmFyZ3MpIH1cbiAgICBjb25zdCBzYXZlID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7IGVtaXQoJ3NhdmUnLCAuLi5hcmdzKSB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHByb3BzLmlkLFxuICAgICAgdHlwZTogcHJvcHMudHlwZSxcbiAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSxcbiAgICAgIG5hbWU6IHByb3BzLm5hbWUsXG4gICAgICBuYW1lczogcHJvcHMubmFtZXMsXG4gICAgICBncm91cDogcHJvcHMuZ3JvdXAsXG4gICAgICBtZXRhZGF0YTogcHJvcHMubWV0YWRhdGEsXG4gICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWQsXG4gICAgICByZWFkb25seTogcHJvcHMucmVhZG9ubHksXG4gICAgICBjbGljayxcbiAgICAgIHNhdmUsXG4gICAgICBDb21wb25lbnRzLFxuICAgICAgVmFsdWUsXG4gICAgfVxuICB9XG5cbn0pO1xuXG4iLCJcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50UHVibGljSW5zdGFuY2UgfSBmcm9tIFwidnVlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3RhYmxlTW9kZWw8VD4ge1xuICBkYXRhOiBUOyByZXNvbHZlOiAoaXRlbTogVCkgPT4gdm9pZDsgcmVqZWN0OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdG9yIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgUHJvamVjdG9yKCk7XG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogUHJvamVjdG9yIHsgcmV0dXJuIFByb2plY3Rvci5pbnN0YW5jZSB9XG4gIHN0YXRpYyBzZXQgSW5zdGFuY2UodjogUHJvamVjdG9yKSB7IHRoaXMuaW5zdGFuY2UgPSB2OyB9XG5cbiAgcHJpdmF0ZSBzY3JlZW5zID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgcHJpdmF0ZSBwcm9qZWN0aW5nID0gbmV3IE1hcDxzdHJpbmcsIHsgY29tcG9uZW50OiBDb21wb25lbnQsIG1vZGVsOiBJUHJvamVjdGFibGVNb2RlbDxhbnk+LCBwcm9taXNlOiBQcm9taXNlPGFueT4gfCBudWxsLCBxdWV1ZTogYm9vbGVhbiB9W10+KCk7XG5cbiAgc2V0U2NyZWVuKHNjcmVlbjogQ29tcG9uZW50UHVibGljSW5zdGFuY2UsIG5hbWU6IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiKSB7XG4gICAgdGhpcy5zY3JlZW5zLnNldChuYW1lLCBzY3JlZW4pO1xuICB9XG5cblxuXG4gIHByb2plY3RUbzxUPihjb21wb25lbnQ6IENvbXBvbmVudCwgZGF0YTogVCB8IG51bGwgPSBudWxsLCBzY3JlZW46IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiLCBxdWV1ZTogYm9vbGVhbiA9IHRydWUsIGFzeW5jOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPFQ+IHwgbnVsbCB7XG4gICAgY29uc3QgbW9kZWwgPSB7IGRhdGEgfSBhcyBJUHJvamVjdGFibGVNb2RlbDxUPjtcbiAgICBjb25zdCBwcm9taXNlID0gYXN5bmMgPyBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7IG1vZGVsLnJlamVjdCA9IHJlamVjdDsgbW9kZWwucmVzb2x2ZSA9IHJlc29sdmUgfSkgOiBudWxsO1xuXG4gICAgaWYgKCFxdWV1ZSkge1xuXG4gICAgICB0aGlzLnByb2plY3Rpbmcuc2V0KHNjcmVlbiwgW3sgY29tcG9uZW50LCBtb2RlbCwgcHJvbWlzZSwgcXVldWUgfV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMucHJvamVjdGluZy5oYXMoc2NyZWVuKSkge1xuICAgICAgICB0aGlzLnByb2plY3Rpbmcuc2V0KHNjcmVlbiwgW10pO1xuICAgICAgfVxuICAgICAgKHRoaXMucHJvamVjdGluZy5nZXQoc2NyZWVuKSB8fCBbXSkucHVzaCh7IGNvbXBvbmVudCwgbW9kZWwsIHByb21pc2UsIHF1ZXVlIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNzID0gdGhpcy5zY3JlZW5zLmdldChzY3JlZW4pO1xuICAgIGlmICghc3MpIHJldHVybiBudWxsO1xuICAgIHNzLm1vZGVsID0gbW9kZWw7XG4gICAgc3MuY3VycmVudFZpZXcgPSBjb21wb25lbnQ7XG5cbiAgICBpZiAocHJvbWlzZSkgcHJvbWlzZS50aGVuKCgpID0+IHRoaXMuc3RvcFByb2plY3Rpbmcoc2NyZWVuKSkuY2F0Y2goKCkgPT4gdGhpcy5zdG9wUHJvamVjdGluZyhzY3JlZW4pKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHByb2plY3RBc3luY1RvPFQ+KGNvbXBvbmVudDogQ29tcG9uZW50LCBkYXRhOiBULCBzY3JlZW46IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiLCBxdWV1ZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0VG8oY29tcG9uZW50LCBkYXRhLCBzY3JlZW4sIHF1ZXVlLCB0cnVlKVxuICB9XG5cbiAgc3RvcFByb2plY3Rpbmcoc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIikge1xuICAgIGlmICh0aGlzLnByb2plY3RpbmcuaGFzKHNjcmVlbikpIHtcbiAgICAgICh0aGlzLnByb2plY3RpbmcuZ2V0KHNjcmVlbikgfHwgW10pLnBvcCgpXG4gICAgfVxuXG4gICAgbGV0IF9zY3JlZW4gPSB0aGlzLnNjcmVlbnMuZ2V0KHNjcmVlbilcbiAgICBpZiAoX3NjcmVlbiAmJiBfc2NyZWVuLmN1cnJlbnRWaWV3KSB7XG4gICAgICBfc2NyZWVuLm1vZGVsID0gbnVsbDtcbiAgICAgIF9zY3JlZW4uc2NyZWVuTW9kZWwgPSBudWxsO1xuICAgICAgX3NjcmVlbi5jdXJyZW50VmlldyA9IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLnByb2plY3RpbmcuaGFzKHNjcmVlbikpIHtcbiAgICAgICAgbGV0IHMgPSB0aGlzLnByb2plY3RpbmcuZ2V0KHNjcmVlbik7XG4gICAgICAgIGlmIChzICYmIHMubGVuZ3RoKSB7XG4gICAgICAgICAgbGV0IG0gPSBzLnBvcCgpO1xuICAgICAgICAgIGlmIChtKSB0aGlzLnByb2plY3RUbyhtLmNvbXBvbmVudCwgbS5tb2RlbCwgc2NyZWVuLCBtLnF1ZXVlLCAhIW0ucHJvbWlzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3RhYmxlPFQ+IHtcbiAgdmFsdWU6IHtcbiAgICBkYXRhOiBULFxuICAgIHJlc29sdmU6IChpdGVtOiBUKSA9PiB2b2lkO1xuICAgIHJlamVjdDogKCkgPT4gdm9pZDtcbiAgfTtcbn0iLCJcbmltcG9ydCB7IENvbXBvbmVudCwgY29tcHV0ZWQsIGRlZmluZUNvbXBvbmVudCwgZ2V0Q3VycmVudEluc3RhbmNlLCBvbk1vdW50ZWQsIFJlZiwgcmVmIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgSVByb2plY3RhYmxlTW9kZWwsIFByb2plY3RvciB9IGZyb20gXCIuLi9oZWxwZXJzL1Byb2plY3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiBcInNjcmVlblwiLFxuICBwcm9wczoge1xuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBcImRlZmF1bHRzY3JlZW5cIiB9LFxuICB9LFxuICBzZXR1cChwcm9wcywgeyBleHBvc2UgfSkge1xuXG4gICAgY29uc3QgbWUgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcblxuICAgIGNvbnN0IGN1cnJlbnRWaWV3OiBSZWY8Q29tcG9uZW50PiA9IHJlZihudWxsISk7XG4gICAgY29uc3QgbW9kZWw6IFJlZjxJUHJvamVjdGFibGVNb2RlbDxhbnk+IHwgbnVsbD4gPSByZWYobnVsbCEpO1xuXG4gICAgZXhwb3NlKHsgY3VycmVudFZpZXcsIG1vZGVsIH0pXG5cbiAgICBjb25zdCBpc1Zpc2libGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gY3VycmVudFZpZXcudmFsdWUgIT0gbnVsbDtcbiAgICB9KVxuXG4gICAgY29uc3QgY3VycmVudFZpZXdVSUQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gKGN1cnJlbnRWaWV3LnZhbHVlIGFzIGFueSk/Ll9fZmlsZVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgUHJvamVjdG9yLkluc3RhbmNlLnNldFNjcmVlbigobWUgYXMgYW55KS5wcm94eSwgcHJvcHMubmFtZSk7XG4gICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50Vmlld1VJRCxcbiAgICAgIGN1cnJlbnRWaWV3LFxuICAgICAgbW9kZWwsXG4gICAgICBpc1Zpc2libGVcbiAgICB9XG4gIH0sXG5cbn0pXG4iLCJjb25zdCBwcm9qZWN0VG9EaXJlY3RpdmUgPSB7XG5cbiAgaW5zZXJ0ZWQ6IChlbDogRWxlbWVudCwgYmluZDogYW55KSA9PiB7XG4gICAgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2UuaW5qZWN0VG8oZWwsIGJpbmQuYXJnKTtcbiAgfSxcbiAgdW5iaW5kOiAoZWw6IEVsZW1lbnQsIGJpbmQ6IGFueSkgPT4ge1xuICAgIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlLnJlbW92ZUZyb20oZWwsIGJpbmQuYXJnKVxuICB9XG59XG5cblxuY29uc3Qgc2NyZWVuRGlyZWN0aXZlID0ge1xuICBiaW5kOiAoZWw6IGFueSwgYmluZGluZzogYW55KSA9PiB7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlLnNldFNjcmVlbihlbCwgYmluZGluZy5hcmcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvamVjdFRvRGlyZWN0aXZlLCBzY3JlZW5EaXJlY3RpdmVcbn1cblxuZXhwb3J0IGNsYXNzIFNjcmVlbnNNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgU2NyZWVuc01hbmFnZXIoKTtcbiAgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBTY3JlZW5zTWFuYWdlciB7IHJldHVybiBTY3JlZW5zTWFuYWdlci5pbnN0YW5jZSB9XG4gIHN0YXRpYyBzZXQgSW5zdGFuY2UodjogU2NyZWVuc01hbmFnZXIpIHsgdGhpcy5pbnN0YW5jZSA9IHY7IH1cbiAgcHJpdmF0ZSBzY3JlZW5zID0gbmV3IE1hcDxzdHJpbmcsIEVsZW1lbnQ+KCk7XG4gIFxuXG4gIGluamVjdFRvKGRvbUVsZW1lbnQ6IEVsZW1lbnQsIHNjcmVlbjogc3RyaW5nKSB7XG4gICAgaWYgKCFkb21FbGVtZW50IHx8ICFzY3JlZW4pIHJldHVybjtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2NyZWVucy5oYXMoc2NyZWVuKSA/IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKSA6IG51bGw7XG4gICAgdHJ5IHsgZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGRvbUVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tRWxlbWVudCk7IH0gY2F0Y2ggeyB9XG4gICAgaWYgKGVsZW1lbnQpIGVsZW1lbnQuYXBwZW5kKGRvbUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlRnJvbShkb21FbGVtZW50OiBFbGVtZW50LCBzY3JlZW46IHN0cmluZykge1xuICAgIGlmICghZG9tRWxlbWVudCB8fCAhc2NyZWVuKSByZXR1cm47XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnNjcmVlbnMuaGFzKHNjcmVlbikgPyB0aGlzLnNjcmVlbnMuZ2V0KHNjcmVlbikgOiBudWxsO1xuICAgIHRyeSB7IGlmIChlbGVtZW50KSBlbGVtZW50LnJlbW92ZUNoaWxkKGRvbUVsZW1lbnQpIH0gY2F0Y2ggeyB9XG4gIH1cblxuICBzZXRTY3JlZW4oc2NyZWVuOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIikge1xuICAgIHRoaXMuc2NyZWVucy5zZXQobmFtZSwgc2NyZWVuKTtcbiAgfVxufSIsImZ1bmN0aW9uIGNoZWNrSW5wdXRWYWxpZGF0aW9uKGE6IEV2ZW50LCBjYWxsb3V0OiAoZXJyb3JzOiBzdHJpbmdbXSwgdmFsaWQ6IGJvb2xlYW4pID0+IHZvaWQpIHtcbiAgaWYgKChhLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWxpZGl0eSkge1xuICAgIGxldCBlbCA9IChhLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KTtcblxuICAgIGlmIChlbC52YWxpZGl0eSkge1xuICAgICAgbGV0IGVycm9ycyA9IFtcbiAgICAgICAgZWwudmFsaWRpdHkuYmFkSW5wdXQgPyBcImJhZCBpbnB1dFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkuY3VzdG9tRXJyb3IgPyBcImN1c3RvbSBlcnJvclwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkucGF0dGVybk1pc21hdGNoID8gXCJwYXR0ZXJuIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS5yYW5nZU92ZXJmbG93ID8gXCJyYW5nZSBvdmVyZmxvd1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkucmFuZ2VVbmRlcmZsb3cgPyBcInJhbmdlIHVuZGVyZmxvd1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkuc3RlcE1pc21hdGNoID8gXCJzdGVwIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS50b29Mb25nID8gXCJ0b28gbG9uZ1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudG9vU2hvcnQgPyBcInRvbyBzaG9ydFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudHlwZU1pc21hdGNoID8gXCJ0eXBlIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS52YWx1ZU1pc3NpbmcgPyBcInZhbHVlIG1pc3NpbmdcIiA6IG51bGxdLmZpbHRlcihpID0+ICEhaSlcblxuICAgICAgY2FsbG91dChlcnJvcnMgYXMgc3RyaW5nW10sIGVsLnZhbGlkaXR5LnZhbGlkICE9IHVuZGVmaW5lZCA/IGVsLnZhbGlkaXR5LnZhbGlkIDogdHJ1ZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZSA9IHtcbiAgaW5zZXJ0ZWQ6IChlbDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCwgYmluZDoge1xuICAgIHZhbHVlOiAoZXJyb3JzOiBzdHJpbmdbXSwgdmFsaWQ6IGJvb2xlYW4pID0+IHZvaWQsXG4gICAgYXJnOiBcImltbWVkaWF0ZVwiXG4gIH0pID0+IHtcbiAgICBpZiAoIWVsIHx8ICFlbC53aWxsVmFsaWRhdGUpIHJldHVybjtcbiAgICBzd2l0Y2ggKGVsLm5vZGVOYW1lKSB7XG4gICAgICBjYXNlIFwiSU5QVVRcIjpcbiAgICAgIGNhc2UgXCJURVhUQVJFQVwiOiBlbC5vbmJsdXIgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpOyBicmVhaztcbiAgICAgIGNhc2UgXCJTRUxFQ1RcIjogZWwub25jaGFuZ2UgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpOyBicmVhaztcbiAgICB9XG5cbiAgICBlbC5vbmludmFsaWQgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpO1xuICAgIGlmIChlbC5mb3JtKSBlbC5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2ludmFsaWQnLCAoKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbih7IHRhcmdldDogZWwgfSBhcyBhbnksIGJpbmQudmFsdWUpKVxuXG4gICAgaWYgKGJpbmQuYXJnID09IFwiaW1tZWRpYXRlXCIpIGVsLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgZWxzZSBjaGVja0lucHV0VmFsaWRhdGlvbih7IHRhcmdldDogZWwgfSBhcyBhbnksIGJpbmQudmFsdWUpXG4gIH0sXG4gIHVuYmluZDogKGVsOiBFbGVtZW50KSA9PiB7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuXG4gIH0sXG59XG4iLCJpbXBvcnQgeyBNZW51SGVscGVyLCBtZW51VHlwZSwgTWVudU5vdGlmaWNhdGlvbnMsIElNZW51RGVmaW5pdGlvbiB9IGZyb20gXCIuL2hlbHBlcnMvTWVudUhlbHBlclwiO1xuaW1wb3J0IHsgQ29tbW9uUmVnaXN0cnkgfSBmcm9tIFwiLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gXCIuL2hlbHBlcnMvTWVzc2FnZVNlcnZpY2VcIjtcbmltcG9ydCB7IElSb3V0ZUNvbmZpZyB9IGZyb20gXCIuL2ludGVyZmFjZXMvUm91dGVySW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgSVN0b3JlIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9TdG9yZUludGVyZmFjZXNcIjtcbmltcG9ydCBJbmplY3QgZnJvbSBcIi4vY29tcG9uZW50cy9pbmplY3QudnVlXCI7XG5pbXBvcnQgU2NyZWVuIGZyb20gXCIuL2NvbXBvbmVudHMvc2NyZWVuLnZ1ZVwiO1xuaW1wb3J0IHsgVnVlQ29uc3RydWN0b3IgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBJUHJvamVjdGFibGVNb2RlbCwgUHJvamVjdGFibGUsIFByb2plY3RvciB9IGZyb20gXCIuL2hlbHBlcnMvUHJvamVjdG9yXCI7XG5pbXBvcnQgZGlyZWN0aXZlcywgeyBTY3JlZW5zTWFuYWdlciB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvc2NyZWVuXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZSBhcyBWYWxpZGF0ZURpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvdmFsaWRhdGVcIjtcblxuXG5mdW5jdGlvbiBpbnN0YWxsKFZ1ZTogVnVlQ29uc3RydWN0b3IpIHtcbiAgVnVlLmNvbXBvbmVudChcInNjcmVlblwiLCBTY3JlZW4pO1xuICBWdWUuY29tcG9uZW50KFwiaW5qZWN0XCIsIEluamVjdCk7XG4gIFZ1ZS5kaXJlY3RpdmUoXCJzY3JlZW5cIiwgZGlyZWN0aXZlcy5zY3JlZW5EaXJlY3RpdmUpO1xuICBWdWUuZGlyZWN0aXZlKFwicHJvamVjdFRvXCIsIGRpcmVjdGl2ZXMucHJvamVjdFRvRGlyZWN0aXZlKTtcbiAgVnVlLmRpcmVjdGl2ZShcInZhbGlkYXRlXCIsIFZhbGlkYXRlRGlyZWN0aXZlIGFzIGFueSk7XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJTW9kdWxlSW5pdGlhbGl6ZXIge1xuICBpbml0KG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSk6IFByb21pc2U8dm9pZD4sXG5cbiAgY29uZmlnPyhtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkpOiBQcm9taXNlPHZvaWQ+LFxuXG4gIHJ1bj8obWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55KTogUHJvbWlzZTx2b2lkPixcblxuICByb3V0ZXM6IElSb3V0ZUNvbmZpZ1tdXG59XG5cbmludGVyZmFjZSBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyIHtcbiAgaW5pdChtZW51OiBNZW51SGVscGVyLFxuICAgIHN0b3JlOiBJU3RvcmUsXG4gICAgY29uZmlndXJhdGlvbjogYW55XG4gICAgLCBvcHRpb25zOiB7XG4gICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnksXG4gICAgICBtZXNzYWdlU2VydmljZTogdHlwZW9mIE1lc3NhZ2VTZXJ2aWNlLkluc3RhbmNlLFxuICAgICAgcHJvamVjdG9yOiBQcm9qZWN0b3IsXG4gICAgICBzY3JlZW5zOiBTY3JlZW5zTWFuYWdlclxuICAgIH0pOiBQcm9taXNlPHZvaWQ+LFxuICBjb25maWcobWVudTogTWVudUhlbHBlcixcbiAgICBzdG9yZTogSVN0b3JlKTogUHJvbWlzZTx2b2lkPixcbiAgcnVuKG1lbnU6IE1lbnVIZWxwZXIsXG4gICAgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4sXG4gIHJvdXRlczogSVJvdXRlQ29uZmlnW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1vZHVsZUluaXRpYWxpemVyKG9wdHM6IElNb2R1bGVJbml0aWFsaXplcik6IFByb21pc2U8SU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcj47XG5leHBvcnQgZnVuY3Rpb24gTW9kdWxlSW5pdGlhbGl6ZXIob3B0czogKCkgPT4gUHJvbWlzZTxJTW9kdWxlSW5pdGlhbGl6ZXI+KTogUHJvbWlzZTxJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyPjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBNb2R1bGVJbml0aWFsaXplcihwYXJhbXM6IElNb2R1bGVJbml0aWFsaXplciB8ICgoKSA9PiBQcm9taXNlPElNb2R1bGVJbml0aWFsaXplcj4pKTogUHJvbWlzZTxJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyPiB7XG4gIGxldCBvcHRzOiBJTW9kdWxlSW5pdGlhbGl6ZXIgPSBwYXJhbXMgYXMgSU1vZHVsZUluaXRpYWxpemVyO1xuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgb3B0cyA9IGF3YWl0IHBhcmFtcygpO1xuICB9XG4gIGxldCBtb2R1bGVDb25maWcgPSB7fTtcbiAgcmV0dXJuIHtcbiAgICBpbml0KG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSwgb3B0aW9uczoge1xuICAgICAgcmVnaXN0cnk6IENvbW1vblJlZ2lzdHJ5LFxuICAgICAgbWVzc2FnZVNlcnZpY2U6IHR5cGVvZiBNZXNzYWdlU2VydmljZS5JbnN0YW5jZSxcbiAgICAgIHByb2plY3RvcjogUHJvamVjdG9yLFxuICAgICAgc2NyZWVuczogU2NyZWVuc01hbmFnZXJcbiAgICB9KSB7XG5cbiAgICAgIGlmIChvcHRpb25zLnJlZ2lzdHJ5KSBDb21tb25SZWdpc3RyeS5JbnN0YW5jZSA9IG9wdGlvbnMucmVnaXN0cnk7XG4gICAgICBpZiAob3B0aW9ucy5tZXNzYWdlU2VydmljZSkgTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UgPSBvcHRpb25zLm1lc3NhZ2VTZXJ2aWNlXG4gICAgICBpZiAob3B0aW9ucy5wcm9qZWN0b3IpIFByb2plY3Rvci5JbnN0YW5jZSA9IG9wdGlvbnMucHJvamVjdG9yO1xuICAgICAgaWYgKG9wdGlvbnMuc2NyZWVucykgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2UgPSBvcHRpb25zLnNjcmVlbnM7XG4gICAgICBtb2R1bGVDb25maWcgPSBjb25maWd1cmF0aW9uO1xuICAgICAgcmV0dXJuIG9wdHMuaW5pdChtZW51LCBzdG9yZSwgY29uZmlndXJhdGlvbik7XG4gICAgfSxcbiAgICBjb25maWcobWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSkge1xuICAgICAgcmV0dXJuIG9wdHMuY29uZmlnID8gb3B0cy5jb25maWcobWVudSwgc3RvcmUsIG1vZHVsZUNvbmZpZykgOiBudWxsO1xuICAgIH0sXG4gICAgcnVuKG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUpIHtcbiAgICAgIHJldHVybiBvcHRzLnJ1biA/IG9wdHMucnVuKG1lbnUsIHN0b3JlLCBtb2R1bGVDb25maWcpIDogbnVsbDtcbiAgICB9LFxuICAgIHJvdXRlczogb3B0cy5yb3V0ZXNcbiAgfSBhcyBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBJbml0TW9kdWxlKG1vZHVsZTogYW55LCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkgfCB1bmRlZmluZWQpOiBQcm9taXNlPElNb2R1bGVJbml0aWFsaXplcj4ge1xuICBjb25zdCBpbml0b2JqID0gYXdhaXQgKChtb2R1bGUuZGVmYXVsdC5kZWZhdWx0IHx8IG1vZHVsZS5kZWZhdWx0KSBhcyBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyKTtcbiAgcmV0dXJuIGluaXRvYmouaW5pdChNZW51SGVscGVyLkluc3RhbmNlLCBzdG9yZSwgY29uZmlndXJhdGlvbiB8fCB7fSxcbiAgICB7XG4gICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UsXG4gICAgICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UsXG4gICAgICBwcm9qZWN0b3I6IFByb2plY3Rvci5JbnN0YW5jZSxcbiAgICAgIHNjcmVlbnM6IFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gaW5pdG9iaiBhcyB1bmtub3duIGFzIElNb2R1bGVJbml0aWFsaXplcjtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIENvbmZpZ01vZHVsZShtb2R1bGU6IGFueSwgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBpbml0b2JqID0gYXdhaXQgKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLmNvbmZpZyhNZW51SGVscGVyLkluc3RhbmNlLCBzdG9yZSk7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFJ1bk1vZHVsZShtb2R1bGU6IGFueSwgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBpbml0b2JqID0gYXdhaXQgKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLnJ1bihNZW51SGVscGVyLkluc3RhbmNlLCBzdG9yZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBNb2R1bGVSb3V0ZXMobW9kdWxlOiBhbnkpOiBQcm9taXNlPElSb3V0ZUNvbmZpZ1tdPiB7XG4gIGNvbnN0IGluaXRvYmogPSBhd2FpdCAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcbiAgcmV0dXJuIGluaXRvYmoucm91dGVzO1xufVxuXG5leHBvcnQge1xuICBNZW51SGVscGVyLFxuICB0eXBlIElNZW51RGVmaW5pdGlvbixcbiAgbWVudVR5cGUsXG4gIENvbW1vblJlZ2lzdHJ5LFxuICBNZXNzYWdlU2VydmljZSxcbiAgSW5qZWN0LFxuICBTY3JlZW4sXG4gIFZhbGlkYXRlRGlyZWN0aXZlLFxuICB0eXBlIFByb2plY3RhYmxlLFxuICB0eXBlIElQcm9qZWN0YWJsZU1vZGVsLFxuICBNZW51Tm90aWZpY2F0aW9ucyxcbiAgUHJvamVjdG9yLFxufVxuXG5jb25zdCBWdWVNZk1vZHVsZSA9IHtcbiAgaW5zdGFsbCxcbiAgTWVudUhlbHBlcjogbmV3IE1lbnVIZWxwZXIoKSxcbiAgbWVudVR5cGUsXG4gIENvbW1vblJlZ2lzdHJ5OiBuZXcgQ29tbW9uUmVnaXN0cnkoKSxcbiAgTWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxuICBJbmplY3QsXG4gIFNjcmVlbixcbiAgVmFsaWRhdGVEaXJlY3RpdmUsXG4gIE1lbnVOb3RpZmljYXRpb25zLFxuICBQcm9qZWN0b3Jcbn1cblxuZXhwb3J0IGRlZmF1bHQgVnVlTWZNb2R1bGU7XG4iXSwibmFtZXMiOlsiRSIsIm5hbWUiLCJjYWxsYmFjayIsImN0eCIsImUiLCJzZWxmIiwibGlzdGVuZXIiLCJkYXRhIiwiZXZ0QXJyIiwiaSIsImxlbiIsImV2dHMiLCJsaXZlRXZlbnRzIiwidGlueUVtaXR0ZXJNb2R1bGUiLCJUaW55RW1pdHRlciIsInRpbnlFbWl0dGVyIiwibWVudVR5cGUiLCJtZW51VHlwZTIiLCJNZW51Tm90aWZpY2F0aW9ucyIsIl9NZW51SGVscGVyIiwiX19wdWJsaWNGaWVsZCIsIm1lbnVEZWZpbml0aW9uIiwicG9zaXRpb25zIiwiZm91bmQiLCJtIiwiZWxlbWVudCIsIm1lbnUiLCJyZXN1bHQiLCJ1c2VkIiwia2V5IiwicnIiLCJhIiwiYiIsIk1lbnVIZWxwZXIiLCJfQ29tbW9uUmVnaXN0cnkiLCJ2IiwiY29tcG9uZW50IiwiZ3JvdXAiLCJnZyIsImciLCJzZXJ2aWNlIiwiQ29tbW9uUmVnaXN0cnkiLCJhc2tSZXBseUNoYW5uZWxzIiwic2VuZFN1YnNjcmliZUNoYW5uZWxzIiwic2VuZFN1YnNjcmliZUNhbGxiYWNrcyIsImFzayIsImFyZ3MiLCJyZXNvbHZlIiwicG9ydCIsIl9hIiwiYyIsImlubmVyY2hhbm5lbCIsImwiLCJldnQiLCJyZXBseSIsImNiIiwib3B0cyIsImlubmVycG9ydCIsInIiLCJzZW5kIiwic3Vic2NyaWJlIiwib25jZSIsInVuc3Vic2NyaWJlIiwiTWVzc2FnZVNlcnZpY2UiLCJfc2ZjX21haW4kMSIsImRlZmluZUNvbXBvbmVudCIsInByb3BzIiwiZW1pdCIsIlZhbHVlIiwiY29tcHV0ZWQiLCJDb21wb25lbnRzIiwiY2xpY2siLCJzYXZlIiwiX1Byb2plY3RvciIsInNjcmVlbiIsInF1ZXVlIiwiYXN5bmMiLCJtb2RlbCIsInByb21pc2UiLCJyZWplY3QiLCJzcyIsIl9zY3JlZW4iLCJzIiwiUHJvamVjdG9yIiwiX3NmY19tYWluIiwiZXhwb3NlIiwibWUiLCJnZXRDdXJyZW50SW5zdGFuY2UiLCJjdXJyZW50VmlldyIsInJlZiIsImlzVmlzaWJsZSIsImN1cnJlbnRWaWV3VUlEIiwib25Nb3VudGVkIiwicHJvamVjdFRvRGlyZWN0aXZlIiwiZWwiLCJiaW5kIiwiU2NyZWVuc01hbmFnZXIiLCJzY3JlZW5EaXJlY3RpdmUiLCJiaW5kaW5nIiwiZGlyZWN0aXZlcyIsIl9TY3JlZW5zTWFuYWdlciIsImRvbUVsZW1lbnQiLCJjaGVja0lucHV0VmFsaWRhdGlvbiIsImNhbGxvdXQiLCJlcnJvcnMiLCJ2YWxpZGF0ZSIsImFyZyIsImluc3RhbGwiLCJWdWUiLCJTY3JlZW4iLCJJbmplY3QiLCJWYWxpZGF0ZURpcmVjdGl2ZSIsIk1vZHVsZUluaXRpYWxpemVyIiwicGFyYW1zIiwibW9kdWxlQ29uZmlnIiwic3RvcmUiLCJjb25maWd1cmF0aW9uIiwib3B0aW9ucyIsIkluaXRNb2R1bGUiLCJtb2R1bGUiLCJpbml0b2JqIiwiQ29uZmlnTW9kdWxlIiwiUnVuTW9kdWxlIiwiTW9kdWxlUm91dGVzIiwiVnVlTWZNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsU0FBU0EsSUFBSztBQUdkO0FBRUFBLEVBQUUsWUFBWTtBQUFBLEVBQ1osSUFBSSxTQUFVQyxHQUFNQyxHQUFVQyxHQUFLO0FBQ2pDLFFBQUlDLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxDQUFBO0FBRTVCLFlBQUNBLEVBQUVILE9BQVVHLEVBQUVILEtBQVEsQ0FBQSxJQUFLLEtBQUs7QUFBQSxNQUMvQixJQUFJQztBQUFBLE1BQ0osS0FBS0M7QUFBQSxJQUNYLENBQUssR0FFTTtBQUFBLEVBQ1I7QUFBQSxFQUVELE1BQU0sU0FBVUYsR0FBTUMsR0FBVUMsR0FBSztBQUNuQyxRQUFJRSxJQUFPO0FBQ1gsYUFBU0MsSUFBWTtBQUNuQixNQUFBRCxFQUFLLElBQUlKLEdBQU1LLENBQVEsR0FDdkJKLEVBQVMsTUFBTUMsR0FBSyxTQUFTO0FBQUEsSUFFbkM7QUFDSSxXQUFBRyxFQUFTLElBQUlKLEdBQ04sS0FBSyxHQUFHRCxHQUFNSyxHQUFVSCxDQUFHO0FBQUEsRUFDbkM7QUFBQSxFQUVELE1BQU0sU0FBVUYsR0FBTTtBQUNwQixRQUFJTSxJQUFPLENBQUEsRUFBRyxNQUFNLEtBQUssV0FBVyxDQUFDLEdBQ2pDQyxNQUFXLEtBQUssTUFBTSxLQUFLLElBQUksQ0FBQSxJQUFLUCxNQUFTLENBQUUsR0FBRSxNQUFLLEdBQ3REUSxJQUFJLEdBQ0pDLElBQU1GLEVBQU87QUFFakIsU0FBS0MsR0FBR0EsSUFBSUMsR0FBS0Q7QUFDZixNQUFBRCxFQUFPQyxHQUFHLEdBQUcsTUFBTUQsRUFBT0MsR0FBRyxLQUFLRixDQUFJO0FBR3hDLFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxLQUFLLFNBQVVOLEdBQU1DLEdBQVU7QUFDN0IsUUFBSUUsSUFBSSxLQUFLLE1BQU0sS0FBSyxJQUFJLENBQUEsSUFDeEJPLElBQU9QLEVBQUVILElBQ1RXLElBQWEsQ0FB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
