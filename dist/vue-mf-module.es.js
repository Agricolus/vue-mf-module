var G = Object.defineProperty;
var X = (n, e, t) => e in n ? G(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var c = (n, e, t) => (X(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as E, computed as y, getCurrentInstance as z, ref as T, onMounted as B } from "vue";
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
const w = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), W = (n, ...e) => new Promise((t) => {
  var l;
  let r = (l = w.get(n)) == null ? void 0 : l.port1;
  if (!r) {
    const a = new MessageChannel();
    w.set(n, a), r = a.port1;
  }
  let i = new MessageChannel();
  const s = (a) => {
    t(a.data), i = null;
  };
  i.port1.onmessage = s, r.postMessage(e, [i.port2]);
}), J = (n, e, t = { force: !1 }) => {
  var s;
  if (typeof e != "function")
    throw "reply callback for message " + n + " is not a function";
  let r = (s = w.get(n)) == null ? void 0 : s.port2;
  if (!r) {
    const l = new MessageChannel();
    w.set(n, l), r = l.port2;
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
  if (typeof e != "function")
    throw "reply callback for message " + n + " is not a function";
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
  if (typeof e != "function")
    throw "reply callback for message " + n + " is not a function";
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
      o.render = function(F, k) {
        return u.call(k), j(F, k);
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
let p = M;
c(p, "instance", new M());
const ne = E({
  name: "screen",
  props: {
    name: { type: String, default: "defaultscreen" }
  },
  setup(n, { expose: e }) {
    const t = z(), r = T(null), i = T(null);
    e({ currentView: r, model: i });
    const s = y(() => r.value != null), l = y(() => {
      var a;
      return (a = r.value) == null ? void 0 : a.__file;
    });
    return B(() => {
      p.Instance.setScreen(t.proxy, n.name);
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
}, $ = {
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
function le(n) {
  n.component("screen", P), n.component("inject", L), n.directive("screen", $.screenDirective), n.directive("projectTo", $.projectToDirective), n.directive("validate", U);
}
function fe(n) {
  let e = {};
  return {
    init(t, r, i, s) {
      return s.registry && (f.Instance = s.registry), s.messageService && (x.Instance = s.messageService), s.projector && (p.Instance = s.projector), s.screens && (g.Instance = s.screens), e = i, n.init(ce, t, r, i);
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
      projector: p.Instance,
      screens: g.Instance
    }
  ).then(() => r);
}
function he(n, e) {
  return (n.default.default || n.default).config(h.Instance, e);
}
function pe(n, e) {
  return (n.default.default || n.default).run(h.Instance, e);
}
function ve(n) {
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
  Projector: p
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
  ve as ModuleRoutes,
  p as Projector,
  pe as RunModule,
  P as Screen,
  U as ValidateDirective,
  ce as default,
  D as menuType
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLW1mLW1vZHVsZS5lcy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qcyIsIi4uL3NyYy9oZWxwZXJzL01lbnVIZWxwZXIudHMiLCIuLi9zcmMvaGVscGVycy9Db21tb25SZWdpc3RyeS50cyIsIi4uL3NyYy9oZWxwZXJzL01lc3NhZ2VTZXJ2aWNlLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW5qZWN0LnRzP3Z1ZSZ0eXBlPXNjcmlwdCZzcmM9dHJ1ZSZsYW5nLnRzIiwiLi4vc3JjL2hlbHBlcnMvUHJvamVjdG9yLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvc2NyZWVuLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZy50cyIsIi4uL3NyYy9kaXJlY3RpdmVzL3NjcmVlbi50cyIsIi4uL3NyYy9kaXJlY3RpdmVzL3ZhbGlkYXRlLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEUgKCkge1xuICAvLyBLZWVwIHRoaXMgZW1wdHkgc28gaXQncyBlYXNpZXIgdG8gaW5oZXJpdCBmcm9tXG4gIC8vICh2aWEgaHR0cHM6Ly9naXRodWIuY29tL2xpcHNtYWNrIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0Y29yZ2FuL3RpbnktZW1pdHRlci9pc3N1ZXMvMylcbn1cblxuRS5wcm90b3R5cGUgPSB7XG4gIG9uOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGN0eCkge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG5cbiAgICAoZVtuYW1lXSB8fCAoZVtuYW1lXSA9IFtdKSkucHVzaCh7XG4gICAgICBmbjogY2FsbGJhY2ssXG4gICAgICBjdHg6IGN0eFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb25jZTogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gbGlzdGVuZXIgKCkge1xuICAgICAgc2VsZi5vZmYobmFtZSwgbGlzdGVuZXIpO1xuICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBsaXN0ZW5lci5fID0gY2FsbGJhY2tcbiAgICByZXR1cm4gdGhpcy5vbihuYW1lLCBsaXN0ZW5lciwgY3R4KTtcbiAgfSxcblxuICBlbWl0OiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBkYXRhID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHZhciBldnRBcnIgPSAoKHRoaXMuZSB8fCAodGhpcy5lID0ge30pKVtuYW1lXSB8fCBbXSkuc2xpY2UoKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGxlbiA9IGV2dEFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGk7IGkgPCBsZW47IGkrKykge1xuICAgICAgZXZ0QXJyW2ldLmZuLmFwcGx5KGV2dEFycltpXS5jdHgsIGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9mZjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGUgPSB0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KTtcbiAgICB2YXIgZXZ0cyA9IGVbbmFtZV07XG4gICAgdmFyIGxpdmVFdmVudHMgPSBbXTtcblxuICAgIGlmIChldnRzICYmIGNhbGxiYWNrKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZXZ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZXZ0c1tpXS5mbiAhPT0gY2FsbGJhY2sgJiYgZXZ0c1tpXS5mbi5fICE9PSBjYWxsYmFjaylcbiAgICAgICAgICBsaXZlRXZlbnRzLnB1c2goZXZ0c1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGV2ZW50IGZyb20gcXVldWUgdG8gcHJldmVudCBtZW1vcnkgbGVha1xuICAgIC8vIFN1Z2dlc3RlZCBieSBodHRwczovL2dpdGh1Yi5jb20vbGF6ZFxuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0Y29yZ2FuL3RpbnktZW1pdHRlci9jb21taXQvYzZlYmZhYTliYzk3M2IzM2QxMTBhODRhMzA3NzQyYjdjZjk0Yzk1MyNjb21taXRjb21tZW50LTUwMjQ5MTBcblxuICAgIChsaXZlRXZlbnRzLmxlbmd0aClcbiAgICAgID8gZVtuYW1lXSA9IGxpdmVFdmVudHNcbiAgICAgIDogZGVsZXRlIGVbbmFtZV07XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFO1xubW9kdWxlLmV4cG9ydHMuVGlueUVtaXR0ZXIgPSBFO1xuIiwiaW1wb3J0IHsgVGlueUVtaXR0ZXIgfSBmcm9tICd0aW55LWVtaXR0ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZW51RGVmaW5pdGlvbiB7XG4gIG5hbWU6IHN0cmluZyxcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgaWNvbj86IHN0cmluZyxcbiAgcm91dGVOYW1lPzogc3RyaW5nLFxuICByb3V0ZVBhcmFtcz86IG9iamVjdCxcbiAgZmVhdHVyZWZsYWdzPzogc3RyaW5nW10sXG4gIG9yZGVySW5kZXg/OiBudW1iZXIsXG4gIGNsYXNzPzogc3RyaW5nLFxuICBoaWRkZW46ICgpID0+IGJvb2xlYW5cbn1cblxuXG5leHBvcnQgZW51bSBtZW51VHlwZSB7XG4gIGRyYXdlciwgICAgICAgLy8gRHJhd2VyIE1lbnVcbiAgYm90dG9tLCAgICAgICAvLyBCb3R0b20gTWVudVxuICBoZWFkZXJcbn1cblxuZXhwb3J0IGNvbnN0IE1lbnVOb3RpZmljYXRpb25zID0ge1xuICBtZW51RGVmaW5pdGlvbkFkZGVkOiAnbmV3bWVudWl0ZW0nXG59XG5cbmV4cG9ydCBjbGFzcyBNZW51SGVscGVyIHtcblxuICBwcml2YXRlIG1lbnVEZWZpbml0aW9uczogSU1lbnVEZWZpbml0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBtZW51U3RydWN0dXJlOiB7IFtrZXk6IHN0cmluZ106IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSB9ID0ge31cbiAgcHJpdmF0ZSBub3RpZmljYXRpb25zOiBUaW55RW1pdHRlciA9IG5ldyBUaW55RW1pdHRlcigpO1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBNZW51SGVscGVyKCk7XG4gIHB1YmxpYyBnZXQgTm90aWZpY2F0aW9ucygpIHsgcmV0dXJuIHRoaXMubm90aWZpY2F0aW9uczsgfVxuICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpIHsgcmV0dXJuIE1lbnVIZWxwZXIuaW5zdGFuY2UgfVxuXG4gIHB1YmxpYyBhZGRNZW51RGVmaW5pdGlvbihtZW51RGVmaW5pdGlvbjogSU1lbnVEZWZpbml0aW9uLCAuLi5wb3NpdGlvbnM6IHsgc2VjdGlvbjogbWVudVR5cGUsIHBhcmVudD86IHN0cmluZyB9W10pIHtcblxuICAgIC8vIEFnZ2l1bmdvIGxhIGRpY2hpYXJhemlvbmUgZGVsIG1lbnXDuSBhbGwnZWxlbmNvIGRlaSBtZW7DuSBkaXNwb25pYmlsaS5cbiAgICBsZXQgZm91bmQgPSB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4gbS5uYW1lID09IG1lbnVEZWZpbml0aW9uLm5hbWUpO1xuICAgIGlmICghZm91bmQpXG4gICAgICB0aGlzLm1lbnVEZWZpbml0aW9ucy5wdXNoKG1lbnVEZWZpbml0aW9uKTtcbiAgICBlbHNlXG4gICAgICBtZW51RGVmaW5pdGlvbiA9IGZvdW5kO1xuXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHBvc2l0aW9ucykge1xuXG4gICAgICB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXSA9IHRoaXMubWVudVN0cnVjdHVyZVtlbGVtZW50LnNlY3Rpb25dIHx8IHt9O1xuICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnQgfHwgbWVudURlZmluaXRpb24ubmFtZV0gPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXVtlbGVtZW50LnBhcmVudCB8fCBtZW51RGVmaW5pdGlvbi5uYW1lXSB8fCBbXTtcblxuICAgICAgaWYgKGVsZW1lbnQucGFyZW50KVxuICAgICAgICB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXVtlbGVtZW50LnBhcmVudF0ucHVzaChtZW51RGVmaW5pdGlvbi5uYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMuZW1pdChNZW51Tm90aWZpY2F0aW9ucy5tZW51RGVmaW5pdGlvbkFkZGVkLCBtZW51RGVmaW5pdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWVudUl0ZW0obmFtZTogc3RyaW5nKTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5tZW51RGVmaW5pdGlvbnMuZmluZChpID0+IGkubmFtZSA9PSBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNZW51KG1lbnU6IG1lbnVUeXBlKTogeyBpdGVtOiBJTWVudURlZmluaXRpb24gfCB1bmRlZmluZWQsIGNoaWxkcmVuOiAoSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkKVtdIH1bXSB7XG4gICAgbGV0IHJlc3VsdDogeyBpdGVtOiBJTWVudURlZmluaXRpb24gfCB1bmRlZmluZWQsIGNoaWxkcmVuOiAoSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkKVtdIH1bXSA9IFtdO1xuICAgIGxldCB1c2VkID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm1lbnVTdHJ1Y3R1cmVbbWVudV0pIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbbWVudV1ba2V5XTtcblxuXG4gICAgICBsZXQgcnIgPSB7XG4gICAgICAgIGl0ZW06IHRoaXMubWVudURlZmluaXRpb25zLmZpbmQobSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG0ubmFtZSA9PSBrZXkgJiZcbiAgICAgICAgICAgICghbS5oaWRkZW4gfHwgIW0uaGlkZGVuKCkpXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGNoaWxkcmVuOiBlbGVtZW50Lm1hcChpID0+IHRoaXMubWVudURlZmluaXRpb25zLmZpbmQobSA9PiBtLm5hbWUgPT0gaSAmJiAoIW0uaGlkZGVuIHx8ICFtLmhpZGRlbigpKSkpXG4gICAgICAgICAgLmZpbHRlcihpID0+ICEhaSlcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgaWYgKGEgJiYgYiAmJiBhLm9yZGVySW5kZXggJiYgYi5vcmRlckluZGV4ICYmIGEub3JkZXJJbmRleCA+IGIub3JkZXJJbmRleCkgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAoYSAmJiBiICYmIGEub3JkZXJJbmRleCAmJiBiLm9yZGVySW5kZXggJiYgYS5vcmRlckluZGV4IDwgYi5vcmRlckluZGV4KSByZXR1cm4gLTE7XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgIH0pXG4gICAgICB9O1xuXG4gICAgICBpZiAoISFyci5pdGVtKSB7XG4gICAgICAgIHVzZWQuYWRkKGtleSk7XG4gICAgICAgIGVsZW1lbnQuZm9yRWFjaChpID0+IHVzZWQuYWRkKGkpKTtcbiAgICAgICAgcmVzdWx0LnB1c2gocnIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmZpbHRlcihpID0+ICEhaS5pdGVtKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEgJiYgYiAmJiBhLml0ZW0gJiYgYi5pdGVtICYmIGEuaXRlbS5vcmRlckluZGV4ICYmIGIuaXRlbS5vcmRlckluZGV4ICYmIGEuaXRlbS5vcmRlckluZGV4ID4gYi5pdGVtLm9yZGVySW5kZXgpIHJldHVybiAxO1xuICAgICAgICBpZiAoYSAmJiBiICYmIGEuaXRlbSAmJiBiLml0ZW0gJiYgYS5pdGVtLm9yZGVySW5kZXggJiYgYi5pdGVtLm9yZGVySW5kZXggJiYgYS5pdGVtLm9yZGVySW5kZXggPCBiLml0ZW0ub3JkZXJJbmRleCkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfSk7XG4gIH1cbn1cblxuIiwiXG5leHBvcnQgY2xhc3MgQ29tbW9uUmVnaXN0cnkge1xuXG4gIHByaXZhdGUgcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICBwcml2YXRlIGdyb3VwZWRyZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBhbnk+PigpO1xuICBwcml2YXRlIHNlcnZpY2VyZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gIHByaXZhdGUgZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBhbnk+PigpO1xuXG5cbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbW1vblJlZ2lzdHJ5ID0gbmV3IENvbW1vblJlZ2lzdHJ5KCk7XG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLmluc3RhbmNlOyB9XG4gIHN0YXRpYyBzZXQgSW5zdGFuY2UodjogQ29tbW9uUmVnaXN0cnkpIHsgdGhpcy5pbnN0YW5jZSA9IHYgfTtcblxuICBwcm92aWRlQ29tcG9uZW50KGNvbXBvbmVudDogYW55LCBuYW1lOiBzdHJpbmcsIGdyb3VwPzogc3RyaW5nKSB7XG4gICAgdGhpcy5yZWdpc3RyeS5zZXQoZ3JvdXAgPyBgJHtncm91cH0tJHtuYW1lfWAgOiBuYW1lLCBjb21wb25lbnQpO1xuICAgIGlmIChncm91cCkge1xuICAgICAgaWYgKCF0aGlzLmdyb3VwZWRyZWdpc3RyeS5oYXMoZ3JvdXApKSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5zZXQoZ3JvdXAsIG5ldyBNYXA8c3RyaW5nLCBhbnk+KCkpO1xuXG4gICAgICBsZXQgZ2cgPSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgICAgaWYgKGdnKSBnZy5zZXQobmFtZSwgY29tcG9uZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXRDb21wb25lbnQobmFtZTogc3RyaW5nLCBncm91cD86IHN0cmluZyk6IGFueSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmdldChncm91cCA/IGAke2dyb3VwfS0ke25hbWV9YCA6IG5hbWUpIHx8IG51bGw7XG4gIH1cblxuICBnZXRDb21wb25lbnRzKC4uLm5hbWU6IHN0cmluZ1tdKTogKGFueSlbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5yZWdpc3RyeS5lbnRyaWVzKCkpLmZpbHRlcihpID0+IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcbiAgfVxuXG4gIGdldEdyb3VwQ29tcG9uZW50cyhncm91cDogc3RyaW5nLCAuLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xuICAgIGxldCBnID0gdGhpcy5ncm91cGVkcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICBpZiAoZylcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKGcuZW50cmllcygpIHx8IFtdKS5maWx0ZXIoaSA9PiAoIW5hbWUgfHwgbmFtZS5sZW5ndGggPT0gMCkgfHwgbmFtZS5pbmRleE9mKGlbMF0pID49IDApLm1hcChpID0+IGlbMV0pO1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgZ2V0R3JvdXBDb21wb25lbnRzS2V5cyhncm91cDogc3RyaW5nKTogKHN0cmluZylbXSB7XG4gICAgbGV0IGcgPSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgIGlmIChnKSByZXR1cm4gQXJyYXkuZnJvbShnLmtleXMoKSk7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBwcm92aWRlU2VydmljZShuYW1lOiBzdHJpbmcsIHNlcnZpY2U6IGFueSwgZ3JvdXA/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlcnZpY2VyZWdpc3RyeS5zZXQobmFtZSwgc2VydmljZSk7XG4gICAgaWYgKGdyb3VwKSB7XG4gICAgICBpZiAoIXRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5oYXMoZ3JvdXApKSB0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuc2V0KGdyb3VwLCBuZXcgTWFwPHN0cmluZywgYW55PigpKTtcbiAgICAgIGxldCBnZyA9IHRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgICAgaWYgKGdnKSBnZy5zZXQobmFtZSwgc2VydmljZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U2VydmljZTxUPihuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKHRoaXMuc2VydmljZXJlZ2lzdHJ5LmdldChuYW1lKSB8fCBudWxsKSBhcyBUO1xuICB9XG5cbiAgZ2V0R3JvdXBTZXJ2aWNlcyhncm91cDogc3RyaW5nLCAuLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xuICAgIGxldCBnID0gdGhpcy5ncm91cGVkc2VydmljZXJlZ2lzdHJ5LmdldChncm91cCk7XG4gICAgaWYgKGcpXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShnLmVudHJpZXMoKSB8fCBbXSkuZmlsdGVyKGkgPT4gKCFuYW1lIHx8IG5hbWUubGVuZ3RoID09IDApIHx8IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcbiAgICByZXR1cm4gW11cbiAgfVxufSIsImludGVyZmFjZSBBc2tNZXNzYWdlVHlwZXMge1xufVxuaW50ZXJmYWNlIFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlcyB7XG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VTZXJ2aWNlID0ge1xuICBJbnN0YW5jZToge1xuICAgIGFzazogPFQgZXh0ZW5kcyBrZXlvZiBBc2tNZXNzYWdlVHlwZXMgJiBzdHJpbmc+KG5hbWU6IFQsIC4uLmFyZ3M6IFBhcmFtZXRlcnM8QXNrTWVzc2FnZVR5cGVzW1RdPikgPT4gUHJvbWlzZTxSZXR1cm5UeXBlPEFza01lc3NhZ2VUeXBlc1tUXT4+O1xuICAgIHJlcGx5OiA8VCBleHRlbmRzIGtleW9mIEFza01lc3NhZ2VUeXBlcyAmIHN0cmluZz4obmFtZTogVCwgY2I6IEFza01lc3NhZ2VUeXBlc1tUXSwgb3B0cz86IHtcbiAgICAgIGZvcmNlOiBib29sZWFuO1xuICAgIH0pID0+ICgpID0+IHZvaWQ7XG4gICAgc2VuZDogPFQgZXh0ZW5kcyBrZXlvZiBTdWJzY3JpcHRpb25NZXNzYWdlVHlwZXMgJiBzdHJpbmc+KG5hbWU6IFQsIC4uLmFyZ3M6IFBhcmFtZXRlcnM8U3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzW1RdPikgPT4gdm9pZDtcbiAgICBzdWJzY3JpYmU6IDxUIGV4dGVuZHMga2V5b2YgU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCBjYjogU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzW1RdKSA9PiAoKSA9PiB2b2lkO1xuICAgIG9uY2U6IDxUIGV4dGVuZHMga2V5b2YgU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCBjYjogU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzW1RdKSA9PiB2b2lkO1xuICAgIHVuc3Vic2NyaWJlOiA8VCBleHRlbmRzIGtleW9mIFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlcyAmIHN0cmluZz4obmFtZTogVCwgY2I6IFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlc1tUXSkgPT4gdm9pZDtcbiAgfTtcbn07XG5cblxuY29uc3QgYXNrUmVwbHlDaGFubmVscyA9IG5ldyBNYXA8c3RyaW5nLCBNZXNzYWdlQ2hhbm5lbD4oKTtcbmNvbnN0IHNlbmRTdWJzY3JpYmVDaGFubmVscyA9IG5ldyBNYXA8c3RyaW5nLCBNZXNzYWdlQ2hhbm5lbD4oKTtcbmNvbnN0IHNlbmRTdWJzY3JpYmVDYWxsYmFja3MgPSBuZXcgTWFwPEZ1bmN0aW9uLCAoLi4uYXJnczogYW55W10pID0+IGFueT4oKTtcblxuY29uc3QgYXNrID0gPFQgZXh0ZW5kcyBrZXlvZiBBc2tNZXNzYWdlVHlwZXMgJiBzdHJpbmc+KG5hbWU6IFQsIC4uLmFyZ3M6IFBhcmFtZXRlcnM8QXNrTWVzc2FnZVR5cGVzW1RdPik6IFByb21pc2U8UmV0dXJuVHlwZTxBc2tNZXNzYWdlVHlwZXNbVF0+PiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBsZXQgcG9ydCA9IGFza1JlcGx5Q2hhbm5lbHMuZ2V0KG5hbWUpPy5wb3J0MVxuICAgIGlmICghcG9ydCkge1xuICAgICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgYXNrUmVwbHlDaGFubmVscy5zZXQobmFtZSwgYyk7XG4gICAgICBwb3J0ID0gYy5wb3J0MVxuICAgIH1cbiAgICBsZXQgaW5uZXJjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgY29uc3QgbCA9IChldnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgICAgcmVzb2x2ZShldnQuZGF0YSk7XG4gICAgICBpbm5lcmNoYW5uZWwgPSBudWxsITtcbiAgICB9XG4gICAgaW5uZXJjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGw7XG4gICAgcG9ydC5wb3N0TWVzc2FnZShhcmdzLCBbaW5uZXJjaGFubmVsLnBvcnQyXSk7XG4gIH0pO1xufVxuXG5jb25zdCByZXBseSA9IDxUIGV4dGVuZHMga2V5b2YgQXNrTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCBjYjogQXNrTWVzc2FnZVR5cGVzW1RdLCBvcHRzOiB7IGZvcmNlOiBib29sZWFuIH0gPSB7IGZvcmNlOiBmYWxzZSB9KSA9PiB7XG4gIGlmICh0eXBlb2YgY2IgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgXCJyZXBseSBjYWxsYmFjayBmb3IgbWVzc2FnZSBcIiArIG5hbWUgKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiO1xuICBsZXQgcG9ydCA9IGFza1JlcGx5Q2hhbm5lbHMuZ2V0KG5hbWUpPy5wb3J0MlxuICBpZiAoIXBvcnQpIHtcbiAgICBjb25zdCBjID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgYXNrUmVwbHlDaGFubmVscy5zZXQobmFtZSwgYyk7XG4gICAgcG9ydCA9IGMucG9ydDJcbiAgfVxuICBpZiAoIW9wdHMuZm9yY2UgJiYgcG9ydC5vbm1lc3NhZ2UpIHRocm93IFwicmVwbHkgYWxyZWFkeSBzZXQgZm9yIG1lc3NhZ2UgXCIgKyBuYW1lXG4gIGNvbnN0IGwgPSBhc3luYyAoZXZ0OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICBjb25zdCBpbm5lcnBvcnQgPSBldnQucG9ydHNbMF1cbiAgICAvL0B0cy1leHBlY3QtZXJyb3JcbiAgICBjb25zdCByID0gYXdhaXQgY2IoLi4uZXZ0LmRhdGEpO1xuICAgIGlubmVycG9ydC5wb3N0TWVzc2FnZShyKTtcbiAgICBpbm5lcnBvcnQuY2xvc2UoKTtcbiAgfVxuICBwb3J0Lm9ubWVzc2FnZSA9IGw7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgcG9ydCEub25tZXNzYWdlID0gbnVsbCE7XG4gIH1cbn1cblxuY29uc3Qgc2VuZCA9IDxUIGV4dGVuZHMga2V5b2YgU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCAuLi5hcmdzOiBQYXJhbWV0ZXJzPFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlc1tUXT4pID0+IHtcbiAgbGV0IHBvcnQgPSBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMuZ2V0KG5hbWUpPy5wb3J0MVxuICBpZiAoIXBvcnQpIHtcbiAgICBjb25zdCBjID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgc2VuZFN1YnNjcmliZUNoYW5uZWxzLnNldChuYW1lLCBjKTtcbiAgICBwb3J0ID0gYy5wb3J0MVxuICB9XG4gIHBvcnQucG9zdE1lc3NhZ2UoYXJncyk7XG59XG5cbmNvbnN0IHN1YnNjcmliZSA9IDxUIGV4dGVuZHMga2V5b2YgU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCBjYjogU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzW1RdKSA9PiB7XG4gIGlmICh0eXBlb2YgY2IgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgXCJyZXBseSBjYWxsYmFjayBmb3IgbWVzc2FnZSBcIiArIG5hbWUgKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiO1xuICBsZXQgcG9ydCA9IHNlbmRTdWJzY3JpYmVDaGFubmVscy5nZXQobmFtZSk/LnBvcnQyXG4gIGlmICghcG9ydCkge1xuICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQyXG4gIH1cbiAgY29uc3QgbCA9IChldnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICAgIC8vQHRzLWV4cGVjdC1lcnJvclxuICAgIGNiKC4uLmV2dC5kYXRhKTtcbiAgfVxuICBzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzLnNldChjYiwgbCk7XG4gIHBvcnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgbCk7XG4gIHBvcnQuc3RhcnQoKTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBwb3J0Py5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBsKTtcbiAgICBzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzLmRlbGV0ZShjYik7XG4gIH1cbn1cblxuY29uc3Qgb25jZSA9IDxUIGV4dGVuZHMga2V5b2YgU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCBjYjogU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzW1RdKSA9PiB7XG4gIGlmICh0eXBlb2YgY2IgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgXCJyZXBseSBjYWxsYmFjayBmb3IgbWVzc2FnZSBcIiArIG5hbWUgKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiO1xuICAvL0B0cy1leHBlY3QtZXJyb3JcbiAgY29uc3QgdW5zdWJzY3JpYmUgPSBzdWJzY3JpYmUobmFtZSwgKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICAgIC8vQHRzLWV4cGVjdC1lcnJvclxuICAgIGNiKC4uLmFyZ3MpO1xuICAgIHVuc3Vic2NyaWJlKCk7XG4gIH0pO1xufVxuXG5jb25zdCB1bnN1YnNjcmliZSA9IDxUIGV4dGVuZHMga2V5b2YgU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCBjYjogU3Vic2NyaXB0aW9uTWVzc2FnZVR5cGVzW1RdKSA9PiB7XG4gIGxldCBwb3J0ID0gc2VuZFN1YnNjcmliZUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFwb3J0KSByZXR1cm47XG4gIGNvbnN0IGwgPSBzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzLmdldChjYik7XG4gIGlmIChsKSB7XG4gICAgcG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBsKTtcbiAgICBzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzLmRlbGV0ZShjYik7XG4gIH1cbn1cblxuZXhwb3J0IHtcbiAgYXNrLFxuICByZXBseSxcbiAgc2VuZCxcbiAgc3Vic2NyaWJlLFxuICBvbmNlLFxuICB1bnN1YnNjcmliZVxufVxuXG5leHBvcnQgY29uc3QgTWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlID0ge1xuICBJbnN0YW5jZToge1xuICAgIGFzayxcbiAgICByZXBseSxcbiAgICBzZW5kLFxuICAgIHN1YnNjcmliZSxcbiAgICBvbmNlLFxuICAgIHVuc3Vic2NyaWJlXG4gIH1cbn0iLCJpbXBvcnQgeyBjb21wdXRlZCwgZGVmaW5lQ29tcG9uZW50IH0gZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBDb21tb25SZWdpc3RyeSB9IGZyb20gXCIuLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XHJcbiAgbmFtZTogXCJpbmplY3RcIixcclxuICBwcm9wczoge1xyXG4gICAgaWQ6IHsgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgdHlwZTogeyBkZWZhdWx0OiBudWxsLCB0eXBlOiBTdHJpbmcgfSxcclxuICAgIHZhbHVlOiB7IGRlZmF1bHQ6IG51bGwgfSxcclxuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBudWxsIH0sXHJcbiAgICBuYW1lczogeyB0eXBlOiBBcnJheTxzdHJpbmc+LCBkZWZhdWx0OiBudWxsIH0sXHJcbiAgICBncm91cDogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IG51bGwgfSxcclxuICAgIG1ldGFkYXRhOiB7IHR5cGU6IE9iamVjdCwgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgZGlzYWJsZWQ6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcclxuICAgIHJlYWRvbmx5OiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH1cclxuICB9LFxyXG4gIHNldHVwKHByb3BzLCB7IGVtaXQgfSkge1xyXG5cclxuICAgIGNvbnN0IFZhbHVlID0gY29tcHV0ZWQoe1xyXG4gICAgICBnZXQ6ICgpID0+IHsgcmV0dXJuIHByb3BzLnZhbHVlIH0sXHJcbiAgICAgIHNldDogKHYpID0+IHsgZW1pdChcImlucHV0XCIsIHYpOyB9XHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IENvbXBvbmVudHMgPSBjb21wdXRlZCgoKSA9PiB7XHJcbiAgICAgIGlmIChwcm9wcy5uYW1lKVxyXG4gICAgICAgIHJldHVybiBbQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UuZ2V0Q29tcG9uZW50KHByb3BzLm5hbWUsIHByb3BzLmdyb3VwKV07XHJcbiAgICAgIGlmIChwcm9wcy5ncm91cClcclxuICAgICAgICByZXR1cm4gQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UuZ2V0R3JvdXBDb21wb25lbnRzKHByb3BzLmdyb3VwLCAuLi4ocHJvcHMubmFtZXMgfHwgW10pKTtcclxuICAgICAgcmV0dXJuIENvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLmdldENvbXBvbmVudHMoLi4uKHByb3BzLm5hbWVzIHx8IFtdKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjbGljayA9ICguLi5hcmdzOiBhbnlbXSkgPT4geyBlbWl0KCdjbGljaycsIC4uLmFyZ3MpIH1cclxuICAgIGNvbnN0IHNhdmUgPSAoLi4uYXJnczogYW55W10pID0+IHsgZW1pdCgnc2F2ZScsIC4uLmFyZ3MpIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpZDogcHJvcHMuaWQsXHJcbiAgICAgIHR5cGU6IHByb3BzLnR5cGUsXHJcbiAgICAgIHZhbHVlOiBwcm9wcy52YWx1ZSxcclxuICAgICAgbmFtZTogcHJvcHMubmFtZSxcclxuICAgICAgbmFtZXM6IHByb3BzLm5hbWVzLFxyXG4gICAgICBncm91cDogcHJvcHMuZ3JvdXAsXHJcbiAgICAgIG1ldGFkYXRhOiBwcm9wcy5tZXRhZGF0YSxcclxuICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkLFxyXG4gICAgICByZWFkb25seTogcHJvcHMucmVhZG9ubHksXHJcbiAgICAgIGNsaWNrLFxyXG4gICAgICBzYXZlLFxyXG4gICAgICBDb21wb25lbnRzLFxyXG4gICAgICBWYWx1ZSxcclxuICAgIH1cclxuICB9XHJcblxyXG59KTsiLCJcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50UHVibGljSW5zdGFuY2UgfSBmcm9tIFwidnVlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3RhYmxlTW9kZWw8VD4ge1xuICBkYXRhOiBUOyByZXNvbHZlOiAoaXRlbTogVCkgPT4gdm9pZDsgcmVqZWN0OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdG9yIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgUHJvamVjdG9yKCk7XG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogUHJvamVjdG9yIHsgcmV0dXJuIFByb2plY3Rvci5pbnN0YW5jZSB9XG4gIHN0YXRpYyBzZXQgSW5zdGFuY2UodjogUHJvamVjdG9yKSB7IHRoaXMuaW5zdGFuY2UgPSB2OyB9XG5cbiAgcHJpdmF0ZSBzY3JlZW5zID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgcHJpdmF0ZSBwcm9qZWN0aW5nID0gbmV3IE1hcDxzdHJpbmcsIHsgY29tcG9uZW50OiBDb21wb25lbnQsIG1vZGVsOiBJUHJvamVjdGFibGVNb2RlbDxhbnk+LCBwcm9taXNlOiBQcm9taXNlPGFueT4gfCBudWxsLCBxdWV1ZTogYm9vbGVhbiB9W10+KCk7XG5cbiAgc2V0U2NyZWVuKHNjcmVlbjogQ29tcG9uZW50UHVibGljSW5zdGFuY2UsIG5hbWU6IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiKSB7XG4gICAgdGhpcy5zY3JlZW5zLnNldChuYW1lLCBzY3JlZW4pO1xuICB9XG5cblxuXG4gIHByb2plY3RUbzxUPihjb21wb25lbnQ6IENvbXBvbmVudCwgZGF0YTogVCB8IG51bGwgPSBudWxsLCBzY3JlZW46IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiLCBxdWV1ZTogYm9vbGVhbiA9IHRydWUsIGFzeW5jOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPFQ+IHwgbnVsbCB7XG4gICAgY29uc3QgbW9kZWwgPSB7IGRhdGEgfSBhcyBJUHJvamVjdGFibGVNb2RlbDxUPjtcbiAgICBjb25zdCBwcm9taXNlID0gYXN5bmMgPyBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7IG1vZGVsLnJlamVjdCA9IHJlamVjdDsgbW9kZWwucmVzb2x2ZSA9IHJlc29sdmUgfSkgOiBudWxsO1xuXG4gICAgaWYgKCFxdWV1ZSkge1xuXG4gICAgICB0aGlzLnByb2plY3Rpbmcuc2V0KHNjcmVlbiwgW3sgY29tcG9uZW50LCBtb2RlbCwgcHJvbWlzZSwgcXVldWUgfV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMucHJvamVjdGluZy5oYXMoc2NyZWVuKSkge1xuICAgICAgICB0aGlzLnByb2plY3Rpbmcuc2V0KHNjcmVlbiwgW10pO1xuICAgICAgfVxuICAgICAgKHRoaXMucHJvamVjdGluZy5nZXQoc2NyZWVuKSB8fCBbXSkucHVzaCh7IGNvbXBvbmVudCwgbW9kZWwsIHByb21pc2UsIHF1ZXVlIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNzID0gdGhpcy5zY3JlZW5zLmdldChzY3JlZW4pO1xuICAgIGlmICghc3MpIHJldHVybiBudWxsO1xuICAgIHNzLm1vZGVsID0gbW9kZWw7XG4gICAgc3MuY3VycmVudFZpZXcgPSBjb21wb25lbnQ7XG5cbiAgICBpZiAocHJvbWlzZSkgcHJvbWlzZS50aGVuKCgpID0+IHRoaXMuc3RvcFByb2plY3Rpbmcoc2NyZWVuKSkuY2F0Y2goKCkgPT4gdGhpcy5zdG9wUHJvamVjdGluZyhzY3JlZW4pKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHByb2plY3RBc3luY1RvPFQ+KGNvbXBvbmVudDogQ29tcG9uZW50LCBkYXRhOiBULCBzY3JlZW46IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiLCBxdWV1ZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0VG8oY29tcG9uZW50LCBkYXRhLCBzY3JlZW4sIHF1ZXVlLCB0cnVlKVxuICB9XG5cbiAgc3RvcFByb2plY3Rpbmcoc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIikge1xuICAgIGlmICh0aGlzLnByb2plY3RpbmcuaGFzKHNjcmVlbikpIHtcbiAgICAgICh0aGlzLnByb2plY3RpbmcuZ2V0KHNjcmVlbikgfHwgW10pLnBvcCgpXG4gICAgfVxuXG4gICAgbGV0IF9zY3JlZW4gPSB0aGlzLnNjcmVlbnMuZ2V0KHNjcmVlbilcbiAgICBpZiAoX3NjcmVlbiAmJiBfc2NyZWVuLmN1cnJlbnRWaWV3KSB7XG4gICAgICBfc2NyZWVuLm1vZGVsID0gbnVsbDtcbiAgICAgIF9zY3JlZW4uc2NyZWVuTW9kZWwgPSBudWxsO1xuICAgICAgX3NjcmVlbi5jdXJyZW50VmlldyA9IG51bGw7XG5cbiAgICAgIGlmICh0aGlzLnByb2plY3RpbmcuaGFzKHNjcmVlbikpIHtcbiAgICAgICAgbGV0IHMgPSB0aGlzLnByb2plY3RpbmcuZ2V0KHNjcmVlbik7XG4gICAgICAgIGlmIChzICYmIHMubGVuZ3RoKSB7XG4gICAgICAgICAgbGV0IG0gPSBzLnBvcCgpO1xuICAgICAgICAgIGlmIChtKSB0aGlzLnByb2plY3RUbyhtLmNvbXBvbmVudCwgbS5tb2RlbCwgc2NyZWVuLCBtLnF1ZXVlLCAhIW0ucHJvbWlzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3RhYmxlPFQ+IHtcbiAgdmFsdWU6IHtcbiAgICBkYXRhOiBULFxuICAgIHJlc29sdmU6IChpdGVtOiBUKSA9PiB2b2lkO1xuICAgIHJlamVjdDogKCkgPT4gdm9pZDtcbiAgfTtcbn0iLCJcbmltcG9ydCB7IENvbXBvbmVudCwgQ29tcG9uZW50UHVibGljSW5zdGFuY2UsIGNvbXB1dGVkLCBkZWZpbmVDb21wb25lbnQsIGdldEN1cnJlbnRJbnN0YW5jZSwgb25Nb3VudGVkLCBSZWYsIHJlZiwgd2F0Y2ggfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBJUHJvamVjdGFibGVNb2RlbCwgUHJvamVjdG9yIH0gZnJvbSBcIi4uL2hlbHBlcnMvUHJvamVjdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XG4gIG5hbWU6IFwic2NyZWVuXCIsXG4gIHByb3BzOiB7XG4gICAgbmFtZTogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IFwiZGVmYXVsdHNjcmVlblwiIH0sXG4gIH0sXG4gIHNldHVwKHByb3BzLCB7IGV4cG9zZSB9KSB7XG5cbiAgICBjb25zdCBtZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xuXG4gICAgY29uc3QgY3VycmVudFZpZXc6IFJlZjxDb21wb25lbnQ+ID0gcmVmKG51bGwhKTtcbiAgICBjb25zdCBtb2RlbDogUmVmPElQcm9qZWN0YWJsZU1vZGVsPGFueT4gfCBudWxsPiA9IHJlZihudWxsISk7XG5cbiAgICBleHBvc2UoeyBjdXJyZW50VmlldywgbW9kZWwgfSlcblxuICAgIGNvbnN0IGlzVmlzaWJsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiBjdXJyZW50Vmlldy52YWx1ZSAhPSBudWxsO1xuICAgIH0pXG5cbiAgICBjb25zdCBjdXJyZW50Vmlld1VJRCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiAoY3VycmVudFZpZXcudmFsdWUgYXMgYW55KT8uX19maWxlXG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBQcm9qZWN0b3IuSW5zdGFuY2Uuc2V0U2NyZWVuKChtZSBhcyBhbnkpLnByb3h5LCBwcm9wcy5uYW1lKTtcbiAgICB9KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRWaWV3VUlELFxuICAgICAgY3VycmVudFZpZXcsXG4gICAgICBtb2RlbCxcbiAgICAgIGlzVmlzaWJsZVxuICAgIH1cbiAgfSxcblxufSlcbiIsImNvbnN0IHByb2plY3RUb0RpcmVjdGl2ZSA9IHtcblxuICBpbnNlcnRlZDogKGVsOiBFbGVtZW50LCBiaW5kOiBhbnkpID0+IHtcbiAgICBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZS5pbmplY3RUbyhlbCwgYmluZC5hcmcpO1xuICB9LFxuICB1bmJpbmQ6IChlbDogRWxlbWVudCwgYmluZDogYW55KSA9PiB7XG4gICAgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2UucmVtb3ZlRnJvbShlbCwgYmluZC5hcmcpXG4gIH1cbn1cblxuXG5jb25zdCBzY3JlZW5EaXJlY3RpdmUgPSB7XG4gIGJpbmQ6IChlbDogYW55LCBiaW5kaW5nOiBhbnkpID0+IHtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2Uuc2V0U2NyZWVuKGVsLCBiaW5kaW5nLmFyZyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBwcm9qZWN0VG9EaXJlY3RpdmUsIHNjcmVlbkRpcmVjdGl2ZVxufVxuXG5leHBvcnQgY2xhc3MgU2NyZWVuc01hbmFnZXIge1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBTY3JlZW5zTWFuYWdlcigpO1xuICBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IFNjcmVlbnNNYW5hZ2VyIHsgcmV0dXJuIFNjcmVlbnNNYW5hZ2VyLmluc3RhbmNlIH1cbiAgc3RhdGljIHNldCBJbnN0YW5jZSh2OiBTY3JlZW5zTWFuYWdlcikgeyB0aGlzLmluc3RhbmNlID0gdjsgfVxuICBwcml2YXRlIHNjcmVlbnMgPSBuZXcgTWFwPHN0cmluZywgRWxlbWVudD4oKTtcbiAgXG5cbiAgaW5qZWN0VG8oZG9tRWxlbWVudDogRWxlbWVudCwgc2NyZWVuOiBzdHJpbmcpIHtcbiAgICBpZiAoIWRvbUVsZW1lbnQgfHwgIXNjcmVlbikgcmV0dXJuO1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5zY3JlZW5zLmhhcyhzY3JlZW4pID8gdGhpcy5zY3JlZW5zLmdldChzY3JlZW4pIDogbnVsbDtcbiAgICB0cnkgeyBkb21FbGVtZW50LnBhcmVudEVsZW1lbnQgJiYgZG9tRWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KTsgfSBjYXRjaCB7IH1cbiAgICBpZiAoZWxlbWVudCkgZWxlbWVudC5hcHBlbmQoZG9tRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVGcm9tKGRvbUVsZW1lbnQ6IEVsZW1lbnQsIHNjcmVlbjogc3RyaW5nKSB7XG4gICAgaWYgKCFkb21FbGVtZW50IHx8ICFzY3JlZW4pIHJldHVybjtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2NyZWVucy5oYXMoc2NyZWVuKSA/IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKSA6IG51bGw7XG4gICAgdHJ5IHsgaWYgKGVsZW1lbnQpIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tRWxlbWVudCkgfSBjYXRjaCB7IH1cbiAgfVxuXG4gIHNldFNjcmVlbihzY3JlZW46IEVsZW1lbnQsIG5hbWU6IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiKSB7XG4gICAgdGhpcy5zY3JlZW5zLnNldChuYW1lLCBzY3JlZW4pO1xuICB9XG59IiwiZnVuY3Rpb24gY2hlY2tJbnB1dFZhbGlkYXRpb24oYTogRXZlbnQsIGNhbGxvdXQ6IChlcnJvcnM6IHN0cmluZ1tdLCB2YWxpZDogYm9vbGVhbikgPT4gdm9pZCkge1xuICBpZiAoKGEudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbGlkaXR5KSB7XG4gICAgbGV0IGVsID0gKGEudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xuXG4gICAgaWYgKGVsLnZhbGlkaXR5KSB7XG4gICAgICBsZXQgZXJyb3JzID0gW1xuICAgICAgICBlbC52YWxpZGl0eS5iYWRJbnB1dCA/IFwiYmFkIGlucHV0XCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS5jdXN0b21FcnJvciA/IFwiY3VzdG9tIGVycm9yXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS5wYXR0ZXJuTWlzbWF0Y2ggPyBcInBhdHRlcm4gbWlzbWF0Y2hcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnJhbmdlT3ZlcmZsb3cgPyBcInJhbmdlIG92ZXJmbG93XCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS5yYW5nZVVuZGVyZmxvdyA/IFwicmFuZ2UgdW5kZXJmbG93XCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS5zdGVwTWlzbWF0Y2ggPyBcInN0ZXAgbWlzbWF0Y2hcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnRvb0xvbmcgPyBcInRvbyBsb25nXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS50b29TaG9ydCA/IFwidG9vIHNob3J0XCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS50eXBlTWlzbWF0Y2ggPyBcInR5cGUgbWlzbWF0Y2hcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnZhbHVlTWlzc2luZyA/IFwidmFsdWUgbWlzc2luZ1wiIDogbnVsbF0uZmlsdGVyKGkgPT4gISFpKVxuXG4gICAgICBjYWxsb3V0KGVycm9ycyBhcyBzdHJpbmdbXSwgZWwudmFsaWRpdHkudmFsaWQgIT0gdW5kZWZpbmVkID8gZWwudmFsaWRpdHkudmFsaWQgOiB0cnVlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlID0ge1xuICBpbnNlcnRlZDogKGVsOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50LCBiaW5kOiB7XG4gICAgdmFsdWU6IChlcnJvcnM6IHN0cmluZ1tdLCB2YWxpZDogYm9vbGVhbikgPT4gdm9pZCxcbiAgICBhcmc6IFwiaW1tZWRpYXRlXCJcbiAgfSkgPT4ge1xuICAgIGlmICghZWwgfHwgIWVsLndpbGxWYWxpZGF0ZSkgcmV0dXJuO1xuICAgIHN3aXRjaCAoZWwubm9kZU5hbWUpIHtcbiAgICAgIGNhc2UgXCJJTlBVVFwiOlxuICAgICAgY2FzZSBcIlRFWFRBUkVBXCI6IGVsLm9uYmx1ciA9IChhcmcpID0+IGNoZWNrSW5wdXRWYWxpZGF0aW9uKGFyZywgYmluZC52YWx1ZSk7IGJyZWFrO1xuICAgICAgY2FzZSBcIlNFTEVDVFwiOiBlbC5vbmNoYW5nZSA9IChhcmcpID0+IGNoZWNrSW5wdXRWYWxpZGF0aW9uKGFyZywgYmluZC52YWx1ZSk7IGJyZWFrO1xuICAgIH1cblxuICAgIGVsLm9uaW52YWxpZCA9IChhcmcpID0+IGNoZWNrSW5wdXRWYWxpZGF0aW9uKGFyZywgYmluZC52YWx1ZSk7XG4gICAgaWYgKGVsLmZvcm0pIGVsLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignaW52YWxpZCcsICgpID0+IGNoZWNrSW5wdXRWYWxpZGF0aW9uKHsgdGFyZ2V0OiBlbCB9IGFzIGFueSwgYmluZC52YWx1ZSkpXG5cbiAgICBpZiAoYmluZC5hcmcgPT0gXCJpbW1lZGlhdGVcIikgZWwucmVwb3J0VmFsaWRpdHkoKTtcbiAgICBlbHNlIGNoZWNrSW5wdXRWYWxpZGF0aW9uKHsgdGFyZ2V0OiBlbCB9IGFzIGFueSwgYmluZC52YWx1ZSlcbiAgfSxcbiAgdW5iaW5kOiAoZWw6IEVsZW1lbnQpID0+IHtcbiAgICBpZiAoIWVsKSByZXR1cm47XG5cbiAgfSxcbn1cbiIsImltcG9ydCB7IE1lbnVIZWxwZXIsIG1lbnVUeXBlLCBNZW51Tm90aWZpY2F0aW9ucywgSU1lbnVEZWZpbml0aW9uIH0gZnJvbSBcIi4vaGVscGVycy9NZW51SGVscGVyXCI7XG5pbXBvcnQgeyBDb21tb25SZWdpc3RyeSB9IGZyb20gXCIuL2hlbHBlcnMvQ29tbW9uUmVnaXN0cnlcIjtcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSBcIi4vaGVscGVycy9NZXNzYWdlU2VydmljZVwiO1xuaW1wb3J0IHsgSVJvdXRlQ29uZmlnIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9Sb3V0ZXJJbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBJU3RvcmUgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL1N0b3JlSW50ZXJmYWNlc1wiO1xuaW1wb3J0IEluamVjdCBmcm9tIFwiLi9jb21wb25lbnRzL2luamVjdC52dWVcIjtcbmltcG9ydCBTY3JlZW4gZnJvbSBcIi4vY29tcG9uZW50cy9zY3JlZW4udnVlXCI7XG5pbXBvcnQgeyBWdWVDb25zdHJ1Y3RvciB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IElQcm9qZWN0YWJsZU1vZGVsLCBQcm9qZWN0YWJsZSwgUHJvamVjdG9yIH0gZnJvbSBcIi4vaGVscGVycy9Qcm9qZWN0b3JcIjtcbmltcG9ydCBkaXJlY3RpdmVzLCB7IFNjcmVlbnNNYW5hZ2VyIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9zY3JlZW5cIjtcbmltcG9ydCB7IHZhbGlkYXRlIGFzIFZhbGlkYXRlRGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy92YWxpZGF0ZVwiO1xuXG5cbmZ1bmN0aW9uIGluc3RhbGwoVnVlOiBWdWVDb25zdHJ1Y3Rvcikge1xuICBWdWUuY29tcG9uZW50KFwic2NyZWVuXCIsIFNjcmVlbik7XG4gIFZ1ZS5jb21wb25lbnQoXCJpbmplY3RcIiwgSW5qZWN0KTtcbiAgVnVlLmRpcmVjdGl2ZShcInNjcmVlblwiLCBkaXJlY3RpdmVzLnNjcmVlbkRpcmVjdGl2ZSk7XG4gIFZ1ZS5kaXJlY3RpdmUoXCJwcm9qZWN0VG9cIiwgZGlyZWN0aXZlcy5wcm9qZWN0VG9EaXJlY3RpdmUpO1xuICBWdWUuZGlyZWN0aXZlKFwidmFsaWRhdGVcIiwgVmFsaWRhdGVEaXJlY3RpdmUgYXMgYW55KTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIElNb2R1bGVJbml0aWFsaXplciB7XG4gIGluaXQodnVlbWY6IHR5cGVvZiBWdWVNZk1vZHVsZSwgbWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55KTogUHJvbWlzZTx2b2lkPixcblxuICBjb25maWc/KG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSk6IFByb21pc2U8dm9pZD4sXG5cbiAgcnVuPyhtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkpOiBQcm9taXNlPHZvaWQ+LFxuXG4gIHJvdXRlczogSVJvdXRlQ29uZmlnW11cbn1cblxuaW50ZXJmYWNlIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXIge1xuICBpbml0KG1lbnU6IE1lbnVIZWxwZXIsXG4gICAgc3RvcmU6IElTdG9yZSxcbiAgICBjb25maWd1cmF0aW9uOiBhbnlcbiAgICAsIG9wdGlvbnM6IHtcbiAgICAgIHJlZ2lzdHJ5OiBDb21tb25SZWdpc3RyeSxcbiAgICAgIG1lc3NhZ2VTZXJ2aWNlOiB0eXBlb2YgTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UsXG4gICAgICBwcm9qZWN0b3I6IFByb2plY3RvcixcbiAgICAgIHNjcmVlbnM6IFNjcmVlbnNNYW5hZ2VyXG4gICAgfSk6IFByb21pc2U8dm9pZD4sXG4gIGNvbmZpZyhtZW51OiBNZW51SGVscGVyLFxuICAgIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+LFxuICBydW4obWVudTogTWVudUhlbHBlcixcbiAgICBzdG9yZTogSVN0b3JlKTogUHJvbWlzZTx2b2lkPixcbiAgcm91dGVzOiBJUm91dGVDb25maWdbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTW9kdWxlSW5pdGlhbGl6ZXIob3B0czogSU1vZHVsZUluaXRpYWxpemVyKSB7XG4gIGxldCBtb2R1bGVDb25maWcgPSB7fTtcbiAgcmV0dXJuIHtcbiAgICBpbml0KG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgcmVnaXN0cnk6IENvbW1vblJlZ2lzdHJ5LFxuICAgICAgICBtZXNzYWdlU2VydmljZTogdHlwZW9mIE1lc3NhZ2VTZXJ2aWNlLkluc3RhbmNlLFxuICAgICAgICBwcm9qZWN0b3I6IFByb2plY3RvcixcbiAgICAgICAgc2NyZWVuczogU2NyZWVuc01hbmFnZXJcbiAgICAgIH0pIHtcblxuICAgICAgaWYgKG9wdGlvbnMucmVnaXN0cnkpIENvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlID0gb3B0aW9ucy5yZWdpc3RyeTtcbiAgICAgIGlmIChvcHRpb25zLm1lc3NhZ2VTZXJ2aWNlKSBNZXNzYWdlU2VydmljZS5JbnN0YW5jZSA9IG9wdGlvbnMubWVzc2FnZVNlcnZpY2VcbiAgICAgIGlmIChvcHRpb25zLnByb2plY3RvcikgUHJvamVjdG9yLkluc3RhbmNlID0gb3B0aW9ucy5wcm9qZWN0b3I7XG4gICAgICBpZiAob3B0aW9ucy5zY3JlZW5zKSBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZSA9IG9wdGlvbnMuc2NyZWVucztcbiAgICAgIG1vZHVsZUNvbmZpZyA9IGNvbmZpZ3VyYXRpb247XG4gICAgICByZXR1cm4gb3B0cy5pbml0KFZ1ZU1mTW9kdWxlLCBtZW51LCBzdG9yZSwgY29uZmlndXJhdGlvbik7XG4gICAgfSxcbiAgICBjb25maWcobWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSkge1xuICAgICAgcmV0dXJuIG9wdHMuY29uZmlnID8gb3B0cy5jb25maWcobWVudSwgc3RvcmUsIG1vZHVsZUNvbmZpZykgOiBudWxsO1xuICAgIH0sXG4gICAgcnVuKG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUpIHtcbiAgICAgIHJldHVybiBvcHRzLnJ1biA/IG9wdHMucnVuKG1lbnUsIHN0b3JlLCBtb2R1bGVDb25maWcpIDogbnVsbDtcbiAgICB9LFxuICAgIHJvdXRlczogb3B0cy5yb3V0ZXNcbiAgfSBhcyBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJbml0TW9kdWxlKG1vZHVsZTogYW55LCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkgfCB1bmRlZmluZWQpOiBQcm9taXNlPElNb2R1bGVJbml0aWFsaXplcj4ge1xuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLmluaXQoTWVudUhlbHBlci5JbnN0YW5jZSwgc3RvcmUsIGNvbmZpZ3VyYXRpb24gfHwge30sXG4gICAge1xuICAgICAgcmVnaXN0cnk6IENvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLFxuICAgICAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLkluc3RhbmNlLFxuICAgICAgcHJvamVjdG9yOiBQcm9qZWN0b3IuSW5zdGFuY2UsXG4gICAgICBzY3JlZW5zOiBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZVxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIGluaXRvYmogYXMgdW5rbm93biBhcyBJTW9kdWxlSW5pdGlhbGl6ZXI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb25maWdNb2R1bGUobW9kdWxlOiBhbnksIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgaW5pdG9iaiA9IChtb2R1bGUuZGVmYXVsdC5kZWZhdWx0IHx8IG1vZHVsZS5kZWZhdWx0KSBhcyBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyO1xuICByZXR1cm4gaW5pdG9iai5jb25maWcoTWVudUhlbHBlci5JbnN0YW5jZSwgc3RvcmUpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBSdW5Nb2R1bGUobW9kdWxlOiBhbnksIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgaW5pdG9iaiA9IChtb2R1bGUuZGVmYXVsdC5kZWZhdWx0IHx8IG1vZHVsZS5kZWZhdWx0KSBhcyBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyO1xuICByZXR1cm4gaW5pdG9iai5ydW4oTWVudUhlbHBlci5JbnN0YW5jZSwgc3RvcmUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTW9kdWxlUm91dGVzKG1vZHVsZTogYW55KTogSVJvdXRlQ29uZmlnW10ge1xuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLnJvdXRlcztcbn1cblxuZXhwb3J0IHtcbiAgTWVudUhlbHBlcixcbiAgdHlwZSBJTWVudURlZmluaXRpb24sXG4gIG1lbnVUeXBlLFxuICBDb21tb25SZWdpc3RyeSxcbiAgTWVzc2FnZVNlcnZpY2UsXG4gIEluamVjdCxcbiAgU2NyZWVuLFxuICBWYWxpZGF0ZURpcmVjdGl2ZSxcbiAgdHlwZSBQcm9qZWN0YWJsZSxcbiAgdHlwZSBJUHJvamVjdGFibGVNb2RlbCxcbiAgTWVudU5vdGlmaWNhdGlvbnMsXG4gIFByb2plY3Rvcixcbn1cblxuY29uc3QgVnVlTWZNb2R1bGUgPSB7XG4gIGluc3RhbGwsXG4gIE1lbnVIZWxwZXI6IG5ldyBNZW51SGVscGVyKCksXG4gIG1lbnVUeXBlLFxuICBDb21tb25SZWdpc3RyeTogbmV3IENvbW1vblJlZ2lzdHJ5KCksXG4gIE1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcbiAgSW5qZWN0LFxuICBTY3JlZW4sXG4gIFZhbGlkYXRlRGlyZWN0aXZlLFxuICBNZW51Tm90aWZpY2F0aW9ucyxcbiAgUHJvamVjdG9yXG59XG5cbmV4cG9ydCBkZWZhdWx0IFZ1ZU1mTW9kdWxlO1xuIl0sIm5hbWVzIjpbIkUiLCJuYW1lIiwiY2FsbGJhY2siLCJjdHgiLCJlIiwic2VsZiIsImxpc3RlbmVyIiwiZGF0YSIsImV2dEFyciIsImkiLCJsZW4iLCJldnRzIiwibGl2ZUV2ZW50cyIsInRpbnlFbWl0dGVyTW9kdWxlIiwiVGlueUVtaXR0ZXIiLCJ0aW55RW1pdHRlciIsIm1lbnVUeXBlIiwibWVudVR5cGUyIiwiTWVudU5vdGlmaWNhdGlvbnMiLCJfTWVudUhlbHBlciIsIl9fcHVibGljRmllbGQiLCJtZW51RGVmaW5pdGlvbiIsInBvc2l0aW9ucyIsImZvdW5kIiwibSIsImVsZW1lbnQiLCJtZW51IiwicmVzdWx0IiwidXNlZCIsImtleSIsInJyIiwiYiIsImEiLCJNZW51SGVscGVyIiwiX0NvbW1vblJlZ2lzdHJ5IiwidiIsImNvbXBvbmVudCIsImdyb3VwIiwiZ2ciLCJnIiwic2VydmljZSIsIkNvbW1vblJlZ2lzdHJ5IiwiYXNrUmVwbHlDaGFubmVscyIsInNlbmRTdWJzY3JpYmVDaGFubmVscyIsInNlbmRTdWJzY3JpYmVDYWxsYmFja3MiLCJhc2siLCJhcmdzIiwicmVzb2x2ZSIsInBvcnQiLCJfYSIsImMiLCJpbm5lcmNoYW5uZWwiLCJsIiwiZXZ0IiwicmVwbHkiLCJjYiIsIm9wdHMiLCJpbm5lcnBvcnQiLCJyIiwic2VuZCIsInN1YnNjcmliZSIsIm9uY2UiLCJ1bnN1YnNjcmliZSIsIk1lc3NhZ2VTZXJ2aWNlIiwiX3NmY19tYWluJDEiLCJkZWZpbmVDb21wb25lbnQiLCJwcm9wcyIsImVtaXQiLCJWYWx1ZSIsImNvbXB1dGVkIiwiQ29tcG9uZW50cyIsImNsaWNrIiwic2F2ZSIsIl9Qcm9qZWN0b3IiLCJzY3JlZW4iLCJxdWV1ZSIsImFzeW5jIiwibW9kZWwiLCJwcm9taXNlIiwicmVqZWN0Iiwic3MiLCJfc2NyZWVuIiwicyIsIlByb2plY3RvciIsIl9zZmNfbWFpbiIsImV4cG9zZSIsIm1lIiwiZ2V0Q3VycmVudEluc3RhbmNlIiwiY3VycmVudFZpZXciLCJyZWYiLCJpc1Zpc2libGUiLCJjdXJyZW50Vmlld1VJRCIsIm9uTW91bnRlZCIsInByb2plY3RUb0RpcmVjdGl2ZSIsImVsIiwiYmluZCIsIlNjcmVlbnNNYW5hZ2VyIiwic2NyZWVuRGlyZWN0aXZlIiwiYmluZGluZyIsImRpcmVjdGl2ZXMiLCJfU2NyZWVuc01hbmFnZXIiLCJkb21FbGVtZW50IiwiY2hlY2tJbnB1dFZhbGlkYXRpb24iLCJjYWxsb3V0IiwiZXJyb3JzIiwidmFsaWRhdGUiLCJhcmciLCJpbnN0YWxsIiwiVnVlIiwiU2NyZWVuIiwiSW5qZWN0IiwiVmFsaWRhdGVEaXJlY3RpdmUiLCJNb2R1bGVJbml0aWFsaXplciIsIm1vZHVsZUNvbmZpZyIsInN0b3JlIiwiY29uZmlndXJhdGlvbiIsIm9wdGlvbnMiLCJWdWVNZk1vZHVsZSIsIkluaXRNb2R1bGUiLCJtb2R1bGUiLCJpbml0b2JqIiwiQ29uZmlnTW9kdWxlIiwiUnVuTW9kdWxlIiwiTW9kdWxlUm91dGVzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFNBQVNBLElBQUs7QUFHZDtBQUVBQSxFQUFFLFlBQVk7QUFBQSxFQUNaLElBQUksU0FBVUMsR0FBTUMsR0FBVUMsR0FBSztBQUNqQyxRQUFJQyxJQUFJLEtBQUssTUFBTSxLQUFLLElBQUksQ0FBQTtBQUU1QixZQUFDQSxFQUFFSCxPQUFVRyxFQUFFSCxLQUFRLENBQUEsSUFBSyxLQUFLO0FBQUEsTUFDL0IsSUFBSUM7QUFBQSxNQUNKLEtBQUtDO0FBQUEsSUFDWCxDQUFLLEdBRU07QUFBQSxFQUNSO0FBQUEsRUFFRCxNQUFNLFNBQVVGLEdBQU1DLEdBQVVDLEdBQUs7QUFDbkMsUUFBSUUsSUFBTztBQUNYLGFBQVNDLElBQVk7QUFDbkIsTUFBQUQsRUFBSyxJQUFJSixHQUFNSyxDQUFRLEdBQ3ZCSixFQUFTLE1BQU1DLEdBQUssU0FBUztBQUFBLElBRW5DO0FBQ0ksV0FBQUcsRUFBUyxJQUFJSixHQUNOLEtBQUssR0FBR0QsR0FBTUssR0FBVUgsQ0FBRztBQUFBLEVBQ25DO0FBQUEsRUFFRCxNQUFNLFNBQVVGLEdBQU07QUFDcEIsUUFBSU0sSUFBTyxDQUFBLEVBQUcsTUFBTSxLQUFLLFdBQVcsQ0FBQyxHQUNqQ0MsTUFBVyxLQUFLLE1BQU0sS0FBSyxJQUFJLENBQUEsSUFBS1AsTUFBUyxDQUFFLEdBQUUsTUFBSyxHQUN0RFEsSUFBSSxHQUNKQyxJQUFNRixFQUFPO0FBRWpCLFNBQUtDLEdBQUdBLElBQUlDLEdBQUtEO0FBQ2YsTUFBQUQsRUFBT0MsR0FBRyxHQUFHLE1BQU1ELEVBQU9DLEdBQUcsS0FBS0YsQ0FBSTtBQUd4QyxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsS0FBSyxTQUFVTixHQUFNQyxHQUFVO0FBQzdCLFFBQUlFLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxDQUFBLElBQ3hCTyxJQUFPUCxFQUFFSCxJQUNUVyxJQUFhLENBQUE7QUFFakIsUUFBSUQsS0FBUVQ7QUFDVixlQUFTTyxJQUFJLEdBQUdDLElBQU1DLEVBQUssUUFBUUYsSUFBSUMsR0FBS0Q7QUFDMUMsUUFBSUUsRUFBS0YsR0FBRyxPQUFPUCxLQUFZUyxFQUFLRixHQUFHLEdBQUcsTUFBTVAsS0FDOUNVLEVBQVcsS0FBS0QsRUFBS0YsRUFBRTtBQVE3QixXQUFDRyxFQUFXLFNBQ1JSLEVBQUVILEtBQVFXLElBQ1YsT0FBT1IsRUFBRUgsSUFFTjtBQUFBLEVBQ1I7QUFDSDtBQUVBWSxFQUFjLFVBQUdiO0FBQ2pCLElBQUFjLElBQUFDLEVBQUFBLFFBQUEsY0FBNkJmLEdDbkRqQmdCLHNCQUFBQSxPQUNWQSxFQUFBQyxFQUFBLFNBQUEsS0FBQSxVQUNBRCxFQUFBQyxFQUFBLFNBQUEsS0FBQSxVQUNBRCxFQUFBQyxFQUFBLFNBQUEsS0FBQSxVQUhVRCxJQUFBQSxLQUFBLENBQUEsQ0FBQTtBQU1MLE1BQU1FLElBQW9CO0FBQUEsRUFDL0IscUJBQXFCO0FBQ3ZCLEdBRWFDLElBQU4sTUFBaUI7QUFBQSxFQUFqQjtBQUVHLElBQUFDLEVBQUEseUJBQXFDLENBQUE7QUFDckMsSUFBQUEsRUFBQSx1QkFBZ0UsQ0FBQTtBQUNoRSxJQUFBQSxFQUFBLHVCQUE2QixJQUFJTjs7RUFFekMsSUFBVyxnQkFBZ0I7QUFBRSxXQUFPLEtBQUs7QUFBQSxFQUFlO0FBQUEsRUFDeEQsV0FBa0IsV0FBVztBQUFFLFdBQU9LLEVBQVc7QUFBQSxFQUFTO0FBQUEsRUFFbkQsa0JBQWtCRSxNQUFvQ0MsR0FBcUQ7QUFHNUcsUUFBQUMsSUFBUSxLQUFLLGdCQUFnQixLQUFLLE9BQUtDLEVBQUUsUUFBUUgsRUFBZSxJQUFJO0FBQ3hFLElBQUtFLElBR2NGLElBQUFFLElBRlosS0FBQSxnQkFBZ0IsS0FBS0YsQ0FBYztBQUkxQyxlQUFXSSxLQUFXSDtBQUVwQixXQUFLLGNBQWNHLEVBQVEsV0FBVyxLQUFLLGNBQWNBLEVBQVEsWUFBWSxJQUM3RSxLQUFLLGNBQWNBLEVBQVEsU0FBU0EsRUFBUSxVQUFVSixFQUFlLFFBQVEsS0FBSyxjQUFjSSxFQUFRLFNBQVNBLEVBQVEsVUFBVUosRUFBZSxTQUFTLElBRXZKSSxFQUFRLFVBQ1YsS0FBSyxjQUFjQSxFQUFRLFNBQVNBLEVBQVEsUUFBUSxLQUFLSixFQUFlLElBQUk7QUFHaEYsU0FBSyxjQUFjLEtBQUtILEVBQWtCLHFCQUFxQkcsQ0FBYztBQUFBLEVBQy9FO0FBQUEsRUFFTyxZQUFZcEIsR0FBMkM7QUFDNUQsV0FBTyxLQUFLLGdCQUFnQixLQUFLLENBQUtRLE1BQUFBLEVBQUUsUUFBUVIsQ0FBSTtBQUFBLEVBQ3REO0FBQUEsRUFFTyxRQUFReUIsR0FBb0c7QUFDakgsUUFBSUMsSUFBNkYsQ0FBQSxHQUM3RkMsd0JBQVc7QUFFSixlQUFBQyxLQUFPLEtBQUssY0FBY0gsSUFBTztBQUNwQyxZQUFBRCxJQUFVLEtBQUssY0FBY0MsR0FBTUc7QUFHekMsVUFBSUMsSUFBSztBQUFBLFFBQ1AsTUFBTSxLQUFLLGdCQUFnQixLQUFLLENBQUtOLE1BQzVCQSxFQUFFLFFBQVFLLE1BQ2QsQ0FBQ0wsRUFBRSxVQUFVLENBQUNBLEVBQUUsT0FBTyxFQUMzQjtBQUFBLFFBRUQsVUFBVUMsRUFBUSxJQUFJLENBQUFoQixNQUFLLEtBQUssZ0JBQWdCLEtBQUssQ0FBQWUsTUFBS0EsRUFBRSxRQUFRZixNQUFNLENBQUNlLEVBQUUsVUFBVSxDQUFDQSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQ2pHLE9BQU8sQ0FBQWYsTUFBSyxDQUFDLENBQUNBLENBQUMsRUFDZixLQUFLLENBQUMsR0FBR3NCLE1BQ0osS0FBS0EsS0FBSyxFQUFFLGNBQWNBLEVBQUUsY0FBYyxFQUFFLGFBQWFBLEVBQUUsYUFBbUIsSUFDOUUsS0FBS0EsS0FBSyxFQUFFLGNBQWNBLEVBQUUsY0FBYyxFQUFFLGFBQWFBLEVBQUUsYUFBbUIsS0FDM0UsQ0FDUjtBQUFBLE1BQUE7QUFHRCxNQUFFRCxFQUFHLFNBQ1BGLEVBQUssSUFBSUMsQ0FBRyxHQUNaSixFQUFRLFFBQVEsQ0FBQWhCLE1BQUttQixFQUFLLElBQUluQixDQUFDLENBQUMsR0FDaENrQixFQUFPLEtBQUtHLENBQUU7QUFBQSxJQUVsQjtBQUNPLFdBQUFILEVBQU8sT0FBTyxDQUFBLE1BQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUMvQixLQUFLLENBQUNLLEdBQUdELE1BQ0pDLEtBQUtELEtBQUtDLEVBQUUsUUFBUUQsRUFBRSxRQUFRQyxFQUFFLEtBQUssY0FBY0QsRUFBRSxLQUFLLGNBQWNDLEVBQUUsS0FBSyxhQUFhRCxFQUFFLEtBQUssYUFBbUIsSUFDdEhDLEtBQUtELEtBQUtDLEVBQUUsUUFBUUQsRUFBRSxRQUFRQyxFQUFFLEtBQUssY0FBY0QsRUFBRSxLQUFLLGNBQWNDLEVBQUUsS0FBSyxhQUFhRCxFQUFFLEtBQUssYUFBbUIsS0FDbkgsQ0FDUjtBQUFBLEVBQ0w7QUFDRjtBQXRFTyxJQUFNRSxJQUFOZDtBQUtMQyxFQUxXYSxHQUtJLFlBQVcsSUFBSWQ7QUM3QnpCLE1BQU1lLElBQU4sTUFBcUI7QUFBQSxFQUFyQjtBQUVHLElBQUFkLEVBQUEsc0NBQWU7QUFDZixJQUFBQSxFQUFBLDZDQUFzQjtBQUN0QixJQUFBQSxFQUFBLDZDQUFzQjtBQUN0QixJQUFBQSxFQUFBLG9EQUE2Qjs7RUFJckMsV0FBVyxXQUFXO0FBQUUsV0FBTyxLQUFLO0FBQUEsRUFBVTtBQUFBLEVBQzlDLFdBQVcsU0FBU2UsR0FBbUI7QUFBRSxTQUFLLFdBQVdBO0FBQUEsRUFBRTtBQUFBLEVBRTNELGlCQUFpQkMsR0FBZ0JuQyxHQUFjb0MsR0FBZ0I7QUFFN0QsUUFEQSxLQUFLLFNBQVMsSUFBSUEsSUFBUSxHQUFHQSxLQUFTcEMsTUFBU0EsR0FBTW1DLENBQVMsR0FDMURDLEdBQU87QUFDVCxNQUFLLEtBQUssZ0JBQWdCLElBQUlBLENBQUssS0FBRyxLQUFLLGdCQUFnQixJQUFJQSxHQUFPLG9CQUFJLElBQWtCLENBQUE7QUFFNUYsVUFBSUMsSUFBSyxLQUFLLGdCQUFnQixJQUFJRCxDQUFLO0FBQ25DLE1BQUFDLEtBQU9BLEVBQUEsSUFBSXJDLEdBQU1tQyxDQUFTO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQUEsRUFFQSxhQUFhbkMsR0FBY29DLEdBQTRCO0FBQzlDLFdBQUEsS0FBSyxTQUFTLElBQUlBLElBQVEsR0FBR0EsS0FBU3BDLE1BQVNBLENBQUksS0FBSztBQUFBLEVBQ2pFO0FBQUEsRUFFQSxpQkFBaUJBLEdBQXlCO0FBQ3hDLFdBQU8sTUFBTSxLQUFLLEtBQUssU0FBUyxRQUFRLENBQUMsRUFBRSxPQUFPLENBQUFRLE1BQUtSLEVBQUssUUFBUVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQUEsTUFBS0EsRUFBRSxFQUFFO0FBQUEsRUFDL0Y7QUFBQSxFQUVBLG1CQUFtQjRCLE1BQWtCcEMsR0FBeUI7QUFDNUQsUUFBSXNDLElBQUksS0FBSyxnQkFBZ0IsSUFBSUYsQ0FBSztBQUNsQyxXQUFBRSxJQUNLLE1BQU0sS0FBS0EsRUFBRSxRQUFRLEtBQUssQ0FBQSxDQUFFLEVBQUUsT0FBTyxDQUFBLE1BQU0sQ0FBQ3RDLEtBQVFBLEVBQUssVUFBVSxLQUFNQSxFQUFLLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBSyxNQUFBLEVBQUUsRUFBRSxJQUNqSDtFQUNUO0FBQUEsRUFFQSx1QkFBdUJvQyxHQUEyQjtBQUNoRCxRQUFJRSxJQUFJLEtBQUssZ0JBQWdCLElBQUlGLENBQUs7QUFDbEMsV0FBQUUsSUFBVSxNQUFNLEtBQUtBLEVBQUUsS0FBTSxDQUFBLElBQzFCO0VBQ1Q7QUFBQSxFQUVBLGVBQWV0QyxHQUFjdUMsR0FBY0gsR0FBZ0I7QUFFekQsUUFESyxLQUFBLGdCQUFnQixJQUFJcEMsR0FBTXVDLENBQU8sR0FDbENILEdBQU87QUFDVCxNQUFLLEtBQUssdUJBQXVCLElBQUlBLENBQUssS0FBRyxLQUFLLHVCQUF1QixJQUFJQSxHQUFPLG9CQUFJLElBQWtCLENBQUE7QUFDMUcsVUFBSUMsSUFBSyxLQUFLLHVCQUF1QixJQUFJRCxDQUFLO0FBQzFDLE1BQUFDLEtBQU9BLEVBQUEsSUFBSXJDLEdBQU11QyxDQUFPO0FBQUEsSUFDOUI7QUFBQSxFQUNGO0FBQUEsRUFFQSxXQUFjdkMsR0FBYztBQUMxQixXQUFRLEtBQUssZ0JBQWdCLElBQUlBLENBQUksS0FBSztBQUFBLEVBQzVDO0FBQUEsRUFFQSxpQkFBaUJvQyxNQUFrQnBDLEdBQXlCO0FBQzFELFFBQUlzQyxJQUFJLEtBQUssdUJBQXVCLElBQUlGLENBQUs7QUFDekMsV0FBQUUsSUFDSyxNQUFNLEtBQUtBLEVBQUUsUUFBUSxLQUFLLENBQUEsQ0FBRSxFQUFFLE9BQU8sQ0FBQSxNQUFNLENBQUN0QyxLQUFRQSxFQUFLLFVBQVUsS0FBTUEsRUFBSyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUssTUFBQSxFQUFFLEVBQUUsSUFDakg7RUFDVDtBQUNGO0FBOURPLElBQU13QyxJQUFOUDtBQVFMZCxFQVJXcUIsR0FRSSxZQUEyQixJQUFJUDtBQ1VoRCxNQUFNUSx3QkFBdUIsT0FDdkJDLHdCQUE0QixPQUM1QkMsd0JBQTZCLE9BRTdCQyxJQUFNLENBQTJDNUMsTUFBWTZDLE1BQzFELElBQUksUUFBUSxDQUFXQyxNQUFBOztBQUM1QixNQUFJQyxLQUFPQyxJQUFBUCxFQUFpQixJQUFJekMsQ0FBSSxNQUF6QixnQkFBQWdELEVBQTRCO0FBQ3ZDLE1BQUksQ0FBQ0QsR0FBTTtBQUNILFVBQUFFLElBQUksSUFBSTtBQUNHLElBQUFSLEVBQUEsSUFBSXpDLEdBQU1pRCxDQUFDLEdBQzVCRixJQUFPRSxFQUFFO0FBQUEsRUFDWDtBQUNJLE1BQUFDLElBQWUsSUFBSTtBQUNqQixRQUFBQyxJQUFJLENBQUNDLE1BQXNCO0FBQy9CLElBQUFOLEVBQVFNLEVBQUksSUFBSSxHQUNERixJQUFBO0FBQUEsRUFBQTtBQUVqQixFQUFBQSxFQUFhLE1BQU0sWUFBWUMsR0FDL0JKLEVBQUssWUFBWUYsR0FBTSxDQUFDSyxFQUFhLEtBQUssQ0FBQztBQUFBLENBQzVDLEdBR0dHLElBQVEsQ0FBMkNyRCxHQUFTc0QsR0FBd0JDLElBQTJCLEVBQUUsT0FBTyxTQUFZOztBQUN4SSxNQUFJLE9BQU9ELEtBQU87QUFBWSxVQUFNLGdDQUFnQ3RELElBQU87QUFDM0UsTUFBSStDLEtBQU9DLElBQUFQLEVBQWlCLElBQUl6QyxDQUFJLE1BQXpCLGdCQUFBZ0QsRUFBNEI7QUFDdkMsTUFBSSxDQUFDRCxHQUFNO0FBQ0gsVUFBQUUsSUFBSSxJQUFJO0FBQ0csSUFBQVIsRUFBQSxJQUFJekMsR0FBTWlELENBQUMsR0FDNUJGLElBQU9FLEVBQUU7QUFBQSxFQUNYO0FBQ0ksTUFBQSxDQUFDTSxFQUFLLFNBQVNSLEVBQUs7QUFBVyxVQUFNLG1DQUFtQy9DO0FBQ3RFLFFBQUFtRCxJQUFJLE9BQU9DLE1BQXNCO0FBQy9CLFVBQUFJLElBQVlKLEVBQUksTUFBTSxJQUV0QkssSUFBSSxNQUFNSCxFQUFHLEdBQUdGLEVBQUksSUFBSTtBQUM5QixJQUFBSSxFQUFVLFlBQVlDLENBQUMsR0FDdkJELEVBQVUsTUFBTTtBQUFBLEVBQUE7QUFFbEIsU0FBQVQsRUFBSyxZQUFZSSxHQUNWLE1BQU07QUFDWCxJQUFBSixFQUFNLFlBQVk7QUFBQSxFQUFBO0FBRXRCLEdBRU1XLElBQU8sQ0FBb0QxRCxNQUFZNkMsTUFBa0Q7O0FBQzdILE1BQUlFLEtBQU9DLElBQUFOLEVBQXNCLElBQUkxQyxDQUFJLE1BQTlCLGdCQUFBZ0QsRUFBaUM7QUFDNUMsTUFBSSxDQUFDRCxHQUFNO0FBQ0gsVUFBQUUsSUFBSSxJQUFJO0FBQ1EsSUFBQVAsRUFBQSxJQUFJMUMsR0FBTWlELENBQUMsR0FDakNGLElBQU9FLEVBQUU7QUFBQSxFQUNYO0FBQ0EsRUFBQUYsRUFBSyxZQUFZRixDQUFJO0FBQ3ZCLEdBRU1jLElBQVksQ0FBb0QzRCxHQUFTc0QsTUFBb0M7O0FBQ2pILE1BQUksT0FBT0EsS0FBTztBQUFZLFVBQU0sZ0NBQWdDdEQsSUFBTztBQUMzRSxNQUFJK0MsS0FBT0MsSUFBQU4sRUFBc0IsSUFBSTFDLENBQUksTUFBOUIsZ0JBQUFnRCxFQUFpQztBQUM1QyxNQUFJLENBQUNELEdBQU07QUFDSCxVQUFBRSxJQUFJLElBQUk7QUFDUSxJQUFBUCxFQUFBLElBQUkxQyxHQUFNaUQsQ0FBQyxHQUNqQ0YsSUFBT0UsRUFBRTtBQUFBLEVBQ1g7QUFDTSxRQUFBRSxJQUFJLENBQUNDLE1BQXNCO0FBRTVCLElBQUFFLEVBQUEsR0FBR0YsRUFBSSxJQUFJO0FBQUEsRUFBQTtBQUVPLFNBQUFULEVBQUEsSUFBSVcsR0FBSUgsQ0FBQyxHQUMzQkosRUFBQSxpQkFBaUIsV0FBV0ksQ0FBQyxHQUNsQ0osRUFBSyxNQUFNLEdBQ0osTUFBTTtBQUNMLElBQUFBLEtBQUEsUUFBQUEsRUFBQSxvQkFBb0IsV0FBV0ksSUFDckNSLEVBQXVCLE9BQU9XLENBQUU7QUFBQSxFQUFBO0FBRXBDLEdBRU1NLElBQU8sQ0FBb0Q1RCxHQUFTc0QsTUFBb0M7QUFDNUcsTUFBSSxPQUFPQSxLQUFPO0FBQVksVUFBTSxnQ0FBZ0N0RCxJQUFPO0FBRTNFLFFBQU02RCxJQUFjRixFQUFVM0QsR0FBTSxJQUFJNkMsTUFBb0I7QUFFMUQsSUFBQVMsRUFBRyxHQUFHVCxDQUFJLEdBQ1ZnQjtFQUFZLENBQ2I7QUFDSCxHQUVNQSxJQUFjLENBQW9EN0QsR0FBU3NELE1BQW9DOztBQUNuSCxNQUFJUCxLQUFPQyxJQUFBTixFQUFzQixJQUFJMUMsQ0FBSSxNQUE5QixnQkFBQWdELEVBQWlDO0FBQzVDLE1BQUksQ0FBQ0Q7QUFBTTtBQUNMLFFBQUFJLElBQUlSLEVBQXVCLElBQUlXLENBQUU7QUFDdkMsRUFBSUgsTUFDR0osRUFBQSxvQkFBb0IsV0FBV0ksQ0FBQyxHQUNyQ1IsRUFBdUIsT0FBT1csQ0FBRTtBQUVwQyxHQVdhUSxJQUFpQztBQUFBLEVBQzVDLFVBQVU7QUFBQSxJQUNSLEtBQUFsQjtBQUFBLElBQ0EsT0FBQVM7QUFBQSxJQUNBLE1BQUFLO0FBQUEsSUFDQSxXQUFBQztBQUFBLElBQ0EsTUFBQUM7QUFBQSxJQUNBLGFBQUFDO0FBQUEsRUFDRjtBQUNGLEdDbElBRSxJQUFlQyxFQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLElBQUksRUFBRSxTQUFTLEtBQUs7QUFBQSxJQUNwQixNQUFNLEVBQUUsU0FBUyxNQUFNLE1BQU0sT0FBTztBQUFBLElBQ3BDLE9BQU8sRUFBRSxTQUFTLEtBQUs7QUFBQSxJQUN2QixNQUFNLEVBQUUsTUFBTSxRQUFRLFNBQVMsS0FBSztBQUFBLElBQ3BDLE9BQU8sRUFBRSxNQUFNLE9BQWUsU0FBUyxLQUFLO0FBQUEsSUFDNUMsT0FBTyxFQUFFLE1BQU0sUUFBUSxTQUFTLEtBQUs7QUFBQSxJQUNyQyxVQUFVLEVBQUUsTUFBTSxRQUFRLFNBQVMsS0FBSztBQUFBLElBQ3hDLFVBQVUsRUFBRSxNQUFNLFNBQVMsU0FBUyxHQUFNO0FBQUEsSUFDMUMsVUFBVSxFQUFFLE1BQU0sU0FBUyxTQUFTLEdBQU07QUFBQSxFQUM1QztBQUFBLEVBQ0EsTUFBTUMsR0FBTyxFQUFFLE1BQUFDLEtBQVE7QUFFckIsVUFBTUMsSUFBUUMsRUFBUztBQUFBLE1BQ3JCLEtBQUssTUFBZUgsRUFBTTtBQUFBLE1BQzFCLEtBQUssQ0FBQy9CLE1BQU07QUFBRSxRQUFBZ0MsRUFBSyxTQUFTaEMsQ0FBQztBQUFBLE1BQUc7QUFBQSxJQUFBLENBQ2pDLEdBRUttQyxJQUFhRCxFQUFTLE1BQ3RCSCxFQUFNLE9BQ0QsQ0FBQ3pCLEVBQWUsU0FBUyxhQUFheUIsRUFBTSxNQUFNQSxFQUFNLEtBQUssQ0FBQyxJQUNuRUEsRUFBTSxRQUNEekIsRUFBZSxTQUFTLG1CQUFtQnlCLEVBQU0sT0FBTyxHQUFJQSxFQUFNLFNBQVMsQ0FBQSxDQUFHLElBQ2hGekIsRUFBZSxTQUFTLGNBQWMsR0FBSXlCLEVBQU0sU0FBUyxDQUFBLENBQUcsQ0FDcEUsR0FFS0ssSUFBUSxJQUFJekIsTUFBZ0I7QUFBTyxNQUFBcUIsRUFBQSxTQUFTLEdBQUdyQixDQUFJO0FBQUEsSUFBQSxHQUNuRDBCLElBQU8sSUFBSTFCLE1BQWdCO0FBQU8sTUFBQXFCLEVBQUEsUUFBUSxHQUFHckIsQ0FBSTtBQUFBLElBQUE7QUFFaEQsV0FBQTtBQUFBLE1BQ0wsSUFBSW9CLEVBQU07QUFBQSxNQUNWLE1BQU1BLEVBQU07QUFBQSxNQUNaLE9BQU9BLEVBQU07QUFBQSxNQUNiLE1BQU1BLEVBQU07QUFBQSxNQUNaLE9BQU9BLEVBQU07QUFBQSxNQUNiLE9BQU9BLEVBQU07QUFBQSxNQUNiLFVBQVVBLEVBQU07QUFBQSxNQUNoQixVQUFVQSxFQUFNO0FBQUEsTUFDaEIsVUFBVUEsRUFBTTtBQUFBLE1BQ2hCLE9BQUFLO0FBQUEsTUFDQSxNQUFBQztBQUFBLE1BQ0EsWUFBQUY7QUFBQSxNQUNBLE9BQUFGO0FBQUEsSUFBQTtBQUFBLEVBRUo7QUFFRixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDM0NZSyxJQUFOLE1BQWdCO0FBQUEsRUFBaEI7QUFLRyxJQUFBckQsRUFBQSxxQ0FBYztBQUNkLElBQUFBLEVBQUEsd0NBQWlCOztFQUp6QixXQUFXLFdBQXNCO0FBQUUsV0FBT3FELEVBQVU7QUFBQSxFQUFTO0FBQUEsRUFDN0QsV0FBVyxTQUFTdEMsR0FBYztBQUFFLFNBQUssV0FBV0E7QUFBQSxFQUFHO0FBQUEsRUFLdkQsVUFBVXVDLEdBQWlDekUsSUFBZSxpQkFBaUI7QUFDcEUsU0FBQSxRQUFRLElBQUlBLEdBQU15RSxDQUFNO0FBQUEsRUFDL0I7QUFBQSxFQUlBLFVBQWF0QyxHQUFzQjdCLElBQWlCLE1BQU1tRSxJQUFpQixpQkFBaUJDLElBQWlCLElBQU1DLElBQWlCLElBQTBCO0FBQ3RKLFVBQUFDLElBQVEsRUFBRSxNQUFBdEUsS0FDVnVFLElBQVVGLElBQVEsSUFBSSxRQUFXLENBQUM3QixHQUFTZ0MsTUFBVztBQUFFLE1BQUFGLEVBQU0sU0FBU0UsR0FBUUYsRUFBTSxVQUFVOUI7QUFBQSxJQUFTLENBQUEsSUFBSTtBQUVsSCxJQUFLNEIsS0FJRSxLQUFLLFdBQVcsSUFBSUQsQ0FBTSxLQUM3QixLQUFLLFdBQVcsSUFBSUEsR0FBUSxDQUFFLENBQUEsSUFFL0IsS0FBSyxXQUFXLElBQUlBLENBQU0sS0FBSyxDQUFJLEdBQUEsS0FBSyxFQUFFLFdBQUF0QyxHQUFXLE9BQUF5QyxHQUFPLFNBQUFDLEdBQVMsT0FBQUgsRUFBTyxDQUFBLEtBTHhFLEtBQUEsV0FBVyxJQUFJRCxHQUFRLENBQUMsRUFBRSxXQUFBdEMsR0FBVyxPQUFBeUMsR0FBTyxTQUFBQyxHQUFTLE9BQUFILEVBQU8sQ0FBQSxDQUFDO0FBUXBFLFVBQU1LLElBQUssS0FBSyxRQUFRLElBQUlOLENBQU07QUFDbEMsV0FBS00sS0FDTEEsRUFBRyxRQUFRSCxHQUNYRyxFQUFHLGNBQWM1QyxHQUViMEMsS0FBU0EsRUFBUSxLQUFLLE1BQU0sS0FBSyxlQUFlSixDQUFNLENBQUMsRUFBRSxNQUFNLE1BQU0sS0FBSyxlQUFlQSxDQUFNLENBQUMsR0FDN0ZJLEtBTFM7QUFBQSxFQU1sQjtBQUFBLEVBRUEsZUFBa0IxQyxHQUFzQjdCLEdBQVNtRSxJQUFpQixpQkFBaUJDLElBQWlCLElBQU07QUFDeEcsV0FBTyxLQUFLLFVBQVV2QyxHQUFXN0IsR0FBTW1FLEdBQVFDLEdBQU8sRUFBSTtBQUFBLEVBQzVEO0FBQUEsRUFFQSxlQUFlRCxJQUFpQixpQkFBaUI7QUFDL0MsSUFBSSxLQUFLLFdBQVcsSUFBSUEsQ0FBTSxNQUMzQixLQUFLLFdBQVcsSUFBSUEsQ0FBTSxLQUFLLENBQUEsR0FBSTtBQUd0QyxRQUFJTyxJQUFVLEtBQUssUUFBUSxJQUFJUCxDQUFNO0FBQ2pDLFFBQUFPLEtBQVdBLEVBQVEsYUFBYTtBQUtsQyxVQUpBQSxFQUFRLFFBQVEsTUFDaEJBLEVBQVEsY0FBYyxNQUN0QkEsRUFBUSxjQUFjLE1BRWxCLEtBQUssV0FBVyxJQUFJUCxDQUFNLEdBQUc7QUFDL0IsWUFBSVEsSUFBSSxLQUFLLFdBQVcsSUFBSVIsQ0FBTTtBQUM5QixZQUFBUSxLQUFLQSxFQUFFLFFBQVE7QUFDYixjQUFBMUQsSUFBSTBELEVBQUU7QUFDTixVQUFBMUQsS0FBUSxLQUFBLFVBQVVBLEVBQUUsV0FBV0EsRUFBRSxPQUFPa0QsR0FBUWxELEVBQUUsT0FBTyxDQUFDLENBQUNBLEVBQUUsT0FBTztBQUFBLFFBQzFFO0FBQUEsTUFDRjtBQUVPLGFBQUE7QUFBQSxJQUNUO0FBQ08sV0FBQTtBQUFBLEVBQ1Q7QUFDRjtBQWhFTyxJQUFNMkQsSUFBTlY7QUFDTHJELEVBRFcrRCxHQUNJLFlBQVcsSUFBSVY7QUNKaEMsTUFBQVcsS0FBZW5CLEVBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLElBQ0wsTUFBTSxFQUFFLE1BQU0sUUFBUSxTQUFTLGdCQUFnQjtBQUFBLEVBQ2pEO0FBQUEsRUFDQSxNQUFNQyxHQUFPLEVBQUUsUUFBQW1CLEtBQVU7QUFFdkIsVUFBTUMsSUFBS0MsS0FFTEMsSUFBOEJDLEVBQUksSUFBSyxHQUN2Q1osSUFBNENZLEVBQUksSUFBSztBQUVwRCxJQUFBSixFQUFBLEVBQUUsYUFBQUcsR0FBYSxPQUFBWCxFQUFBLENBQU87QUFFdkIsVUFBQWEsSUFBWXJCLEVBQVMsTUFDbEJtQixFQUFZLFNBQVMsSUFDN0IsR0FFS0csSUFBaUJ0QixFQUFTLE1BQU07O0FBQ3BDLGNBQVFwQixJQUFBdUMsRUFBWSxVQUFaLGdCQUFBdkMsRUFBMkI7QUFBQSxJQUFBLENBQ3BDO0FBRUQsV0FBQTJDLEVBQVUsTUFBTTtBQUNkLE1BQUFULEVBQVUsU0FBUyxVQUFXRyxFQUFXLE9BQU9wQixFQUFNLElBQUk7QUFBQSxJQUFBLENBQzNELEdBRU07QUFBQSxNQUNMLGdCQUFBeUI7QUFBQSxNQUNBLGFBQUFIO0FBQUEsTUFDQSxPQUFBWDtBQUFBLE1BQ0EsV0FBQWE7QUFBQSxJQUFBO0FBQUEsRUFFSjtBQUVGLENBQUM7Ozs7Ozs7Ozs7Ozs7O3NCQ3RDS0csS0FBcUI7QUFBQSxFQUV6QixVQUFVLENBQUNDLEdBQWFDLE1BQWM7QUFDcEMsSUFBQUMsRUFBZSxTQUFTLFNBQVNGLEdBQUlDLEVBQUssR0FBRztBQUFBLEVBQy9DO0FBQUEsRUFDQSxRQUFRLENBQUNELEdBQWFDLE1BQWM7QUFDbEMsSUFBQUMsRUFBZSxTQUFTLFdBQVdGLEdBQUlDLEVBQUssR0FBRztBQUFBLEVBQ2pEO0FBQ0YsR0FHTUUsS0FBa0I7QUFBQSxFQUN0QixNQUFNLENBQUNILEdBQVNJLE1BQWlCO0FBQy9CLElBQUksQ0FBQ0osS0FDTEUsRUFBZSxTQUFTLFVBQVVGLEdBQUlJLEVBQVEsR0FBRztBQUFBLEVBQ25EO0FBQ0YsR0FFZUMsSUFBQTtBQUFBLEVBQ2Isb0JBQUFOO0FBQUEsRUFBb0IsaUJBQUFJO0FBQ3RCLEdBRWFHLElBQU4sTUFBcUI7QUFBQSxFQUFyQjtBQUlHLElBQUFoRixFQUFBLHFDQUFjOztFQUZ0QixXQUFXLFdBQTJCO0FBQUUsV0FBT2dGLEVBQWU7QUFBQSxFQUFTO0FBQUEsRUFDdkUsV0FBVyxTQUFTakUsR0FBbUI7QUFBRSxTQUFLLFdBQVdBO0FBQUEsRUFBRztBQUFBLEVBSTVELFNBQVNrRSxHQUFxQjNCLEdBQWdCO0FBQ3hDLFFBQUEsR0FBQzJCLEtBQWMsQ0FBQzNCLElBQ2hCO0FBQUEsVUFBQWpELElBQVUsS0FBSyxRQUFRLElBQUlpRCxDQUFNLElBQUksS0FBSyxRQUFRLElBQUlBLENBQU0sSUFBSTtBQUNoRSxVQUFBO0FBQWEsUUFBQTJCLEVBQUEsaUJBQWlCQSxFQUFXLFlBQVlBLENBQVU7QUFBQSxNQUFBLFFBQUs7QUFBQSxNQUFRO0FBQzVFLE1BQUE1RSxLQUFTQSxFQUFRLE9BQU80RSxDQUFVO0FBQUE7QUFBQSxFQUN4QztBQUFBLEVBRUEsV0FBV0EsR0FBcUIzQixHQUFnQjtBQUMxQyxRQUFBLEdBQUMyQixLQUFjLENBQUMzQixJQUNoQjtBQUFBLFVBQUFqRCxJQUFVLEtBQUssUUFBUSxJQUFJaUQsQ0FBTSxJQUFJLEtBQUssUUFBUSxJQUFJQSxDQUFNLElBQUk7QUFDaEUsVUFBQTtBQUFNLFFBQUFqRCxLQUFTQSxFQUFRLFlBQVk0RSxDQUFVO0FBQUEsTUFBQSxRQUFJO0FBQUEsTUFBUTtBQUFBO0FBQUEsRUFDL0Q7QUFBQSxFQUVBLFVBQVUzQixHQUFpQnpFLElBQWUsaUJBQWlCO0FBQ3BELFNBQUEsUUFBUSxJQUFJQSxHQUFNeUUsQ0FBTTtBQUFBLEVBQy9CO0FBQ0Y7QUF2Qk8sSUFBTXNCLElBQU5JO0FBQ0xoRixFQURXNEUsR0FDSSxZQUFXLElBQUlJO0FDdkJoQyxTQUFTRSxFQUFxQnRFLEdBQVV1RSxHQUFxRDtBQUN0RixNQUFBdkUsRUFBRSxPQUE0QixVQUFVO0FBQzNDLFFBQUk4RCxJQUFNOUQsRUFBRTtBQUVaLFFBQUk4RCxFQUFHLFVBQVU7QUFDZixVQUFJVSxJQUFTO0FBQUEsUUFDWFYsRUFBRyxTQUFTLFdBQVcsY0FBYztBQUFBLFFBQ3JDQSxFQUFHLFNBQVMsY0FBYyxpQkFBaUI7QUFBQSxRQUMzQ0EsRUFBRyxTQUFTLGtCQUFrQixxQkFBcUI7QUFBQSxRQUNuREEsRUFBRyxTQUFTLGdCQUFnQixtQkFBbUI7QUFBQSxRQUMvQ0EsRUFBRyxTQUFTLGlCQUFpQixvQkFBb0I7QUFBQSxRQUNqREEsRUFBRyxTQUFTLGVBQWUsa0JBQWtCO0FBQUEsUUFDN0NBLEVBQUcsU0FBUyxVQUFVLGFBQWE7QUFBQSxRQUNuQ0EsRUFBRyxTQUFTLFdBQVcsY0FBYztBQUFBLFFBQ3JDQSxFQUFHLFNBQVMsZUFBZSxrQkFBa0I7QUFBQSxRQUM3Q0EsRUFBRyxTQUFTLGVBQWUsa0JBQWtCO0FBQUEsTUFBTSxFQUFBLE9BQU8sQ0FBSyxNQUFBLENBQUMsQ0FBQyxDQUFDO0FBRTVELE1BQUFTLEVBQUFDLEdBQW9CVixFQUFHLFNBQVMsU0FBUyxPQUFZQSxFQUFHLFNBQVMsUUFBUSxFQUFJO0FBQUEsSUFDdkY7QUFBQSxFQUNGO0FBQ0Y7QUFFTyxNQUFNVyxJQUFXO0FBQUEsRUFDdEIsVUFBVSxDQUFDWCxHQUFnRUMsTUFHckU7QUFDQSxRQUFBLEdBQUNELEtBQU0sQ0FBQ0EsRUFBRyxlQUNmO0FBQUEsY0FBUUEsRUFBRyxVQUFVO0FBQUEsUUFDbkIsS0FBSztBQUFBLFFBQ0wsS0FBSztBQUFZLFVBQUFBLEVBQUcsU0FBUyxDQUFDWSxNQUFRSixFQUFxQkksR0FBS1gsRUFBSyxLQUFLO0FBQUc7QUFBQSxRQUM3RSxLQUFLO0FBQVUsVUFBQUQsRUFBRyxXQUFXLENBQUNZLE1BQVFKLEVBQXFCSSxHQUFLWCxFQUFLLEtBQUs7QUFBRztBQUFBLE1BQy9FO0FBRUEsTUFBQUQsRUFBRyxZQUFZLENBQUNZLE1BQVFKLEVBQXFCSSxHQUFLWCxFQUFLLEtBQUssR0FDeERELEVBQUcsUUFBU0EsRUFBQSxLQUFLLGlCQUFpQixXQUFXLE1BQU1RLEVBQXFCLEVBQUUsUUFBUVIsRUFBRyxHQUFVQyxFQUFLLEtBQUssQ0FBQyxHQUUxR0EsRUFBSyxPQUFPLGNBQWFELEVBQUcsZUFBZSxJQUMxQ1EsRUFBcUIsRUFBRSxRQUFRUixFQUFHLEdBQVVDLEVBQUssS0FBSztBQUFBO0FBQUEsRUFDN0Q7QUFBQSxFQUNBLFFBQVEsQ0FBQ0QsTUFBZ0I7QUFBQSxFQUd6QjtBQUNGO0FDL0JBLFNBQVNhLEdBQVFDLEdBQXFCO0FBQ2hDLEVBQUFBLEVBQUEsVUFBVSxVQUFVQyxDQUFNLEdBQzFCRCxFQUFBLFVBQVUsVUFBVUUsQ0FBTSxHQUMxQkYsRUFBQSxVQUFVLFVBQVVULEVBQVcsZUFBZSxHQUM5Q1MsRUFBQSxVQUFVLGFBQWFULEVBQVcsa0JBQWtCLEdBQ3BEUyxFQUFBLFVBQVUsWUFBWUcsQ0FBd0I7QUFDcEQ7QUE4Qk8sU0FBU0MsR0FBa0J4RCxHQUEwQjtBQUMxRCxNQUFJeUQsSUFBZSxDQUFBO0FBQ1osU0FBQTtBQUFBLElBQ0wsS0FBS3ZGLEdBQWtCd0YsR0FBZUMsR0FDcENDLEdBS0c7QUFFSCxhQUFJQSxFQUFRLGFBQVUzRSxFQUFlLFdBQVcyRSxFQUFRLFdBQ3BEQSxFQUFRLG1CQUFnQnJELEVBQWUsV0FBV3FELEVBQVEsaUJBQzFEQSxFQUFRLGNBQVdqQyxFQUFVLFdBQVdpQyxFQUFRLFlBQ2hEQSxFQUFRLFlBQVNwQixFQUFlLFdBQVdvQixFQUFRLFVBQ3hDSCxJQUFBRSxHQUNSM0QsRUFBSyxLQUFLNkQsSUFBYTNGLEdBQU13RixHQUFPQyxDQUFhO0FBQUEsSUFDMUQ7QUFBQSxJQUNBLE9BQU96RixHQUFrQndGLEdBQWU7QUFDdEMsYUFBTzFELEVBQUssU0FBU0EsRUFBSyxPQUFPOUIsR0FBTXdGLEdBQU9ELENBQVksSUFBSTtBQUFBLElBQ2hFO0FBQUEsSUFDQSxJQUFJdkYsR0FBa0J3RixHQUFlO0FBQ25DLGFBQU8xRCxFQUFLLE1BQU1BLEVBQUssSUFBSTlCLEdBQU13RixHQUFPRCxDQUFZLElBQUk7QUFBQSxJQUMxRDtBQUFBLElBQ0EsUUFBUXpELEVBQUs7QUFBQSxFQUFBO0FBRWpCO0FBRWdCLFNBQUE4RCxHQUFXQyxHQUFhTCxHQUFlQyxHQUE2RDtBQUNsSCxRQUFNSyxJQUFXRCxFQUFPLFFBQVEsV0FBV0EsRUFBTztBQUNsRCxTQUFPQyxFQUFRO0FBQUEsSUFBS3ZGLEVBQVc7QUFBQSxJQUFVaUY7QUFBQSxJQUFPQyxLQUFpQixDQUFDO0FBQUEsSUFDaEU7QUFBQSxNQUNFLFVBQVUxRSxFQUFlO0FBQUEsTUFDekIsZ0JBQWdCc0IsRUFBZTtBQUFBLE1BQy9CLFdBQVdvQixFQUFVO0FBQUEsTUFDckIsU0FBU2EsRUFBZTtBQUFBLElBQzFCO0FBQUEsRUFBQyxFQUFFLEtBQUssTUFDQ3dCLENBQ1I7QUFDTDtBQUVnQixTQUFBQyxHQUFhRixHQUFhTCxHQUE4QjtBQUV0RSxVQURpQkssRUFBTyxRQUFRLFdBQVdBLEVBQU8sU0FDbkMsT0FBT3RGLEVBQVcsVUFBVWlGLENBQUs7QUFDbEQ7QUFHZ0IsU0FBQVEsR0FBVUgsR0FBYUwsR0FBOEI7QUFFbkUsVUFEaUJLLEVBQU8sUUFBUSxXQUFXQSxFQUFPLFNBQ25DLElBQUl0RixFQUFXLFVBQVVpRixDQUFLO0FBQy9DO0FBRU8sU0FBU1MsR0FBYUosR0FBNkI7QUFFeEQsVUFEaUJBLEVBQU8sUUFBUSxXQUFXQSxFQUFPLFNBQ25DO0FBQ2pCO0FBaUJBLE1BQU1GLEtBQWM7QUFBQSxFQUNsQixTQUFBVjtBQUFBLEVBQ0EsWUFBWSxJQUFJMUUsRUFBVztBQUFBLEVBQzNCLFVBQUFqQjtBQUFBLEVBQ0EsZ0JBQWdCLElBQUl5QixFQUFlO0FBQUEsRUFDbkMsZ0JBQUFzQjtBQUFBLEVBQ0EsUUFBQStDO0FBQUEsRUFDQSxRQUFBRDtBQUFBLEVBQUEsbUJBQ0FFO0FBQUFBLEVBQ0EsbUJBQUE3RjtBQUFBLEVBQ0EsV0FBQWlFO0FBQ0Y7In0=
