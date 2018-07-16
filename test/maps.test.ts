import { Maps, pipe, Iterables } from '../src/collection-fns'

test('ofIterable', () => {
  expect(
    Maps.ofIterable(
      (function*(): Iterable<[string, number]> {
        yield ['a', 1]
        yield ['b', 2]
      })()
    )
  ).toEqual(new Map([['a', 1], ['b', 2]]))
})

test('toIterable', () => {
  expect(Iterables.toArray(Maps.toIterable(new Map([['a', 1], ['b', 2]])))).toEqual([
    ['a', 1],
    ['b', 2]
  ])
})

describe('map', () => {
  test('immediate', () => {
    expect(
      Maps.map(new Map([['a', 1], ['b', 2]]), (key, value) => {
        return value * 2
      })
    ).toEqual(new Map([['a', 2], ['b', 4]]))
  })
  test('piped', () => {
    expect(
      pipe(new Map([['a', 1], ['b', 2]])).then(
        Maps.map((key, value) => {
          return value * 2
        })
      ).result
    ).toEqual(new Map([['a', 2], ['b', 4]]))
  })
})

describe('filter', () => {
  test('immediate', () => {
    expect(Maps.filter(new Map([['a', 1], ['b', 2]]), (key, value) => value % 2 === 0)).toEqual(
      new Map([['b', 2]])
    )
  })
  test('piped', () => {
    expect(
      pipe(new Map([['a', 1], ['b', 2]])).then(Maps.filter((key, value) => value % 2 === 0)).result
    ).toEqual(new Map([['b', 2]]))
  })
})

describe('choose', () => {
  test('immediate', () => {
    expect(
      Maps.choose(
        new Map([['a', 1], ['b', 2], ['c', 3]]),
        (key, value) => (value % 2 === 1 ? key + value : undefined)
      )
    ).toEqual(new Map([['a', 'a1'], ['c', 'c3']]))
  })
  test('piped', () => {
    expect(
      pipe(new Map([['a', 1], ['b', 2], ['c', 3]])).then(
        Maps.choose((key, value) => (value % 2 === 1 ? key + value : undefined))
      ).result
    ).toEqual(new Map([['a', 'a1'], ['c', 'c3']]))
  })
})

describe('get', () => {
  test('immediate', () => {
    expect(Maps.get(new Map([['a', 1], ['b', 2]]), 'b')).toEqual(2)
  })
  test('piped', () => {
    expect(pipe(new Map([['a', 1], ['b', 2]])).then(Maps.get('a')).result).toEqual(1)
  })
  test('not found', () => {
    expect(() => Maps.get(new Map([['a', 1], ['b', 2]]), 'c')).toThrow('')
  })
})

describe('find', () => {
  test('immediate', () => {
    expect(Maps.find(new Map([['a', 1], ['b', 2]]), 'b')).toEqual(2)
  })
  test('piped', () => {
    expect(pipe(new Map([['a', 1], ['b', 2]])).then(Maps.find('a')).result).toEqual(1)
  })
  test('not found', () => {
    expect(Maps.find(new Map([['a', 1], ['b', 2]]), 'c')).toBeUndefined()
  })
})

describe('exists', () => {
  test('immediate', () => {
    expect(Maps.exists(new Map([['a', 1], ['b', 2]]), (key, value) => value === 2)).toEqual(true)
  })
  test('piped', () => {
    expect(
      pipe(new Map([['a', 1], ['b', 2]])).then(Maps.exists((key, value) => value === 2)).result
    ).toEqual(true)
  })
  test('not found', () => {
    expect(Maps.exists(new Map([['a', 1], ['b', 2]]), (key, value) => value === 3)).toEqual(false)
  })
})
