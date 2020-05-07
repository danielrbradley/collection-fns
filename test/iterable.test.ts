import { pipe, Iterables } from '../src/collection-fns'

describe('toArray', () => {
  it('constructs an array', () => {
    const iterator = function* () {
      yield 1
      yield 2
    }
    expect(Iterables.toArray(iterator())).toEqual([1, 2])
  })
})

describe('map', () => {
  it('maps empty collection', () => {
    expect(Array.from(Iterables.map((x) => x)([]))).toEqual([])
  })
  it('maps items with partial application', () => {
    expect(
      pipe(
        (function* () {
          yield 1
          yield 2
        })()
      )
        .then(Iterables.map((x) => x * 2))
        .then(Iterables.toArray).result
    ).toEqual([2, 4])
  })
  it('maps items without partial application', () => {
    expect(
      pipe(
        Iterables.map(
          (function* () {
            yield 1
            yield 2
          })(),
          (x) => x * 2
        )
      ).then(Iterables.toArray).result
    ).toEqual([2, 4])
  })
  it('can map with index', () => {
    expect(
      pipe(
        (function* () {
          yield 1
          yield 2
        })()
      )
        .then(Iterables.map((x, index) => index))
        .then(Iterables.toArray).result
    ).toEqual([0, 1])
  })
})

describe('filter', () => {
  it('can filter empty collection', () => {
    expect(
      pipe([])
        .then(Iterables.filter((x) => true))
        .then(Iterables.toArray).result
    ).toEqual([])
  })
  it('can filter out everything', () => {
    expect(
      pipe([1, 2])
        .then(Iterables.filter((x) => false))
        .then(Iterables.toArray).result
    ).toEqual([])
  })
  it('can filters based on criteria', () => {
    expect(
      pipe([1, 2])
        .then(Iterables.filter((x) => x % 2 === 0))
        .then(Iterables.toArray).result
    ).toEqual([2])
  })
  it('can filters without partial application', () => {
    expect(
      pipe(Iterables.filter([1, 2], (x) => x % 2 === 0)).then(Iterables.toArray).result
    ).toEqual([2])
  })
  it('can filters based on index', () => {
    expect(
      pipe(
        [1, 2, 15, 7],
        Iterables.filter((x, index) => index % 2 === 0),
        Iterables.toArray
      )
    ).toEqual([1, 15])
  })
})

describe('choose', () => {
  it('chooses defined values', () => {
    expect(
      pipe([1, 2, 3])
        .then(Iterables.choose((x) => (x % 2 === 1 ? x * 2 : undefined)))
        .then(Iterables.toArray).result
    ).toEqual([2, 6])
  })
  it('can choose without partial application', () => {
    expect(
      pipe(Iterables.choose([1, 2, 3], (x) => (x % 2 === 1 ? x * 2 : undefined))).then(
        Iterables.toArray
      ).result
    ).toEqual([2, 6])
  })
  it('chooses with index', () => {
    expect(
      pipe(
        [1, 2, 3],
        Iterables.choose((x, index) => (index % 2 === 0 ? x * 2 : x)),
        Iterables.toArray
      )
    ).toEqual([2, 2, 6])
  })
})

describe('collect', () => {
  it('can collect iterables', () => {
    expect(
      pipe([1, 2])
        .then(
          Iterables.collect(function* (x) {
            yield x
            yield x
          })
        )
        .then(Iterables.toArray).result
    ).toEqual([1, 1, 2, 2])
  })
  it('can collect iterables without partial application', () => {
    expect(
      pipe(
        Iterables.collect([1, 2], function* (x) {
          yield x
          yield x
        })
      ).then(Iterables.toArray).result
    ).toEqual([1, 1, 2, 2])
  })
  it('can collect with index', () => {
    expect(
      pipe([1, 2])
        .then(
          Iterables.collect(function* (x, index) {
            yield x
            yield x + index
          })
        )
        .then(Iterables.toArray).result
    ).toEqual([1, 1, 2, 3])
  })
})

describe('append', () => {
  it('appends two iterators', () => {
    expect(
      pipe(
        (function* () {
          yield 1
        })()
      )
        .then(
          Iterables.append(
            (function* () {
              yield 2
            })()
          )
        )
        .then(Iterables.toArray).result
    ).toEqual([1, 2])
  })
  it('can append without partial application', () => {
    expect(
      Iterables.toArray(
        Iterables.append(
          (function* () {
            yield 1
          })(),
          (function* () {
            yield 2
          })()
        )
      )
    ).toEqual([1, 2])
  })
})

describe('concat', () => {
  it('appends nested iterators', () => {
    expect(
      pipe(
        (function* () {
          yield (function* () {
            yield 1
            yield 2
          })()
          yield (function* () {
            yield 3
            yield 4
          })()
          yield [5]
        })()
      )
        .then(Iterables.concat)
        .then(Iterables.toArray).result
    ).toEqual([1, 2, 3, 4, 5])
  })
})

describe('distinct', () => {
  it('ignores duplicates', () => {
    expect(
      pipe(
        (function* () {
          yield 'amy'
          yield 'bob'
          yield 'bob'
          yield 'cat'
        })(),
        Iterables.distinct,
        Iterables.toArray
      )
    ).toEqual(['amy', 'bob', 'cat'])
  })
})

describe('distinctBy', () => {
  it('ignores duplicates', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
          yield { name: 'bob', id: 3 }
          yield { name: 'cat', id: 3 }
        })()
      )
        .then(Iterables.distinctBy((x) => x.name))
        .then(Iterables.toArray).result
    ).toEqual([
      { name: 'amy', id: 1 },
      { name: 'bob', id: 2 },
      { name: 'cat', id: 3 },
    ])
  })
  it('ignores duplicates without partial application', () => {
    expect(
      Iterables.toArray(
        Iterables.distinctBy(
          (function* () {
            yield { name: 'amy', id: 1 }
            yield { name: 'bob', id: 2 }
            yield { name: 'bob', id: 3 }
            yield { name: 'cat', id: 3 }
          })(),
          (x) => x.name
        )
      )
    ).toEqual([
      { name: 'amy', id: 1 },
      { name: 'bob', id: 2 },
      { name: 'cat', id: 3 },
    ])
  })
  it('passes index', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
          yield { name: 'bob', id: 3 }
          yield { name: 'cat', id: 3 }
        })()
      )
        .then(Iterables.distinctBy((x, index) => Math.floor(index / 2)))
        .then(Iterables.toArray).result
    ).toEqual([
      { name: 'amy', id: 1 },
      { name: 'bob', id: 3 },
    ])
  })
})

describe('exists', () => {
  it('matches existance', () => {
    expect(
      pipe(
        (function* () {
          yield 1
          yield 2
        })()
      ).then(Iterables.exists((x) => x === 1)).result
    ).toEqual(true)
  })
  it('matches non-existance', () => {
    expect(
      pipe(
        (function* (): IterableIterator<number> {
          yield 1
          yield 2
        })()
      ).then(Iterables.exists((x) => x === 3)).result
    ).toEqual(false)
  })
  it('matches without partial application', () => {
    expect(
      Iterables.exists(
        (function* () {
          yield 1
          yield 2
        })(),
        (x) => x === 1
      )
    ).toEqual(true)
  })
  it('passes index', () => {
    expect(
      pipe(
        (function* () {
          yield 1
          yield 2
        })()
      ).then(Iterables.exists((x, index) => x === 2 && index === 1)).result
    ).toEqual(true)
  })
})

describe('every', () => {
  it('matches existance', () => {
    expect(
      pipe(
        (function* () {
          yield 1
          yield 2
        })()
      ).then(Iterables.every((x) => x >= 1)).result
    ).toEqual(true)
  })
  it('matches non-existance', () => {
    expect(
      pipe(
        (function* (): IterableIterator<number> {
          yield 1
          yield 2
        })()
      ).then(Iterables.every((x) => x === 2)).result
    ).toEqual(false)
  })
  it('matches without partial application', () => {
    expect(
      Iterables.every(
        (function* () {
          yield 2
          yield 4
        })(),
        (x) => x % 2 === 0
      )
    ).toEqual(true)
  })
  it('passes index', () => {
    expect(
      pipe(
        (function* () {
          yield 1
          yield 2
        })()
      ).then(Iterables.every((x, index) => index >= 0)).result
    ).toEqual(true)
  })
})

describe('get', () => {
  it('finds match', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })()
      ).then(Iterables.get((x) => x.name === 'bob')).result
    ).toEqual({ name: 'bob', id: 2 })
  })
  it('throws when not found', () => {
    expect(
      () =>
        pipe(
          (function* () {
            yield { name: 'amy', id: 1 }
            yield { name: 'bob', id: 2 }
          })()
        ).then(Iterables.get((x) => x.name === 'cat')).result
    ).toThrow('Element not found matching criteria')
  })
  it('finds without partial application', () => {
    expect(
      Iterables.get(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })(),
        (x) => x.name === 'bob'
      )
    ).toEqual({ name: 'bob', id: 2 })
  })
  it('finds by index', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })()
      ).then(Iterables.get((x, index) => index === 1)).result
    ).toEqual({ name: 'bob', id: 2 })
  })
})

describe('find', () => {
  it('finds match', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })()
      ).then(Iterables.find((x) => x.name === 'bob')).result
    ).toEqual({ name: 'bob', id: 2 })
  })
  it('returns undefined when not found', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })()
      ).then(Iterables.find((x) => x.name === 'cat')).result
    ).toBeUndefined()
  })
  it('finds without partial application', () => {
    expect(
      Iterables.find(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })(),
        (x) => x.name === 'bob'
      )
    ).toEqual({ name: 'bob', id: 2 })
  })
  it('finds by index', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })()
      ).then(Iterables.find((x, index) => index === 1)).result
    ).toEqual({ name: 'bob', id: 2 })
  })
})

describe('groupBy', () => {
  it('groups by key', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', age: 1 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 2 }
        })()
      )
        .then(Iterables.groupBy((x) => x.age))
        .then(Iterables.toArray).result
    ).toEqual([
      [1, [{ name: 'amy', age: 1 }]],
      [
        2,
        [
          { name: 'bob', age: 2 },
          { name: 'cat', age: 2 },
        ],
      ],
    ])
  })
  it('groups without partial application', () => {
    expect(
      Iterables.toArray(
        Iterables.groupBy(
          (function* () {
            yield { name: 'amy', age: 1 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 2 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      [1, [{ name: 'amy', age: 1 }]],
      [
        2,
        [
          { name: 'bob', age: 2 },
          { name: 'cat', age: 2 },
        ],
      ],
    ])
  })
  it('groups by index', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', age: 1 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 2 }
        })()
      )
        .then(Iterables.groupBy((x, index) => index % 2))
        .then(Iterables.toArray).result
    ).toEqual([
      [
        0,
        [
          { name: 'amy', age: 1 },
          { name: 'cat', age: 2 },
        ],
      ],
      [1, [{ name: 'bob', age: 2 }]],
    ])
  })
})

describe('init', () => {
  test('empty', () => {
    expect(pipe(Iterables.init(0)).then(Iterables.toArray).result).toEqual([])
  })
  test('just count', () => {
    expect(pipe(Iterables.init(5)).then(Iterables.toArray).result).toEqual([0, 1, 2, 3, 4])
  })
  test('from-to', () => {
    expect(pipe(Iterables.init({ from: 1, to: 3 })).then(Iterables.toArray).result).toEqual([
      1,
      2,
      3,
    ])
  })
  test('from-to-same', () => {
    expect(pipe(Iterables.init({ from: 1, to: 1 })).then(Iterables.toArray).result).toEqual([1])
  })
  test('from-to fractional-increment', () => {
    expect(
      pipe(Iterables.init({ from: 1, to: 2, increment: 0.5 })).then(Iterables.toArray).result
    ).toEqual([1, 1.5, 2])
  })
  test('from-to overshooting-increment', () => {
    expect(
      pipe(Iterables.init({ from: 1, to: 2, increment: 5 })).then(Iterables.toArray).result
    ).toEqual([1])
  })
  test('from positive to negative', () => {
    expect(pipe(Iterables.init({ from: 1, to: -1 })).then(Iterables.toArray).result).toEqual([
      1,
      0,
      -1,
    ])
  })
  test('from negative to positive', () => {
    expect(pipe(Iterables.init({ from: -1, to: 1 })).then(Iterables.toArray).result).toEqual([
      -1,
      0,
      1,
    ])
  })
  test('from positive to negative with fractional increment', () => {
    expect(
      pipe(Iterables.init({ from: 1, to: -1, increment: -0.5 })).then(Iterables.toArray).result
    ).toEqual([1, 0.5, 0, -0.5, -1])
  })
  test('from-to zero increment fails', () => {
    expect(
      () => pipe(Iterables.init({ from: 1, to: 2, increment: 0 })).then(Iterables.toArray).result
    ).toThrow('Iterable will never complete.\nUse initInfinite if this is desired behaviour')
  })
  test('from-to negative fails', () => {
    expect(
      () => pipe(Iterables.init({ from: 1, to: 2, increment: -0.1 })).then(Iterables.toArray).result
    ).toThrow('Iterable will never complete.\nUse initInfinite if this is desired behaviour')
  })
  test('from-to negative crossing zero fails', () => {
    expect(
      () => pipe(Iterables.init({ from: -1, to: 1, increment: -1 })).then(Iterables.toArray).result
    ).toThrow('Iterable will never complete.\nUse initInfinite if this is desired behaviour')
  })
  test('from-to reversed fails', () => {
    expect(
      () => pipe(Iterables.init({ from: 2, to: 1, increment: 1 })).then(Iterables.toArray).result
    ).toThrow('Iterable will never complete.\nUse initInfinite if this is desired behaviour')
  })
  test('from-to reversed crossing zero fails', () => {
    expect(
      () => pipe(Iterables.init({ from: 1, to: -1, increment: 0.1 })).then(Iterables.toArray).result
    ).toThrow('Iterable will never complete.\nUse initInfinite if this is desired behaviour')
  })
  test('count prop', () => {
    expect(Iterables.toArray(Iterables.init({ count: 5 }))).toEqual([0, 1, 2, 3, 4])
  })
  test('start-count', () => {
    expect(Iterables.toArray(Iterables.init({ start: 3, count: 5 }))).toEqual([3, 4, 5, 6, 7])
  })
  test('count-increment', () => {
    expect(Iterables.toArray(Iterables.init({ count: 5, increment: 3 }))).toEqual([0, 3, 6, 9, 12])
  })
})

describe('initInfinite', () => {
  test('defaults', () => {
    expect(
      pipe(Iterables.initInfinite()).then(Iterables.take(5)).then(Iterables.toArray).result
    ).toEqual([0, 1, 2, 3, 4])
  })
  test('no properties', () => {
    expect(
      pipe(Iterables.initInfinite({})).then(Iterables.take(5)).then(Iterables.toArray).result
    ).toEqual([0, 1, 2, 3, 4])
  })
  test('just start', () => {
    expect(
      pipe(Iterables.initInfinite({ start: 5 }))
        .then(Iterables.take(5))
        .then(Iterables.toArray).result
    ).toEqual([5, 6, 7, 8, 9])
  })
  test('just increment', () => {
    expect(
      pipe(Iterables.initInfinite({ increment: 5 }))
        .then(Iterables.take(5))
        .then(Iterables.toArray).result
    ).toEqual([0, 5, 10, 15, 20])
  })
  test('fractional increment', () => {
    expect(
      pipe(Iterables.initInfinite({ increment: 0.5 }))
        .then(Iterables.take(5))
        .then(Iterables.toArray).result
    ).toEqual([0, 0.5, 1, 1.5, 2])
  })
  test('custom range', () => {
    expect(
      pipe(Iterables.initInfinite({ start: 5, increment: 0.5 }))
        .then(Iterables.take(5))
        .then(Iterables.toArray).result
    ).toEqual([5, 5.5, 6, 6.5, 7])
  })
})

describe('take', () => {
  test('piped', () => {
    expect(
      pipe(
        (function* () {
          yield 1
          yield 2
          yield 3
          yield 4
        })(),
        Iterables.skip(2),
        Iterables.toArray
      )
    ).toEqual([3, 4])
  })
  test('invoke', () => {
    expect(
      Iterables.toArray(
        Iterables.skip(
          (function* () {
            yield 1
            yield 2
            yield 3
            yield 4
          })(),
          2
        )
      )
    ).toEqual([3, 4])
  })
})

describe('take', () => {
  test('piped', () => {
    expect(
      pipe(
        (function* () {
          while (true) {
            yield 0
          }
        })()
      )
        .then(Iterables.take(3))
        .then(Iterables.toArray).result
    ).toEqual([0, 0, 0])
  })
  test('invoke', () => {
    expect(
      Iterables.toArray(
        Iterables.take(
          (function* () {
            while (true) {
              yield 0
            }
          })(),
          3
        )
      )
    ).toEqual([0, 0, 0])
  })
})

describe('pairwise', () => {
  test('empty', () => {
    expect(
      pipe(Iterables.init({ count: 0 }))
        .then(Iterables.pairwise)
        .then(Iterables.toArray).result
    ).toEqual([])
  })
  test('single item', () => {
    expect(
      pipe(
        (function* () {
          yield 1
        })()
      )
        .then(Iterables.pairwise)
        .then(Iterables.toArray).result
    ).toEqual([])
  })
  test('multiple items', () => {
    expect(
      pipe(
        (function* () {
          yield 1
          yield 2
          yield 3
        })()
      )
        .then(Iterables.pairwise)
        .then(Iterables.toArray).result
    ).toEqual([
      [1, 2],
      [2, 3],
    ])
  })
})

describe('length', () => {
  it('can return zero length', () => {
    expect(pipe(Iterables.init({ count: 0 })).then(Iterables.length).result).toEqual(0)
  })
  it('can return non-zero length', () => {
    expect(pipe(Iterables.init({ count: 5 })).then(Iterables.length).result).toEqual(5)
  })
})

describe('count', () => {
  test('zero length', () => {
    expect(pipe(Iterables.init({ count: 0 })).then(Iterables.count).result).toEqual(0)
  })
  test('non-zero length', () => {
    expect(pipe(Iterables.init({ count: 5 })).then(Iterables.count).result).toEqual(5)
  })
})

describe('sort', () => {
  test('piped numbers', () => {
    expect(
      pipe(
        (function* () {
          yield 21
          yield 2
          yield 18
        })(),
        Iterables.sort(),
        Iterables.toArray
      )
    ).toEqual([2, 18, 21])
  })
  test('strings, invoked directly', () => {
    expect(
      Iterables.toArray(
        Iterables.sort(
          (function* () {
            yield 'cat'
            yield 'amy'
            yield 'bob'
          })()
        )
      )
    ).toEqual(['amy', 'bob', 'cat'])
  })
  test('with key selector, piped', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        Iterables.sort((x) => x.age),
        Iterables.toArray
      )
    ).toEqual([
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
      { name: 'amy', age: 21 },
    ])
  })
  test('with key selector, direct invoke', () => {
    expect(
      Iterables.toArray(
        Iterables.sort(
          (function* () {
            yield { name: 'amy', age: 21 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 18 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
      { name: 'amy', age: 21 },
    ])
  })
})

describe('sortDescending', () => {
  test('piped numbers', () => {
    expect(
      pipe(
        (function* () {
          yield 21
          yield 2
          yield 18
        })(),
        Iterables.sortDescending(),
        Iterables.toArray
      )
    ).toEqual([21, 18, 2])
  })
  test('strings, invoked directly', () => {
    expect(
      Iterables.toArray(
        Iterables.sortDescending(
          (function* () {
            yield 'cat'
            yield 'amy'
            yield 'bob'
          })()
        )
      )
    ).toEqual(['cat', 'bob', 'amy'])
  })
  test('with key selector, piped', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        Iterables.sortDescending((x) => x.age),
        Iterables.toArray
      )
    ).toEqual([
      { name: 'amy', age: 21 },
      { name: 'cat', age: 18 },
      { name: 'bob', age: 2 },
    ])
  })
  test('with key selector, direct invoke', () => {
    expect(
      Iterables.toArray(
        Iterables.sortDescending(
          (function* () {
            yield { name: 'amy', age: 21 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 18 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      { name: 'amy', age: 21 },
      { name: 'cat', age: 18 },
      { name: 'bob', age: 2 },
    ])
  })
})

describe('sortBy', () => {
  it('sorts by selected key', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })()
      )
        .then(Iterables.sortBy((x) => x.age))
        .then(Iterables.toArray).result
    ).toEqual([
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
      { name: 'amy', age: 21 },
    ])
  })
  it('sorts without partial application', () => {
    expect(
      Iterables.toArray(
        Iterables.sortBy(
          (function* () {
            yield { name: 'amy', age: 21 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 18 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      { name: 'bob', age: 2 },
      { name: 'cat', age: 18 },
      { name: 'amy', age: 21 },
    ])
  })
})

describe('sortByDescending', () => {
  test('piped', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })()
      )
        .then(Iterables.sortByDescending((x) => x.age))
        .then(Iterables.toArray).result
    ).toEqual([
      { name: 'amy', age: 21 },
      { name: 'cat', age: 18 },
      { name: 'bob', age: 2 },
    ])
  })
  test('invoke', () => {
    expect(
      Iterables.toArray(
        Iterables.sortByDescending(
          (function* () {
            yield { name: 'amy', age: 21 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 18 }
          })(),
          (x) => x.age
        )
      )
    ).toEqual([
      { name: 'amy', age: 21 },
      { name: 'cat', age: 18 },
      { name: 'bob', age: 2 },
    ])
  })
})

describe('reverse', () => {
  test('empty iterable', () => {
    expect(Iterables.toArray(Iterables.reverse([]))).toEqual([])
  })
  test('reversal', () => {
    expect(Iterables.toArray(Iterables.reverse([8, 3, 5]))).toEqual([5, 3, 8])
  })
})

describe('sum', () => {
  it('sums without partial application', () => {
    expect(
      Iterables.sum(
        (function* () {
          yield 21
          yield 2
          yield 18
        })()
      )
    ).toEqual(41)
  })
})

describe('sumBy', () => {
  it('sums ages', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })()
      ).then(Iterables.sumBy((x) => x.age)).result
    ).toEqual(41)
  })
  it('sums without partial application', () => {
    expect(
      Iterables.sumBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    ).toEqual(41)
  })
})

describe('max', () => {
  it('finds max', () => {
    expect(
      Iterables.max(
        (function* () {
          yield 2
          yield 21
          yield 18
        })()
      )
    ).toEqual(21)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.max([])).toThrow(`Can't find max of an empty collection`)
  })
})

describe('maxBy', () => {
  it('finds max age', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })()
      ).then(Iterables.maxBy((x) => x.age)).result
    ).toEqual(21)
  })
  it('fails on empty collection', () => {
    expect(() => pipe([]).then(Iterables.maxBy((x) => x)).result).toThrow(
      `Can't find max of an empty collection`
    )
  })
  it('works without partial application', () => {
    expect(
      Iterables.maxBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    ).toEqual(21)
  })
})

describe('min', () => {
  it('finds min', () => {
    expect(
      Iterables.min(
        (function* () {
          yield 21
          yield 2
          yield 18
        })()
      )
    ).toEqual(2)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.min([])).toThrow(`Can't find min of an empty collection`)
  })
})

describe('minBy', () => {
  it('finds min age', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })()
      ).then(Iterables.minBy((x) => x.age)).result
    ).toEqual(2)
  })
  it('fails on empty collection', () => {
    expect(() => pipe([]).then(Iterables.minBy((x) => x)).result).toThrow(
      `Can't find min of an empty collection`
    )
  })
  it('works without partial application', () => {
    expect(
      Iterables.minBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        (x) => x.age
      )
    ).toEqual(2)
  })
})

describe('mean', () => {
  it('finds mean', () => {
    expect(
      Iterables.mean(
        (function* () {
          yield 21
          yield 2
          yield 18
          yield 39
        })()
      )
    ).toEqual(20)
  })
  it('fails on empty collection', () => {
    expect(() => Iterables.mean([])).toThrow(`Can't find mean of an empty collection`)
  })
})

describe('meanBy', () => {
  it('finds mean age', () => {
    expect(
      pipe(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
          yield { name: 'dot', age: 39 }
        })()
      ).then(Iterables.meanBy((x) => x.age)).result
    ).toEqual(20)
  })
  it('fails on empty collection', () => {
    expect(() => pipe([]).then(Iterables.meanBy((x) => x)).result).toThrow(
      `Can't find mean of an empty collection`
    )
  })
  it('works without partial application', () => {
    expect(
      Iterables.meanBy(
        (function* () {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
          yield { name: 'dot', age: 39 }
        })(),
        (x) => x.age
      )
    ).toEqual(20)
  })
})
