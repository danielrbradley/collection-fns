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
        { a: 1 },
        x => ({ b: x.a + 1 }),
        x => ({ c: x.b + 1 }),
        x => ({ d: x.c + 1 }),
        x => ({ e: x.d + 1 }),
        x => ({ f: x.e + 1 }),
        x => ({ g: x.f + 1 }),
        x => ({ h: x.g + 1 }),
        x => ({ i: x.h + 1 }),
        x => ({ j: x.i + 1 }),
        x => ({ k: x.j + 1 }),
        x => ({ l: x.k + 1 }),
        x => ({ m: x.l + 1 }),
        x => ({ n: x.m + 1 }),
        x => ({ o: x.n + 1 }),
        x => ({ p: x.o + 1 }),
        x => ({ q: x.p + 1 }),
        x => ({ r: x.q + 1 }),
        x => ({ s: x.r + 1 }),
        x => ({ t: x.s + 1 }),
        x => ({ u: x.t + 1 }),
        x => ({ v: x.u + 1 }),
        x => ({ w: x.v + 1 }),
        x => ({ x: x.w + 1 }),
        x => ({ y: x.x + 1 }),
        x => ({ z: x.y + 1 })
      )
    ).toEqual({ z: 26 })
  })
})
