/**
 * Class for chaining the result of one function into another.
 */
export class Pipe<T> {
  /**
   * The result returned by the previous function.
   */
  result: T
  constructor(input: T) {
    this.result = input
  }
  /**
   * Executes the specified function, passing the current result as an input.
   * @param next A function taking the last result and returning a new result which can then be piped again.
   */
  then<U>(next: (value: T) => U) {
    return new Pipe(next(this.result))
  }
}

/**
 * Starts a new pipe with the given input as an initial value.
 * This returns a pipe object to use for executing a series of functions.
 * To get the final result, use the `result` property.
 * @param input The initial value to start the pipe.
 */
export function pipe<T>(input: T): Pipe<T>
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A>(input: Input, a: (value: Input) => A): A
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B>(input: Input, a: (value: Input) => A, b: (value: A) => B): B
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C>(
  input: Input,
  a: (value: Input) => A,
  b: (value: A) => B,
  c: (value: B) => C
): C
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D>(
  input: Input,
  a: (value: Input) => A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D
): D
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E>(
  input: Input,
  a: (value: Input) => A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E
): E
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F>(
  input: Input,
  a: (value: Input) => A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F
): F
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G>(
  input: Input,
  a: (value: Input) => A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G
): G
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H>(
  input: Input,
  a: (value: Input) => A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H
): H
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I>(
  input: Input,
  a: (value: Input) => A,
  b: (value: A) => B,
  c: (value: B) => C,
  d: (value: C) => D,
  e: (value: D) => E,
  f: (value: E) => F,
  g: (value: F) => G,
  h: (value: G) => H,
  i: (value: H) => I
): I
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<Input, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<
  Input,
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y
>(
  input: Input,
  a: (value: Input) => A,
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
/**
 * Calls each successive function with the result of the previous function.
 * @param input The initial value to pass to the next function.
 * @param a..z Functions taking the previous result and returning a new result.
 * @returns The result of the last function provided.
 */
export function pipe<
  Input,
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z
>(
  input: Input,
  a: (value: Input) => A,
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
