var G = Object.defineProperty;
var X = (n, e, t) => e in n ? G(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var c = (n, e, t) => (X(n, typeof e != "symbol" ? e + "" : e, t), t);
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
      for (var s = 0, l = r.length; s < l; s++)
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
    c(this, "menuDefinitions", []);
    c(this, "menuStructure", {});
    c(this, "notifications", new K());
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
      let l = {
        item: this.menuDefinitions.find((a) => a.name == i && (!a.hidden || !a.hidden())),
        children: s.map((a) => this.menuDefinitions.find((o) => o.name == a && (!o.hidden || !o.hidden()))).filter((a) => !!a).sort((a, o) => a && o && a.orderIndex && o.orderIndex && a.orderIndex > o.orderIndex ? 1 : a && o && a.orderIndex && o.orderIndex && a.orderIndex < o.orderIndex ? -1 : 0)
      };
      l.item && (r.add(i), s.forEach((a) => r.add(a)), t.push(l));
    }
    return t.filter((i) => !!i.item).sort((i, s) => i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex > s.item.orderIndex ? 1 : i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex < s.item.orderIndex ? -1 : 0);
  }
};
let h = _;
c(h, "instance", new _());
const V = class {
  constructor() {
    c(this, "registry", /* @__PURE__ */ new Map());
    c(this, "groupedregistry", /* @__PURE__ */ new Map());
    c(this, "serviceregistry", /* @__PURE__ */ new Map());
    c(this, "groupedserviceregistry", /* @__PURE__ */ new Map());
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
c(f, "instance", new V());
const I = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), W = (n, ...e) => new Promise((t) => {
  var l;
  let r = (l = I.get(n)) == null ? void 0 : l.port1;
  if (!r) {
    const a = new MessageChannel();
    I.set(n, a), r = a.port1;
  }
  let i = new MessageChannel();
  const s = (a) => {
    t(a.data), i = null;
  };
  i.port1.onmessage = s, r.postMessage(e, [i.port2]);
}), J = (n, e, t = { force: !1 }) => {
  var s;
  let r = (s = I.get(n)) == null ? void 0 : s.port2;
  if (!r) {
    const l = new MessageChannel();
    I.set(n, l), r = l.port2;
  }
  if (!t.force && r.onmessage)
    throw "reply already set for message " + n;
  const i = async (l) => {
    const a = l.ports[0], o = await e(...l.data);
    a.postMessage(o), a.close();
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
  return w.set(e, r), t.addEventListener("message", r), t.start(), () => {
    t == null || t.removeEventListener("message", r), w.delete(e);
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
  const r = w.get(e);
  r && (t.removeEventListener("message", r), w.delete(e));
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
      set: (l) => {
        e("input", l);
      }
    }), r = y(() => n.name ? [f.Instance.getComponent(n.name, n.group)] : n.group ? f.Instance.getGroupComponents(n.group, ...n.names || []) : f.Instance.getComponents(...n.names || [])), i = (...l) => {
      e("click", ...l);
    }, s = (...l) => {
      e("save", ...l);
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
function O(n, e, t, r, i, s, l, a) {
  var o = typeof n == "function" ? n.options : n;
  e && (o.render = e, o.staticRenderFns = t, o._compiled = !0), r && (o.functional = !0), s && (o._scopeId = "data-v-" + s);
  var u;
  if (l ? (u = function(d) {
    d = d || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !d && typeof __VUE_SSR_CONTEXT__ < "u" && (d = __VUE_SSR_CONTEXT__), i && i.call(this, d), d && d._registeredComponents && d._registeredComponents.add(l);
  }, o._ssrRegister = u) : i && (u = a ? function() {
    i.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), u)
    if (o.functional) {
      o._injectStyles = u;
      var j = o.render;
      o.render = function(F, T) {
        return u.call(T), j(F, T);
      };
    } else {
      var b = o.beforeCreate;
      o.beforeCreate = b ? [].concat(b, u) : [u];
    }
  return {
    exports: n,
    options: o
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
    c(this, "screens", /* @__PURE__ */ new Map());
    c(this, "projecting", /* @__PURE__ */ new Map());
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
    const l = { data: t }, a = s ? new Promise((u, j) => {
      l.reject = j, l.resolve = u;
    }) : null;
    i ? (this.projecting.has(r) || this.projecting.set(r, []), (this.projecting.get(r) || []).push({ component: e, model: l, promise: a, queue: i })) : this.projecting.set(r, [{ component: e, model: l, promise: a, queue: i }]);
    const o = this.screens.get(r);
    return o ? (o.model = l, o.currentView = e, a && a.then(() => this.stopProjecting(r)).catch(() => this.stopProjecting(r)), a) : null;
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
let v = M;
c(v, "instance", new M());
const ne = E({
  name: "screen",
  props: {
    name: { type: String, default: "defaultscreen" }
  },
  setup(n, { expose: e }) {
    const t = z(), r = $(null), i = $(null);
    e({ currentView: r, model: i });
    const s = y(() => r.value != null), l = y(() => {
      var a;
      return (a = r.value) == null ? void 0 : a.__file;
    });
    return B(() => {
      v.Instance.setScreen(t.proxy, n.name);
    }), {
      currentViewUID: l,
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
    c(this, "screens", /* @__PURE__ */ new Map());
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
c(g, "instance", new C());
function p(n, e) {
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
          n.onblur = (t) => p(t, e.value);
          break;
        case "SELECT":
          n.onchange = (t) => p(t, e.value);
          break;
      }
      n.oninvalid = (t) => p(t, e.value), n.form && n.form.addEventListener("invalid", () => p({ target: n }, e.value)), e.arg == "immediate" ? n.reportValidity() : p({ target: n }, e.value);
    }
  },
  unbind: (n) => {
  }
};
function le(n) {
  n.component("screen", P), n.component("inject", L), n.directive("screen", k.screenDirective), n.directive("projectTo", k.projectToDirective), n.directive("validate", U);
}
function fe(n) {
  let e = {};
  return {
    init(t, r, i, s) {
      return s.registry && (f.Instance = s.registry), s.messageService && (x.Instance = s.messageService), s.projector && (v.Instance = s.projector), s.screens && (g.Instance = s.screens), e = i, n.init(ce, t, r, i);
    },
    config(t, r) {
      return n.config ? n.config(t, r, e) : null;
    },
    run(t, r) {
      return n.run ? n.run(t, r, e) : null;
    },
    routes: n.routes
  };
}
function ge(n, e, t) {
  const r = n.default.default || n.default;
  return r.init(
    h.Instance,
    e,
    t || {},
    {
      registry: f.Instance,
      messageService: x.Instance,
      projector: v.Instance,
      screens: g.Instance
    }
  ).then(() => r);
}
function he(n, e) {
  return (n.default.default || n.default).config(h.Instance, e);
}
function ve(n, e) {
  return (n.default.default || n.default).run(h.Instance, e);
}
function pe(n) {
  return (n.default.default || n.default).routes;
}
const ce = {
  install: le,
  MenuHelper: new h(),
  menuType: D,
  CommonRegistry: new f(),
  MessageService: x,
  Inject: L,
  Screen: P,
  ValidateDirective: U,
  MenuNotifications: R,
  Projector: v
};
export {
  f as CommonRegistry,
  he as ConfigModule,
  ge as InitModule,
  L as Inject,
  h as MenuHelper,
  R as MenuNotifications,
  x as MessageService,
  fe as ModuleInitializer,
  pe as ModuleRoutes,
  v as Projector,
  ve as RunModule,
  P as Screen,
  U as ValidateDirective,
  ce as default,
  D as menuType
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLW1mLW1vZHVsZS5lcy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qcyIsIi4uL3NyYy9oZWxwZXJzL01lbnVIZWxwZXIudHMiLCIuLi9zcmMvaGVscGVycy9Db21tb25SZWdpc3RyeS50cyIsIi4uL3NyYy9oZWxwZXJzL01lc3NhZ2VTZXJ2aWNlLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW5qZWN0LnRzP3Z1ZSZ0eXBlPXNjcmlwdCZzcmM9dHJ1ZSZsYW5nLnRzIiwiLi4vc3JjL2hlbHBlcnMvUHJvamVjdG9yLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvc2NyZWVuLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZy50cyIsIi4uL3NyYy9kaXJlY3RpdmVzL3NjcmVlbi50cyIsIi4uL3NyYy9kaXJlY3RpdmVzL3ZhbGlkYXRlLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEUgKCkge1xuICAvLyBLZWVwIHRoaXMgZW1wdHkgc28gaXQncyBlYXNpZXIgdG8gaW5oZXJpdCBmcm9tXG4gIC8vICh2aWEgaHR0cHM6Ly9naXRodWIuY29tL2xpcHNtYWNrIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0Y29yZ2FuL3RpbnktZW1pdHRlci9pc3N1ZXMvMylcbn1cblxuRS5wcm90b3R5cGUgPSB7XG4gIG9uOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGN0eCkge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG5cbiAgICAoZVtuYW1lXSB8fCAoZVtuYW1lXSA9IFtdKSkucHVzaCh7XG4gICAgICBmbjogY2FsbGJhY2ssXG4gICAgICBjdHg6IGN0eFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb25jZTogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gbGlzdGVuZXIgKCkge1xuICAgICAgc2VsZi5vZmYobmFtZSwgbGlzdGVuZXIpO1xuICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBsaXN0ZW5lci5fID0gY2FsbGJhY2tcbiAgICByZXR1cm4gdGhpcy5vbihuYW1lLCBsaXN0ZW5lciwgY3R4KTtcbiAgfSxcblxuICBlbWl0OiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBkYXRhID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHZhciBldnRBcnIgPSAoKHRoaXMuZSB8fCAodGhpcy5lID0ge30pKVtuYW1lXSB8fCBbXSkuc2xpY2UoKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGxlbiA9IGV2dEFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGk7IGkgPCBsZW47IGkrKykge1xuICAgICAgZXZ0QXJyW2ldLmZuLmFwcGx5KGV2dEFycltpXS5jdHgsIGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9mZjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGUgPSB0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KTtcbiAgICB2YXIgZXZ0cyA9IGVbbmFtZV07XG4gICAgdmFyIGxpdmVFdmVudHMgPSBbXTtcblxuICAgIGlmIChldnRzICYmIGNhbGxiYWNrKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZXZ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZXZ0c1tpXS5mbiAhPT0gY2FsbGJhY2sgJiYgZXZ0c1tpXS5mbi5fICE9PSBjYWxsYmFjaylcbiAgICAgICAgICBsaXZlRXZlbnRzLnB1c2goZXZ0c1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGV2ZW50IGZyb20gcXVldWUgdG8gcHJldmVudCBtZW1vcnkgbGVha1xuICAgIC8vIFN1Z2dlc3RlZCBieSBodHRwczovL2dpdGh1Yi5jb20vbGF6ZFxuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0Y29yZ2FuL3RpbnktZW1pdHRlci9jb21taXQvYzZlYmZhYTliYzk3M2IzM2QxMTBhODRhMzA3NzQyYjdjZjk0Yzk1MyNjb21taXRjb21tZW50LTUwMjQ5MTBcblxuICAgIChsaXZlRXZlbnRzLmxlbmd0aClcbiAgICAgID8gZVtuYW1lXSA9IGxpdmVFdmVudHNcbiAgICAgIDogZGVsZXRlIGVbbmFtZV07XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFO1xubW9kdWxlLmV4cG9ydHMuVGlueUVtaXR0ZXIgPSBFO1xuIiwiaW1wb3J0IHsgVGlueUVtaXR0ZXIgfSBmcm9tICd0aW55LWVtaXR0ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZW51RGVmaW5pdGlvbiB7XG4gIG5hbWU6IHN0cmluZyxcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgaWNvbj86IHN0cmluZyxcbiAgcm91dGVOYW1lPzogc3RyaW5nLFxuICByb3V0ZVBhcmFtcz86IG9iamVjdCxcbiAgZmVhdHVyZWZsYWdzPzogc3RyaW5nW10sXG4gIG9yZGVySW5kZXg/OiBudW1iZXIsXG4gIGNsYXNzPzogc3RyaW5nLFxuICBoaWRkZW46ICgpID0+IGJvb2xlYW5cbn1cblxuXG5leHBvcnQgZW51bSBtZW51VHlwZSB7XG4gIGRyYXdlciwgICAgICAgLy8gRHJhd2VyIE1lbnVcbiAgYm90dG9tLCAgICAgICAvLyBCb3R0b20gTWVudVxuICBoZWFkZXJcbn1cblxuZXhwb3J0IGNvbnN0IE1lbnVOb3RpZmljYXRpb25zID0ge1xuICBtZW51RGVmaW5pdGlvbkFkZGVkOiAnbmV3bWVudWl0ZW0nXG59XG5cbmV4cG9ydCBjbGFzcyBNZW51SGVscGVyIHtcblxuICBwcml2YXRlIG1lbnVEZWZpbml0aW9uczogSU1lbnVEZWZpbml0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBtZW51U3RydWN0dXJlOiB7IFtrZXk6IHN0cmluZ106IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSB9ID0ge31cbiAgcHJpdmF0ZSBub3RpZmljYXRpb25zOiBUaW55RW1pdHRlciA9IG5ldyBUaW55RW1pdHRlcigpO1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBNZW51SGVscGVyKCk7XG4gIHB1YmxpYyBnZXQgTm90aWZpY2F0aW9ucygpIHsgcmV0dXJuIHRoaXMubm90aWZpY2F0aW9uczsgfVxuICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpIHsgcmV0dXJuIE1lbnVIZWxwZXIuaW5zdGFuY2UgfVxuXG4gIHB1YmxpYyBhZGRNZW51RGVmaW5pdGlvbihtZW51RGVmaW5pdGlvbjogSU1lbnVEZWZpbml0aW9uLCAuLi5wb3NpdGlvbnM6IHsgc2VjdGlvbjogbWVudVR5cGUsIHBhcmVudD86IHN0cmluZyB9W10pIHtcblxuICAgIC8vIEFnZ2l1bmdvIGxhIGRpY2hpYXJhemlvbmUgZGVsIG1lbnXDuSBhbGwnZWxlbmNvIGRlaSBtZW7DuSBkaXNwb25pYmlsaS5cbiAgICBsZXQgZm91bmQgPSB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4gbS5uYW1lID09IG1lbnVEZWZpbml0aW9uLm5hbWUpO1xuICAgIGlmICghZm91bmQpXG4gICAgICB0aGlzLm1lbnVEZWZpbml0aW9ucy5wdXNoKG1lbnVEZWZpbml0aW9uKTtcbiAgICBlbHNlXG4gICAgICBtZW51RGVmaW5pdGlvbiA9IGZvdW5kO1xuXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHBvc2l0aW9ucykge1xuXG4gICAgICB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXSA9IHRoaXMubWVudVN0cnVjdHVyZVtlbGVtZW50LnNlY3Rpb25dIHx8IHt9O1xuICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnQgfHwgbWVudURlZmluaXRpb24ubmFtZV0gPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXVtlbGVtZW50LnBhcmVudCB8fCBtZW51RGVmaW5pdGlvbi5uYW1lXSB8fCBbXTtcblxuICAgICAgaWYgKGVsZW1lbnQucGFyZW50KVxuICAgICAgICB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXVtlbGVtZW50LnBhcmVudF0ucHVzaChtZW51RGVmaW5pdGlvbi5uYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMuZW1pdChNZW51Tm90aWZpY2F0aW9ucy5tZW51RGVmaW5pdGlvbkFkZGVkLCBtZW51RGVmaW5pdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWVudUl0ZW0obmFtZTogc3RyaW5nKTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5tZW51RGVmaW5pdGlvbnMuZmluZChpID0+IGkubmFtZSA9PSBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNZW51KG1lbnU6IG1lbnVUeXBlKTogeyBpdGVtOiBJTWVudURlZmluaXRpb24gfCB1bmRlZmluZWQsIGNoaWxkcmVuOiAoSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkKVtdIH1bXSB7XG4gICAgbGV0IHJlc3VsdDogeyBpdGVtOiBJTWVudURlZmluaXRpb24gfCB1bmRlZmluZWQsIGNoaWxkcmVuOiAoSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkKVtdIH1bXSA9IFtdO1xuICAgIGxldCB1c2VkID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm1lbnVTdHJ1Y3R1cmVbbWVudV0pIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbbWVudV1ba2V5XTtcblxuXG4gICAgICBsZXQgcnIgPSB7XG4gICAgICAgIGl0ZW06IHRoaXMubWVudURlZmluaXRpb25zLmZpbmQobSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG0ubmFtZSA9PSBrZXkgJiZcbiAgICAgICAgICAgICghbS5oaWRkZW4gfHwgIW0uaGlkZGVuKCkpXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGNoaWxkcmVuOiBlbGVtZW50Lm1hcChpID0+IHRoaXMubWVudURlZmluaXRpb25zLmZpbmQobSA9PiBtLm5hbWUgPT0gaSAmJiAoIW0uaGlkZGVuIHx8ICFtLmhpZGRlbigpKSkpXG4gICAgICAgICAgLmZpbHRlcihpID0+ICEhaSlcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgaWYgKGEgJiYgYiAmJiBhLm9yZGVySW5kZXggJiYgYi5vcmRlckluZGV4ICYmIGEub3JkZXJJbmRleCA+IGIub3JkZXJJbmRleCkgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAoYSAmJiBiICYmIGEub3JkZXJJbmRleCAmJiBiLm9yZGVySW5kZXggJiYgYS5vcmRlckluZGV4IDwgYi5vcmRlckluZGV4KSByZXR1cm4gLTE7XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgIH0pXG4gICAgICB9O1xuXG4gICAgICBpZiAoISFyci5pdGVtKSB7XG4gICAgICAgIHVzZWQuYWRkKGtleSk7XG4gICAgICAgIGVsZW1lbnQuZm9yRWFjaChpID0+IHVzZWQuYWRkKGkpKTtcbiAgICAgICAgcmVzdWx0LnB1c2gocnIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmZpbHRlcihpID0+ICEhaS5pdGVtKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEgJiYgYiAmJiBhLml0ZW0gJiYgYi5pdGVtICYmIGEuaXRlbS5vcmRlckluZGV4ICYmIGIuaXRlbS5vcmRlckluZGV4ICYmIGEuaXRlbS5vcmRlckluZGV4ID4gYi5pdGVtLm9yZGVySW5kZXgpIHJldHVybiAxO1xuICAgICAgICBpZiAoYSAmJiBiICYmIGEuaXRlbSAmJiBiLml0ZW0gJiYgYS5pdGVtLm9yZGVySW5kZXggJiYgYi5pdGVtLm9yZGVySW5kZXggJiYgYS5pdGVtLm9yZGVySW5kZXggPCBiLml0ZW0ub3JkZXJJbmRleCkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfSk7XG4gIH1cbn1cblxuIiwiXG5leHBvcnQgY2xhc3MgQ29tbW9uUmVnaXN0cnkge1xuXG4gIHByaXZhdGUgcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICBwcml2YXRlIGdyb3VwZWRyZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBhbnk+PigpO1xuICBwcml2YXRlIHNlcnZpY2VyZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gIHByaXZhdGUgZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBhbnk+PigpO1xuXG5cbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbW1vblJlZ2lzdHJ5ID0gbmV3IENvbW1vblJlZ2lzdHJ5KCk7XG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLmluc3RhbmNlOyB9XG4gIHN0YXRpYyBzZXQgSW5zdGFuY2UodjogQ29tbW9uUmVnaXN0cnkpIHsgdGhpcy5pbnN0YW5jZSA9IHYgfTtcblxuICBwcm92aWRlQ29tcG9uZW50KGNvbXBvbmVudDogYW55LCBuYW1lOiBzdHJpbmcsIGdyb3VwPzogc3RyaW5nKSB7XG4gICAgdGhpcy5yZWdpc3RyeS5zZXQoZ3JvdXAgPyBgJHtncm91cH0tJHtuYW1lfWAgOiBuYW1lLCBjb21wb25lbnQpO1xuICAgIGlmIChncm91cCkge1xuICAgICAgaWYgKCF0aGlzLmdyb3VwZWRyZWdpc3RyeS5oYXMoZ3JvdXApKSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5zZXQoZ3JvdXAsIG5ldyBNYXA8c3RyaW5nLCBhbnk+KCkpO1xuXG4gICAgICBsZXQgZ2cgPSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgICAgaWYgKGdnKSBnZy5zZXQobmFtZSwgY29tcG9uZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXRDb21wb25lbnQobmFtZTogc3RyaW5nLCBncm91cD86IHN0cmluZyk6IGFueSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmdldChncm91cCA/IGAke2dyb3VwfS0ke25hbWV9YCA6IG5hbWUpIHx8IG51bGw7XG4gIH1cblxuICBnZXRDb21wb25lbnRzKC4uLm5hbWU6IHN0cmluZ1tdKTogKGFueSlbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5yZWdpc3RyeS5lbnRyaWVzKCkpLmZpbHRlcihpID0+IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcbiAgfVxuXG4gIGdldEdyb3VwQ29tcG9uZW50cyhncm91cDogc3RyaW5nLCAuLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xuICAgIGxldCBnID0gdGhpcy5ncm91cGVkcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICBpZiAoZylcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKGcuZW50cmllcygpIHx8IFtdKS5maWx0ZXIoaSA9PiAoIW5hbWUgfHwgbmFtZS5sZW5ndGggPT0gMCkgfHwgbmFtZS5pbmRleE9mKGlbMF0pID49IDApLm1hcChpID0+IGlbMV0pO1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgZ2V0R3JvdXBDb21wb25lbnRzS2V5cyhncm91cDogc3RyaW5nKTogKHN0cmluZylbXSB7XG4gICAgbGV0IGcgPSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgIGlmIChnKSByZXR1cm4gQXJyYXkuZnJvbShnLmtleXMoKSk7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBwcm92aWRlU2VydmljZShuYW1lOiBzdHJpbmcsIHNlcnZpY2U6IGFueSwgZ3JvdXA/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlcnZpY2VyZWdpc3RyeS5zZXQobmFtZSwgc2VydmljZSk7XG4gICAgaWYgKGdyb3VwKSB7XG4gICAgICBpZiAoIXRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5oYXMoZ3JvdXApKSB0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuc2V0KGdyb3VwLCBuZXcgTWFwPHN0cmluZywgYW55PigpKTtcbiAgICAgIGxldCBnZyA9IHRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgICAgaWYgKGdnKSBnZy5zZXQobmFtZSwgc2VydmljZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U2VydmljZTxUPihuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKHRoaXMuc2VydmljZXJlZ2lzdHJ5LmdldChuYW1lKSB8fCBudWxsKSBhcyBUO1xuICB9XG5cbiAgZ2V0R3JvdXBTZXJ2aWNlcyhncm91cDogc3RyaW5nLCAuLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xuICAgIGxldCBnID0gdGhpcy5ncm91cGVkc2VydmljZXJlZ2lzdHJ5LmdldChncm91cCk7XG4gICAgaWYgKGcpXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShnLmVudHJpZXMoKSB8fCBbXSkuZmlsdGVyKGkgPT4gKCFuYW1lIHx8IG5hbWUubGVuZ3RoID09IDApIHx8IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcbiAgICByZXR1cm4gW11cbiAgfVxufSIsImNvbnN0IGFza1JlcGx5Q2hhbm5lbHMgPSBuZXcgTWFwPHN0cmluZywgTWVzc2FnZUNoYW5uZWw+KCk7XG5jb25zdCBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMgPSBuZXcgTWFwPHN0cmluZywgTWVzc2FnZUNoYW5uZWw+KCk7XG5jb25zdCBzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzID0gbmV3IE1hcDxGdW5jdGlvbiwgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk+KCk7XG5cblxuXG5jb25zdCBhc2sgPSA8VCBleHRlbmRzIGtleW9mIEFza01lc3NhZ2VUeXBlcyAmIHN0cmluZz4obmFtZTogVCwgLi4uYXJnczogUGFyYW1ldGVyczxBc2tNZXNzYWdlVHlwZXNbVF0+KTogUHJvbWlzZTxSZXR1cm5UeXBlPEFza01lc3NhZ2VUeXBlc1tUXT4+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgIGxldCBwb3J0ID0gYXNrUmVwbHlDaGFubmVscy5nZXQobmFtZSk/LnBvcnQxXG4gICAgaWYgKCFwb3J0KSB7XG4gICAgICBjb25zdCBjID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICBhc2tSZXBseUNoYW5uZWxzLnNldChuYW1lLCBjKTtcbiAgICAgIHBvcnQgPSBjLnBvcnQxXG4gICAgfVxuICAgIGxldCBpbm5lcmNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBjb25zdCBsID0gKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICByZXNvbHZlKGV2dC5kYXRhKTtcbiAgICAgIGlubmVyY2hhbm5lbCA9IG51bGwhO1xuICAgIH1cbiAgICBpbm5lcmNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbDtcbiAgICBwb3J0LnBvc3RNZXNzYWdlKGFyZ3MsIFtpbm5lcmNoYW5uZWwucG9ydDJdKTtcbiAgfSk7XG59XG5cbmNvbnN0IHJlcGx5ID0gPFQgZXh0ZW5kcyBrZXlvZiBBc2tNZXNzYWdlVHlwZXMgJiBzdHJpbmc+KG5hbWU6IFQsIGNiOiBBc2tNZXNzYWdlVHlwZXNbVF0sIG9wdHM6IHsgZm9yY2U6IGJvb2xlYW4gfSA9IHsgZm9yY2U6IGZhbHNlIH0pID0+IHtcbiAgbGV0IHBvcnQgPSBhc2tSZXBseUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFwb3J0KSB7XG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGFza1JlcGx5Q2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQyXG4gIH1cbiAgaWYgKCFvcHRzLmZvcmNlICYmIHBvcnQub25tZXNzYWdlKSB0aHJvdyBcInJlcGx5IGFscmVhZHkgc2V0IGZvciBtZXNzYWdlIFwiICsgbmFtZVxuICBjb25zdCBsID0gYXN5bmMgKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgaW5uZXJwb3J0ID0gZXZ0LnBvcnRzWzBdXG4gICAgY29uc3QgciA9IGF3YWl0IGNiKC4uLmV2dC5kYXRhKTtcbiAgICBpbm5lcnBvcnQucG9zdE1lc3NhZ2Uocik7XG4gICAgaW5uZXJwb3J0LmNsb3NlKCk7XG4gIH1cbiAgcG9ydC5vbm1lc3NhZ2UgPSBsO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHBvcnQhLm9ubWVzc2FnZSA9IG51bGwhO1xuICB9XG59XG5cbmNvbnN0IHNlbmQgPSA8VCBleHRlbmRzIGtleW9mIFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlcyAmIHN0cmluZz4obmFtZTogVCwgLi4uYXJnczogUGFyYW1ldGVyczxTdWJzY3JpcHRpb25NZXNzYWdlVHlwZXNbVF0+KSA9PiB7XG4gIGxldCBwb3J0ID0gc2VuZFN1YnNjcmliZUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDFcbiAgaWYgKCFwb3J0KSB7XG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHNlbmRTdWJzY3JpYmVDaGFubmVscy5zZXQobmFtZSwgYyk7XG4gICAgcG9ydCA9IGMucG9ydDFcbiAgfVxuICBwb3J0LnBvc3RNZXNzYWdlKGFyZ3MpO1xufVxuXG5jb25zdCBzdWJzY3JpYmUgPSA8VCBleHRlbmRzIGtleW9mIFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlcyAmIHN0cmluZz4obmFtZTogVCwgY2I6IFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlc1tUXSkgPT4ge1xuICBsZXQgcG9ydCA9IHNlbmRTdWJzY3JpYmVDaGFubmVscy5nZXQobmFtZSk/LnBvcnQyXG4gIGlmICghcG9ydCkge1xuICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQyXG4gIH1cbiAgY29uc3QgbCA9IChldnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgIGNiKC4uLmV2dC5kYXRhKTtcbiAgfVxuICBzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzLnNldChjYiwgbCk7XG4gIHBvcnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgbCk7XG4gIHBvcnQuc3RhcnQoKTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBwb3J0Py5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBsKTtcbiAgICBzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzLmRlbGV0ZShjYik7XG4gIH1cbn1cblxuY29uc3Qgb25jZSA9IDxUIGV4dGVuZHMga2V5b2YgU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCBjYjogU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzW1RdKSA9PiB7XG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gc3Vic2NyaWJlKG5hbWUsICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNiKC4uLmFyZ3MpO1xuICAgIHVuc3Vic2NyaWJlKCk7XG4gIH0pO1xufVxuXG5jb25zdCB1bnN1YnNjcmliZSA9IDxUIGV4dGVuZHMga2V5b2YgU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCBjYjogU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzW1RdKSA9PiB7XG4gIGxldCBwb3J0ID0gc2VuZFN1YnNjcmliZUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFwb3J0KSByZXR1cm47XG4gIGNvbnN0IGwgPSBzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzLmdldChjYik7XG4gIGlmIChsKSB7XG4gICAgcG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBsKTtcbiAgICBzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzLmRlbGV0ZShjYik7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgYXNrLFxuICByZXBseSxcbiAgc2VuZCxcbiAgc3Vic2NyaWJlLFxuICBvbmNlLFxuICB1bnN1YnNjcmliZVxufVxuXG5leHBvcnQgY29uc3QgTWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlID0ge1xuICBJbnN0YW5jZToge1xuICAgIGFzayxcbiAgICByZXBseSxcbiAgICBzZW5kLFxuICAgIHN1YnNjcmliZSxcbiAgICBvbmNlLFxuICAgIHVuc3Vic2NyaWJlXG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBBc2tNZXNzYWdlVHlwZXMge1xuICBbbmFtZTogc3RyaW5nXTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG59XG5leHBvcnQgaW50ZXJmYWNlIFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlcyB7XG4gIFtuYW1lOiBzdHJpbmddOiAoLi4uYXJnczogYW55W10pID0+IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZVNlcnZpY2UgPSB7XG4gIEluc3RhbmNlOiB7XG4gICAgYXNrOiA8VCBleHRlbmRzIGtleW9mIEFza01lc3NhZ2VUeXBlcyAmIHN0cmluZz4obmFtZTogVCwgLi4ucGFyYW1ldGVyczogUGFyYW1ldGVyczxBc2tNZXNzYWdlVHlwZXNbVF0+KSA9PiBQcm9taXNlPFJldHVyblR5cGU8QXNrTWVzc2FnZVR5cGVzW1RdPj47XG4gICAgcmVwbHk6IDxUIGV4dGVuZHMga2V5b2YgQXNrTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCBjYjogQXNrTWVzc2FnZVR5cGVzW1RdLCBvcHRzPzoge1xuICAgICAgZm9yY2U6IGJvb2xlYW47XG4gICAgfSkgPT4gKCkgPT4gdm9pZDtcbiAgICBzZW5kOiA8VCBleHRlbmRzIGtleW9mIFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlcyAmIHN0cmluZz4obmFtZTogVCwgLi4uYXJnczogUGFyYW1ldGVyczxTdWJzY3JpcHRpb25NZXNzYWdlVHlwZXNbVF0+KSA9PiB2b2lkO1xuICAgIHN1YnNjcmliZTogPFQgZXh0ZW5kcyBrZXlvZiBTdWJzY3JpcHRpb25NZXNzYWdlVHlwZXMgJiBzdHJpbmc+KG5hbWU6IFQsIGNiOiBTdWJzY3JpcHRpb25NZXNzYWdlVHlwZXNbVF0pID0+ICgpID0+IHZvaWQ7XG4gICAgb25jZTogPFQgZXh0ZW5kcyBrZXlvZiBTdWJzY3JpcHRpb25NZXNzYWdlVHlwZXMgJiBzdHJpbmc+KG5hbWU6IFQsIGNiOiBTdWJzY3JpcHRpb25NZXNzYWdlVHlwZXNbVF0pID0+IHZvaWQ7XG4gICAgdW5zdWJzY3JpYmU6IDxUIGV4dGVuZHMga2V5b2YgU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCBjYjogU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzW1RdKSA9PiB2b2lkO1xuICB9O1xufTtcbiIsImltcG9ydCB7IGNvbXB1dGVkLCBkZWZpbmVDb21wb25lbnQgfSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCB7IENvbW1vblJlZ2lzdHJ5IH0gZnJvbSBcIi4uL2hlbHBlcnMvQ29tbW9uUmVnaXN0cnlcIjtcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcclxuICBuYW1lOiBcImluamVjdFwiLFxyXG4gIHByb3BzOiB7XHJcbiAgICBpZDogeyBkZWZhdWx0OiBudWxsIH0sXHJcbiAgICB0eXBlOiB7IGRlZmF1bHQ6IG51bGwsIHR5cGU6IFN0cmluZyB9LFxyXG4gICAgdmFsdWU6IHsgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgbmFtZTogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IG51bGwgfSxcclxuICAgIG5hbWVzOiB7IHR5cGU6IEFycmF5PHN0cmluZz4sIGRlZmF1bHQ6IG51bGwgfSxcclxuICAgIGdyb3VwOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgbWV0YWRhdGE6IHsgdHlwZTogT2JqZWN0LCBkZWZhdWx0OiBudWxsIH0sXHJcbiAgICBkaXNhYmxlZDogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZSB9LFxyXG4gICAgcmVhZG9ubHk6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfVxyXG4gIH0sXHJcbiAgc2V0dXAocHJvcHMsIHsgZW1pdCB9KSB7XHJcblxyXG4gICAgY29uc3QgVmFsdWUgPSBjb21wdXRlZCh7XHJcbiAgICAgIGdldDogKCkgPT4geyByZXR1cm4gcHJvcHMudmFsdWUgfSxcclxuICAgICAgc2V0OiAodikgPT4geyBlbWl0KFwiaW5wdXRcIiwgdik7IH1cclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgQ29tcG9uZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICAgICAgaWYgKHByb3BzLm5hbWUpXHJcbiAgICAgICAgcmV0dXJuIFtDb21tb25SZWdpc3RyeS5JbnN0YW5jZS5nZXRDb21wb25lbnQocHJvcHMubmFtZSwgcHJvcHMuZ3JvdXApXTtcclxuICAgICAgaWYgKHByb3BzLmdyb3VwKVxyXG4gICAgICAgIHJldHVybiBDb21tb25SZWdpc3RyeS5JbnN0YW5jZS5nZXRHcm91cENvbXBvbmVudHMocHJvcHMuZ3JvdXAsIC4uLihwcm9wcy5uYW1lcyB8fCBbXSkpO1xyXG4gICAgICByZXR1cm4gQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UuZ2V0Q29tcG9uZW50cyguLi4ocHJvcHMubmFtZXMgfHwgW10pKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGNsaWNrID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7IGVtaXQoJ2NsaWNrJywgLi4uYXJncykgfVxyXG4gICAgY29uc3Qgc2F2ZSA9ICguLi5hcmdzOiBhbnlbXSkgPT4geyBlbWl0KCdzYXZlJywgLi4uYXJncykgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlkOiBwcm9wcy5pZCxcclxuICAgICAgdHlwZTogcHJvcHMudHlwZSxcclxuICAgICAgdmFsdWU6IHByb3BzLnZhbHVlLFxyXG4gICAgICBuYW1lOiBwcm9wcy5uYW1lLFxyXG4gICAgICBuYW1lczogcHJvcHMubmFtZXMsXHJcbiAgICAgIGdyb3VwOiBwcm9wcy5ncm91cCxcclxuICAgICAgbWV0YWRhdGE6IHByb3BzLm1ldGFkYXRhLFxyXG4gICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5OiBwcm9wcy5yZWFkb25seSxcclxuICAgICAgY2xpY2ssXHJcbiAgICAgIHNhdmUsXHJcbiAgICAgIENvbXBvbmVudHMsXHJcbiAgICAgIFZhbHVlLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pOyIsIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvamVjdGFibGVNb2RlbDxUPiB7XG4gIGRhdGE6IFQ7IHJlc29sdmU6IChpdGVtOiBUKSA9PiB2b2lkOyByZWplY3Q6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0b3Ige1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBQcm9qZWN0b3IoKTtcbiAgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBQcm9qZWN0b3IgeyByZXR1cm4gUHJvamVjdG9yLmluc3RhbmNlIH1cbiAgc3RhdGljIHNldCBJbnN0YW5jZSh2OiBQcm9qZWN0b3IpIHsgdGhpcy5pbnN0YW5jZSA9IHY7IH1cblxuICBwcml2YXRlIHNjcmVlbnMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICBwcml2YXRlIHByb2plY3RpbmcgPSBuZXcgTWFwPHN0cmluZywgeyBjb21wb25lbnQ6IENvbXBvbmVudCwgbW9kZWw6IElQcm9qZWN0YWJsZU1vZGVsPGFueT4sIHByb21pc2U6IFByb21pc2U8YW55PiB8IG51bGwsIHF1ZXVlOiBib29sZWFuIH1bXT4oKTtcblxuICBzZXRTY3JlZW4oc2NyZWVuOiBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSwgbmFtZTogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIpIHtcbiAgICB0aGlzLnNjcmVlbnMuc2V0KG5hbWUsIHNjcmVlbik7XG4gIH1cblxuXG5cbiAgcHJvamVjdFRvPFQ+KGNvbXBvbmVudDogQ29tcG9uZW50LCBkYXRhOiBUIHwgbnVsbCA9IG51bGwsIHNjcmVlbjogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIsIHF1ZXVlOiBib29sZWFuID0gdHJ1ZSwgYXN5bmM6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8VD4gfCBudWxsIHtcbiAgICBjb25zdCBtb2RlbCA9IHsgZGF0YSB9IGFzIElQcm9qZWN0YWJsZU1vZGVsPFQ+O1xuICAgIGNvbnN0IHByb21pc2UgPSBhc3luYyA/IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHsgbW9kZWwucmVqZWN0ID0gcmVqZWN0OyBtb2RlbC5yZXNvbHZlID0gcmVzb2x2ZSB9KSA6IG51bGw7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG5cbiAgICAgIHRoaXMucHJvamVjdGluZy5zZXQoc2NyZWVuLCBbeyBjb21wb25lbnQsIG1vZGVsLCBwcm9taXNlLCBxdWV1ZSB9XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5wcm9qZWN0aW5nLmhhcyhzY3JlZW4pKSB7XG4gICAgICAgIHRoaXMucHJvamVjdGluZy5zZXQoc2NyZWVuLCBbXSk7XG4gICAgICB9XG4gICAgICAodGhpcy5wcm9qZWN0aW5nLmdldChzY3JlZW4pIHx8IFtdKS5wdXNoKHsgY29tcG9uZW50LCBtb2RlbCwgcHJvbWlzZSwgcXVldWUgfSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3MgPSB0aGlzLnNjcmVlbnMuZ2V0KHNjcmVlbik7XG4gICAgaWYgKCFzcykgcmV0dXJuIG51bGw7XG4gICAgc3MubW9kZWwgPSBtb2RlbDtcbiAgICBzcy5jdXJyZW50VmlldyA9IGNvbXBvbmVudDtcblxuICAgIGlmIChwcm9taXNlKSBwcm9taXNlLnRoZW4oKCkgPT4gdGhpcy5zdG9wUHJvamVjdGluZyhzY3JlZW4pKS5jYXRjaCgoKSA9PiB0aGlzLnN0b3BQcm9qZWN0aW5nKHNjcmVlbikpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcHJvamVjdEFzeW5jVG88VD4oY29tcG9uZW50OiBDb21wb25lbnQsIGRhdGE6IFQsIHNjcmVlbjogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIsIHF1ZXVlOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RUbyhjb21wb25lbnQsIGRhdGEsIHNjcmVlbiwgcXVldWUsIHRydWUpXG4gIH1cblxuICBzdG9wUHJvamVjdGluZyhzY3JlZW46IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiKSB7XG4gICAgaWYgKHRoaXMucHJvamVjdGluZy5oYXMoc2NyZWVuKSkge1xuICAgICAgKHRoaXMucHJvamVjdGluZy5nZXQoc2NyZWVuKSB8fCBbXSkucG9wKClcbiAgICB9XG5cbiAgICBsZXQgX3NjcmVlbiA9IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKVxuICAgIGlmIChfc2NyZWVuICYmIF9zY3JlZW4uY3VycmVudFZpZXcpIHtcbiAgICAgIF9zY3JlZW4ubW9kZWwgPSBudWxsO1xuICAgICAgX3NjcmVlbi5zY3JlZW5Nb2RlbCA9IG51bGw7XG4gICAgICBfc2NyZWVuLmN1cnJlbnRWaWV3ID0gbnVsbDtcblxuICAgICAgaWYgKHRoaXMucHJvamVjdGluZy5oYXMoc2NyZWVuKSkge1xuICAgICAgICBsZXQgcyA9IHRoaXMucHJvamVjdGluZy5nZXQoc2NyZWVuKTtcbiAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcbiAgICAgICAgICBsZXQgbSA9IHMucG9wKCk7XG4gICAgICAgICAgaWYgKG0pIHRoaXMucHJvamVjdFRvKG0uY29tcG9uZW50LCBtLm1vZGVsLCBzY3JlZW4sIG0ucXVldWUsICEhbS5wcm9taXNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdGFibGU8VD4ge1xuICB2YWx1ZToge1xuICAgIGRhdGE6IFQsXG4gICAgcmVzb2x2ZTogKGl0ZW06IFQpID0+IHZvaWQ7XG4gICAgcmVqZWN0OiAoKSA9PiB2b2lkO1xuICB9O1xufSIsIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSwgY29tcHV0ZWQsIGRlZmluZUNvbXBvbmVudCwgZ2V0Q3VycmVudEluc3RhbmNlLCBvbk1vdW50ZWQsIFJlZiwgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IElQcm9qZWN0YWJsZU1vZGVsLCBQcm9qZWN0b3IgfSBmcm9tIFwiLi4vaGVscGVycy9Qcm9qZWN0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogXCJzY3JlZW5cIixcbiAgcHJvcHM6IHtcbiAgICBuYW1lOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogXCJkZWZhdWx0c2NyZWVuXCIgfSxcbiAgfSxcbiAgc2V0dXAocHJvcHMsIHsgZXhwb3NlIH0pIHtcblxuICAgIGNvbnN0IG1lID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG5cbiAgICBjb25zdCBjdXJyZW50VmlldzogUmVmPENvbXBvbmVudD4gPSByZWYobnVsbCEpO1xuICAgIGNvbnN0IG1vZGVsOiBSZWY8SVByb2plY3RhYmxlTW9kZWw8YW55PiB8IG51bGw+ID0gcmVmKG51bGwhKTtcblxuICAgIGV4cG9zZSh7IGN1cnJlbnRWaWV3LCBtb2RlbCB9KVxuXG4gICAgY29uc3QgaXNWaXNpYmxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIGN1cnJlbnRWaWV3LnZhbHVlICE9IG51bGw7XG4gICAgfSlcblxuICAgIGNvbnN0IGN1cnJlbnRWaWV3VUlEID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIChjdXJyZW50Vmlldy52YWx1ZSBhcyBhbnkpPy5fX2ZpbGVcbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIFByb2plY3Rvci5JbnN0YW5jZS5zZXRTY3JlZW4oKG1lIGFzIGFueSkucHJveHksIHByb3BzLm5hbWUpO1xuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFZpZXdVSUQsXG4gICAgICBjdXJyZW50VmlldyxcbiAgICAgIG1vZGVsLFxuICAgICAgaXNWaXNpYmxlXG4gICAgfVxuICB9LFxuXG59KVxuIiwiY29uc3QgcHJvamVjdFRvRGlyZWN0aXZlID0ge1xuXG4gIGluc2VydGVkOiAoZWw6IEVsZW1lbnQsIGJpbmQ6IGFueSkgPT4ge1xuICAgIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlLmluamVjdFRvKGVsLCBiaW5kLmFyZyk7XG4gIH0sXG4gIHVuYmluZDogKGVsOiBFbGVtZW50LCBiaW5kOiBhbnkpID0+IHtcbiAgICBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZS5yZW1vdmVGcm9tKGVsLCBiaW5kLmFyZylcbiAgfVxufVxuXG5cbmNvbnN0IHNjcmVlbkRpcmVjdGl2ZSA9IHtcbiAgYmluZDogKGVsOiBhbnksIGJpbmRpbmc6IGFueSkgPT4ge1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZS5zZXRTY3JlZW4oZWwsIGJpbmRpbmcuYXJnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb2plY3RUb0RpcmVjdGl2ZSwgc2NyZWVuRGlyZWN0aXZlXG59XG5cbmV4cG9ydCBjbGFzcyBTY3JlZW5zTWFuYWdlciB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlID0gbmV3IFNjcmVlbnNNYW5hZ2VyKCk7XG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogU2NyZWVuc01hbmFnZXIgeyByZXR1cm4gU2NyZWVuc01hbmFnZXIuaW5zdGFuY2UgfVxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IFNjcmVlbnNNYW5hZ2VyKSB7IHRoaXMuaW5zdGFuY2UgPSB2OyB9XG4gIHByaXZhdGUgc2NyZWVucyA9IG5ldyBNYXA8c3RyaW5nLCBFbGVtZW50PigpO1xuICBcblxuICBpbmplY3RUbyhkb21FbGVtZW50OiBFbGVtZW50LCBzY3JlZW46IHN0cmluZykge1xuICAgIGlmICghZG9tRWxlbWVudCB8fCAhc2NyZWVuKSByZXR1cm47XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnNjcmVlbnMuaGFzKHNjcmVlbikgPyB0aGlzLnNjcmVlbnMuZ2V0KHNjcmVlbikgOiBudWxsO1xuICAgIHRyeSB7IGRvbUVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBkb21FbGVtZW50LnJlbW92ZUNoaWxkKGRvbUVsZW1lbnQpOyB9IGNhdGNoIHsgfVxuICAgIGlmIChlbGVtZW50KSBlbGVtZW50LmFwcGVuZChkb21FbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZUZyb20oZG9tRWxlbWVudDogRWxlbWVudCwgc2NyZWVuOiBzdHJpbmcpIHtcbiAgICBpZiAoIWRvbUVsZW1lbnQgfHwgIXNjcmVlbikgcmV0dXJuO1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5zY3JlZW5zLmhhcyhzY3JlZW4pID8gdGhpcy5zY3JlZW5zLmdldChzY3JlZW4pIDogbnVsbDtcbiAgICB0cnkgeyBpZiAoZWxlbWVudCkgZWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KSB9IGNhdGNoIHsgfVxuICB9XG5cbiAgc2V0U2NyZWVuKHNjcmVlbjogRWxlbWVudCwgbmFtZTogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIpIHtcbiAgICB0aGlzLnNjcmVlbnMuc2V0KG5hbWUsIHNjcmVlbik7XG4gIH1cbn0iLCJmdW5jdGlvbiBjaGVja0lucHV0VmFsaWRhdGlvbihhOiBFdmVudCwgY2FsbG91dDogKGVycm9yczogc3RyaW5nW10sIHZhbGlkOiBib29sZWFuKSA9PiB2b2lkKSB7XG4gIGlmICgoYS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsaWRpdHkpIHtcbiAgICBsZXQgZWwgPSAoYS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCk7XG5cbiAgICBpZiAoZWwudmFsaWRpdHkpIHtcbiAgICAgIGxldCBlcnJvcnMgPSBbXG4gICAgICAgIGVsLnZhbGlkaXR5LmJhZElucHV0ID8gXCJiYWQgaW5wdXRcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LmN1c3RvbUVycm9yID8gXCJjdXN0b20gZXJyb3JcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnBhdHRlcm5NaXNtYXRjaCA/IFwicGF0dGVybiBtaXNtYXRjaFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkucmFuZ2VPdmVyZmxvdyA/IFwicmFuZ2Ugb3ZlcmZsb3dcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnJhbmdlVW5kZXJmbG93ID8gXCJyYW5nZSB1bmRlcmZsb3dcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnN0ZXBNaXNtYXRjaCA/IFwic3RlcCBtaXNtYXRjaFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudG9vTG9uZyA/IFwidG9vIGxvbmdcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnRvb1Nob3J0ID8gXCJ0b28gc2hvcnRcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnR5cGVNaXNtYXRjaCA/IFwidHlwZSBtaXNtYXRjaFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudmFsdWVNaXNzaW5nID8gXCJ2YWx1ZSBtaXNzaW5nXCIgOiBudWxsXS5maWx0ZXIoaSA9PiAhIWkpXG5cbiAgICAgIGNhbGxvdXQoZXJyb3JzIGFzIHN0cmluZ1tdLCBlbC52YWxpZGl0eS52YWxpZCAhPSB1bmRlZmluZWQgPyBlbC52YWxpZGl0eS52YWxpZCA6IHRydWUpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdmFsaWRhdGUgPSB7XG4gIGluc2VydGVkOiAoZWw6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQsIGJpbmQ6IHtcbiAgICB2YWx1ZTogKGVycm9yczogc3RyaW5nW10sIHZhbGlkOiBib29sZWFuKSA9PiB2b2lkLFxuICAgIGFyZzogXCJpbW1lZGlhdGVcIlxuICB9KSA9PiB7XG4gICAgaWYgKCFlbCB8fCAhZWwud2lsbFZhbGlkYXRlKSByZXR1cm47XG4gICAgc3dpdGNoIChlbC5ub2RlTmFtZSkge1xuICAgICAgY2FzZSBcIklOUFVUXCI6XG4gICAgICBjYXNlIFwiVEVYVEFSRUFcIjogZWwub25ibHVyID0gKGFyZykgPT4gY2hlY2tJbnB1dFZhbGlkYXRpb24oYXJnLCBiaW5kLnZhbHVlKTsgYnJlYWs7XG4gICAgICBjYXNlIFwiU0VMRUNUXCI6IGVsLm9uY2hhbmdlID0gKGFyZykgPT4gY2hlY2tJbnB1dFZhbGlkYXRpb24oYXJnLCBiaW5kLnZhbHVlKTsgYnJlYWs7XG4gICAgfVxuXG4gICAgZWwub25pbnZhbGlkID0gKGFyZykgPT4gY2hlY2tJbnB1dFZhbGlkYXRpb24oYXJnLCBiaW5kLnZhbHVlKTtcbiAgICBpZiAoZWwuZm9ybSkgZWwuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdpbnZhbGlkJywgKCkgPT4gY2hlY2tJbnB1dFZhbGlkYXRpb24oeyB0YXJnZXQ6IGVsIH0gYXMgYW55LCBiaW5kLnZhbHVlKSlcblxuICAgIGlmIChiaW5kLmFyZyA9PSBcImltbWVkaWF0ZVwiKSBlbC5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIGVsc2UgY2hlY2tJbnB1dFZhbGlkYXRpb24oeyB0YXJnZXQ6IGVsIH0gYXMgYW55LCBiaW5kLnZhbHVlKVxuICB9LFxuICB1bmJpbmQ6IChlbDogRWxlbWVudCkgPT4ge1xuICAgIGlmICghZWwpIHJldHVybjtcblxuICB9LFxufVxuIiwiaW1wb3J0IHsgTWVudUhlbHBlciwgbWVudVR5cGUsIE1lbnVOb3RpZmljYXRpb25zLCBJTWVudURlZmluaXRpb24gfSBmcm9tIFwiLi9oZWxwZXJzL01lbnVIZWxwZXJcIjtcbmltcG9ydCB7IENvbW1vblJlZ2lzdHJ5IH0gZnJvbSBcIi4vaGVscGVycy9Db21tb25SZWdpc3RyeVwiO1xuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tIFwiLi9oZWxwZXJzL01lc3NhZ2VTZXJ2aWNlXCI7XG5pbXBvcnQgeyBJUm91dGVDb25maWcgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL1JvdXRlckludGVyZmFjZXNcIjtcbmltcG9ydCB7IElTdG9yZSB9IGZyb20gXCIuL2ludGVyZmFjZXMvU3RvcmVJbnRlcmZhY2VzXCI7XG5pbXBvcnQgSW5qZWN0IGZyb20gXCIuL2NvbXBvbmVudHMvaW5qZWN0LnZ1ZVwiO1xuaW1wb3J0IFNjcmVlbiBmcm9tIFwiLi9jb21wb25lbnRzL3NjcmVlbi52dWVcIjtcbmltcG9ydCB7IFZ1ZUNvbnN0cnVjdG9yIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgSVByb2plY3RhYmxlTW9kZWwsIFByb2plY3RhYmxlLCBQcm9qZWN0b3IgfSBmcm9tIFwiLi9oZWxwZXJzL1Byb2plY3RvclwiO1xuaW1wb3J0IGRpcmVjdGl2ZXMsIHsgU2NyZWVuc01hbmFnZXIgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL3NjcmVlblwiO1xuaW1wb3J0IHsgdmFsaWRhdGUgYXMgVmFsaWRhdGVEaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL3ZhbGlkYXRlXCI7XG5cblxuZnVuY3Rpb24gaW5zdGFsbChWdWU6IFZ1ZUNvbnN0cnVjdG9yKSB7XG4gIFZ1ZS5jb21wb25lbnQoXCJzY3JlZW5cIiwgU2NyZWVuKTtcbiAgVnVlLmNvbXBvbmVudChcImluamVjdFwiLCBJbmplY3QpO1xuICBWdWUuZGlyZWN0aXZlKFwic2NyZWVuXCIsIGRpcmVjdGl2ZXMuc2NyZWVuRGlyZWN0aXZlKTtcbiAgVnVlLmRpcmVjdGl2ZShcInByb2plY3RUb1wiLCBkaXJlY3RpdmVzLnByb2plY3RUb0RpcmVjdGl2ZSk7XG4gIFZ1ZS5kaXJlY3RpdmUoXCJ2YWxpZGF0ZVwiLCBWYWxpZGF0ZURpcmVjdGl2ZSBhcyBhbnkpO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1vZHVsZUluaXRpYWxpemVyIHtcbiAgaW5pdCh2dWVtZjogdHlwZW9mIFZ1ZU1mTW9kdWxlLCBtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkpOiBQcm9taXNlPHZvaWQ+LFxuXG4gIGNvbmZpZz8obWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55KTogUHJvbWlzZTx2b2lkPixcblxuICBydW4/KG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSk6IFByb21pc2U8dm9pZD4sXG5cbiAgcm91dGVzOiBJUm91dGVDb25maWdbXVxufVxuXG5pbnRlcmZhY2UgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlciB7XG4gIGluaXQobWVudTogTWVudUhlbHBlcixcbiAgICBzdG9yZTogSVN0b3JlLFxuICAgIGNvbmZpZ3VyYXRpb246IGFueVxuICAgICwgb3B0aW9uczoge1xuICAgICAgcmVnaXN0cnk6IENvbW1vblJlZ2lzdHJ5LFxuICAgICAgbWVzc2FnZVNlcnZpY2U6IHR5cGVvZiBNZXNzYWdlU2VydmljZS5JbnN0YW5jZSxcbiAgICAgIHByb2plY3RvcjogUHJvamVjdG9yLFxuICAgICAgc2NyZWVuczogU2NyZWVuc01hbmFnZXJcbiAgICB9KTogUHJvbWlzZTx2b2lkPixcbiAgY29uZmlnKG1lbnU6IE1lbnVIZWxwZXIsXG4gICAgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4sXG4gIHJ1bihtZW51OiBNZW51SGVscGVyLFxuICAgIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+LFxuICByb3V0ZXM6IElSb3V0ZUNvbmZpZ1tdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNb2R1bGVJbml0aWFsaXplcihvcHRzOiBJTW9kdWxlSW5pdGlhbGl6ZXIpIHtcbiAgbGV0IG1vZHVsZUNvbmZpZyA9IHt9O1xuICByZXR1cm4ge1xuICAgIGluaXQobWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnksXG4gICAgICAgIG1lc3NhZ2VTZXJ2aWNlOiB0eXBlb2YgTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UsXG4gICAgICAgIHByb2plY3RvcjogUHJvamVjdG9yLFxuICAgICAgICBzY3JlZW5zOiBTY3JlZW5zTWFuYWdlclxuICAgICAgfSkge1xuXG4gICAgICBpZiAob3B0aW9ucy5yZWdpc3RyeSkgQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UgPSBvcHRpb25zLnJlZ2lzdHJ5O1xuICAgICAgaWYgKG9wdGlvbnMubWVzc2FnZVNlcnZpY2UpIE1lc3NhZ2VTZXJ2aWNlLkluc3RhbmNlID0gb3B0aW9ucy5tZXNzYWdlU2VydmljZVxuICAgICAgaWYgKG9wdGlvbnMucHJvamVjdG9yKSBQcm9qZWN0b3IuSW5zdGFuY2UgPSBvcHRpb25zLnByb2plY3RvcjtcbiAgICAgIGlmIChvcHRpb25zLnNjcmVlbnMpIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlID0gb3B0aW9ucy5zY3JlZW5zO1xuICAgICAgbW9kdWxlQ29uZmlnID0gY29uZmlndXJhdGlvbjtcbiAgICAgIHJldHVybiBvcHRzLmluaXQoVnVlTWZNb2R1bGUsIG1lbnUsIHN0b3JlLCBjb25maWd1cmF0aW9uKTtcbiAgICB9LFxuICAgIGNvbmZpZyhtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlKSB7XG4gICAgICByZXR1cm4gb3B0cy5jb25maWcgPyBvcHRzLmNvbmZpZyhtZW51LCBzdG9yZSwgbW9kdWxlQ29uZmlnKSA6IG51bGw7XG4gICAgfSxcbiAgICBydW4obWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSkge1xuICAgICAgcmV0dXJuIG9wdHMucnVuID8gb3B0cy5ydW4obWVudSwgc3RvcmUsIG1vZHVsZUNvbmZpZykgOiBudWxsO1xuICAgIH0sXG4gICAgcm91dGVzOiBvcHRzLnJvdXRlc1xuICB9IGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEluaXRNb2R1bGUobW9kdWxlOiBhbnksIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSB8IHVuZGVmaW5lZCk6IFByb21pc2U8SU1vZHVsZUluaXRpYWxpemVyPiB7XG4gIGNvbnN0IGluaXRvYmogPSAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcbiAgcmV0dXJuIGluaXRvYmouaW5pdChNZW51SGVscGVyLkluc3RhbmNlLCBzdG9yZSwgY29uZmlndXJhdGlvbiB8fCB7fSxcbiAgICB7XG4gICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UsXG4gICAgICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UsXG4gICAgICBwcm9qZWN0b3I6IFByb2plY3Rvci5JbnN0YW5jZSxcbiAgICAgIHNjcmVlbnM6IFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gaW5pdG9iaiBhcyB1bmtub3duIGFzIElNb2R1bGVJbml0aWFsaXplcjtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ01vZHVsZShtb2R1bGU6IGFueSwgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLmNvbmZpZyhNZW51SGVscGVyLkluc3RhbmNlLCBzdG9yZSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFJ1bk1vZHVsZShtb2R1bGU6IGFueSwgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLnJ1bihNZW51SGVscGVyLkluc3RhbmNlLCBzdG9yZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNb2R1bGVSb3V0ZXMobW9kdWxlOiBhbnkpOiBJUm91dGVDb25maWdbXSB7XG4gIGNvbnN0IGluaXRvYmogPSAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcbiAgcmV0dXJuIGluaXRvYmoucm91dGVzO1xufVxuXG5leHBvcnQge1xuICBNZW51SGVscGVyLFxuICB0eXBlIElNZW51RGVmaW5pdGlvbixcbiAgbWVudVR5cGUsXG4gIENvbW1vblJlZ2lzdHJ5LFxuICBNZXNzYWdlU2VydmljZSxcbiAgSW5qZWN0LFxuICBTY3JlZW4sXG4gIFZhbGlkYXRlRGlyZWN0aXZlLFxuICB0eXBlIFByb2plY3RhYmxlLFxuICB0eXBlIElQcm9qZWN0YWJsZU1vZGVsLFxuICBNZW51Tm90aWZpY2F0aW9ucyxcbiAgUHJvamVjdG9yLFxufVxuXG5jb25zdCBWdWVNZk1vZHVsZSA9IHtcbiAgaW5zdGFsbCxcbiAgTWVudUhlbHBlcjogbmV3IE1lbnVIZWxwZXIoKSxcbiAgbWVudVR5cGUsXG4gIENvbW1vblJlZ2lzdHJ5OiBuZXcgQ29tbW9uUmVnaXN0cnkoKSxcbiAgTWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxuICBJbmplY3QsXG4gIFNjcmVlbixcbiAgVmFsaWRhdGVEaXJlY3RpdmUsXG4gIE1lbnVOb3RpZmljYXRpb25zLFxuICBQcm9qZWN0b3Jcbn1cblxuZXhwb3J0IGRlZmF1bHQgVnVlTWZNb2R1bGU7XG4iXSwibmFtZXMiOlsiRSIsIm5hbWUiLCJjYWxsYmFjayIsImN0eCIsImUiLCJzZWxmIiwibGlzdGVuZXIiLCJkYXRhIiwiZXZ0QXJyIiwiaSIsImxlbiIsImV2dHMiLCJsaXZlRXZlbnRzIiwidGlueUVtaXR0ZXJNb2R1bGUiLCJUaW55RW1pdHRlciIsInRpbnlFbWl0dGVyIiwibWVudVR5cGUiLCJtZW51VHlwZTIiLCJNZW51Tm90aWZpY2F0aW9ucyIsIl9NZW51SGVscGVyIiwiX19wdWJsaWNGaWVsZCIsIm1lbnVEZWZpbml0aW9uIiwicG9zaXRpb25zIiwiZm91bmQiLCJtIiwiZWxlbWVudCIsIm1lbnUiLCJyZXN1bHQiLCJ1c2VkIiwia2V5IiwicnIiLCJiIiwiYSIsIk1lbnVIZWxwZXIiLCJfQ29tbW9uUmVnaXN0cnkiLCJ2IiwiY29tcG9uZW50IiwiZ3JvdXAiLCJnZyIsImciLCJzZXJ2aWNlIiwiQ29tbW9uUmVnaXN0cnkiLCJhc2tSZXBseUNoYW5uZWxzIiwic2VuZFN1YnNjcmliZUNoYW5uZWxzIiwic2VuZFN1YnNjcmliZUNhbGxiYWNrcyIsImFzayIsImFyZ3MiLCJyZXNvbHZlIiwicG9ydCIsIl9hIiwiYyIsImlubmVyY2hhbm5lbCIsImwiLCJldnQiLCJyZXBseSIsImNiIiwib3B0cyIsImlubmVycG9ydCIsInIiLCJzZW5kIiwic3Vic2NyaWJlIiwib25jZSIsInVuc3Vic2NyaWJlIiwiTWVzc2FnZVNlcnZpY2UiLCJfc2ZjX21haW4kMSIsImRlZmluZUNvbXBvbmVudCIsInByb3BzIiwiZW1pdCIsIlZhbHVlIiwiY29tcHV0ZWQiLCJDb21wb25lbnRzIiwiY2xpY2siLCJzYXZlIiwiX1Byb2plY3RvciIsInNjcmVlbiIsInF1ZXVlIiwiYXN5bmMiLCJtb2RlbCIsInByb21pc2UiLCJyZWplY3QiLCJzcyIsIl9zY3JlZW4iLCJzIiwiUHJvamVjdG9yIiwiX3NmY19tYWluIiwiZXhwb3NlIiwibWUiLCJnZXRDdXJyZW50SW5zdGFuY2UiLCJjdXJyZW50VmlldyIsInJlZiIsImlzVmlzaWJsZSIsImN1cnJlbnRWaWV3VUlEIiwib25Nb3VudGVkIiwicHJvamVjdFRvRGlyZWN0aXZlIiwiZWwiLCJiaW5kIiwiU2NyZWVuc01hbmFnZXIiLCJzY3JlZW5EaXJlY3RpdmUiLCJiaW5kaW5nIiwiZGlyZWN0aXZlcyIsIl9TY3JlZW5zTWFuYWdlciIsImRvbUVsZW1lbnQiLCJjaGVja0lucHV0VmFsaWRhdGlvbiIsImNhbGxvdXQiLCJlcnJvcnMiLCJ2YWxpZGF0ZSIsImFyZyIsImluc3RhbGwiLCJWdWUiLCJTY3JlZW4iLCJJbmplY3QiLCJWYWxpZGF0ZURpcmVjdGl2ZSIsIk1vZHVsZUluaXRpYWxpemVyIiwibW9kdWxlQ29uZmlnIiwic3RvcmUiLCJjb25maWd1cmF0aW9uIiwib3B0aW9ucyIsIlZ1ZU1mTW9kdWxlIiwiSW5pdE1vZHVsZSIsIm1vZHVsZSIsImluaXRvYmoiLCJDb25maWdNb2R1bGUiLCJSdW5Nb2R1bGUiLCJNb2R1bGVSb3V0ZXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsU0FBU0EsSUFBSztBQUdkO0FBRUFBLEVBQUUsWUFBWTtBQUFBLEVBQ1osSUFBSSxTQUFVQyxHQUFNQyxHQUFVQyxHQUFLO0FBQ2pDLFFBQUlDLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxDQUFBO0FBRTVCLFlBQUNBLEVBQUVILE9BQVVHLEVBQUVILEtBQVEsQ0FBQSxJQUFLLEtBQUs7QUFBQSxNQUMvQixJQUFJQztBQUFBLE1BQ0osS0FBS0M7QUFBQSxJQUNYLENBQUssR0FFTTtBQUFBLEVBQ1I7QUFBQSxFQUVELE1BQU0sU0FBVUYsR0FBTUMsR0FBVUMsR0FBSztBQUNuQyxRQUFJRSxJQUFPO0FBQ1gsYUFBU0MsSUFBWTtBQUNuQixNQUFBRCxFQUFLLElBQUlKLEdBQU1LLENBQVEsR0FDdkJKLEVBQVMsTUFBTUMsR0FBSyxTQUFTO0FBQUEsSUFFbkM7QUFDSSxXQUFBRyxFQUFTLElBQUlKLEdBQ04sS0FBSyxHQUFHRCxHQUFNSyxHQUFVSCxDQUFHO0FBQUEsRUFDbkM7QUFBQSxFQUVELE1BQU0sU0FBVUYsR0FBTTtBQUNwQixRQUFJTSxJQUFPLENBQUEsRUFBRyxNQUFNLEtBQUssV0FBVyxDQUFDLEdBQ2pDQyxNQUFXLEtBQUssTUFBTSxLQUFLLElBQUksQ0FBQSxJQUFLUCxNQUFTLENBQUUsR0FBRSxNQUFLLEdBQ3REUSxJQUFJLEdBQ0pDLElBQU1GLEVBQU87QUFFakIsU0FBS0MsR0FBR0EsSUFBSUMsR0FBS0Q7QUFDZixNQUFBRCxFQUFP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
