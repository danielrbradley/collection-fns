import { pipe, Sets, Iterables } from '../src/collection-fns'

test('ofIterable', () => {
  const iterator = function* () {
    yield 1
    yield 2
    yield 2
  }
  expect(Sets.ofIterable(iterator())).toEqual(new Set([1, 2]))
})

test('ofArray', () => {
  expect(Sets.ofArray([1, 2, 2, 3])).toEqual(new Set([1, 2, 3]))
})

test('asIterable', () => {
  expect(Iterables.length(Sets.asIterable(new Set(['a'])))).toEqual(1)
})

test('toArray', () => {
  expect(Sets.toArray(new Set(['a']))).toEqual(['a'])
})

describe('map', () => {
  test('empty', () => {
    expect(Sets.map((x) => '')(new Set())).toEqual(new Set())
  })
  test('piped', () => {
    expect(pipe(new Set([1, 2, 3])).then(Sets.map((x) => x % 2)).result).toEqual(new Set([0, 1]))
  })
  test('invoke', () => {
    expect(Sets.map(new Set([1, 2, 3]), (x) => x % 2)).toEqual(new Set([0, 1]))
  })
})

describe('filter', () => {
  test('empty', () => {
    expect(Sets.filter(new Set(), (x) => true)).toEqual(new Set([]))
  })
  test('piped', () => {
    expect(pipe(new Set([1, 2, 3, 4])).then(Sets.filter((x) => x % 2 === 0)).result).toEqual(
      new Set([2, 4])
    )
  })
  test('invoke', () => {
    expect(Sets.filter(new Set([1, 2, 3, 4]), (x) => x % 2 === 0)).toEqual(new Set([2, 4]))
  })
})

describe('choose', () => {
  test('piped', () => {
    expect(
      pipe(new Set([1, 2, 3])).then(Sets.choose((x) => (x % 2 === 1 ? x * 2 : undefined))).result
    ).toEqual(new Set([2, 6]))
  })
  test('invoke', () => {
    expect(Sets.choose(new Set([1, 2, 3]), (x) => (x % 2 === 1 ? x * 2 : undefined))).toEqual(
      new Set([2, 6])
    )
  })
})

describe('collect', () => {
  test('piped', () => {
    expect(
      pipe(new Set([1, 2])).then(
        Sets.collect(function (x) {
          return [x, x + 1]
        })
      ).result
    ).toEqual(new Set([1, 2, 3]))
  })
  test('invoke', () => {
    expect(
      Sets.collect(new Set([1, 2]), function (x) {
        return [x, x + 1]
      })
    ).toEqual(new Set([1, 2, 3]))
  })
})

describe('append', () => {
  test('piped', () => {
    expect(pipe(new Set([1, 2])).then(Sets.append(new Set([2, 3]))).result).toEqual(
      new Set([1, 2, 3])
    )
  })
  test('invoke', () => {
    expect(Sets.append(new Set([1, 2]), new Set([2, 3]))).toEqual(new Set([1, 2, 3]))
  })
})

test('concat', () => {
  expect(Sets.concat([new Set([1, 2]), new Set([2, 3, 4]), new Set([])])).toEqual(
    new Set([1, 2, 3, 4])
  )
})

describe('exists', () => {
  it('matches existance', () => {
    expect(pipe(new Set([1, 2])).then(Sets.exists((x) => x % 2 === 1)).result).toEqual(true)
  })
  it('matches non-existance', () => {
    expect(pipe(new Set([1, 2])).then(Sets.exists((x) => x % 3 === 0)).result).toEqual(false)
  })
  test('invoke', () => {
    expect(Sets.exists(new Set([1, 2]), (x) => x % 2 === 1)).toEqual(true)
  })
})

describe('every', () => {
  it('matches existance', () => {
    expect(pipe(new Set([1, 2])).then(Sets.every((x) => x >= 1)).result).toEqual(true)
  })
  it('matches non-existance', () => {
    expect(pipe(new Set([1, 2])).then(Sets.every((x) => x === 1)).result).toEqual(false)
  })
  test('invoke', () => {
    expect(Sets.every(new Set([2, 4]), (x) => x % 2 === 0)).toEqual(true)
  })
})

describe('contains', () => {
  test('piped match', () => {
    expect(pipe(new Set(['amy', 'bob'])).then(Sets.contains('bob')).result).toEqual(true)
  })
  test('no match', () => {
    expect(pipe(new Set(['amy', 'bob'])).then(Sets.contains('cat')).result).toEqual(false)
  })
  test('invoke', () => {
    expect(Sets.contains(new Set(['amy', 'bob']), 'amy')).toEqual(true)
  })
})

describe('get', () => {
  test('piped match', () => {
    expect(pipe(new Set(['amy', 'bob'])).then(Sets.get((x) => x.startsWith('b'))).result).toEqual(
      'bob'
    )
  })
  it('throws when not found', () => {
    expect(
      () => pipe(new Set(['amy', 'bob'])).then(Sets.get((x) => x.startsWith('c'))).result
    ).toThrow('Element not found matching criteria')
  })
  test('invoke', () => {
    expect(Sets.get(new Set(['amy', 'bob']), (x) => x.startsWith('a'))).toEqual('amy')
  })
})

describe('find', () => {
  test('piped match', () => {
    expect(pipe(new Set(['amy', 'bob'])).then(Sets.find((x) => x.startsWith('b'))).result).toEqual(
      'bob'
    )
  })
  it('returns undefined when not found', () => {
    expect(
      pipe(new Set(['amy', 'bob'])).then(Sets.find((x) => x.startsWith('c'))).result
    ).toBeUndefined()
  })
  test('invoke', () => {
    expect(Sets.find(new Set(['amy', 'bob']), (x) => x.startsWith('a'))).toEqual('amy')
  })
})

describe('count', () => {
  test('zero length', () => {
    expect(Sets.count(new Set())).toEqual(0)
  })
  test('non-zero length', () => {
    expect(Sets.count(new Set([1, 2, 3, 4, 5]))).toEqual(5)
  })
})
