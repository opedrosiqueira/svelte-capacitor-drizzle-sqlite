const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      '../nodes/0.BI9IqTtb.js',
      '../chunks/BWTlkcQG.js',
      '../chunks/nvPuU6Fe.js',
      '../chunks/CPbp9n-C.js',
      '../assets/0.NT9Ht3bT.css',
      '../nodes/1.Dq5mK0lm.js',
      '../chunks/lh0NUCl9.js',
      '../chunks/BnaIcJKP.js',
      '../chunks/jEwm1i4B.js',
      '../chunks/CA4MZbRg.js',
      '../nodes/2.Cl2LH2Aj.js',
      '../nodes/3.D73n460D.js',
      '../chunks/DHivoJrM.js',
      '../chunks/C7KD8cwU.js'
    ])
) => i.map((i) => d[i]);
var N = (e) => {
  throw TypeError(e);
};
var q = (e, t, r) => t.has(e) || N('Cannot ' + r);
var c = (e, t, r) => (q(e, t, 'read from private field'), r ? r.call(e) : t.get(e)),
  k = (e, t, r) => (t.has(e) ? N('Cannot add the same private member more than once') : t instanceof WeakSet ? t.add(e) : t.set(e, r)),
  A = (e, t, r, i) => (q(e, t, 'write to private field'), i ? i.call(e, r) : t.set(e, r), r);
import { p as T, a as Q, i as L, _ as x } from '../chunks/C7KD8cwU.js';
import {
  B,
  p as W,
  S as Z,
  U as p,
  A as $,
  a8 as tt,
  q as et,
  ak as rt,
  al as st,
  a as at,
  am as nt,
  X as ot,
  a1 as O,
  af as it,
  I as h,
  an as ct,
  d as ft,
  ai as ut,
  C as dt,
  E as lt,
  u as ht,
  ao as w,
  ap as mt,
  L as R,
  P as _t,
  D as vt,
  N as gt,
  O as yt,
  K as C,
  M as Et
} from '../chunks/nvPuU6Fe.js';
import { h as Pt, m as bt, u as xt, s as Rt } from '../chunks/BnaIcJKP.js';
import { t as Y, a as y, c as S, d as Ot } from '../chunks/BWTlkcQG.js';
import { o as kt } from '../chunks/CA4MZbRg.js';
function D(e, t, r) {
  B && W();
  var i = e,
    s,
    o;
  Z(() => {
    s !== (s = t()) && (o && (tt(o), (o = null)), s && (o = $(() => r(i, s))));
  }, p),
    B && (i = et);
}
function F(e, t) {
  return e === t || (e == null ? void 0 : e[ot]) === t;
}
function I(e = {}, t, r, i) {
  return (
    rt(() => {
      var s, o;
      return (
        st(() => {
          (s = o),
            (o = []),
            at(() => {
              e !== r(...o) && (t(e, ...o), s && F(r(...s), e) && t(null, ...s));
            });
        }),
        () => {
          nt(() => {
            o && F(r(...o), e) && t(null, ...o);
          });
        }
      );
    }),
    e
  );
}
function At(e) {
  return class extends Tt {
    constructor(t) {
      super({ component: e, ...t });
    }
  };
}
var m, u;
class Tt {
  constructor(t) {
    k(this, m);
    k(this, u);
    var o;
    var r = new Map(),
      i = (a, n) => {
        var _ = ut(n);
        return r.set(a, _), _;
      };
    const s = new Proxy(
      { ...(t.props || {}), $$events: {} },
      {
        get(a, n) {
          return h(r.get(n) ?? i(n, Reflect.get(a, n)));
        },
        has(a, n) {
          return n === it ? !0 : (h(r.get(n) ?? i(n, Reflect.get(a, n))), Reflect.has(a, n));
        },
        set(a, n, _) {
          return O(r.get(n) ?? i(n, _), _), Reflect.set(a, n, _);
        }
      }
    );
    A(this, u, (t.hydrate ? Pt : bt)(t.component, { target: t.target, anchor: t.anchor, props: s, context: t.context, intro: t.intro ?? !1, recover: t.recover })),
      (!((o = t == null ? void 0 : t.props) != null && o.$$host) || t.sync === !1) && ct(),
      A(this, m, s.$$events);
    for (const a of Object.keys(c(this, u)))
      a === '$set' ||
        a === '$destroy' ||
        a === '$on' ||
        ft(this, a, {
          get() {
            return c(this, u)[a];
          },
          set(n) {
            c(this, u)[a] = n;
          },
          enumerable: !0
        });
    (c(this, u).$set = (a) => {
      Object.assign(s, a);
    }),
      (c(this, u).$destroy = () => {
        xt(c(this, u));
      });
  }
  $set(t) {
    c(this, u).$set(t);
  }
  $on(t, r) {
    c(this, m)[t] = c(this, m)[t] || [];
    const i = (...s) => r.call(this, ...s);
    return (
      c(this, m)[t].push(i),
      () => {
        c(this, m)[t] = c(this, m)[t].filter((s) => s !== i);
      }
    );
  }
  $destroy() {
    c(this, u).$destroy();
  }
}
(m = new WeakMap()), (u = new WeakMap());
const Ft = {};
var Lt = Y('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),
  wt = Y('<!> <!>', 1);
function Ct(e, t) {
  dt(t, !0);
  let r = T(t, 'components', 23, () => []),
    i = T(t, 'data_0', 3, null),
    s = T(t, 'data_1', 3, null);
  lt(() => t.stores.page.set(t.page)),
    ht(() => {
      t.stores, t.page, t.constructors, r(), t.form, i(), s(), t.stores.page.notify();
    });
  let o = w(!1),
    a = w(!1),
    n = w(null);
  kt(() => {
    const f = t.stores.page.subscribe(() => {
      h(o) &&
        (O(a, !0),
        mt().then(() => {
          O(n, Q(document.title || 'untitled page'));
        }));
    });
    return O(o, !0), f;
  });
  const _ = C(() => t.constructors[1]);
  var j = wt(),
    M = R(j);
  {
    var G = (f) => {
        var l = S();
        const E = C(() => t.constructors[0]);
        var P = R(l);
        D(
          P,
          () => h(E),
          (v, g) => {
            I(
              g(v, {
                get data() {
                  return i();
                },
                get form() {
                  return t.form;
                },
                children: (d, It) => {
                  var V = S(),
                    z = R(V);
                  D(
                    z,
                    () => h(_),
                    (H, J) => {
                      I(
                        J(H, {
                          get data() {
                            return s();
                          },
                          get form() {
                            return t.form;
                          }
                        }),
                        (b) => (r()[1] = b),
                        () => {
                          var b;
                          return (b = r()) == null ? void 0 : b[1];
                        }
                      );
                    }
                  ),
                    y(d, V);
                },
                $$slots: { default: !0 }
              }),
              (d) => (r()[0] = d),
              () => {
                var d;
                return (d = r()) == null ? void 0 : d[0];
              }
            );
          }
        ),
          y(f, l);
      },
      K = (f) => {
        var l = S();
        const E = C(() => t.constructors[0]);
        var P = R(l);
        D(
          P,
          () => h(E),
          (v, g) => {
            I(
              g(v, {
                get data() {
                  return i();
                },
                get form() {
                  return t.form;
                }
              }),
              (d) => (r()[0] = d),
              () => {
                var d;
                return (d = r()) == null ? void 0 : d[0];
              }
            );
          }
        ),
          y(f, l);
      };
    L(M, (f) => {
      t.constructors[1] ? f(G) : f(K, !1);
    });
  }
  var U = _t(M, 2);
  {
    var X = (f) => {
      var l = Lt(),
        E = gt(l);
      {
        var P = (v) => {
          var g = Ot();
          Et(() => Rt(g, h(n))), y(v, g);
        };
        L(E, (v) => {
          h(a) && v(P);
        });
      }
      yt(l), y(f, l);
    };
    L(U, (f) => {
      h(o) && f(X);
    });
  }
  y(e, j), vt();
}
const Yt = At(Ct),
  Gt = [
    () => x(() => import('../nodes/0.BI9IqTtb.js'), __vite__mapDeps([0, 1, 2, 3, 4]), import.meta.url),
    () => x(() => import('../nodes/1.Dq5mK0lm.js'), __vite__mapDeps([5, 1, 2, 6, 7, 8, 9]), import.meta.url),
    () => x(() => import('../nodes/2.Cl2LH2Aj.js'), __vite__mapDeps([10, 1, 2, 6]), import.meta.url),
    () => x(() => import('../nodes/3.D73n460D.js'), __vite__mapDeps([11, 12, 1, 2, 7, 13, 9, 3]), import.meta.url)
  ],
  Kt = [],
  Ut = { '/': [2], '/todolist': [3] },
  St = {
    handleError: ({ error: e }) => {
      console.error(e);
    },
    reroute: () => {},
    transport: {}
  },
  Dt = Object.fromEntries(Object.entries(St.transport).map(([e, t]) => [e, t.decode])),
  Xt = !1,
  zt = (e, t) => Dt[e](t);
export { zt as decode, Dt as decoders, Ut as dictionary, Xt as hash, St as hooks, Ft as matchers, Gt as nodes, Yt as root, Kt as server_loads };
