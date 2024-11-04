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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLW1mLW1vZHVsZS5lcy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qcyIsIi4uL3NyYy9oZWxwZXJzL01lbnVIZWxwZXIudHMiLCIuLi9zcmMvaGVscGVycy9Db21tb25SZWdpc3RyeS50cyIsIi4uL3NyYy9oZWxwZXJzL01lc3NhZ2VTZXJ2aWNlLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW5qZWN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZy50cyIsIi4uL3NyYy9oZWxwZXJzL1Byb2plY3Rvci50cyIsIi4uL3NyYy9jb21wb25lbnRzL3NjcmVlbi52dWU/dnVlJnR5cGU9c2NyaXB0JmxhbmcudHMiLCIuLi9zcmMvZGlyZWN0aXZlcy9zY3JlZW4udHMiLCIuLi9zcmMvZGlyZWN0aXZlcy92YWxpZGF0ZS50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBFICgpIHtcbiAgLy8gS2VlcCB0aGlzIGVtcHR5IHNvIGl0J3MgZWFzaWVyIHRvIGluaGVyaXQgZnJvbVxuICAvLyAodmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9saXBzbWFjayBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvaXNzdWVzLzMpXG59XG5cbkUucHJvdG90eXBlID0ge1xuICBvbjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuXG4gICAgKGVbbmFtZV0gfHwgKGVbbmFtZV0gPSBbXSkpLnB1c2goe1xuICAgICAgZm46IGNhbGxiYWNrLFxuICAgICAgY3R4OiBjdHhcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9uY2U6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIuXyA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRTtcbm1vZHVsZS5leHBvcnRzLlRpbnlFbWl0dGVyID0gRTtcbiIsImltcG9ydCB7IFRpbnlFbWl0dGVyIH0gZnJvbSAndGlueS1lbWl0dGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWVudURlZmluaXRpb24ge1xuICBuYW1lOiBzdHJpbmcsXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gIGljb24/OiBzdHJpbmcsXG4gIHJvdXRlTmFtZT86IHN0cmluZyxcbiAgcm91dGVQYXJhbXM/OiBvYmplY3QsXG4gIGZlYXR1cmVmbGFncz86IHN0cmluZ1tdLFxuICBvcmRlckluZGV4PzogbnVtYmVyLFxuICBjbGFzcz86IHN0cmluZyxcbiAgaGlkZGVuOiAoKSA9PiBib29sZWFuXG59XG5cblxuZXhwb3J0IGVudW0gbWVudVR5cGUge1xuICBkcmF3ZXIsICAgICAgIC8vIERyYXdlciBNZW51XG4gIGJvdHRvbSwgICAgICAgLy8gQm90dG9tIE1lbnVcbiAgaGVhZGVyXG59XG5cbmV4cG9ydCBjb25zdCBNZW51Tm90aWZpY2F0aW9ucyA9IHtcbiAgbWVudURlZmluaXRpb25BZGRlZDogJ25ld21lbnVpdGVtJ1xufVxuXG5leHBvcnQgY2xhc3MgTWVudUhlbHBlciB7XG5cbiAgcHJpdmF0ZSBtZW51RGVmaW5pdGlvbnM6IElNZW51RGVmaW5pdGlvbltdID0gW107XG4gIHByaXZhdGUgbWVudVN0cnVjdHVyZTogeyBba2V5OiBzdHJpbmddOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0gfSA9IHt9XG4gIHByaXZhdGUgbm90aWZpY2F0aW9uczogVGlueUVtaXR0ZXIgPSBuZXcgVGlueUVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgTWVudUhlbHBlcigpO1xuICBwdWJsaWMgZ2V0IE5vdGlmaWNhdGlvbnMoKSB7IHJldHVybiB0aGlzLm5vdGlmaWNhdGlvbnM7IH1cbiAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7IHJldHVybiBNZW51SGVscGVyLmluc3RhbmNlIH1cblxuICBwdWJsaWMgYWRkTWVudURlZmluaXRpb24obWVudURlZmluaXRpb246IElNZW51RGVmaW5pdGlvbiwgLi4ucG9zaXRpb25zOiB7IHNlY3Rpb246IG1lbnVUeXBlLCBwYXJlbnQ/OiBzdHJpbmcgfVtdKSB7XG5cbiAgICAvLyBBZ2dpdW5nbyBsYSBkaWNoaWFyYXppb25lIGRlbCBtZW51w7kgYWxsJ2VsZW5jbyBkZWkgbWVuw7kgZGlzcG9uaWJpbGkuXG4gICAgbGV0IGZvdW5kID0gdGhpcy5tZW51RGVmaW5pdGlvbnMuZmluZChtID0+IG0ubmFtZSA9PSBtZW51RGVmaW5pdGlvbi5uYW1lKTtcbiAgICBpZiAoIWZvdW5kKVxuICAgICAgdGhpcy5tZW51RGVmaW5pdGlvbnMucHVzaChtZW51RGVmaW5pdGlvbik7XG4gICAgZWxzZVxuICAgICAgbWVudURlZmluaXRpb24gPSBmb3VuZDtcblxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBwb3NpdGlvbnMpIHtcblxuICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl0gPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXSB8fCB7fTtcbiAgICAgIHRoaXMubWVudVN0cnVjdHVyZVtlbGVtZW50LnNlY3Rpb25dW2VsZW1lbnQucGFyZW50IHx8IG1lbnVEZWZpbml0aW9uLm5hbWVdID0gdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnQgfHwgbWVudURlZmluaXRpb24ubmFtZV0gfHwgW107XG5cbiAgICAgIGlmIChlbGVtZW50LnBhcmVudClcbiAgICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnRdLnB1c2gobWVudURlZmluaXRpb24ubmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5ub3RpZmljYXRpb25zLmVtaXQoTWVudU5vdGlmaWNhdGlvbnMubWVudURlZmluaXRpb25BZGRlZCwgbWVudURlZmluaXRpb24pO1xuICB9XG5cbiAgcHVibGljIGdldE1lbnVJdGVtKG5hbWU6IHN0cmluZyk6IElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMubWVudURlZmluaXRpb25zLmZpbmQoaSA9PiBpLm5hbWUgPT0gbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWVudShtZW51OiBtZW51VHlwZSk6IHsgaXRlbTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkLCBjaGlsZHJlbjogKElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZClbXSB9W10ge1xuICAgIGxldCByZXN1bHQ6IHsgaXRlbTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkLCBjaGlsZHJlbjogKElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZClbXSB9W10gPSBbXTtcbiAgICBsZXQgdXNlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5tZW51U3RydWN0dXJlW21lbnVdKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5tZW51U3RydWN0dXJlW21lbnVdW2tleV07XG5cblxuICAgICAgbGV0IHJyID0ge1xuICAgICAgICBpdGVtOiB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4ge1xuICAgICAgICAgIHJldHVybiBtLm5hbWUgPT0ga2V5ICYmXG4gICAgICAgICAgICAoIW0uaGlkZGVuIHx8ICFtLmhpZGRlbigpKVxuICAgICAgICB9KSxcblxuICAgICAgICBjaGlsZHJlbjogZWxlbWVudC5tYXAoaSA9PiB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4gbS5uYW1lID09IGkgJiYgKCFtLmhpZGRlbiB8fCAhbS5oaWRkZW4oKSkpKVxuICAgICAgICAgIC5maWx0ZXIoaSA9PiAhIWkpXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChhICYmIGIgJiYgYS5vcmRlckluZGV4ICYmIGIub3JkZXJJbmRleCAmJiBhLm9yZGVySW5kZXggPiBiLm9yZGVySW5kZXgpIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKGEgJiYgYiAmJiBhLm9yZGVySW5kZXggJiYgYi5vcmRlckluZGV4ICYmIGEub3JkZXJJbmRleCA8IGIub3JkZXJJbmRleCkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICB9KVxuICAgICAgfTtcblxuICAgICAgaWYgKCEhcnIuaXRlbSkge1xuICAgICAgICB1c2VkLmFkZChrZXkpO1xuICAgICAgICBlbGVtZW50LmZvckVhY2goaSA9PiB1c2VkLmFkZChpKSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5maWx0ZXIoaSA9PiAhIWkuaXRlbSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhICYmIGIgJiYgYS5pdGVtICYmIGIuaXRlbSAmJiBhLml0ZW0ub3JkZXJJbmRleCAmJiBiLml0ZW0ub3JkZXJJbmRleCAmJiBhLml0ZW0ub3JkZXJJbmRleCA+IGIuaXRlbS5vcmRlckluZGV4KSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEgJiYgYiAmJiBhLml0ZW0gJiYgYi5pdGVtICYmIGEuaXRlbS5vcmRlckluZGV4ICYmIGIuaXRlbS5vcmRlckluZGV4ICYmIGEuaXRlbS5vcmRlckluZGV4IDwgYi5pdGVtLm9yZGVySW5kZXgpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH0pO1xuICB9XG59XG5cbiIsIlxuZXhwb3J0IGNsYXNzIENvbW1vblJlZ2lzdHJ5IHtcblxuICBwcml2YXRlIHJlZ2lzdHJ5ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgcHJpdmF0ZSBncm91cGVkcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgYW55Pj4oKTtcbiAgcHJpdmF0ZSBzZXJ2aWNlcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICBwcml2YXRlIGdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgYW55Pj4oKTtcblxuXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb21tb25SZWdpc3RyeSA9IG5ldyBDb21tb25SZWdpc3RyeSgpO1xuICBzdGF0aWMgZ2V0IEluc3RhbmNlKCkgeyByZXR1cm4gdGhpcy5pbnN0YW5jZTsgfVxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IENvbW1vblJlZ2lzdHJ5KSB7IHRoaXMuaW5zdGFuY2UgPSB2IH07XG5cbiAgcHJvdmlkZUNvbXBvbmVudChjb21wb25lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBncm91cD86IHN0cmluZykge1xuICAgIHRoaXMucmVnaXN0cnkuc2V0KGdyb3VwID8gYCR7Z3JvdXB9LSR7bmFtZX1gIDogbmFtZSwgY29tcG9uZW50KTtcbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIGlmICghdGhpcy5ncm91cGVkcmVnaXN0cnkuaGFzKGdyb3VwKSkgdGhpcy5ncm91cGVkcmVnaXN0cnkuc2V0KGdyb3VwLCBuZXcgTWFwPHN0cmluZywgYW55PigpKTtcblxuICAgICAgbGV0IGdnID0gdGhpcy5ncm91cGVkcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICAgIGlmIChnZykgZ2cuc2V0KG5hbWUsIGNvbXBvbmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29tcG9uZW50KG5hbWU6IHN0cmluZywgZ3JvdXA/OiBzdHJpbmcpOiBhbnkgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5nZXQoZ3JvdXAgPyBgJHtncm91cH0tJHtuYW1lfWAgOiBuYW1lKSB8fCBudWxsO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50cyguLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucmVnaXN0cnkuZW50cmllcygpKS5maWx0ZXIoaSA9PiBuYW1lLmluZGV4T2YoaVswXSkgPj0gMCkubWFwKGkgPT4gaVsxXSk7XG4gIH1cblxuICBnZXRHcm91cENvbXBvbmVudHMoZ3JvdXA6IHN0cmluZywgLi4ubmFtZTogc3RyaW5nW10pOiAoYW55KVtdIHtcbiAgICBsZXQgZyA9IHRoaXMuZ3JvdXBlZHJlZ2lzdHJ5LmdldChncm91cCk7XG4gICAgaWYgKGcpXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShnLmVudHJpZXMoKSB8fCBbXSkuZmlsdGVyKGkgPT4gKCFuYW1lIHx8IG5hbWUubGVuZ3RoID09IDApIHx8IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcbiAgICByZXR1cm4gW11cbiAgfVxuXG4gIGdldEdyb3VwQ29tcG9uZW50c0tleXMoZ3JvdXA6IHN0cmluZyk6IChzdHJpbmcpW10ge1xuICAgIGxldCBnID0gdGhpcy5ncm91cGVkcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICBpZiAoZykgcmV0dXJuIEFycmF5LmZyb20oZy5rZXlzKCkpO1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgcHJvdmlkZVNlcnZpY2UobmFtZTogc3RyaW5nLCBzZXJ2aWNlOiBhbnksIGdyb3VwPzogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXJ2aWNlcmVnaXN0cnkuc2V0KG5hbWUsIHNlcnZpY2UpO1xuICAgIGlmIChncm91cCkge1xuICAgICAgaWYgKCF0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuaGFzKGdyb3VwKSkgdGhpcy5ncm91cGVkc2VydmljZXJlZ2lzdHJ5LnNldChncm91cCwgbmV3IE1hcDxzdHJpbmcsIGFueT4oKSk7XG4gICAgICBsZXQgZ2cgPSB0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICAgIGlmIChnZykgZ2cuc2V0KG5hbWUsIHNlcnZpY2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldFNlcnZpY2U8VD4obmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICh0aGlzLnNlcnZpY2VyZWdpc3RyeS5nZXQobmFtZSkgfHwgbnVsbCkgYXMgVDtcbiAgfVxuXG4gIGdldEdyb3VwU2VydmljZXMoZ3JvdXA6IHN0cmluZywgLi4ubmFtZTogc3RyaW5nW10pOiAoYW55KVtdIHtcbiAgICBsZXQgZyA9IHRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgIGlmIChnKVxuICAgICAgcmV0dXJuIEFycmF5LmZyb20oZy5lbnRyaWVzKCkgfHwgW10pLmZpbHRlcihpID0+ICghbmFtZSB8fCBuYW1lLmxlbmd0aCA9PSAwKSB8fCBuYW1lLmluZGV4T2YoaVswXSkgPj0gMCkubWFwKGkgPT4gaVsxXSk7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn0iLCJjb25zdCBhc2tSZXBseUNoYW5uZWxzID0gbmV3IE1hcDxzdHJpbmcsIE1lc3NhZ2VDaGFubmVsPigpO1xuY29uc3Qgc2VuZFN1YnNjcmliZUNoYW5uZWxzID0gbmV3IE1hcDxzdHJpbmcsIE1lc3NhZ2VDaGFubmVsPigpO1xuY29uc3Qgc2VuZFN1YnNjcmliZUNhbGxiYWNrcyA9IG5ldyBNYXA8RnVuY3Rpb24sICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PigpO1xuXG5jb25zdCBhc2sgPSA8VD4obmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8VD4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgbGV0IHBvcnQgPSBhc2tSZXBseUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDFcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgIGFza1JlcGx5Q2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgICAgcG9ydCA9IGMucG9ydDFcbiAgICB9XG4gICAgbGV0IGlubmVyY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGNvbnN0IGwgPSAoZXZ0OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgIHJlc29sdmUoZXZ0LmRhdGEpO1xuICAgICAgaW5uZXJjaGFubmVsID0gbnVsbCE7XG4gICAgfVxuICAgIGlubmVyY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsO1xuICAgIHBvcnQucG9zdE1lc3NhZ2UoYXJncywgW2lubmVyY2hhbm5lbC5wb3J0Ml0pO1xuICB9KTtcbn1cblxuY29uc3QgcmVwbHkgPSAobmFtZTogc3RyaW5nLCBjYjogKC4uLmFyZ3M6IGFueVtdKSA9PiBQcm9taXNlPGFueT4gfCBhbnksIG9wdHM6IHsgZm9yY2U6IGJvb2xlYW4gfSA9IHsgZm9yY2U6IGZhbHNlIH0pID0+IHtcbiAgbGV0IHBvcnQgPSBhc2tSZXBseUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFwb3J0KSB7XG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGFza1JlcGx5Q2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQyXG4gIH1cbiAgaWYgKCFvcHRzLmZvcmNlICYmIHBvcnQub25tZXNzYWdlKSB0aHJvdyBcInJlcGx5IGFscmVhZHkgc2V0IGZvciBtZXNzYWdlIFwiICsgbmFtZVxuICBjb25zdCBsID0gYXN5bmMgKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgaW5uZXJwb3J0ID0gZXZ0LnBvcnRzWzBdXG4gICAgY29uc3QgciA9IGF3YWl0IGNiKC4uLmV2dC5kYXRhKTtcbiAgICBpbm5lcnBvcnQucG9zdE1lc3NhZ2Uocik7XG4gICAgaW5uZXJwb3J0LmNsb3NlKCk7XG4gIH1cbiAgcG9ydC5vbm1lc3NhZ2UgPSBsO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHBvcnQhLm9ubWVzc2FnZSA9IG51bGwhO1xuICB9XG59XG5cbmNvbnN0IHNlbmQgPSAobmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkgPT4ge1xuICBsZXQgcG9ydCA9IHNlbmRTdWJzY3JpYmVDaGFubmVscy5nZXQobmFtZSk/LnBvcnQxXG4gIGlmICghcG9ydCkge1xuICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQxXG4gIH1cbiAgcG9ydC5wb3N0TWVzc2FnZShhcmdzKTtcbn1cblxuY29uc3Qgc3Vic2NyaWJlID0gKG5hbWU6IHN0cmluZywgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiB7XG4gIGxldCBwb3J0ID0gc2VuZFN1YnNjcmliZUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFwb3J0KSB7XG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHNlbmRTdWJzY3JpYmVDaGFubmVscy5zZXQobmFtZSwgYyk7XG4gICAgcG9ydCA9IGMucG9ydDJcbiAgfVxuICBjb25zdCBsID0gKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY2IoLi4uZXZ0LmRhdGEpO1xuICB9XG4gIHNlbmRTdWJzY3JpYmVDYWxsYmFja3Muc2V0KGNiLCBsKTtcbiAgcG9ydC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBsKTtcbiAgcG9ydC5zdGFydCgpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHBvcnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGwpO1xuICAgIHNlbmRTdWJzY3JpYmVDYWxsYmFja3MuZGVsZXRlKGNiKTtcbiAgfVxufVxuXG5jb25zdCBvbmNlID0gKG5hbWU6IHN0cmluZywgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiB7XG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gc3Vic2NyaWJlKG5hbWUsICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNiKC4uLmFyZ3MpO1xuICAgIHVuc3Vic2NyaWJlKCk7XG4gIH0pO1xufVxuXG5jb25zdCB1bnN1YnNjcmliZSA9IChuYW1lOiBzdHJpbmcsIGNiOiAoLi4uYXJnczogYW55W10pID0+IGFueSkgPT4ge1xuICBsZXQgcG9ydCA9IHNlbmRTdWJzY3JpYmVDaGFubmVscy5nZXQobmFtZSk/LnBvcnQyXG4gIGlmICghcG9ydCkgcmV0dXJuO1xuICBjb25zdCBsID0gc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5nZXQoY2IpO1xuICBpZiAobCkge1xuICAgIHBvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgbCk7XG4gICAgc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5kZWxldGUoY2IpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIGFzayxcbiAgcmVwbHksXG4gIHNlbmQsXG4gIHN1YnNjcmliZSxcbiAgb25jZSxcbiAgdW5zdWJzY3JpYmVcbn1cblxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VTZXJ2aWNlID0ge1xuICBJbnN0YW5jZToge1xuICAgIGFzayxcbiAgICByZXBseSxcbiAgICBzZW5kLFxuICAgIHN1YnNjcmliZSxcbiAgICBvbmNlLFxuICAgIHVuc3Vic2NyaWJlXG4gIH1cbn0iLCJcbmltcG9ydCB7IGNvbXB1dGVkLCBkZWZpbmVDb21wb25lbnQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBDb21tb25SZWdpc3RyeSB9IGZyb20gXCIuLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiBcImluamVjdFwiLFxuICBwcm9wczoge1xuICAgIGlkOiB7IGRlZmF1bHQ6IG51bGwgfSxcbiAgICB0eXBlOiB7IGRlZmF1bHQ6IG51bGwsIHR5cGU6IFN0cmluZyB9LFxuICAgIHZhbHVlOiB7IGRlZmF1bHQ6IG51bGwgfSxcbiAgICBuYW1lOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogbnVsbCB9LFxuICAgIG5hbWVzOiB7IHR5cGU6IEFycmF5PHN0cmluZz4sIGRlZmF1bHQ6IG51bGwgfSxcbiAgICBncm91cDogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IG51bGwgfSxcbiAgICBtZXRhZGF0YTogeyB0eXBlOiBPYmplY3QsIGRlZmF1bHQ6IG51bGwgfSxcbiAgICBkaXNhYmxlZDogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgIHJlYWRvbmx5OiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH1cbiAgfSxcbiAgc2V0dXAocHJvcHMsIHsgZW1pdCB9KSB7XG5cblxuICAgIGNvbnN0IFZhbHVlID0gY29tcHV0ZWQoe1xuICAgICAgZ2V0OiAoKSA9PiB7IHJldHVybiBwcm9wcy52YWx1ZSB9LFxuICAgICAgc2V0OiAodikgPT4geyBlbWl0KFwiaW5wdXRcIiwgdik7IH1cbiAgICB9KVxuXG4gICAgY29uc3QgQ29tcG9uZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5uYW1lKVxuICAgICAgICByZXR1cm4gW0NvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLmdldENvbXBvbmVudChwcm9wcy5uYW1lLCBwcm9wcy5ncm91cCldO1xuICAgICAgaWYgKHByb3BzLmdyb3VwKVxuICAgICAgICByZXR1cm4gQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UuZ2V0R3JvdXBDb21wb25lbnRzKHByb3BzLmdyb3VwLCAuLi4ocHJvcHMubmFtZXMgfHwgW10pKTtcbiAgICAgIHJldHVybiBDb21tb25SZWdpc3RyeS5JbnN0YW5jZS5nZXRDb21wb25lbnRzKC4uLihwcm9wcy5uYW1lcyB8fCBbXSkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2xpY2sgPSAoLi4uYXJnczogYW55W10pID0+IHsgZW1pdCgnY2xpY2snLCAuLi5hcmdzKSB9XG4gICAgY29uc3Qgc2F2ZSA9ICguLi5hcmdzOiBhbnlbXSkgPT4geyBlbWl0KCdzYXZlJywgLi4uYXJncykgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBwcm9wcy5pZCxcbiAgICAgIHR5cGU6IHByb3BzLnR5cGUsXG4gICAgICB2YWx1ZTogcHJvcHMudmFsdWUsXG4gICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgbmFtZXM6IHByb3BzLm5hbWVzLFxuICAgICAgZ3JvdXA6IHByb3BzLmdyb3VwLFxuICAgICAgbWV0YWRhdGE6IHByb3BzLm1ldGFkYXRhLFxuICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkLFxuICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5LFxuICAgICAgY2xpY2ssXG4gICAgICBzYXZlLFxuICAgICAgQ29tcG9uZW50cyxcbiAgICAgIFZhbHVlLFxuICAgIH1cbiAgfVxuXG59KTtcblxuIiwiXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlIH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9qZWN0YWJsZU1vZGVsPFQ+IHtcbiAgZGF0YTogVDsgcmVzb2x2ZTogKGl0ZW06IFQpID0+IHZvaWQ7IHJlamVjdDogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3RvciB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlID0gbmV3IFByb2plY3RvcigpO1xuICBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IFByb2plY3RvciB7IHJldHVybiBQcm9qZWN0b3IuaW5zdGFuY2UgfVxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IFByb2plY3RvcikgeyB0aGlzLmluc3RhbmNlID0gdjsgfVxuXG4gIHByaXZhdGUgc2NyZWVucyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gIHByaXZhdGUgcHJvamVjdGluZyA9IG5ldyBNYXA8c3RyaW5nLCB7IGNvbXBvbmVudDogQ29tcG9uZW50LCBtb2RlbDogSVByb2plY3RhYmxlTW9kZWw8YW55PiwgcHJvbWlzZTogUHJvbWlzZTxhbnk+IHwgbnVsbCwgcXVldWU6IGJvb2xlYW4gfVtdPigpO1xuXG4gIHNldFNjcmVlbihzY3JlZW46IENvbXBvbmVudFB1YmxpY0luc3RhbmNlLCBuYW1lOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIikge1xuICAgIHRoaXMuc2NyZWVucy5zZXQobmFtZSwgc2NyZWVuKTtcbiAgfVxuXG5cblxuICBwcm9qZWN0VG88VD4oY29tcG9uZW50OiBDb21wb25lbnQsIGRhdGE6IFQgfCBudWxsID0gbnVsbCwgc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIiwgcXVldWU6IGJvb2xlYW4gPSB0cnVlLCBhc3luYzogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxUPiB8IG51bGwge1xuICAgIGNvbnN0IG1vZGVsID0geyBkYXRhIH0gYXMgSVByb2plY3RhYmxlTW9kZWw8VD47XG4gICAgY29uc3QgcHJvbWlzZSA9IGFzeW5jID8gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4geyBtb2RlbC5yZWplY3QgPSByZWplY3Q7IG1vZGVsLnJlc29sdmUgPSByZXNvbHZlIH0pIDogbnVsbDtcblxuICAgIGlmICghcXVldWUpIHtcblxuICAgICAgdGhpcy5wcm9qZWN0aW5nLnNldChzY3JlZW4sIFt7IGNvbXBvbmVudCwgbW9kZWwsIHByb21pc2UsIHF1ZXVlIH1dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnByb2plY3RpbmcuaGFzKHNjcmVlbikpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0aW5nLnNldChzY3JlZW4sIFtdKTtcbiAgICAgIH1cbiAgICAgICh0aGlzLnByb2plY3RpbmcuZ2V0KHNjcmVlbikgfHwgW10pLnB1c2goeyBjb21wb25lbnQsIG1vZGVsLCBwcm9taXNlLCBxdWV1ZSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBzcyA9IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKTtcbiAgICBpZiAoIXNzKSByZXR1cm4gbnVsbDtcbiAgICBzcy5tb2RlbCA9IG1vZGVsO1xuICAgIHNzLmN1cnJlbnRWaWV3ID0gY29tcG9uZW50O1xuXG4gICAgaWYgKHByb21pc2UpIHByb21pc2UudGhlbigoKSA9PiB0aGlzLnN0b3BQcm9qZWN0aW5nKHNjcmVlbikpLmNhdGNoKCgpID0+IHRoaXMuc3RvcFByb2plY3Rpbmcoc2NyZWVuKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBwcm9qZWN0QXN5bmNUbzxUPihjb21wb25lbnQ6IENvbXBvbmVudCwgZGF0YTogVCwgc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIiwgcXVldWU6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdFRvKGNvbXBvbmVudCwgZGF0YSwgc2NyZWVuLCBxdWV1ZSwgdHJ1ZSlcbiAgfVxuXG4gIHN0b3BQcm9qZWN0aW5nKHNjcmVlbjogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIpIHtcbiAgICBpZiAodGhpcy5wcm9qZWN0aW5nLmhhcyhzY3JlZW4pKSB7XG4gICAgICAodGhpcy5wcm9qZWN0aW5nLmdldChzY3JlZW4pIHx8IFtdKS5wb3AoKVxuICAgIH1cblxuICAgIGxldCBfc2NyZWVuID0gdGhpcy5zY3JlZW5zLmdldChzY3JlZW4pXG4gICAgaWYgKF9zY3JlZW4gJiYgX3NjcmVlbi5jdXJyZW50Vmlldykge1xuICAgICAgX3NjcmVlbi5tb2RlbCA9IG51bGw7XG4gICAgICBfc2NyZWVuLnNjcmVlbk1vZGVsID0gbnVsbDtcbiAgICAgIF9zY3JlZW4uY3VycmVudFZpZXcgPSBudWxsO1xuXG4gICAgICBpZiAodGhpcy5wcm9qZWN0aW5nLmhhcyhzY3JlZW4pKSB7XG4gICAgICAgIGxldCBzID0gdGhpcy5wcm9qZWN0aW5nLmdldChzY3JlZW4pO1xuICAgICAgICBpZiAocyAmJiBzLmxlbmd0aCkge1xuICAgICAgICAgIGxldCBtID0gcy5wb3AoKTtcbiAgICAgICAgICBpZiAobSkgdGhpcy5wcm9qZWN0VG8obS5jb21wb25lbnQsIG0ubW9kZWwsIHNjcmVlbiwgbS5xdWV1ZSwgISFtLnByb21pc2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0YWJsZTxUPiB7XG4gIHZhbHVlOiB7XG4gICAgZGF0YTogVCxcbiAgICByZXNvbHZlOiAoaXRlbTogVCkgPT4gdm9pZDtcbiAgICByZWplY3Q6ICgpID0+IHZvaWQ7XG4gIH07XG59IiwiXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlLCBjb21wdXRlZCwgZGVmaW5lQ29tcG9uZW50LCBnZXRDdXJyZW50SW5zdGFuY2UsIG9uTW91bnRlZCwgUmVmLCByZWYsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgSVByb2plY3RhYmxlTW9kZWwsIFByb2plY3RvciB9IGZyb20gXCIuLi9oZWxwZXJzL1Byb2plY3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiBcInNjcmVlblwiLFxuICBwcm9wczoge1xuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBcImRlZmF1bHRzY3JlZW5cIiB9LFxuICB9LFxuICBzZXR1cChwcm9wcywgeyBleHBvc2UgfSkge1xuXG4gICAgY29uc3QgbWUgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcblxuICAgIGNvbnN0IGN1cnJlbnRWaWV3OiBSZWY8Q29tcG9uZW50PiA9IHJlZihudWxsISk7XG4gICAgY29uc3QgbW9kZWw6IFJlZjxJUHJvamVjdGFibGVNb2RlbDxhbnk+IHwgbnVsbD4gPSByZWYobnVsbCEpO1xuXG4gICAgZXhwb3NlKHsgY3VycmVudFZpZXcsIG1vZGVsIH0pXG5cbiAgICBjb25zdCBpc1Zpc2libGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gY3VycmVudFZpZXcudmFsdWUgIT0gbnVsbDtcbiAgICB9KVxuXG4gICAgY29uc3QgY3VycmVudFZpZXdVSUQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gKGN1cnJlbnRWaWV3LnZhbHVlIGFzIGFueSk/Ll9fZmlsZVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgUHJvamVjdG9yLkluc3RhbmNlLnNldFNjcmVlbigobWUgYXMgYW55KS5wcm94eSwgcHJvcHMubmFtZSk7XG4gICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50Vmlld1VJRCxcbiAgICAgIGN1cnJlbnRWaWV3LFxuICAgICAgbW9kZWwsXG4gICAgICBpc1Zpc2libGVcbiAgICB9XG4gIH0sXG5cbn0pXG4iLCJjb25zdCBwcm9qZWN0VG9EaXJlY3RpdmUgPSB7XG5cbiAgaW5zZXJ0ZWQ6IChlbDogRWxlbWVudCwgYmluZDogYW55KSA9PiB7XG4gICAgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2UuaW5qZWN0VG8oZWwsIGJpbmQuYXJnKTtcbiAgfSxcbiAgdW5iaW5kOiAoZWw6IEVsZW1lbnQsIGJpbmQ6IGFueSkgPT4ge1xuICAgIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlLnJlbW92ZUZyb20oZWwsIGJpbmQuYXJnKVxuICB9XG59XG5cblxuY29uc3Qgc2NyZWVuRGlyZWN0aXZlID0ge1xuICBiaW5kOiAoZWw6IGFueSwgYmluZGluZzogYW55KSA9PiB7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlLnNldFNjcmVlbihlbCwgYmluZGluZy5hcmcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvamVjdFRvRGlyZWN0aXZlLCBzY3JlZW5EaXJlY3RpdmVcbn1cblxuZXhwb3J0IGNsYXNzIFNjcmVlbnNNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgU2NyZWVuc01hbmFnZXIoKTtcbiAgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBTY3JlZW5zTWFuYWdlciB7IHJldHVybiBTY3JlZW5zTWFuYWdlci5pbnN0YW5jZSB9XG4gIHN0YXRpYyBzZXQgSW5zdGFuY2UodjogU2NyZWVuc01hbmFnZXIpIHsgdGhpcy5pbnN0YW5jZSA9IHY7IH1cbiAgcHJpdmF0ZSBzY3JlZW5zID0gbmV3IE1hcDxzdHJpbmcsIEVsZW1lbnQ+KCk7XG4gIFxuXG4gIGluamVjdFRvKGRvbUVsZW1lbnQ6IEVsZW1lbnQsIHNjcmVlbjogc3RyaW5nKSB7XG4gICAgaWYgKCFkb21FbGVtZW50IHx8ICFzY3JlZW4pIHJldHVybjtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2NyZWVucy5oYXMoc2NyZWVuKSA/IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKSA6IG51bGw7XG4gICAgdHJ5IHsgZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGRvbUVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tRWxlbWVudCk7IH0gY2F0Y2ggeyB9XG4gICAgaWYgKGVsZW1lbnQpIGVsZW1lbnQuYXBwZW5kKGRvbUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlRnJvbShkb21FbGVtZW50OiBFbGVtZW50LCBzY3JlZW46IHN0cmluZykge1xuICAgIGlmICghZG9tRWxlbWVudCB8fCAhc2NyZWVuKSByZXR1cm47XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnNjcmVlbnMuaGFzKHNjcmVlbikgPyB0aGlzLnNjcmVlbnMuZ2V0KHNjcmVlbikgOiBudWxsO1xuICAgIHRyeSB7IGlmIChlbGVtZW50KSBlbGVtZW50LnJlbW92ZUNoaWxkKGRvbUVsZW1lbnQpIH0gY2F0Y2ggeyB9XG4gIH1cblxuICBzZXRTY3JlZW4oc2NyZWVuOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIikge1xuICAgIHRoaXMuc2NyZWVucy5zZXQobmFtZSwgc2NyZWVuKTtcbiAgfVxufSIsImZ1bmN0aW9uIGNoZWNrSW5wdXRWYWxpZGF0aW9uKGE6IEV2ZW50LCBjYWxsb3V0OiAoZXJyb3JzOiBzdHJpbmdbXSwgdmFsaWQ6IGJvb2xlYW4pID0+IHZvaWQpIHtcbiAgaWYgKChhLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWxpZGl0eSkge1xuICAgIGxldCBlbCA9IChhLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KTtcblxuICAgIGlmIChlbC52YWxpZGl0eSkge1xuICAgICAgbGV0IGVycm9ycyA9IFtcbiAgICAgICAgZWwudmFsaWRpdHkuYmFkSW5wdXQgPyBcImJhZCBpbnB1dFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkuY3VzdG9tRXJyb3IgPyBcImN1c3RvbSBlcnJvclwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkucGF0dGVybk1pc21hdGNoID8gXCJwYXR0ZXJuIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS5yYW5nZU92ZXJmbG93ID8gXCJyYW5nZSBvdmVyZmxvd1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkucmFuZ2VVbmRlcmZsb3cgPyBcInJhbmdlIHVuZGVyZmxvd1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkuc3RlcE1pc21hdGNoID8gXCJzdGVwIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS50b29Mb25nID8gXCJ0b28gbG9uZ1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudG9vU2hvcnQgPyBcInRvbyBzaG9ydFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudHlwZU1pc21hdGNoID8gXCJ0eXBlIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS52YWx1ZU1pc3NpbmcgPyBcInZhbHVlIG1pc3NpbmdcIiA6IG51bGxdLmZpbHRlcihpID0+ICEhaSlcblxuICAgICAgY2FsbG91dChlcnJvcnMgYXMgc3RyaW5nW10sIGVsLnZhbGlkaXR5LnZhbGlkICE9IHVuZGVmaW5lZCA/IGVsLnZhbGlkaXR5LnZhbGlkIDogdHJ1ZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZSA9IHtcbiAgaW5zZXJ0ZWQ6IChlbDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCwgYmluZDoge1xuICAgIHZhbHVlOiAoZXJyb3JzOiBzdHJpbmdbXSwgdmFsaWQ6IGJvb2xlYW4pID0+IHZvaWQsXG4gICAgYXJnOiBcImltbWVkaWF0ZVwiXG4gIH0pID0+IHtcbiAgICBpZiAoIWVsIHx8ICFlbC53aWxsVmFsaWRhdGUpIHJldHVybjtcbiAgICBzd2l0Y2ggKGVsLm5vZGVOYW1lKSB7XG4gICAgICBjYXNlIFwiSU5QVVRcIjpcbiAgICAgIGNhc2UgXCJURVhUQVJFQVwiOiBlbC5vbmJsdXIgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpOyBicmVhaztcbiAgICAgIGNhc2UgXCJTRUxFQ1RcIjogZWwub25jaGFuZ2UgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpOyBicmVhaztcbiAgICB9XG5cbiAgICBlbC5vbmludmFsaWQgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpO1xuICAgIGlmIChlbC5mb3JtKSBlbC5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2ludmFsaWQnLCAoKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbih7IHRhcmdldDogZWwgfSBhcyBhbnksIGJpbmQudmFsdWUpKVxuXG4gICAgaWYgKGJpbmQuYXJnID09IFwiaW1tZWRpYXRlXCIpIGVsLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgZWxzZSBjaGVja0lucHV0VmFsaWRhdGlvbih7IHRhcmdldDogZWwgfSBhcyBhbnksIGJpbmQudmFsdWUpXG4gIH0sXG4gIHVuYmluZDogKGVsOiBFbGVtZW50KSA9PiB7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuXG4gIH0sXG59XG4iLCJpbXBvcnQgeyBNZW51SGVscGVyLCBtZW51VHlwZSwgTWVudU5vdGlmaWNhdGlvbnMsIElNZW51RGVmaW5pdGlvbiB9IGZyb20gXCIuL2hlbHBlcnMvTWVudUhlbHBlclwiO1xuaW1wb3J0IHsgQ29tbW9uUmVnaXN0cnkgfSBmcm9tIFwiLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gXCIuL2hlbHBlcnMvTWVzc2FnZVNlcnZpY2VcIjtcbmltcG9ydCB7IElSb3V0ZUNvbmZpZyB9IGZyb20gXCIuL2ludGVyZmFjZXMvUm91dGVySW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgSVN0b3JlIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9TdG9yZUludGVyZmFjZXNcIjtcbmltcG9ydCBJbmplY3QgZnJvbSBcIi4vY29tcG9uZW50cy9pbmplY3QudnVlXCI7XG5pbXBvcnQgU2NyZWVuIGZyb20gXCIuL2NvbXBvbmVudHMvc2NyZWVuLnZ1ZVwiO1xuaW1wb3J0IHsgVnVlQ29uc3RydWN0b3IgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBJUHJvamVjdGFibGVNb2RlbCwgUHJvamVjdGFibGUsIFByb2plY3RvciB9IGZyb20gXCIuL2hlbHBlcnMvUHJvamVjdG9yXCI7XG5pbXBvcnQgZGlyZWN0aXZlcywgeyBTY3JlZW5zTWFuYWdlciB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvc2NyZWVuXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZSBhcyBWYWxpZGF0ZURpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvdmFsaWRhdGVcIjtcblxuXG5mdW5jdGlvbiBpbnN0YWxsKFZ1ZTogVnVlQ29uc3RydWN0b3IpIHtcbiAgVnVlLmNvbXBvbmVudChcInNjcmVlblwiLCBTY3JlZW4pO1xuICBWdWUuY29tcG9uZW50KFwiaW5qZWN0XCIsIEluamVjdCk7XG4gIFZ1ZS5kaXJlY3RpdmUoXCJzY3JlZW5cIiwgZGlyZWN0aXZlcy5zY3JlZW5EaXJlY3RpdmUpO1xuICBWdWUuZGlyZWN0aXZlKFwicHJvamVjdFRvXCIsIGRpcmVjdGl2ZXMucHJvamVjdFRvRGlyZWN0aXZlKTtcbiAgVnVlLmRpcmVjdGl2ZShcInZhbGlkYXRlXCIsIFZhbGlkYXRlRGlyZWN0aXZlIGFzIGFueSk7XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJTW9kdWxlSW5pdGlhbGl6ZXIge1xuICBpbml0KHZ1ZW1mOiB0eXBlb2YgVnVlTWZNb2R1bGUsIG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSk6IFByb21pc2U8dm9pZD4sXG5cbiAgY29uZmlnPyhtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkpOiBQcm9taXNlPHZvaWQ+LFxuXG4gIHJ1bj8obWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55KTogUHJvbWlzZTx2b2lkPixcblxuICByb3V0ZXM6IElSb3V0ZUNvbmZpZ1tdXG59XG5cbmludGVyZmFjZSBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyIHtcbiAgaW5pdChtZW51OiBNZW51SGVscGVyLFxuICAgIHN0b3JlOiBJU3RvcmUsXG4gICAgY29uZmlndXJhdGlvbjogYW55XG4gICAgLCBvcHRpb25zOiB7XG4gICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnksXG4gICAgICBtZXNzYWdlU2VydmljZTogdHlwZW9mIE1lc3NhZ2VTZXJ2aWNlLkluc3RhbmNlLFxuICAgICAgcHJvamVjdG9yOiBQcm9qZWN0b3IsXG4gICAgICBzY3JlZW5zOiBTY3JlZW5zTWFuYWdlclxuICAgIH0pOiBQcm9taXNlPHZvaWQ+LFxuICBjb25maWcobWVudTogTWVudUhlbHBlcixcbiAgICBzdG9yZTogSVN0b3JlKTogUHJvbWlzZTx2b2lkPixcbiAgcnVuKG1lbnU6IE1lbnVIZWxwZXIsXG4gICAgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4sXG4gIHJvdXRlczogSVJvdXRlQ29uZmlnW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1vZHVsZUluaXRpYWxpemVyKG9wdHM6IElNb2R1bGVJbml0aWFsaXplcikge1xuICBsZXQgbW9kdWxlQ29uZmlnID0ge307XG4gIHJldHVybiB7XG4gICAgaW5pdChtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnksXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHJlZ2lzdHJ5OiBDb21tb25SZWdpc3RyeSxcbiAgICAgICAgbWVzc2FnZVNlcnZpY2U6IHR5cGVvZiBNZXNzYWdlU2VydmljZS5JbnN0YW5jZSxcbiAgICAgICAgcHJvamVjdG9yOiBQcm9qZWN0b3IsXG4gICAgICAgIHNjcmVlbnM6IFNjcmVlbnNNYW5hZ2VyXG4gICAgICB9KSB7XG5cbiAgICAgIGlmIChvcHRpb25zLnJlZ2lzdHJ5KSBDb21tb25SZWdpc3RyeS5JbnN0YW5jZSA9IG9wdGlvbnMucmVnaXN0cnk7XG4gICAgICBpZiAob3B0aW9ucy5tZXNzYWdlU2VydmljZSkgTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UgPSBvcHRpb25zLm1lc3NhZ2VTZXJ2aWNlXG4gICAgICBpZiAob3B0aW9ucy5wcm9qZWN0b3IpIFByb2plY3Rvci5JbnN0YW5jZSA9IG9wdGlvbnMucHJvamVjdG9yO1xuICAgICAgaWYgKG9wdGlvbnMuc2NyZWVucykgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2UgPSBvcHRpb25zLnNjcmVlbnM7XG4gICAgICBtb2R1bGVDb25maWcgPSBjb25maWd1cmF0aW9uO1xuICAgICAgcmV0dXJuIG9wdHMuaW5pdChWdWVNZk1vZHVsZSwgbWVudSwgc3RvcmUsIGNvbmZpZ3VyYXRpb24pO1xuICAgIH0sXG4gICAgY29uZmlnKG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUpIHtcbiAgICAgIHJldHVybiBvcHRzLmNvbmZpZyA/IG9wdHMuY29uZmlnKG1lbnUsIHN0b3JlLCBtb2R1bGVDb25maWcpIDogbnVsbDtcbiAgICB9LFxuICAgIHJ1bihtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlKSB7XG4gICAgICByZXR1cm4gb3B0cy5ydW4gPyBvcHRzLnJ1bihtZW51LCBzdG9yZSwgbW9kdWxlQ29uZmlnKSA6IG51bGw7XG4gICAgfSxcbiAgICByb3V0ZXM6IG9wdHMucm91dGVzXG4gIH0gYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gSW5pdE1vZHVsZShtb2R1bGU6IGFueSwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55IHwgdW5kZWZpbmVkKTogUHJvbWlzZTxJTW9kdWxlSW5pdGlhbGl6ZXI+IHtcbiAgY29uc3QgaW5pdG9iaiA9IChtb2R1bGUuZGVmYXVsdC5kZWZhdWx0IHx8IG1vZHVsZS5kZWZhdWx0KSBhcyBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyO1xuICByZXR1cm4gaW5pdG9iai5pbml0KE1lbnVIZWxwZXIuSW5zdGFuY2UsIHN0b3JlLCBjb25maWd1cmF0aW9uIHx8IHt9LFxuICAgIHtcbiAgICAgIHJlZ2lzdHJ5OiBDb21tb25SZWdpc3RyeS5JbnN0YW5jZSxcbiAgICAgIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZS5JbnN0YW5jZSxcbiAgICAgIHByb2plY3RvcjogUHJvamVjdG9yLkluc3RhbmNlLFxuICAgICAgc2NyZWVuczogU2NyZWVuc01hbmFnZXIuSW5zdGFuY2VcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiBpbml0b2JqIGFzIHVua25vd24gYXMgSU1vZHVsZUluaXRpYWxpemVyO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29uZmlnTW9kdWxlKG1vZHVsZTogYW55LCBzdG9yZTogSVN0b3JlKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGluaXRvYmogPSAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcbiAgcmV0dXJuIGluaXRvYmouY29uZmlnKE1lbnVIZWxwZXIuSW5zdGFuY2UsIHN0b3JlKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gUnVuTW9kdWxlKG1vZHVsZTogYW55LCBzdG9yZTogSVN0b3JlKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGluaXRvYmogPSAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcbiAgcmV0dXJuIGluaXRvYmoucnVuKE1lbnVIZWxwZXIuSW5zdGFuY2UsIHN0b3JlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1vZHVsZVJvdXRlcyhtb2R1bGU6IGFueSk6IElSb3V0ZUNvbmZpZ1tdIHtcbiAgY29uc3QgaW5pdG9iaiA9IChtb2R1bGUuZGVmYXVsdC5kZWZhdWx0IHx8IG1vZHVsZS5kZWZhdWx0KSBhcyBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyO1xuICByZXR1cm4gaW5pdG9iai5yb3V0ZXM7XG59XG5cbmV4cG9ydCB7XG4gIE1lbnVIZWxwZXIsXG4gIHR5cGUgSU1lbnVEZWZpbml0aW9uLFxuICBtZW51VHlwZSxcbiAgQ29tbW9uUmVnaXN0cnksXG4gIE1lc3NhZ2VTZXJ2aWNlLFxuICBJbmplY3QsXG4gIFNjcmVlbixcbiAgVmFsaWRhdGVEaXJlY3RpdmUsXG4gIHR5cGUgUHJvamVjdGFibGUsXG4gIHR5cGUgSVByb2plY3RhYmxlTW9kZWwsXG4gIE1lbnVOb3RpZmljYXRpb25zLFxuICBQcm9qZWN0b3IsXG59XG5cbmNvbnN0IFZ1ZU1mTW9kdWxlID0ge1xuICBpbnN0YWxsLFxuICBNZW51SGVscGVyOiBuZXcgTWVudUhlbHBlcigpLFxuICBtZW51VHlwZSxcbiAgQ29tbW9uUmVnaXN0cnk6IG5ldyBDb21tb25SZWdpc3RyeSgpLFxuICBNZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXG4gIEluamVjdCxcbiAgU2NyZWVuLFxuICBWYWxpZGF0ZURpcmVjdGl2ZSxcbiAgTWVudU5vdGlmaWNhdGlvbnMsXG4gIFByb2plY3RvclxufVxuXG5leHBvcnQgZGVmYXVsdCBWdWVNZk1vZHVsZTtcbiJdLCJuYW1lcyI6WyJFIiwibmFtZSIsImNhbGxiYWNrIiwiY3R4IiwiZSIsInNlbGYiLCJsaXN0ZW5lciIsImRhdGEiLCJldnRBcnIiLCJpIiwibGVuIiwiZXZ0cyIsImxpdmVFdmVudHMiLCJ0aW55RW1pdHRlck1vZHVsZSIsIlRpbnlFbWl0dGVyIiwidGlueUVtaXR0ZXIiLCJtZW51VHlwZSIsIm1lbnVUeXBlMiIsIk1lbnVOb3RpZmljYXRpb25zIiwiX01lbnVIZWxwZXIiLCJfX3B1YmxpY0ZpZWxkIiwibWVudURlZmluaXRpb24iLCJwb3NpdGlvbnMiLCJmb3VuZCIsIm0iLCJlbGVtZW50IiwibWVudSIsInJlc3VsdCIsInVzZWQiLCJrZXkiLCJyciIsImIiLCJhIiwiTWVudUhlbHBlciIsIl9Db21tb25SZWdpc3RyeSIsInYiLCJjb21wb25lbnQiLCJncm91cCIsImdnIiwiZyIsInNlcnZpY2UiLCJDb21tb25SZWdpc3RyeSIsImFza1JlcGx5Q2hhbm5lbHMiLCJzZW5kU3Vic2NyaWJlQ2hhbm5lbHMiLCJzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzIiwiYXNrIiwiYXJncyIsInJlc29sdmUiLCJwb3J0IiwiX2EiLCJjIiwiaW5uZXJjaGFubmVsIiwibCIsImV2dCIsInJlcGx5IiwiY2IiLCJvcHRzIiwiaW5uZXJwb3J0IiwiciIsInNlbmQiLCJzdWJzY3JpYmUiLCJvbmNlIiwidW5zdWJzY3JpYmUiLCJNZXNzYWdlU2VydmljZSIsIl9zZmNfbWFpbiQxIiwiZGVmaW5lQ29tcG9uZW50IiwicHJvcHMiLCJlbWl0IiwiVmFsdWUiLCJjb21wdXRlZCIsIkNvbXBvbmVudHMiLCJjbGljayIsInNhdmUiLCJfUHJvamVjdG9yIiwic2NyZWVuIiwicXVldWUiLCJhc3luYyIsIm1vZGVsIiwicHJvbWlzZSIsInJlamVjdCIsInNzIiwiX3NjcmVlbiIsInMiLCJQcm9qZWN0b3IiLCJfc2ZjX21haW4iLCJleHBvc2UiLCJtZSIsImdldEN1cnJlbnRJbnN0YW5jZSIsImN1cnJlbnRWaWV3IiwicmVmIiwiaXNWaXNpYmxlIiwiY3VycmVudFZpZXdVSUQiLCJvbk1vdW50ZWQiLCJwcm9qZWN0VG9EaXJlY3RpdmUiLCJlbCIsImJpbmQiLCJTY3JlZW5zTWFuYWdlciIsInNjcmVlbkRpcmVjdGl2ZSIsImJpbmRpbmciLCJkaXJlY3RpdmVzIiwiX1NjcmVlbnNNYW5hZ2VyIiwiZG9tRWxlbWVudCIsImNoZWNrSW5wdXRWYWxpZGF0aW9uIiwiY2FsbG91dCIsImVycm9ycyIsInZhbGlkYXRlIiwiYXJnIiwiaW5zdGFsbCIsIlZ1ZSIsIlNjcmVlbiIsIkluamVjdCIsIlZhbGlkYXRlRGlyZWN0aXZlIiwiTW9kdWxlSW5pdGlhbGl6ZXIiLCJtb2R1bGVDb25maWciLCJzdG9yZSIsImNvbmZpZ3VyYXRpb24iLCJvcHRpb25zIiwiVnVlTWZNb2R1bGUiLCJJbml0TW9kdWxlIiwibW9kdWxlIiwiaW5pdG9iaiIsIkNvbmZpZ01vZHVsZSIsIlJ1bk1vZHVsZSIsIk1vZHVsZVJvdXRlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxTQUFTQSxJQUFLO0FBR2Q7QUFFQUEsRUFBRSxZQUFZO0FBQUEsRUFDWixJQUFJLFNBQVVDLEdBQU1DLEdBQVVDLEdBQUs7QUFDakMsUUFBSUMsSUFBSSxLQUFLLE1BQU0sS0FBSyxJQUFJLENBQUE7QUFFNUIsWUFBQ0EsRUFBRUgsT0FBVUcsRUFBRUgsS0FBUSxDQUFBLElBQUssS0FBSztBQUFBLE1BQy9CLElBQUlDO0FBQUEsTUFDSixLQUFLQztBQUFBLElBQ1gsQ0FBSyxHQUVNO0FBQUEsRUFDUjtBQUFBLEVBRUQsTUFBTSxTQUFVRixHQUFNQyxHQUFVQyxHQUFLO0FBQ25DLFFBQUlFLElBQU87QUFDWCxhQUFTQyxJQUFZO0FBQ25CLE1BQUFELEVBQUssSUFBSUos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
