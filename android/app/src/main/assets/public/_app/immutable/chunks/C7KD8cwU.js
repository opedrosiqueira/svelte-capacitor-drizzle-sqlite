import {
  X as T,
  Y as F,
  Z as G,
  _ as E,
  $ as z,
  I as P,
  a0 as h,
  a1 as m,
  a2 as N,
  g as H,
  a3 as M,
  a4 as V,
  i as W,
  B as x,
  p as X,
  S as J,
  U as Q,
  a5 as p,
  a6 as ee,
  o as te,
  n as U,
  a7 as C,
  A as Y,
  a8 as $,
  q as re,
  a9 as ne,
  aa as ae,
  K as j,
  ab as ie,
  ac as se,
  ad as fe,
  a as k,
  ae as ue,
  af as le,
  l as de,
  ag as oe,
  ah as ce,
  ai as ve,
  aj as _e
} from './nvPuU6Fe.js';
function w(i, c = null, g) {
  if (typeof i != 'object' || i === null || T in i) return i;
  const v = V(i);
  if (v !== F && v !== G) return i;
  var a = new Map(),
    o = W(i),
    l = E(0);
  o && a.set('length', E(i.length));
  var u;
  return new Proxy(i, {
    defineProperty(s, e, t) {
      (!('value' in t) || t.configurable === !1 || t.enumerable === !1 || t.writable === !1) && M();
      var n = a.get(e);
      return n === void 0 ? ((n = E(t.value)), a.set(e, n)) : m(n, w(t.value, u)), !0;
    },
    deleteProperty(s, e) {
      var t = a.get(e);
      if (t === void 0) e in s && a.set(e, E(h));
      else {
        if (o && typeof e == 'string') {
          var n = a.get('length'),
            r = Number(e);
          Number.isInteger(r) && r < n.v && m(n, r);
        }
        m(t, h), K(l);
      }
      return !0;
    },
    get(s, e, t) {
      var d;
      if (e === T) return i;
      var n = a.get(e),
        r = e in s;
      if ((n === void 0 && (!r || ((d = N(s, e)) != null && d.writable)) && ((n = E(w(r ? s[e] : h, u))), a.set(e, n)), n !== void 0)) {
        var f = P(n);
        return f === h ? void 0 : f;
      }
      return Reflect.get(s, e, t);
    },
    getOwnPropertyDescriptor(s, e) {
      var t = Reflect.getOwnPropertyDescriptor(s, e);
      if (t && 'value' in t) {
        var n = a.get(e);
        n && (t.value = P(n));
      } else if (t === void 0) {
        var r = a.get(e),
          f = r == null ? void 0 : r.v;
        if (r !== void 0 && f !== h) return { enumerable: !0, configurable: !0, value: f, writable: !0 };
      }
      return t;
    },
    has(s, e) {
      var f;
      if (e === T) return !0;
      var t = a.get(e),
        n = (t !== void 0 && t.v !== h) || Reflect.has(s, e);
      if (t !== void 0 || (H !== null && (!n || ((f = N(s, e)) != null && f.writable)))) {
        t === void 0 && ((t = E(n ? w(s[e], u) : h)), a.set(e, t));
        var r = P(t);
        if (r === h) return !1;
      }
      return n;
    },
    set(s, e, t, n) {
      var S;
      var r = a.get(e),
        f = e in s;
      if (o && e === 'length')
        for (var d = t; d < r.v; d += 1) {
          var b = a.get(d + '');
          b !== void 0 ? m(b, h) : d in s && ((b = E(h)), a.set(d + '', b));
        }
      r === void 0 ? (!f || ((S = N(s, e)) != null && S.writable)) && ((r = E(void 0)), m(r, w(t, u)), a.set(e, r)) : ((f = r.v !== h), m(r, w(t, u)));
      var y = Reflect.getOwnPropertyDescriptor(s, e);
      if ((y != null && y.set && y.set.call(n, t), !f)) {
        if (o && typeof e == 'string') {
          var I = a.get('length'),
            A = Number(e);
          Number.isInteger(A) && A >= I.v && m(I, A + 1);
        }
        K(l);
      }
      return !0;
    },
    ownKeys(s) {
      P(l);
      var e = Reflect.ownKeys(s).filter((r) => {
        var f = a.get(r);
        return f === void 0 || f.v !== h;
      });
      for (var [t, n] of a) n.v !== h && !(t in s) && e.push(t);
      return e;
    },
    setPrototypeOf() {
      z();
    }
  });
}
function K(i, c = 1) {
  m(i, i.v + c);
}
function me(i, c, g = !1) {
  x && X();
  var v = i,
    a = null,
    o = null,
    l = h,
    u = g ? Q : 0,
    s = !1;
  const e = (n, r = !0) => {
      (s = !0), t(r, n);
    },
    t = (n, r) => {
      if (l === (l = n)) return;
      let f = !1;
      if (x) {
        const d = v.data === p;
        !!l === d && ((v = ee()), te(v), U(!1), (f = !0));
      }
      l
        ? (a ? C(a) : r && (a = Y(() => r(v))),
          o &&
            $(o, () => {
              o = null;
            }))
        : (o ? C(o) : r && (o = Y(() => r(v))),
          a &&
            $(a, () => {
              a = null;
            })),
        f && U(!0);
    };
  J(() => {
    (s = !1), c(e), s || t(null, null);
  }, u),
    x && (v = re);
}
let L = !1;
function he(i) {
  var c = L;
  try {
    return (L = !1), [i(), L];
  } finally {
    L = c;
  }
}
function Pe(i, c, g, v) {
  var B;
  var a = (g & ce) !== 0,
    o = !de || (g & oe) !== 0,
    l = (g & ue) !== 0,
    u = (g & _e) !== 0,
    s = !1,
    e;
  l ? ([e, s] = he(() => i[c])) : (e = i[c]);
  var t = T in i || le in i,
    n = (l && (((B = N(i, c)) == null ? void 0 : B.set) ?? (t && c in i && ((_) => (i[c] = _))))) || void 0,
    r = v,
    f = !0,
    d = !1,
    b = () => ((d = !0), f && ((f = !1), u ? (r = k(v)) : (r = v)), r);
  e === void 0 && v !== void 0 && (n && o && ne(), (e = b()), n && n(e));
  var y;
  if (o)
    y = () => {
      var _ = i[c];
      return _ === void 0 ? b() : ((f = !0), (d = !1), _);
    };
  else {
    var I = (a ? j : ie)(() => i[c]);
    (I.f |= ae),
      (y = () => {
        var _ = P(I);
        return _ !== void 0 && (r = void 0), _ === void 0 ? r : _;
      });
  }
  if (!(g & se)) return y;
  if (n) {
    var A = i.$$legacy;
    return function (_, R) {
      return arguments.length > 0 ? ((!o || !R || A || s) && n(R ? y() : _), _) : y();
    };
  }
  var S = !1,
    D = ve(e),
    O = j(() => {
      var _ = y(),
        R = P(D);
      return S ? ((S = !1), R) : (D.v = _);
    });
  return (
    a || (O.equals = fe),
    function (_, R) {
      if (arguments.length > 0) {
        const q = R ? P(O) : o && l ? w(_) : _;
        return O.equals(q) || ((S = !0), m(D, q), d && r !== void 0 && (r = q), k(() => P(O))), _;
      }
      return P(O);
    }
  );
}
const ge = 'modulepreload',
  be = function (i, c) {
    return new URL(i, c).href;
  },
  Z = {},
  Ee = function (c, g, v) {
    let a = Promise.resolve();
    if (g && g.length > 0) {
      const l = document.getElementsByTagName('link'),
        u = document.querySelector('meta[property=csp-nonce]'),
        s = (u == null ? void 0 : u.nonce) || (u == null ? void 0 : u.getAttribute('nonce'));
      a = Promise.allSettled(
        g.map((e) => {
          if (((e = be(e, v)), e in Z)) return;
          Z[e] = !0;
          const t = e.endsWith('.css'),
            n = t ? '[rel="stylesheet"]' : '';
          if (!!v)
            for (let d = l.length - 1; d >= 0; d--) {
              const b = l[d];
              if (b.href === e && (!t || b.rel === 'stylesheet')) return;
            }
          else if (document.querySelector(`link[href="${e}"]${n}`)) return;
          const f = document.createElement('link');
          if (((f.rel = t ? 'stylesheet' : ge), t || (f.as = 'script'), (f.crossOrigin = ''), (f.href = e), s && f.setAttribute('nonce', s), document.head.appendChild(f), t))
            return new Promise((d, b) => {
              f.addEventListener('load', d), f.addEventListener('error', () => b(new Error(`Unable to preload CSS for ${e}`)));
            });
        })
      );
    }
    function o(l) {
      const u = new Event('vite:preloadError', { cancelable: !0 });
      if (((u.payload = l), window.dispatchEvent(u), !u.defaultPrevented)) throw l;
    }
    return a.then((l) => {
      for (const u of l || []) u.status === 'rejected' && o(u.reason);
      return c().catch(o);
    });
  };
export { Ee as _, w as a, me as i, Pe as p };
