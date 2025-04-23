import { t as b, a as k } from '../chunks/BWTlkcQG.js';
import '../chunks/lh0NUCl9.js';
import { c as x, E as $, u as i, F as l, a as y, G as E, I as v, J as C, K as D, C as F, L as G, M as I, D as J, N as u, O as m, P as K } from '../chunks/nvPuU6Fe.js';
import { s as g } from '../chunks/BnaIcJKP.js';
import { s as L, p as _ } from '../chunks/jEwm1i4B.js';
function M(a = !1) {
  const e = x,
    t = e.l.u;
  if (!t) return;
  let r = () => C(e.s);
  if (a) {
    let o = 0,
      s = {};
    const p = D(() => {
      let n = !1;
      const c = e.s;
      for (const f in c) c[f] !== s[f] && ((s[f] = c[f]), (n = !0));
      return n && o++, o;
    });
    r = () => v(p);
  }
  t.b.length &&
    $(() => {
      d(e, r), l(t.b);
    }),
    i(() => {
      const o = y(() => t.m.map(E));
      return () => {
        for (const s of o) typeof s == 'function' && s();
      };
    }),
    t.a.length &&
      i(() => {
        d(e, r), l(t.a);
      });
}
function d(a, e) {
  if (a.l.s) for (const t of a.l.s) v(t);
  e();
}
const N = {
  get error() {
    return _.error;
  },
  get status() {
    return _.status;
  }
};
L.updated.check;
const h = N;
var O = b('<h1> </h1> <p> </p>', 1);
function A(a, e) {
  F(e, !1), M();
  var t = O(),
    r = G(t),
    o = u(r, !0);
  m(r);
  var s = K(r, 2),
    p = u(s, !0);
  m(s),
    I(() => {
      var n;
      g(o, h.status), g(p, (n = h.error) == null ? void 0 : n.message);
    }),
    k(a, t),
    J();
}
export { A as component };
