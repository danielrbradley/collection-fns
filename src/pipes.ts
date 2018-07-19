export class Pipe<T> {
  result: T
  constructor(input: T) {
    this.result = input
  }
  then<U>(next: (value: T) => U) {
    return new Pipe(next(this.result))
  }
}

export function pipe<T>(input: T): Pipe<T>
export function pipe<A, B>(a: A, b: (value: A) => B): B
export function pipe<A, B, C>(a: A, b: (value: A) => B, c: (value: B) => C): C
export function pipe<A, B, C, D>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D
): D
export function pipe<A, B, C, D, E>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E
): E
export function pipe<A, B, C, D, E, F>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F
): F
export function pipe<A, B, C, D, E, F, G>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G
): G
export function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J
): J
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K
): K
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L
): L
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M
): M
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N
): N
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O
): O
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O,
  p: (value: O) => P
): P
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O,
  p: (value: O) => P,
  q: (value: P) => Q
): Q
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O,
  p: (value: O) => P,
  q: (value: P) => Q,
  r: (value: Q) => R
): R
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O,
  p: (value: O) => P,
  q: (value: P) => Q,
  r: (value: Q) => R,
  s: (value: R) => S
): S
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O,
  p: (value: O) => P,
  q: (value: P) => Q,
  r: (value: Q) => R,
  s: (value: R) => S,
  t: (value: S) => T
): T
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O,
  p: (value: O) => P,
  q: (value: P) => Q,
  r: (value: Q) => R,
  s: (value: R) => S,
  t: (value: S) => T,
  u: (value: T) => U
): U
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O,
  p: (value: O) => P,
  q: (value: P) => Q,
  r: (value: Q) => R,
  s: (value: R) => S,
  t: (value: S) => T,
  u: (value: T) => U,
  v: (value: U) => V
): V
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O,
  p: (value: O) => P,
  q: (value: P) => Q,
  r: (value: Q) => R,
  s: (value: R) => S,
  t: (value: S) => T,
  u: (value: T) => U,
  v: (value: U) => V,
  w: (value: V) => W
): W
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O,
  p: (value: O) => P,
  q: (value: P) => Q,
  r: (value: Q) => R,
  s: (value: R) => S,
  t: (value: S) => T,
  u: (value: T) => U,
  v: (value: U) => V,
  w: (value: V) => W,
  x: (value: W) => X
): X
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O,
  p: (value: O) => P,
  q: (value: P) => Q,
  r: (value: Q) => R,
  s: (value: R) => S,
  t: (value: S) => T,
  u: (value: T) => U,
  v: (value: U) => V,
  w: (value: V) => W,
  x: (value: W) => X,
  y: (value: X) => Y
): Y
export function pipe<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z>(
  a: A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I,
  j: (value: I) => J,
  k: (value: J) => K,
  l: (value: K) => L,
  m: (value: L) => M,
  n: (value: M) => N,
  o: (value: N) => O,
  p: (value: O) => P,
  q: (value: P) => Q,
  r: (value: Q) => R,
  s: (value: R) => S,
  t: (value: S) => T,
  u: (value: T) => U,
  v: (value: U) => V,
  w: (value: V) => W,
  x: (value: W) => X,
  y: (value: X) => Y,
  z: (value: Y) => Z
): Z
export function pipe(...args: any[]): any {
  if (args.length === 1) {
    return new Pipe(args[0])
  }
  return args.slice(1).reduce((last, next) => next(last), args[0])
}
