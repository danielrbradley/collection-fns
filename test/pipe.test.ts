import { pipe } from '../src/collection-fns'

describe('pipes', () => {
  test('pipe object', () => {
    expect(pipe(1).then(x => x + 1).result).toEqual(2)
  })
  test('smallest immediate return', () => {
    expect(
      pipe(
        1,
        x => x + 1
      )
    ).toEqual(2)
  })
  test('longest', () => {
    expect(
      pipe(
        { input: 0 },
        result => ({ a: result.input + 1 }),
        result => ({ b: result.a + 1 }),
        result => ({ c: result.b + 1 }),
        result => ({ d: result.c + 1 }),
        result => ({ e: result.d + 1 }),
        result => ({ f: result.e + 1 }),
        result => ({ g: result.f + 1 }),
        result => ({ h: result.g + 1 }),
        result => ({ i: result.h + 1 }),
        result => ({ j: result.i + 1 }),
        result => ({ k: result.j + 1 }),
        result => ({ l: result.k + 1 }),
        result => ({ m: result.l + 1 }),
        result => ({ n: result.m + 1 }),
        result => ({ o: result.n + 1 }),
        result => ({ p: result.o + 1 }),
        result => ({ q: result.p + 1 }),
        result => ({ r: result.q + 1 }),
        result => ({ s: result.r + 1 }),
        result => ({ t: result.s + 1 }),
        result => ({ u: result.t + 1 }),
        result => ({ v: result.u + 1 }),
        result => ({ w: result.v + 1 }),
        result => ({ result: result.w + 1 }),
        result => ({ y: result.result + 1 }),
        result => ({ z: result.y + 1 })
      )
    ).toEqual({ z: 26 })
  })
})
