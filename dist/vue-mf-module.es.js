var G = Object.defineProperty;
var X = (n, e, t) => e in n ? G(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var u = (n, e, t) => (X(n, typeof e != "symbol" ? e + "" : e, t), t);
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
    u(this, "menuDefinitions", []);
    u(this, "menuStructure", {});
    u(this, "notifications", new K());
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
        item: this.menuDefinitions.find((o) => o.name == i && (!o.hidden || !o.hidden())),
        children: s.map((o) => this.menuDefinitions.find((a) => a.name == o && (!a.hidden || !a.hidden()))).filter((o) => !!o).sort((o, a) => o && a && o.orderIndex && a.orderIndex && o.orderIndex > a.orderIndex ? 1 : o && a && o.orderIndex && a.orderIndex && o.orderIndex < a.orderIndex ? -1 : 0)
      };
      l.item && (r.add(i), s.forEach((o) => r.add(o)), t.push(l));
    }
    return t.filter((i) => !!i.item).sort((i, s) => i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex > s.item.orderIndex ? 1 : i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex < s.item.orderIndex ? -1 : 0);
  }
};
let h = _;
u(h, "instance", new _());
const V = class {
  constructor() {
    u(this, "registry", /* @__PURE__ */ new Map());
    u(this, "groupedregistry", /* @__PURE__ */ new Map());
    u(this, "serviceregistry", /* @__PURE__ */ new Map());
    u(this, "groupedserviceregistry", /* @__PURE__ */ new Map());
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
u(f, "instance", new V());
const w = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), W = (n, ...e) => new Promise((t, r) => {
  var a;
  const i = setTimeout(() => {
    r("timeout for message " + n);
  }, 3e4);
  let s = (a = w.get(n)) == null ? void 0 : a.port1;
  if (!s) {
    const c = new MessageChannel();
    w.set(n, c), s = c.port1;
  }
  let l = new MessageChannel();
  const o = (c) => {
    clearTimeout(i), t(c.data), l = null;
  };
  l.port1.onmessage = o, s.postMessage(e, [l.port2]);
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
    const o = l.ports[0], a = await e(...l.data);
    o.postMessage(a), o.close();
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
}, P = (n, e) => {
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
  const t = P(n, (...r) => {
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
    subscribe: P,
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
function N(n, e, t, r, i, s, l, o) {
  var a = typeof n == "function" ? n.options : n;
  e && (a.render = e, a.staticRenderFns = t, a._compiled = !0), r && (a.functional = !0), s && (a._scopeId = "data-v-" + s);
  var c;
  if (l ? (c = function(d) {
    d = d || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !d && typeof __VUE_SSR_CONTEXT__ < "u" && (d = __VUE_SSR_CONTEXT__), i && i.call(this, d), d && d._registeredComponents && d._registeredComponents.add(l);
  }, a._ssrRegister = c) : i && (c = o ? function() {
    i.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), c)
    if (a.functional) {
      a._injectStyles = c;
      var j = a.render;
      a.render = function(F, b) {
        return c.call(b), j(F, b);
      };
    } else {
      var k = a.beforeCreate;
      a.beforeCreate = k ? [].concat(k, c) : [c];
    }
  return {
    exports: n,
    options: a
  };
}
var H = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", e._l(e.Components, function(r, i) {
    return t(r, { key: i, tag: "component", attrs: { disabled: e.disabled, readonly: e.readonly, id: e.id, type: e.type, metadata: e.metadata }, on: { click: e.click, save: e.save }, model: { value: e.Value, callback: function(s) {
      e.Value = s;
    }, expression: "Value" } });
  }), 1);
}, ee = [], te = /* @__PURE__ */ N(
  q,
  H,
  ee,
  !1,
  null,
  null,
  null,
  null
);
const O = te.exports, M = class {
  constructor() {
    u(this, "screens", /* @__PURE__ */ new Map());
    u(this, "projecting", /* @__PURE__ */ new Map());
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
    const l = { data: t }, o = s ? new Promise((c, j) => {
      l.reject = j, l.resolve = c;
    }) : null;
    i ? (this.projecting.has(r) || this.projecting.set(r, []), (this.projecting.get(r) || []).push({ component: e, model: l, promise: o, queue: i })) : this.projecting.set(r, [{ component: e, model: l, promise: o, queue: i }]);
    const a = this.screens.get(r);
    return a ? (a.model = l, a.currentView = e, o && o.then(() => this.stopProjecting(r)).catch(() => this.stopProjecting(r)), o) : null;
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
u(p, "instance", new M());
const ne = E({
  name: "screen",
  props: {
    name: { type: String, default: "defaultscreen" }
  },
  setup(n, { expose: e }) {
    const t = z(), r = T(null), i = T(null);
    e({ currentView: r, model: i });
    const s = y(() => r.value != null), l = y(() => {
      var o;
      return (o = r.value) == null ? void 0 : o.__file;
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
}, ie = [], se = /* @__PURE__ */ N(
  ne,
  re,
  ie,
  !1,
  null,
  null,
  null,
  null
);
const L = se.exports, ae = {
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
    u(this, "screens", /* @__PURE__ */ new Map());
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
u(g, "instance", new C());
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
  n.component("screen", L), n.component("inject", O), n.directive("screen", $.screenDirective), n.directive("projectTo", $.projectToDirective), n.directive("validate", U);
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
  Inject: O,
  Screen: L,
  ValidateDirective: U,
  MenuNotifications: R,
  Projector: p
};
export {
  f as CommonRegistry,
  he as ConfigModule,
  ge as InitModule,
  O as Inject,
  h as MenuHelper,
  R as MenuNotifications,
  x as MessageService,
  fe as ModuleInitializer,
  ve as ModuleRoutes,
  p as Projector,
  pe as RunModule,
  L as Screen,
  U as ValidateDirective,
  ce as default,
  D as menuType
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLW1mLW1vZHVsZS5lcy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qcyIsIi4uL3NyYy9oZWxwZXJzL01lbnVIZWxwZXIudHMiLCIuLi9zcmMvaGVscGVycy9Db21tb25SZWdpc3RyeS50cyIsIi4uL3NyYy9oZWxwZXJzL01lc3NhZ2VTZXJ2aWNlLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW5qZWN0LnRzP3Z1ZSZ0eXBlPXNjcmlwdCZzcmM9dHJ1ZSZsYW5nLnRzIiwiLi4vc3JjL2hlbHBlcnMvUHJvamVjdG9yLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvc2NyZWVuLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZy50cyIsIi4uL3NyYy9kaXJlY3RpdmVzL3NjcmVlbi50cyIsIi4uL3NyYy9kaXJlY3RpdmVzL3ZhbGlkYXRlLnRzIiwiLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIEUgKCkge1xuICAvLyBLZWVwIHRoaXMgZW1wdHkgc28gaXQncyBlYXNpZXIgdG8gaW5oZXJpdCBmcm9tXG4gIC8vICh2aWEgaHR0cHM6Ly9naXRodWIuY29tL2xpcHNtYWNrIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0Y29yZ2FuL3RpbnktZW1pdHRlci9pc3N1ZXMvMylcbn1cblxuRS5wcm90b3R5cGUgPSB7XG4gIG9uOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGN0eCkge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG5cbiAgICAoZVtuYW1lXSB8fCAoZVtuYW1lXSA9IFtdKSkucHVzaCh7XG4gICAgICBmbjogY2FsbGJhY2ssXG4gICAgICBjdHg6IGN0eFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb25jZTogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gbGlzdGVuZXIgKCkge1xuICAgICAgc2VsZi5vZmYobmFtZSwgbGlzdGVuZXIpO1xuICAgICAgY2FsbGJhY2suYXBwbHkoY3R4LCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBsaXN0ZW5lci5fID0gY2FsbGJhY2tcbiAgICByZXR1cm4gdGhpcy5vbihuYW1lLCBsaXN0ZW5lciwgY3R4KTtcbiAgfSxcblxuICBlbWl0OiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBkYXRhID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHZhciBldnRBcnIgPSAoKHRoaXMuZSB8fCAodGhpcy5lID0ge30pKVtuYW1lXSB8fCBbXSkuc2xpY2UoKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGxlbiA9IGV2dEFyci5sZW5ndGg7XG5cbiAgICBmb3IgKGk7IGkgPCBsZW47IGkrKykge1xuICAgICAgZXZ0QXJyW2ldLmZuLmFwcGx5KGV2dEFycltpXS5jdHgsIGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9mZjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGUgPSB0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KTtcbiAgICB2YXIgZXZ0cyA9IGVbbmFtZV07XG4gICAgdmFyIGxpdmVFdmVudHMgPSBbXTtcblxuICAgIGlmIChldnRzICYmIGNhbGxiYWNrKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZXZ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZXZ0c1tpXS5mbiAhPT0gY2FsbGJhY2sgJiYgZXZ0c1tpXS5mbi5fICE9PSBjYWxsYmFjaylcbiAgICAgICAgICBsaXZlRXZlbnRzLnB1c2goZXZ0c1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGV2ZW50IGZyb20gcXVldWUgdG8gcHJldmVudCBtZW1vcnkgbGVha1xuICAgIC8vIFN1Z2dlc3RlZCBieSBodHRwczovL2dpdGh1Yi5jb20vbGF6ZFxuICAgIC8vIFJlZjogaHR0cHM6Ly9naXRodWIuY29tL3Njb3R0Y29yZ2FuL3RpbnktZW1pdHRlci9jb21taXQvYzZlYmZhYTliYzk3M2IzM2QxMTBhODRhMzA3NzQyYjdjZjk0Yzk1MyNjb21taXRjb21tZW50LTUwMjQ5MTBcblxuICAgIChsaXZlRXZlbnRzLmxlbmd0aClcbiAgICAgID8gZVtuYW1lXSA9IGxpdmVFdmVudHNcbiAgICAgIDogZGVsZXRlIGVbbmFtZV07XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFO1xubW9kdWxlLmV4cG9ydHMuVGlueUVtaXR0ZXIgPSBFO1xuIiwiaW1wb3J0IHsgVGlueUVtaXR0ZXIgfSBmcm9tICd0aW55LWVtaXR0ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIElNZW51RGVmaW5pdGlvbiB7XG4gIG5hbWU6IHN0cmluZyxcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgaWNvbj86IHN0cmluZyxcbiAgcm91dGVOYW1lPzogc3RyaW5nLFxuICByb3V0ZVBhcmFtcz86IG9iamVjdCxcbiAgZmVhdHVyZWZsYWdzPzogc3RyaW5nW10sXG4gIG9yZGVySW5kZXg/OiBudW1iZXIsXG4gIGNsYXNzPzogc3RyaW5nLFxuICBoaWRkZW46ICgpID0+IGJvb2xlYW5cbn1cblxuXG5leHBvcnQgZW51bSBtZW51VHlwZSB7XG4gIGRyYXdlciwgICAgICAgLy8gRHJhd2VyIE1lbnVcbiAgYm90dG9tLCAgICAgICAvLyBCb3R0b20gTWVudVxuICBoZWFkZXJcbn1cblxuZXhwb3J0IGNvbnN0IE1lbnVOb3RpZmljYXRpb25zID0ge1xuICBtZW51RGVmaW5pdGlvbkFkZGVkOiAnbmV3bWVudWl0ZW0nXG59XG5cbmV4cG9ydCBjbGFzcyBNZW51SGVscGVyIHtcblxuICBwcml2YXRlIG1lbnVEZWZpbml0aW9uczogSU1lbnVEZWZpbml0aW9uW10gPSBbXTtcbiAgcHJpdmF0ZSBtZW51U3RydWN0dXJlOiB7IFtrZXk6IHN0cmluZ106IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSB9ID0ge31cbiAgcHJpdmF0ZSBub3RpZmljYXRpb25zOiBUaW55RW1pdHRlciA9IG5ldyBUaW55RW1pdHRlcigpO1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBNZW51SGVscGVyKCk7XG4gIHB1YmxpYyBnZXQgTm90aWZpY2F0aW9ucygpIHsgcmV0dXJuIHRoaXMubm90aWZpY2F0aW9uczsgfVxuICBwdWJsaWMgc3RhdGljIGdldCBJbnN0YW5jZSgpIHsgcmV0dXJuIE1lbnVIZWxwZXIuaW5zdGFuY2UgfVxuXG4gIHB1YmxpYyBhZGRNZW51RGVmaW5pdGlvbihtZW51RGVmaW5pdGlvbjogSU1lbnVEZWZpbml0aW9uLCAuLi5wb3NpdGlvbnM6IHsgc2VjdGlvbjogbWVudVR5cGUsIHBhcmVudD86IHN0cmluZyB9W10pIHtcblxuICAgIC8vIEFnZ2l1bmdvIGxhIGRpY2hpYXJhemlvbmUgZGVsIG1lbnXDuSBhbGwnZWxlbmNvIGRlaSBtZW7DuSBkaXNwb25pYmlsaS5cbiAgICBsZXQgZm91bmQgPSB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4gbS5uYW1lID09IG1lbnVEZWZpbml0aW9uLm5hbWUpO1xuICAgIGlmICghZm91bmQpXG4gICAgICB0aGlzLm1lbnVEZWZpbml0aW9ucy5wdXNoKG1lbnVEZWZpbml0aW9uKTtcbiAgICBlbHNlXG4gICAgICBtZW51RGVmaW5pdGlvbiA9IGZvdW5kO1xuXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHBvc2l0aW9ucykge1xuXG4gICAgICB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXSA9IHRoaXMubWVudVN0cnVjdHVyZVtlbGVtZW50LnNlY3Rpb25dIHx8IHt9O1xuICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnQgfHwgbWVudURlZmluaXRpb24ubmFtZV0gPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXVtlbGVtZW50LnBhcmVudCB8fCBtZW51RGVmaW5pdGlvbi5uYW1lXSB8fCBbXTtcblxuICAgICAgaWYgKGVsZW1lbnQucGFyZW50KVxuICAgICAgICB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXVtlbGVtZW50LnBhcmVudF0ucHVzaChtZW51RGVmaW5pdGlvbi5uYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMuZW1pdChNZW51Tm90aWZpY2F0aW9ucy5tZW51RGVmaW5pdGlvbkFkZGVkLCBtZW51RGVmaW5pdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWVudUl0ZW0obmFtZTogc3RyaW5nKTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5tZW51RGVmaW5pdGlvbnMuZmluZChpID0+IGkubmFtZSA9PSBuYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNZW51KG1lbnU6IG1lbnVUeXBlKTogeyBpdGVtOiBJTWVudURlZmluaXRpb24gfCB1bmRlZmluZWQsIGNoaWxkcmVuOiAoSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkKVtdIH1bXSB7XG4gICAgbGV0IHJlc3VsdDogeyBpdGVtOiBJTWVudURlZmluaXRpb24gfCB1bmRlZmluZWQsIGNoaWxkcmVuOiAoSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkKVtdIH1bXSA9IFtdO1xuICAgIGxldCB1c2VkID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLm1lbnVTdHJ1Y3R1cmVbbWVudV0pIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbbWVudV1ba2V5XTtcblxuXG4gICAgICBsZXQgcnIgPSB7XG4gICAgICAgIGl0ZW06IHRoaXMubWVudURlZmluaXRpb25zLmZpbmQobSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG0ubmFtZSA9PSBrZXkgJiZcbiAgICAgICAgICAgICghbS5oaWRkZW4gfHwgIW0uaGlkZGVuKCkpXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGNoaWxkcmVuOiBlbGVtZW50Lm1hcChpID0+IHRoaXMubWVudURlZmluaXRpb25zLmZpbmQobSA9PiBtLm5hbWUgPT0gaSAmJiAoIW0uaGlkZGVuIHx8ICFtLmhpZGRlbigpKSkpXG4gICAgICAgICAgLmZpbHRlcihpID0+ICEhaSlcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgaWYgKGEgJiYgYiAmJiBhLm9yZGVySW5kZXggJiYgYi5vcmRlckluZGV4ICYmIGEub3JkZXJJbmRleCA+IGIub3JkZXJJbmRleCkgcmV0dXJuIDE7XG4gICAgICAgICAgICBpZiAoYSAmJiBiICYmIGEub3JkZXJJbmRleCAmJiBiLm9yZGVySW5kZXggJiYgYS5vcmRlckluZGV4IDwgYi5vcmRlckluZGV4KSByZXR1cm4gLTE7XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgIH0pXG4gICAgICB9O1xuXG4gICAgICBpZiAoISFyci5pdGVtKSB7XG4gICAgICAgIHVzZWQuYWRkKGtleSk7XG4gICAgICAgIGVsZW1lbnQuZm9yRWFjaChpID0+IHVzZWQuYWRkKGkpKTtcbiAgICAgICAgcmVzdWx0LnB1c2gocnIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmZpbHRlcihpID0+ICEhaS5pdGVtKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKGEgJiYgYiAmJiBhLml0ZW0gJiYgYi5pdGVtICYmIGEuaXRlbS5vcmRlckluZGV4ICYmIGIuaXRlbS5vcmRlckluZGV4ICYmIGEuaXRlbS5vcmRlckluZGV4ID4gYi5pdGVtLm9yZGVySW5kZXgpIHJldHVybiAxO1xuICAgICAgICBpZiAoYSAmJiBiICYmIGEuaXRlbSAmJiBiLml0ZW0gJiYgYS5pdGVtLm9yZGVySW5kZXggJiYgYi5pdGVtLm9yZGVySW5kZXggJiYgYS5pdGVtLm9yZGVySW5kZXggPCBiLml0ZW0ub3JkZXJJbmRleCkgcmV0dXJuIC0xO1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfSk7XG4gIH1cbn1cblxuIiwiXG5leHBvcnQgY2xhc3MgQ29tbW9uUmVnaXN0cnkge1xuXG4gIHByaXZhdGUgcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICBwcml2YXRlIGdyb3VwZWRyZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBhbnk+PigpO1xuICBwcml2YXRlIHNlcnZpY2VyZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gIHByaXZhdGUgZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBhbnk+PigpO1xuXG5cbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbW1vblJlZ2lzdHJ5ID0gbmV3IENvbW1vblJlZ2lzdHJ5KCk7XG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7IHJldHVybiB0aGlzLmluc3RhbmNlOyB9XG4gIHN0YXRpYyBzZXQgSW5zdGFuY2UodjogQ29tbW9uUmVnaXN0cnkpIHsgdGhpcy5pbnN0YW5jZSA9IHYgfTtcblxuICBwcm92aWRlQ29tcG9uZW50KGNvbXBvbmVudDogYW55LCBuYW1lOiBzdHJpbmcsIGdyb3VwPzogc3RyaW5nKSB7XG4gICAgdGhpcy5yZWdpc3RyeS5zZXQoZ3JvdXAgPyBgJHtncm91cH0tJHtuYW1lfWAgOiBuYW1lLCBjb21wb25lbnQpO1xuICAgIGlmIChncm91cCkge1xuICAgICAgaWYgKCF0aGlzLmdyb3VwZWRyZWdpc3RyeS5oYXMoZ3JvdXApKSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5zZXQoZ3JvdXAsIG5ldyBNYXA8c3RyaW5nLCBhbnk+KCkpO1xuXG4gICAgICBsZXQgZ2cgPSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgICAgaWYgKGdnKSBnZy5zZXQobmFtZSwgY29tcG9uZW50KTtcbiAgICB9XG4gIH1cblxuICBnZXRDb21wb25lbnQobmFtZTogc3RyaW5nLCBncm91cD86IHN0cmluZyk6IGFueSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmdldChncm91cCA/IGAke2dyb3VwfS0ke25hbWV9YCA6IG5hbWUpIHx8IG51bGw7XG4gIH1cblxuICBnZXRDb21wb25lbnRzKC4uLm5hbWU6IHN0cmluZ1tdKTogKGFueSlbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5yZWdpc3RyeS5lbnRyaWVzKCkpLmZpbHRlcihpID0+IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcbiAgfVxuXG4gIGdldEdyb3VwQ29tcG9uZW50cyhncm91cDogc3RyaW5nLCAuLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xuICAgIGxldCBnID0gdGhpcy5ncm91cGVkcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICBpZiAoZylcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKGcuZW50cmllcygpIHx8IFtdKS5maWx0ZXIoaSA9PiAoIW5hbWUgfHwgbmFtZS5sZW5ndGggPT0gMCkgfHwgbmFtZS5pbmRleE9mKGlbMF0pID49IDApLm1hcChpID0+IGlbMV0pO1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgZ2V0R3JvdXBDb21wb25lbnRzS2V5cyhncm91cDogc3RyaW5nKTogKHN0cmluZylbXSB7XG4gICAgbGV0IGcgPSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgIGlmIChnKSByZXR1cm4gQXJyYXkuZnJvbShnLmtleXMoKSk7XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBwcm92aWRlU2VydmljZShuYW1lOiBzdHJpbmcsIHNlcnZpY2U6IGFueSwgZ3JvdXA/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlcnZpY2VyZWdpc3RyeS5zZXQobmFtZSwgc2VydmljZSk7XG4gICAgaWYgKGdyb3VwKSB7XG4gICAgICBpZiAoIXRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5oYXMoZ3JvdXApKSB0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuc2V0KGdyb3VwLCBuZXcgTWFwPHN0cmluZywgYW55PigpKTtcbiAgICAgIGxldCBnZyA9IHRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgICAgaWYgKGdnKSBnZy5zZXQobmFtZSwgc2VydmljZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U2VydmljZTxUPihuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKHRoaXMuc2VydmljZXJlZ2lzdHJ5LmdldChuYW1lKSB8fCBudWxsKSBhcyBUO1xuICB9XG5cbiAgZ2V0R3JvdXBTZXJ2aWNlcyhncm91cDogc3RyaW5nLCAuLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xuICAgIGxldCBnID0gdGhpcy5ncm91cGVkc2VydmljZXJlZ2lzdHJ5LmdldChncm91cCk7XG4gICAgaWYgKGcpXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShnLmVudHJpZXMoKSB8fCBbXSkuZmlsdGVyKGkgPT4gKCFuYW1lIHx8IG5hbWUubGVuZ3RoID09IDApIHx8IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcbiAgICByZXR1cm4gW11cbiAgfVxufSIsImRlY2xhcmUgbmFtZXNwYWNlIE1lc3NhZ2VTZXJ2aWNlIHtcbiAgdHlwZSBBbnlGdW5jdGlvbiA9ICguLi5hcmdzOiBhbnkpID0+IGFueVxuICB0eXBlIEV4dHJhY3RNZXNzYWdlS2V5PFQsIGs+ID0gW1RdIGV4dGVuZHMgW25ldmVyXSA/IHN0cmluZyA6IGsgZXh0ZW5kcyBrZXlvZiBUID8gayAmIHN0cmluZyA6IG5ldmVyO1xuXG4gIHR5cGUgQXNrRnVuY3Rpb25QYXJhbWV0ZXJzPFQsIGs+ID0gW1RdIGV4dGVuZHMgW25ldmVyXSA/IFsuLi5hbnlbXV0gOlxuICAgIChrIGV4dGVuZHMga2V5b2YgVCA/XG4gICAgICAoVFtrXSBleHRlbmRzIEFueUZ1bmN0aW9uID8gUGFyYW1ldGVyczxUW2tdPiA6IG5ldmVyKSA6XG4gICAgICBbLi4udW5rbm93bltdXSk7XG5cbiAgdHlwZSBBc2tGdW5jdGlvblJldHVyblR5cGU8VCwgaz4gPSBbVF0gZXh0ZW5kcyBbbmV2ZXJdID8gUHJvbWlzZTxhbnk+IDpcbiAgICAoayBleHRlbmRzIGtleW9mIFQgP1xuICAgICAgKFRba10gZXh0ZW5kcyAoKC4uLmFyZ3M6IGFueSkgPT4gaW5mZXIgVSkgPyBQcm9taXNlPEF3YWl0ZWQ8VT4+IDogbmV2ZXIpIDpcbiAgICAgIG5ldmVyKTtcblxuICB0eXBlIFJlcGx5RnVuY3Rpb25DYlJldHVyblR5cGU8VCwgaz4gPSBbVF0gZXh0ZW5kcyBbbmV2ZXJdID8gYW55IDpcbiAgICAoayBleHRlbmRzIGtleW9mIFQgP1xuICAgICAgKFRba10gZXh0ZW5kcyAoKC4uLmFyZ3M6IGFueSkgPT4gaW5mZXIgVSkgPyBVIDogbmV2ZXIpIDpcbiAgICAgIG5ldmVyKTtcblxuICB0eXBlIFJlcGx5RnVuY3Rpb25DYjxULCBrPiA9ICguLi5hcmdzOiBbLi4uQXNrRnVuY3Rpb25QYXJhbWV0ZXJzPFQsIGs+XSkgPT4gUmVwbHlGdW5jdGlvbkNiUmV0dXJuVHlwZTxULCBrPlxuXG4gIHR5cGUgU2VuZEZ1bmN0aW9uUGFyYW1ldGVyczxULCBrPiA9IFtUXSBleHRlbmRzIFtuZXZlcl0gPyBbLi4uYW55W11dIDpcbiAgICAoayBleHRlbmRzIGtleW9mIFQgPyBUW2tdIGV4dGVuZHMgQXJyYXk8YW55PiA/IFRba10gOiBbVFtrXV0gOiBuZXZlcik7XG5cblxuICB0eXBlIEFza0Z1bmN0aW9uID0gPFQgPSBuZXZlciwgayA9IGtleW9mIFQgJiBzdHJpbmc+KG5hbWU6IEV4dHJhY3RNZXNzYWdlS2V5PFQsIGs+LCAuLi5hcmdzOiBBc2tGdW5jdGlvblBhcmFtZXRlcnM8VCwgaz4pID0+IEFza0Z1bmN0aW9uUmV0dXJuVHlwZTxULCBrPjtcbiAgdHlwZSBSZXBseUZ1bmN0aW9uID0gPFQgPSBuZXZlciwgayA9IGtleW9mIFQgJiBzdHJpbmc+KG5hbWU6IEV4dHJhY3RNZXNzYWdlS2V5PFQsIGs+LCBjYjogUmVwbHlGdW5jdGlvbkNiPFQsIGs+LCBvcHRzPzogeyBmb3JjZTogYm9vbGVhbiB9KSA9PiAoKSA9PiB2b2lkO1xuICB0eXBlIFNlbmRGdW5jdGlvbiA9IDxUID0gbmV2ZXIsIGsgPSBrZXlvZiBUICYgc3RyaW5nPihuYW1lOiBFeHRyYWN0TWVzc2FnZUtleTxULCBrPiwgLi4uYXJnczogU2VuZEZ1bmN0aW9uUGFyYW1ldGVyczxULCBrPikgPT4gdm9pZDtcbiAgdHlwZSBTdWJzY3JpYmVGdW5jdGlvbiA9IDxUID0gbmV2ZXIsIGsgPSBrZXlvZiBUICYgc3RyaW5nPihuYW1lOiBFeHRyYWN0TWVzc2FnZUtleTxULCBrPiwgY2I6ICguLi5hcmdzOiBTZW5kRnVuY3Rpb25QYXJhbWV0ZXJzPFQsIGs+KSA9PiB2b2lkKSA9PiAoKSA9PiB2b2lkO1xuICB0eXBlIE9uY2VGdW5jdGlvbiA9IDxUID0gbmV2ZXIsIGsgPSBrZXlvZiBUICYgc3RyaW5nPihuYW1lOiBFeHRyYWN0TWVzc2FnZUtleTxULCBrPiwgY2I6ICguLi5hcmdzOiBTZW5kRnVuY3Rpb25QYXJhbWV0ZXJzPFQsIGs+KSA9PiB2b2lkKSA9PiB2b2lkO1xuICB0eXBlIFVuc3Vic3JpYmVGdW5jdGlvbiA9IDxUID0gbmV2ZXIsIGsgPSBrZXlvZiBUICYgc3RyaW5nPihuYW1lOiBFeHRyYWN0TWVzc2FnZUtleTxULCBrPiwgY2I6ICguLi5hcmdzOiBTZW5kRnVuY3Rpb25QYXJhbWV0ZXJzPFQsIGs+KSA9PiB2b2lkKSA9PiB2b2lkO1xuXG4gIGludGVyZmFjZSBNZXNzYWdlU2VydmljZSB7XG4gICAgSW5zdGFuY2U6IHtcbiAgICAgIGFzazogQXNrRnVuY3Rpb24sLy88VCBleHRlbmRzIGtleW9mIEFza01lc3NhZ2VUeXBlcyAmIHN0cmluZz4obmFtZTogVCwgLi4uYXJnczogUGFyYW1ldGVyczxBc2tNZXNzYWdlVHlwZXNbVF0+KSA9PiBQcm9taXNlPEF3YWl0ZWQ8UmV0dXJuVHlwZTxBc2tNZXNzYWdlVHlwZXNbVF0+Pj47XG4gICAgICByZXBseTogUmVwbHlGdW5jdGlvbixcbiAgICAgIHNlbmQ6IFNlbmRGdW5jdGlvbixcbiAgICAgIHN1YnNjcmliZTogU3Vic2NyaWJlRnVuY3Rpb24sXG4gICAgICBvbmNlOiBPbmNlRnVuY3Rpb25cbiAgICAgIHVuc3Vic2NyaWJlOiBVbnN1YnNyaWJlRnVuY3Rpb25cbiAgICB9O1xuICB9XG59XG5cblxuY29uc3QgYXNrUmVwbHlDaGFubmVscyA9IG5ldyBNYXA8c3RyaW5nLCBNZXNzYWdlQ2hhbm5lbD4oKTtcbmNvbnN0IHNlbmRTdWJzY3JpYmVDaGFubmVscyA9IG5ldyBNYXA8c3RyaW5nLCBNZXNzYWdlQ2hhbm5lbD4oKTtcbmNvbnN0IHNlbmRTdWJzY3JpYmVDYWxsYmFja3MgPSBuZXcgTWFwPEZ1bmN0aW9uLCAoLi4uYXJnczogYW55W10pID0+IGFueT4oKTtcblxuLy8gY29uc3QgYXNrOiBBc2tGdW5jdGlvbiA9IDxUIGV4dGVuZHMga2V5b2YgQXNrTWVzc2FnZVR5cGVzICYgc3RyaW5nPihuYW1lOiBULCAuLi5hcmdzOiBQYXJhbWV0ZXJzPEFza01lc3NhZ2VUeXBlc1tUXT4pOiBQcm9taXNlPEF3YWl0ZWQ8UmV0dXJuVHlwZTxBc2tNZXNzYWdlVHlwZXNbVF0+Pj4gPT4ge1xuLy9AdHMtZXhwZWN0LWVycm9yXG5jb25zdCBhc2s6IE1lc3NhZ2VTZXJ2aWNlLkFza0Z1bmN0aW9uID0gKG5hbWUsIC4uLmFyZ3MpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZWplY3QoXCJ0aW1lb3V0IGZvciBtZXNzYWdlIFwiICsgbmFtZSk7XG4gICAgfSwgMzAwMDApO1xuICAgIGxldCBhc2tQb3J0ID0gYXNrUmVwbHlDaGFubmVscy5nZXQobmFtZSk/LnBvcnQxXG4gICAgaWYgKCFhc2tQb3J0KSB7XG4gICAgICBjb25zdCBjID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICBhc2tSZXBseUNoYW5uZWxzLnNldChuYW1lLCBjKTtcbiAgICAgIGFza1BvcnQgPSBjLnBvcnQxXG4gICAgfVxuICAgIGxldCByZXBseUNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBjb25zdCBsID0gKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICByZXNvbHZlKGV2dC5kYXRhKTtcbiAgICAgIHJlcGx5Q2hhbm5lbCA9IG51bGwhO1xuICAgIH1cbiAgICByZXBseUNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbDtcbiAgICBhc2tQb3J0LnBvc3RNZXNzYWdlKGFyZ3MsIFtyZXBseUNoYW5uZWwucG9ydDJdKTtcbiAgfSk7XG59XG5cbi8vIGNvbnN0IHJlcGx5ID0gPFQgZXh0ZW5kcyBrZXlvZiBBc2tNZXNzYWdlVHlwZXMgJiBzdHJpbmc+KG5hbWU6IFQsIGNiOiBBc2tNZXNzYWdlVHlwZXNbVF0sIG9wdHM6IHsgZm9yY2U6IGJvb2xlYW4gfSA9IHsgZm9yY2U6IGZhbHNlIH0pID0+IHtcbmNvbnN0IHJlcGx5OiBNZXNzYWdlU2VydmljZS5SZXBseUZ1bmN0aW9uID0gKG5hbWUsIGNiLCBvcHRzID0geyBmb3JjZTogZmFsc2UgfSkgPT4ge1xuICBpZiAodHlwZW9mIGNiICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IFwicmVwbHkgY2FsbGJhY2sgZm9yIG1lc3NhZ2UgXCIgKyBuYW1lICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIjtcbiAgbGV0IGFza2luZ1BvcnQgPSBhc2tSZXBseUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFhc2tpbmdQb3J0KSB7XG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGFza1JlcGx5Q2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIGFza2luZ1BvcnQgPSBjLnBvcnQyXG4gIH1cbiAgaWYgKCFvcHRzLmZvcmNlICYmIGFza2luZ1BvcnQub25tZXNzYWdlKSB0aHJvdyBcInJlcGx5IGFscmVhZHkgc2V0IGZvciBtZXNzYWdlIFwiICsgbmFtZVxuICBjb25zdCBsID0gYXN5bmMgKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgcmVwbHlQb3J0ID0gZXZ0LnBvcnRzWzBdXG4gICAgY29uc3QgciA9IGF3YWl0IGNiKC4uLmV2dC5kYXRhKTtcbiAgICByZXBseVBvcnQucG9zdE1lc3NhZ2Uocik7XG4gICAgcmVwbHlQb3J0LmNsb3NlKCk7XG4gIH1cbiAgYXNraW5nUG9ydC5vbm1lc3NhZ2UgPSBsO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGFza2luZ1BvcnQhLm9ubWVzc2FnZSA9IG51bGwhO1xuICB9XG59XG5cbi8vIGNvbnN0IHNlbmQgPSA8VCBleHRlbmRzIGtleW9mIFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlcyAmIHN0cmluZz4obmFtZTogVCwgLi4uYXJnczogUGFyYW1ldGVyczxTdWJzY3JpcHRpb25NZXNzYWdlVHlwZXNbVF0+KSA9PiB7XG5jb25zdCBzZW5kOiBNZXNzYWdlU2VydmljZS5TZW5kRnVuY3Rpb24gPSAobmFtZSwgLi4uYXJncykgPT4ge1xuICBsZXQgcG9ydCA9IHNlbmRTdWJzY3JpYmVDaGFubmVscy5nZXQobmFtZSk/LnBvcnQxXG4gIGlmICghcG9ydCkge1xuICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQxXG4gIH1cbiAgcG9ydC5wb3N0TWVzc2FnZShhcmdzKTtcbn1cblxuY29uc3Qgc3Vic2NyaWJlOiBNZXNzYWdlU2VydmljZS5TdWJzY3JpYmVGdW5jdGlvbiA9IChuYW1lOiBzdHJpbmcsIGNiOiAoLi4uYXJnczogYW55W10pID0+IGFueSkgPT4ge1xuICBpZiAodHlwZW9mIGNiICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IFwicmVwbHkgY2FsbGJhY2sgZm9yIG1lc3NhZ2UgXCIgKyBuYW1lICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIjtcbiAgbGV0IHBvcnQgPSBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMuZ2V0KG5hbWUpPy5wb3J0MlxuICBpZiAoIXBvcnQpIHtcbiAgICBjb25zdCBjID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgc2VuZFN1YnNjcmliZUNoYW5uZWxzLnNldChuYW1lLCBjKTtcbiAgICBwb3J0ID0gYy5wb3J0MlxuICB9XG4gIGNvbnN0IGwgPSAoZXZ0OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICBjYiguLi5ldnQuZGF0YSk7XG4gIH1cbiAgc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5zZXQoY2IsIGwpO1xuICBwb3J0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGwpO1xuICBwb3J0LnN0YXJ0KCk7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgcG9ydD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgbCk7XG4gICAgc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5kZWxldGUoY2IpO1xuICB9XG59XG5cbi8vIGNvbnN0IG9uY2UgPSA8VCBleHRlbmRzIGtleW9mIFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlcyAmIHN0cmluZz4obmFtZTogVCwgY2I6IFN1YnNjcmlwdGlvbk1lc3NhZ2VUeXBlc1tUXSkgPT4ge1xuY29uc3Qgb25jZTogTWVzc2FnZVNlcnZpY2UuT25jZUZ1bmN0aW9uID0gKG5hbWUsIGNiKSA9PiB7XG4gIGlmICh0eXBlb2YgY2IgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgXCJyZXBseSBjYWxsYmFjayBmb3IgbWVzc2FnZSBcIiArIG5hbWUgKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiO1xuICBjb25zdCB1bnN1YnNjcmliZSA9IHN1YnNjcmliZShuYW1lLCAoLi4uYXJncykgPT4ge1xuICAgIGNiKC4uLmFyZ3MpO1xuICAgIHVuc3Vic2NyaWJlKCk7XG4gIH0pO1xufVxuXG5jb25zdCB1bnN1YnNjcmliZTogTWVzc2FnZVNlcnZpY2UuVW5zdWJzcmliZUZ1bmN0aW9uID0gKG5hbWU6IHN0cmluZywgY2IpID0+IHtcbiAgbGV0IHBvcnQgPSBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMuZ2V0KG5hbWUpPy5wb3J0MlxuICBpZiAoIXBvcnQpIHJldHVybjtcbiAgY29uc3QgbCA9IHNlbmRTdWJzY3JpYmVDYWxsYmFja3MuZ2V0KGNiKTtcbiAgaWYgKGwpIHtcbiAgICBwb3J0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGwpO1xuICAgIHNlbmRTdWJzY3JpYmVDYWxsYmFja3MuZGVsZXRlKGNiKTtcbiAgfVxufVxuXG5leHBvcnQge1xuICBhc2ssXG4gIHJlcGx5LFxuICBzZW5kLFxuICBzdWJzY3JpYmUsXG4gIG9uY2UsXG4gIHVuc3Vic2NyaWJlXG59XG5cbmV4cG9ydCBjb25zdCBNZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UuTWVzc2FnZVNlcnZpY2UgPSB7XG4gIEluc3RhbmNlOiB7XG4gICAgYXNrLFxuICAgIHJlcGx5LFxuICAgIHNlbmQsXG4gICAgc3Vic2NyaWJlLFxuICAgIG9uY2UsXG4gICAgdW5zdWJzY3JpYmVcbiAgfVxufSIsImltcG9ydCB7IGNvbXB1dGVkLCBkZWZpbmVDb21wb25lbnQgfSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCB7IENvbW1vblJlZ2lzdHJ5IH0gZnJvbSBcIi4uL2hlbHBlcnMvQ29tbW9uUmVnaXN0cnlcIjtcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcclxuICBuYW1lOiBcImluamVjdFwiLFxyXG4gIHByb3BzOiB7XHJcbiAgICBpZDogeyBkZWZhdWx0OiBudWxsIH0sXHJcbiAgICB0eXBlOiB7IGRlZmF1bHQ6IG51bGwsIHR5cGU6IFN0cmluZyB9LFxyXG4gICAgdmFsdWU6IHsgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgbmFtZTogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IG51bGwgfSxcclxuICAgIG5hbWVzOiB7IHR5cGU6IEFycmF5PHN0cmluZz4sIGRlZmF1bHQ6IG51bGwgfSxcclxuICAgIGdyb3VwOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgbWV0YWRhdGE6IHsgdHlwZTogT2JqZWN0LCBkZWZhdWx0OiBudWxsIH0sXHJcbiAgICBkaXNhYmxlZDogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZSB9LFxyXG4gICAgcmVhZG9ubHk6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfVxyXG4gIH0sXHJcbiAgc2V0dXAocHJvcHMsIHsgZW1pdCB9KSB7XHJcblxyXG4gICAgY29uc3QgVmFsdWUgPSBjb21wdXRlZCh7XHJcbiAgICAgIGdldDogKCkgPT4geyByZXR1cm4gcHJvcHMudmFsdWUgfSxcclxuICAgICAgc2V0OiAodikgPT4geyBlbWl0KFwiaW5wdXRcIiwgdik7IH1cclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgQ29tcG9uZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICAgICAgaWYgKHByb3BzLm5hbWUpXHJcbiAgICAgICAgcmV0dXJuIFtDb21tb25SZWdpc3RyeS5JbnN0YW5jZS5nZXRDb21wb25lbnQocHJvcHMubmFtZSwgcHJvcHMuZ3JvdXApXTtcclxuICAgICAgaWYgKHByb3BzLmdyb3VwKVxyXG4gICAgICAgIHJldHVybiBDb21tb25SZWdpc3RyeS5JbnN0YW5jZS5nZXRHcm91cENvbXBvbmVudHMocHJvcHMuZ3JvdXAsIC4uLihwcm9wcy5uYW1lcyB8fCBbXSkpO1xyXG4gICAgICByZXR1cm4gQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UuZ2V0Q29tcG9uZW50cyguLi4ocHJvcHMubmFtZXMgfHwgW10pKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGNsaWNrID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7IGVtaXQoJ2NsaWNrJywgLi4uYXJncykgfVxyXG4gICAgY29uc3Qgc2F2ZSA9ICguLi5hcmdzOiBhbnlbXSkgPT4geyBlbWl0KCdzYXZlJywgLi4uYXJncykgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGlkOiBwcm9wcy5pZCxcclxuICAgICAgdHlwZTogcHJvcHMudHlwZSxcclxuICAgICAgdmFsdWU6IHByb3BzLnZhbHVlLFxyXG4gICAgICBuYW1lOiBwcm9wcy5uYW1lLFxyXG4gICAgICBuYW1lczogcHJvcHMubmFtZXMsXHJcbiAgICAgIGdyb3VwOiBwcm9wcy5ncm91cCxcclxuICAgICAgbWV0YWRhdGE6IHByb3BzLm1ldGFkYXRhLFxyXG4gICAgICBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZWQsXHJcbiAgICAgIHJlYWRvbmx5OiBwcm9wcy5yZWFkb25seSxcclxuICAgICAgY2xpY2ssXHJcbiAgICAgIHNhdmUsXHJcbiAgICAgIENvbXBvbmVudHMsXHJcbiAgICAgIFZhbHVlLFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pOyIsIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJUHJvamVjdGFibGVNb2RlbDxUPiB7XG4gIGRhdGE6IFQ7IHJlc29sdmU6IChpdGVtOiBUKSA9PiB2b2lkOyByZWplY3Q6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0b3Ige1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBQcm9qZWN0b3IoKTtcbiAgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBQcm9qZWN0b3IgeyByZXR1cm4gUHJvamVjdG9yLmluc3RhbmNlIH1cbiAgc3RhdGljIHNldCBJbnN0YW5jZSh2OiBQcm9qZWN0b3IpIHsgdGhpcy5pbnN0YW5jZSA9IHY7IH1cblxuICBwcml2YXRlIHNjcmVlbnMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICBwcml2YXRlIHByb2plY3RpbmcgPSBuZXcgTWFwPHN0cmluZywgeyBjb21wb25lbnQ6IENvbXBvbmVudCwgbW9kZWw6IElQcm9qZWN0YWJsZU1vZGVsPGFueT4sIHByb21pc2U6IFByb21pc2U8YW55PiB8IG51bGwsIHF1ZXVlOiBib29sZWFuIH1bXT4oKTtcblxuICBzZXRTY3JlZW4oc2NyZWVuOiBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSwgbmFtZTogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIpIHtcbiAgICB0aGlzLnNjcmVlbnMuc2V0KG5hbWUsIHNjcmVlbik7XG4gIH1cblxuXG5cbiAgcHJvamVjdFRvPFQ+KGNvbXBvbmVudDogQ29tcG9uZW50LCBkYXRhOiBUIHwgbnVsbCA9IG51bGwsIHNjcmVlbjogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIsIHF1ZXVlOiBib29sZWFuID0gdHJ1ZSwgYXN5bmM6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8VD4gfCBudWxsIHtcbiAgICBjb25zdCBtb2RlbCA9IHsgZGF0YSB9IGFzIElQcm9qZWN0YWJsZU1vZGVsPFQ+O1xuICAgIGNvbnN0IHByb21pc2UgPSBhc3luYyA/IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHsgbW9kZWwucmVqZWN0ID0gcmVqZWN0OyBtb2RlbC5yZXNvbHZlID0gcmVzb2x2ZSB9KSA6IG51bGw7XG5cbiAgICBpZiAoIXF1ZXVlKSB7XG5cbiAgICAgIHRoaXMucHJvamVjdGluZy5zZXQoc2NyZWVuLCBbeyBjb21wb25lbnQsIG1vZGVsLCBwcm9taXNlLCBxdWV1ZSB9XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5wcm9qZWN0aW5nLmhhcyhzY3JlZW4pKSB7XG4gICAgICAgIHRoaXMucHJvamVjdGluZy5zZXQoc2NyZWVuLCBbXSk7XG4gICAgICB9XG4gICAgICAodGhpcy5wcm9qZWN0aW5nLmdldChzY3JlZW4pIHx8IFtdKS5wdXNoKHsgY29tcG9uZW50LCBtb2RlbCwgcHJvbWlzZSwgcXVldWUgfSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3MgPSB0aGlzLnNjcmVlbnMuZ2V0KHNjcmVlbik7XG4gICAgaWYgKCFzcykgcmV0dXJuIG51bGw7XG4gICAgc3MubW9kZWwgPSBtb2RlbDtcbiAgICBzcy5jdXJyZW50VmlldyA9IGNvbXBvbmVudDtcblxuICAgIGlmIChwcm9taXNlKSBwcm9taXNlLnRoZW4oKCkgPT4gdGhpcy5zdG9wUHJvamVjdGluZyhzY3JlZW4pKS5jYXRjaCgoKSA9PiB0aGlzLnN0b3BQcm9qZWN0aW5nKHNjcmVlbikpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcHJvamVjdEFzeW5jVG88VD4oY29tcG9uZW50OiBDb21wb25lbnQsIGRhdGE6IFQsIHNjcmVlbjogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIsIHF1ZXVlOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3RUbyhjb21wb25lbnQsIGRhdGEsIHNjcmVlbiwgcXVldWUsIHRydWUpXG4gIH1cblxuICBzdG9wUHJvamVjdGluZyhzY3JlZW46IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiKSB7XG4gICAgaWYgKHRoaXMucHJvamVjdGluZy5oYXMoc2NyZWVuKSkge1xuICAgICAgKHRoaXMucHJvamVjdGluZy5nZXQoc2NyZWVuKSB8fCBbXSkucG9wKClcbiAgICB9XG5cbiAgICBsZXQgX3NjcmVlbiA9IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKVxuICAgIGlmIChfc2NyZWVuICYmIF9zY3JlZW4uY3VycmVudFZpZXcpIHtcbiAgICAgIF9zY3JlZW4ubW9kZWwgPSBudWxsO1xuICAgICAgX3NjcmVlbi5zY3JlZW5Nb2RlbCA9IG51bGw7XG4gICAgICBfc2NyZWVuLmN1cnJlbnRWaWV3ID0gbnVsbDtcblxuICAgICAgaWYgKHRoaXMucHJvamVjdGluZy5oYXMoc2NyZWVuKSkge1xuICAgICAgICBsZXQgcyA9IHRoaXMucHJvamVjdGluZy5nZXQoc2NyZWVuKTtcbiAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcbiAgICAgICAgICBsZXQgbSA9IHMucG9wKCk7XG4gICAgICAgICAgaWYgKG0pIHRoaXMucHJvamVjdFRvKG0uY29tcG9uZW50LCBtLm1vZGVsLCBzY3JlZW4sIG0ucXVldWUsICEhbS5wcm9taXNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdGFibGU8VD4ge1xuICB2YWx1ZToge1xuICAgIGRhdGE6IFQsXG4gICAgcmVzb2x2ZTogKGl0ZW06IFQpID0+IHZvaWQ7XG4gICAgcmVqZWN0OiAoKSA9PiB2b2lkO1xuICB9O1xufSIsIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSwgY29tcHV0ZWQsIGRlZmluZUNvbXBvbmVudCwgZ2V0Q3VycmVudEluc3RhbmNlLCBvbk1vdW50ZWQsIFJlZiwgcmVmLCB3YXRjaCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IElQcm9qZWN0YWJsZU1vZGVsLCBQcm9qZWN0b3IgfSBmcm9tIFwiLi4vaGVscGVycy9Qcm9qZWN0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogXCJzY3JlZW5cIixcbiAgcHJvcHM6IHtcbiAgICBuYW1lOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogXCJkZWZhdWx0c2NyZWVuXCIgfSxcbiAgfSxcbiAgc2V0dXAocHJvcHMsIHsgZXhwb3NlIH0pIHtcblxuICAgIGNvbnN0IG1lID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XG5cbiAgICBjb25zdCBjdXJyZW50VmlldzogUmVmPENvbXBvbmVudD4gPSByZWYobnVsbCEpO1xuICAgIGNvbnN0IG1vZGVsOiBSZWY8SVByb2plY3RhYmxlTW9kZWw8YW55PiB8IG51bGw+ID0gcmVmKG51bGwhKTtcblxuICAgIGV4cG9zZSh7IGN1cnJlbnRWaWV3LCBtb2RlbCB9KVxuXG4gICAgY29uc3QgaXNWaXNpYmxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIGN1cnJlbnRWaWV3LnZhbHVlICE9IG51bGw7XG4gICAgfSlcblxuICAgIGNvbnN0IGN1cnJlbnRWaWV3VUlEID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIChjdXJyZW50Vmlldy52YWx1ZSBhcyBhbnkpPy5fX2ZpbGVcbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIFByb2plY3Rvci5JbnN0YW5jZS5zZXRTY3JlZW4oKG1lIGFzIGFueSkucHJveHksIHByb3BzLm5hbWUpO1xuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFZpZXdVSUQsXG4gICAgICBjdXJyZW50VmlldyxcbiAgICAgIG1vZGVsLFxuICAgICAgaXNWaXNpYmxlXG4gICAgfVxuICB9LFxuXG59KVxuIiwiY29uc3QgcHJvamVjdFRvRGlyZWN0aXZlID0ge1xuXG4gIGluc2VydGVkOiAoZWw6IEVsZW1lbnQsIGJpbmQ6IGFueSkgPT4ge1xuICAgIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlLmluamVjdFRvKGVsLCBiaW5kLmFyZyk7XG4gIH0sXG4gIHVuYmluZDogKGVsOiBFbGVtZW50LCBiaW5kOiBhbnkpID0+IHtcbiAgICBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZS5yZW1vdmVGcm9tKGVsLCBiaW5kLmFyZylcbiAgfVxufVxuXG5cbmNvbnN0IHNjcmVlbkRpcmVjdGl2ZSA9IHtcbiAgYmluZDogKGVsOiBhbnksIGJpbmRpbmc6IGFueSkgPT4ge1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZS5zZXRTY3JlZW4oZWwsIGJpbmRpbmcuYXJnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb2plY3RUb0RpcmVjdGl2ZSwgc2NyZWVuRGlyZWN0aXZlXG59XG5cbmV4cG9ydCBjbGFzcyBTY3JlZW5zTWFuYWdlciB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlID0gbmV3IFNjcmVlbnNNYW5hZ2VyKCk7XG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogU2NyZWVuc01hbmFnZXIgeyByZXR1cm4gU2NyZWVuc01hbmFnZXIuaW5zdGFuY2UgfVxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IFNjcmVlbnNNYW5hZ2VyKSB7IHRoaXMuaW5zdGFuY2UgPSB2OyB9XG4gIHByaXZhdGUgc2NyZWVucyA9IG5ldyBNYXA8c3RyaW5nLCBFbGVtZW50PigpO1xuICBcblxuICBpbmplY3RUbyhkb21FbGVtZW50OiBFbGVtZW50LCBzY3JlZW46IHN0cmluZykge1xuICAgIGlmICghZG9tRWxlbWVudCB8fCAhc2NyZWVuKSByZXR1cm47XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnNjcmVlbnMuaGFzKHNjcmVlbikgPyB0aGlzLnNjcmVlbnMuZ2V0KHNjcmVlbikgOiBudWxsO1xuICAgIHRyeSB7IGRvbUVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBkb21FbGVtZW50LnJlbW92ZUNoaWxkKGRvbUVsZW1lbnQpOyB9IGNhdGNoIHsgfVxuICAgIGlmIChlbGVtZW50KSBlbGVtZW50LmFwcGVuZChkb21FbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZUZyb20oZG9tRWxlbWVudDogRWxlbWVudCwgc2NyZWVuOiBzdHJpbmcpIHtcbiAgICBpZiAoIWRvbUVsZW1lbnQgfHwgIXNjcmVlbikgcmV0dXJuO1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5zY3JlZW5zLmhhcyhzY3JlZW4pID8gdGhpcy5zY3JlZW5zLmdldChzY3JlZW4pIDogbnVsbDtcbiAgICB0cnkgeyBpZiAoZWxlbWVudCkgZWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KSB9IGNhdGNoIHsgfVxuICB9XG5cbiAgc2V0U2NyZWVuKHNjcmVlbjogRWxlbWVudCwgbmFtZTogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIpIHtcbiAgICB0aGlzLnNjcmVlbnMuc2V0KG5hbWUsIHNjcmVlbik7XG4gIH1cbn0iLCJmdW5jdGlvbiBjaGVja0lucHV0VmFsaWRhdGlvbihhOiBFdmVudCwgY2FsbG91dDogKGVycm9yczogc3RyaW5nW10sIHZhbGlkOiBib29sZWFuKSA9PiB2b2lkKSB7XG4gIGlmICgoYS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsaWRpdHkpIHtcbiAgICBsZXQgZWwgPSAoYS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCk7XG5cbiAgICBpZiAoZWwudmFsaWRpdHkpIHtcbiAgICAgIGxldCBlcnJvcnMgPSBbXG4gICAgICAgIGVsLnZhbGlkaXR5LmJhZElucHV0ID8gXCJiYWQgaW5wdXRcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LmN1c3RvbUVycm9yID8gXCJjdXN0b20gZXJyb3JcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnBhdHRlcm5NaXNtYXRjaCA/IFwicGF0dGVybiBtaXNtYXRjaFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkucmFuZ2VPdmVyZmxvdyA/IFwicmFuZ2Ugb3ZlcmZsb3dcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnJhbmdlVW5kZXJmbG93ID8gXCJyYW5nZSB1bmRlcmZsb3dcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnN0ZXBNaXNtYXRjaCA/IFwic3RlcCBtaXNtYXRjaFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudG9vTG9uZyA/IFwidG9vIGxvbmdcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnRvb1Nob3J0ID8gXCJ0b28gc2hvcnRcIiA6IG51bGwsXG4gICAgICAgIGVsLnZhbGlkaXR5LnR5cGVNaXNtYXRjaCA/IFwidHlwZSBtaXNtYXRjaFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudmFsdWVNaXNzaW5nID8gXCJ2YWx1ZSBtaXNzaW5nXCIgOiBudWxsXS5maWx0ZXIoaSA9PiAhIWkpXG5cbiAgICAgIGNhbGxvdXQoZXJyb3JzIGFzIHN0cmluZ1tdLCBlbC52YWxpZGl0eS52YWxpZCAhPSB1bmRlZmluZWQgPyBlbC52YWxpZGl0eS52YWxpZCA6IHRydWUpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdmFsaWRhdGUgPSB7XG4gIGluc2VydGVkOiAoZWw6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQsIGJpbmQ6IHtcbiAgICB2YWx1ZTogKGVycm9yczogc3RyaW5nW10sIHZhbGlkOiBib29sZWFuKSA9PiB2b2lkLFxuICAgIGFyZzogXCJpbW1lZGlhdGVcIlxuICB9KSA9PiB7XG4gICAgaWYgKCFlbCB8fCAhZWwud2lsbFZhbGlkYXRlKSByZXR1cm47XG4gICAgc3dpdGNoIChlbC5ub2RlTmFtZSkge1xuICAgICAgY2FzZSBcIklOUFVUXCI6XG4gICAgICBjYXNlIFwiVEVYVEFSRUFcIjogZWwub25ibHVyID0gKGFyZykgPT4gY2hlY2tJbnB1dFZhbGlkYXRpb24oYXJnLCBiaW5kLnZhbHVlKTsgYnJlYWs7XG4gICAgICBjYXNlIFwiU0VMRUNUXCI6IGVsLm9uY2hhbmdlID0gKGFyZykgPT4gY2hlY2tJbnB1dFZhbGlkYXRpb24oYXJnLCBiaW5kLnZhbHVlKTsgYnJlYWs7XG4gICAgfVxuXG4gICAgZWwub25pbnZhbGlkID0gKGFyZykgPT4gY2hlY2tJbnB1dFZhbGlkYXRpb24oYXJnLCBiaW5kLnZhbHVlKTtcbiAgICBpZiAoZWwuZm9ybSkgZWwuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdpbnZhbGlkJywgKCkgPT4gY2hlY2tJbnB1dFZhbGlkYXRpb24oeyB0YXJnZXQ6IGVsIH0gYXMgYW55LCBiaW5kLnZhbHVlKSlcblxuICAgIGlmIChiaW5kLmFyZyA9PSBcImltbWVkaWF0ZVwiKSBlbC5yZXBvcnRWYWxpZGl0eSgpO1xuICAgIGVsc2UgY2hlY2tJbnB1dFZhbGlkYXRpb24oeyB0YXJnZXQ6IGVsIH0gYXMgYW55LCBiaW5kLnZhbHVlKVxuICB9LFxuICB1bmJpbmQ6IChlbDogRWxlbWVudCkgPT4ge1xuICAgIGlmICghZWwpIHJldHVybjtcblxuICB9LFxufVxuIiwiaW1wb3J0IHsgTWVudUhlbHBlciwgbWVudVR5cGUsIE1lbnVOb3RpZmljYXRpb25zLCBJTWVudURlZmluaXRpb24gfSBmcm9tIFwiLi9oZWxwZXJzL01lbnVIZWxwZXJcIjtcbmltcG9ydCB7IENvbW1vblJlZ2lzdHJ5IH0gZnJvbSBcIi4vaGVscGVycy9Db21tb25SZWdpc3RyeVwiO1xuaW1wb3J0IHsgTWVzc2FnZVNlcnZpY2UgfSBmcm9tIFwiLi9oZWxwZXJzL01lc3NhZ2VTZXJ2aWNlXCI7XG5pbXBvcnQgeyBJUm91dGVDb25maWcgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL1JvdXRlckludGVyZmFjZXNcIjtcbmltcG9ydCB7IElTdG9yZSB9IGZyb20gXCIuL2ludGVyZmFjZXMvU3RvcmVJbnRlcmZhY2VzXCI7XG5pbXBvcnQgSW5qZWN0IGZyb20gXCIuL2NvbXBvbmVudHMvaW5qZWN0LnZ1ZVwiO1xuaW1wb3J0IFNjcmVlbiBmcm9tIFwiLi9jb21wb25lbnRzL3NjcmVlbi52dWVcIjtcbmltcG9ydCB7IFZ1ZUNvbnN0cnVjdG9yIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgSVByb2plY3RhYmxlTW9kZWwsIFByb2plY3RhYmxlLCBQcm9qZWN0b3IgfSBmcm9tIFwiLi9oZWxwZXJzL1Byb2plY3RvclwiO1xuaW1wb3J0IGRpcmVjdGl2ZXMsIHsgU2NyZWVuc01hbmFnZXIgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL3NjcmVlblwiO1xuaW1wb3J0IHsgdmFsaWRhdGUgYXMgVmFsaWRhdGVEaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL3ZhbGlkYXRlXCI7XG5cblxuZnVuY3Rpb24gaW5zdGFsbChWdWU6IFZ1ZUNvbnN0cnVjdG9yKSB7XG4gIFZ1ZS5jb21wb25lbnQoXCJzY3JlZW5cIiwgU2NyZWVuKTtcbiAgVnVlLmNvbXBvbmVudChcImluamVjdFwiLCBJbmplY3QpO1xuICBWdWUuZGlyZWN0aXZlKFwic2NyZWVuXCIsIGRpcmVjdGl2ZXMuc2NyZWVuRGlyZWN0aXZlKTtcbiAgVnVlLmRpcmVjdGl2ZShcInByb2plY3RUb1wiLCBkaXJlY3RpdmVzLnByb2plY3RUb0RpcmVjdGl2ZSk7XG4gIFZ1ZS5kaXJlY3RpdmUoXCJ2YWxpZGF0ZVwiLCBWYWxpZGF0ZURpcmVjdGl2ZSBhcyBhbnkpO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1vZHVsZUluaXRpYWxpemVyIHtcbiAgaW5pdCh2dWVtZjogdHlwZW9mIFZ1ZU1mTW9kdWxlLCBtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkpOiBQcm9taXNlPHZvaWQ+LFxuXG4gIGNvbmZpZz8obWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55KTogUHJvbWlzZTx2b2lkPixcblxuICBydW4/KG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSk6IFByb21pc2U8dm9pZD4sXG5cbiAgcm91dGVzOiBJUm91dGVDb25maWdbXVxufVxuXG5pbnRlcmZhY2UgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlciB7XG4gIGluaXQobWVudTogTWVudUhlbHBlcixcbiAgICBzdG9yZTogSVN0b3JlLFxuICAgIGNvbmZpZ3VyYXRpb246IGFueVxuICAgICwgb3B0aW9uczoge1xuICAgICAgcmVnaXN0cnk6IENvbW1vblJlZ2lzdHJ5LFxuICAgICAgbWVzc2FnZVNlcnZpY2U6IHR5cGVvZiBNZXNzYWdlU2VydmljZS5JbnN0YW5jZSxcbiAgICAgIHByb2plY3RvcjogUHJvamVjdG9yLFxuICAgICAgc2NyZWVuczogU2NyZWVuc01hbmFnZXJcbiAgICB9KTogUHJvbWlzZTx2b2lkPixcbiAgY29uZmlnKG1lbnU6IE1lbnVIZWxwZXIsXG4gICAgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4sXG4gIHJ1bihtZW51OiBNZW51SGVscGVyLFxuICAgIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+LFxuICByb3V0ZXM6IElSb3V0ZUNvbmZpZ1tdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNb2R1bGVJbml0aWFsaXplcihvcHRzOiBJTW9kdWxlSW5pdGlhbGl6ZXIpIHtcbiAgbGV0IG1vZHVsZUNvbmZpZyA9IHt9O1xuICByZXR1cm4ge1xuICAgIGluaXQobWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55LFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnksXG4gICAgICAgIG1lc3NhZ2VTZXJ2aWNlOiB0eXBlb2YgTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UsXG4gICAgICAgIHByb2plY3RvcjogUHJvamVjdG9yLFxuICAgICAgICBzY3JlZW5zOiBTY3JlZW5zTWFuYWdlclxuICAgICAgfSkge1xuXG4gICAgICBpZiAob3B0aW9ucy5yZWdpc3RyeSkgQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UgPSBvcHRpb25zLnJlZ2lzdHJ5O1xuICAgICAgaWYgKG9wdGlvbnMubWVzc2FnZVNlcnZpY2UpIE1lc3NhZ2VTZXJ2aWNlLkluc3RhbmNlID0gb3B0aW9ucy5tZXNzYWdlU2VydmljZVxuICAgICAgaWYgKG9wdGlvbnMucHJvamVjdG9yKSBQcm9qZWN0b3IuSW5zdGFuY2UgPSBvcHRpb25zLnByb2plY3RvcjtcbiAgICAgIGlmIChvcHRpb25zLnNjcmVlbnMpIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlID0gb3B0aW9ucy5zY3JlZW5zO1xuICAgICAgbW9kdWxlQ29uZmlnID0gY29uZmlndXJhdGlvbjtcbiAgICAgIHJldHVybiBvcHRzLmluaXQoVnVlTWZNb2R1bGUsIG1lbnUsIHN0b3JlLCBjb25maWd1cmF0aW9uKTtcbiAgICB9LFxuICAgIGNvbmZpZyhtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlKSB7XG4gICAgICByZXR1cm4gb3B0cy5jb25maWcgPyBvcHRzLmNvbmZpZyhtZW51LCBzdG9yZSwgbW9kdWxlQ29uZmlnKSA6IG51bGw7XG4gICAgfSxcbiAgICBydW4obWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSkge1xuICAgICAgcmV0dXJuIG9wdHMucnVuID8gb3B0cy5ydW4obWVudSwgc3RvcmUsIG1vZHVsZUNvbmZpZykgOiBudWxsO1xuICAgIH0sXG4gICAgcm91dGVzOiBvcHRzLnJvdXRlc1xuICB9IGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEluaXRNb2R1bGUobW9kdWxlOiBhbnksIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSB8IHVuZGVmaW5lZCk6IFByb21pc2U8SU1vZHVsZUluaXRpYWxpemVyPiB7XG4gIGNvbnN0IGluaXRvYmogPSAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcbiAgcmV0dXJuIGluaXRvYmouaW5pdChNZW51SGVscGVyLkluc3RhbmNlLCBzdG9yZSwgY29uZmlndXJhdGlvbiB8fCB7fSxcbiAgICB7XG4gICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UsXG4gICAgICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UsXG4gICAgICBwcm9qZWN0b3I6IFByb2plY3Rvci5JbnN0YW5jZSxcbiAgICAgIHNjcmVlbnM6IFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gaW5pdG9iaiBhcyB1bmtub3duIGFzIElNb2R1bGVJbml0aWFsaXplcjtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ01vZHVsZShtb2R1bGU6IGFueSwgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLmNvbmZpZyhNZW51SGVscGVyLkluc3RhbmNlLCBzdG9yZSk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFJ1bk1vZHVsZShtb2R1bGU6IGFueSwgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLnJ1bihNZW51SGVscGVyLkluc3RhbmNlLCBzdG9yZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNb2R1bGVSb3V0ZXMobW9kdWxlOiBhbnkpOiBJUm91dGVDb25maWdbXSB7XG4gIGNvbnN0IGluaXRvYmogPSAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcbiAgcmV0dXJuIGluaXRvYmoucm91dGVzO1xufVxuXG5leHBvcnQge1xuICBNZW51SGVscGVyLFxuICB0eXBlIElNZW51RGVmaW5pdGlvbixcbiAgbWVudVR5cGUsXG4gIENvbW1vblJlZ2lzdHJ5LFxuICBNZXNzYWdlU2VydmljZSBhcyBNZXNzYWdlU2VydmljZSxcbiAgSW5qZWN0LFxuICBTY3JlZW4sXG4gIFZhbGlkYXRlRGlyZWN0aXZlLFxuICB0eXBlIFByb2plY3RhYmxlLFxuICB0eXBlIElQcm9qZWN0YWJsZU1vZGVsLFxuICBNZW51Tm90aWZpY2F0aW9ucyxcbiAgUHJvamVjdG9yLFxufVxuXG5jb25zdCBWdWVNZk1vZHVsZSA9IHtcbiAgaW5zdGFsbCxcbiAgTWVudUhlbHBlcjogbmV3IE1lbnVIZWxwZXIoKSxcbiAgbWVudVR5cGUsXG4gIENvbW1vblJlZ2lzdHJ5OiBuZXcgQ29tbW9uUmVnaXN0cnkoKSxcbiAgTWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxuICBJbmplY3QsXG4gIFNjcmVlbixcbiAgVmFsaWRhdGVEaXJlY3RpdmUsXG4gIE1lbnVOb3RpZmljYXRpb25zLFxuICBQcm9qZWN0b3Jcbn1cblxuZXhwb3J0IGRlZmF1bHQgVnVlTWZNb2R1bGU7XG4iXSwibmFtZXMiOlsiRSIsIm5hbWUiLCJjYWxsYmFjayIsImN0eCIsImUiLCJzZWxmIiwibGlzdGVuZXIiLCJkYXRhIiwiZXZ0QXJyIiwiaSIsImxlbiIsImV2dHMiLCJsaXZlRXZlbnRzIiwidGlueUVtaXR0ZXJNb2R1bGUiLCJUaW55RW1pdHRlciIsInRpbnlFbWl0dGVyIiwibWVudVR5cGUiLCJtZW51VHlwZTIiLCJNZW51Tm90aWZpY2F0aW9ucyIsIl9NZW51SGVscGVyIiwiX19wdWJsaWNGaWVsZCIsIm1lbnVEZWZpbml0aW9uIiwicG9zaXRpb25zIiwiZm91bmQiLCJtIiwiZWxlbWVudCIsIm1lbnUiLCJyZXN1bHQiLCJ1c2VkIiwia2V5IiwicnIiLCJhIiwiYiIsIk1lbnVIZWxwZXIiLCJfQ29tbW9uUmVnaXN0cnkiLCJ2IiwiY29tcG9uZW50IiwiZ3JvdXAiLCJnZyIsImciLCJzZXJ2aWNlIiwiQ29tbW9uUmVnaXN0cnkiLCJhc2tSZXBseUNoYW5uZWxzIiwic2VuZFN1YnNjcmliZUNoYW5uZWxzIiwic2VuZFN1YnNjcmliZUNhbGxiYWNrcyIsImFzayIsImFyZ3MiLCJyZXNvbHZlIiwicmVqZWN0IiwidGltZW91dCIsImFza1BvcnQiLCJfYSIsInJlcGx5Q2hhbm5lbCIsImwiLCJldnQiLCJyZXBseSIsImNiIiwib3B0cyIsImFza2luZ1BvcnQiLCJjIiwicmVwbHlQb3J0IiwiciIsInNlbmQiLCJwb3J0Iiwic3Vic2NyaWJlIiwib25jZSIsInVuc3Vic2NyaWJlIiwiTWVzc2FnZVNlcnZpY2UiLCJfc2ZjX21haW4kMSIsImRlZmluZUNvbXBvbmVudCIsInByb3BzIiwiZW1pdCIsIlZhbHVlIiwiY29tcHV0ZWQiLCJDb21wb25lbnRzIiwiY2xpY2siLCJzYXZlIiwiX1Byb2plY3RvciIsInNjcmVlbiIsInF1ZXVlIiwiYXN5bmMiLCJtb2RlbCIsInByb21pc2UiLCJzcyIsIl9zY3JlZW4iLCJzIiwiUHJvamVjdG9yIiwiX3NmY19tYWluIiwiZXhwb3NlIiwibWUiLCJnZXRDdXJyZW50SW5zdGFuY2UiLCJjdXJyZW50VmlldyIsInJlZiIsImlzVmlzaWJsZSIsImN1cnJlbnRWaWV3VUlEIiwib25Nb3VudGVkIiwicHJvamVjdFRvRGlyZWN0aXZlIiwiZWwiLCJiaW5kIiwiU2NyZWVuc01hbmFnZXIiLCJzY3JlZW5EaXJlY3RpdmUiLCJiaW5kaW5nIiwiZGlyZWN0aXZlcyIsIl9TY3JlZW5zTWFuYWdlciIsImRvbUVsZW1lbnQiLCJjaGVja0lucHV0VmFsaWRhdGlvbiIsImNhbGxvdXQiLCJlcnJvcnMiLCJ2YWxpZGF0ZSIsImFyZyIsImluc3RhbGwiLCJWdWUiLCJTY3JlZW4iLCJJbmplY3QiLCJWYWxpZGF0ZURpcmVjdGl2ZSIsIk1vZHVsZUluaXRpYWxpemVyIiwibW9kdWxlQ29uZmlnIiwic3RvcmUiLCJjb25maWd1cmF0aW9uIiwib3B0aW9ucyIsIlZ1ZU1mTW9kdWxlIiwiSW5pdE1vZHVsZSIsIm1vZHVsZSIsImluaXRvYmoiLCJDb25maWdNb2R1bGUiLCJSdW5Nb2R1bGUiLCJNb2R1bGVSb3V0ZXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsU0FBU0EsSUFBSztBQUdkO0FBRUFBLEVBQUUsWUFBWTtBQUFBLEVBQ1osSUFBSSxTQUFVQyxHQUFNQyxHQUFVQyxHQUFLO0FBQ2pDLFFBQUlDLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxDQUFBO0FBRTVCLFlBQUNBLEVBQUVILE9BQVVHLEVBQUVILEtBQVEsQ0FBQSxJQUFLLEtBQUs7QUFBQSxNQUMvQixJQUFJQztBQUFBLE1BQ0osS0FBS0M7QUFBQSxJQUNYLENBQUssR0FFTTtBQUFBLEVBQ1I7QUFBQSxFQUVELE1BQU0sU0FBVUYsR0FBTUMsR0FBVUMsR0FBSztBQUNuQyxRQUFJRSxJQUFPO0FBQ1gsYUFBU0MsSUFBWTtBQUNu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
