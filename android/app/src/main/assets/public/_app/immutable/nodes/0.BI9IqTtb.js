import { c as s, a as i } from '../chunks/BWTlkcQG.js';
import { S as c, U as p, A as f, V as l, W as d, B as u, q as _, L as m } from '../chunks/nvPuU6Fe.js';
import '../chunks/CPbp9n-C.js';
function v(a, n, ...e) {
  var r = a,
    o = l,
    t;
  c(() => {
    o !== (o = n()) && (t && (d(t), (t = null)), (t = f(() => o(r, ...e))));
  }, p),
    u && (r = _);
}
const y = !0,
  h = !1,
  T = Object.freeze(Object.defineProperty({ __proto__: null, prerender: y, ssr: h }, Symbol.toStringTag, { value: 'Module' }));
function A(a, n) {
  var e = s(),
    r = m(e);
  v(r, () => n.children), i(a, e);
}
export { A as component, T as universal };
