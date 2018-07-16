import { pipe, Iterables } from '../src/collection-fns'

describe('toArray', () => {
  it('constructs an array', () => {
    const iterator = function*() {
      yield 1
      yield 2
    }
    expect(Iterables.toArray(iterator())).toEqual([1, 2])
  })
})

describe('map', () => {
  it('maps empty collection', () => {
    expect(Array.from(Iterables.map(x => x)([]))).toEqual([])
  })
  it('maps items with partial application', () => {
    expect(
      pipe(
        (function*() {
          yield 1
          yield 2
        })()
      )
        .then(Iterables.map(x => x * 2))
        .then(Iterables.toArray).result
    ).toEqual([2, 4])
  })
  it('maps items without partial application', () => {
    expect(
      pipe(
        Iterables.map(
          (function*() {
            yield 1
            yield 2
          })(),
          x => x * 2
        )
      ).then(Iterables.toArray).result
    ).toEqual([2, 4])
  })
})

describe('filter', () => {
  it('can filter empty collection', () => {
    expect(
      pipe([])
        .then(Iterables.filter(x => true))
        .then(Iterables.toArray).result
    ).toEqual([])
  })
  it('can filter out everything', () => {
    expect(
      pipe([1, 2])
        .then(Iterables.filter(x => false))
        .then(Iterables.toArray).result
    ).toEqual([])
  })
  it('can filters based on criteria', () => {
    expect(
      pipe([1, 2])
        .then(Iterables.filter(x => x % 2 === 0))
        .then(Iterables.toArray).result
    ).toEqual([2])
  })
  it('can filters without partial application', () => {
    expect(pipe(Iterables.filter([1, 2], x => x % 2 === 0)).then(Iterables.toArray).result).toEqual(
      [2]
    )
  })
})

describe('choose', () => {
  it('chooses defined values', () => {
    expect(
      pipe([1, 2, 3])
        .then(Iterables.choose(x => (x % 2 === 1 ? x * 2 : undefined)))
        .then(Iterables.toArray).result
    ).toEqual([2, 6])
  })
  it('can choose without partial application', () => {
    expect(
      pipe(Iterables.choose([1, 2, 3], x => (x % 2 === 1 ? x * 2 : undefined))).then(
        Iterables.toArray
      ).result
    ).toEqual([2, 6])
  })
})

describe('collect', () => {
  it('can collect iterables', () => {
    expect(
      pipe([1, 2])
        .then(
          Iterables.collect(function*(x) {
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
        Iterables.collect([1, 2], function*(x) {
          yield x
          yield x
        })
      ).then(Iterables.toArray).result
    ).toEqual([1, 1, 2, 2])
  })
})

describe('append', () => {
  it('appends two iterators', () => {
    expect(
      pipe(
        (function*() {
          yield 1
        })()
      )
        .then(
          Iterables.append(
            (function*() {
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
          (function*() {
            yield 1
          })(),
          (function*() {
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
        (function*() {
          yield (function*() {
            yield 1
            yield 2
          })()
          yield (function*() {
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

describe('distinctBy', () => {
  it('ignores duplicates', () => {
    expect(
      pipe(
        (function*() {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
          yield { name: 'bob', id: 3 }
          yield { name: 'cat', id: 3 }
        })()
      )
        .then(Iterables.distinctBy(x => x.name))
        .then(Iterables.toArray).result
    ).toEqual([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }, { name: 'cat', id: 3 }])
  })
  it('ignores duplicates without partial application', () => {
    expect(
      Iterables.toArray(
        Iterables.distinctBy(
          (function*() {
            yield { name: 'amy', id: 1 }
            yield { name: 'bob', id: 2 }
            yield { name: 'bob', id: 3 }
            yield { name: 'cat', id: 3 }
          })(),
          x => x.name
        )
      )
    ).toEqual([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }, { name: 'cat', id: 3 }])
  })
})

describe('exists', () => {
  it('matches existance', () => {
    expect(
      pipe(
        (function*() {
          yield 1
          yield 2
        })()
      ).then(Iterables.exists(x => x === 1)).result
    ).toEqual(true)
  })
  it('matches non-existance', () => {
    expect(
      pipe(
        (function*() {
          yield 1
          yield 2
        })()
      ).then(Iterables.exists(x => x === 3)).result
    ).toEqual(false)
  })
  it('matches without partial application', () => {
    expect(
      Iterables.exists(
        (function*() {
          yield 1
          yield 2
        })(),
        x => x === 1
      )
    ).toEqual(true)
  })
})

describe('get', () => {
  it('finds match', () => {
    expect(
      pipe(
        (function*() {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })()
      ).then(Iterables.get(x => x.name === 'bob')).result
    ).toEqual({ name: 'bob', id: 2 })
  })
  it('throws when not found', () => {
    expect(
      () =>
        pipe(
          (function*() {
            yield { name: 'amy', id: 1 }
            yield { name: 'bob', id: 2 }
          })()
        ).then(Iterables.get(x => x.name === 'cat')).result
    ).toThrow('Element not found matching criteria')
  })
  it('finds without partial application', () => {
    expect(
      Iterables.get(
        (function*() {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })(),
        x => x.name === 'bob'
      )
    ).toEqual({ name: 'bob', id: 2 })
  })
})

describe('find', () => {
  it('finds match', () => {
    expect(
      pipe(
        (function*() {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })()
      ).then(Iterables.find(x => x.name === 'bob')).result
    ).toEqual({ name: 'bob', id: 2 })
  })
  it('returns undefined when not found', () => {
    expect(
      pipe(
        (function*() {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })()
      ).then(Iterables.find(x => x.name === 'cat')).result
    ).toBeUndefined()
  })
  it('finds without partial application', () => {
    expect(
      Iterables.find(
        (function*() {
          yield { name: 'amy', id: 1 }
          yield { name: 'bob', id: 2 }
        })(),
        x => x.name === 'bob'
      )
    ).toEqual({ name: 'bob', id: 2 })
  })
})

describe('groupBy', () => {
  it('groups by key', () => {
    expect(
      pipe(
        (function*() {
          yield { name: 'amy', age: 1 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 2 }
        })()
      )
        .then(Iterables.groupBy(x => x.age))
        .then(Iterables.toArray).result
    ).toEqual([
      [1, [{ name: 'amy', age: 1 }]],
      [2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]]
    ])
  })
  it('groups without partial application', () => {
    expect(
      Iterables.toArray(
        Iterables.groupBy(
          (function*() {
            yield { name: 'amy', age: 1 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 2 }
          })(),
          x => x.age
        )
      )
    ).toEqual([
      [1, [{ name: 'amy', age: 1 }]],
      [2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]]
    ])
  })
})

describe('init', () => {
  it('creates elements', () => {
    expect(pipe(Iterables.init(3)(i => i + 1)).then(Iterables.toArray).result).toEqual([1, 2, 3])
  })
  it('can create empty', () => {
    expect(pipe(Iterables.init(0)(i => i)).then(Iterables.toArray).result).toEqual([])
  })
  it('can init without partial application', () => {
    expect(Iterables.toArray(Iterables.init(i => i + 1, 3))).toEqual([1, 2, 3])
  })
})

describe('length', () => {
  it('can return zero length', () => {
    expect(pipe(Iterables.init(0)(i => i)).then(Iterables.length).result).toEqual(0)
  })
  it('can return non-zero length', () => {
    expect(pipe(Iterables.init(5)(i => i)).then(Iterables.length).result).toEqual(5)
  })
})

describe('sortBy', () => {
  it('sorts by selected key', () => {
    expect(
      pipe(
        (function*() {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })()
      )
        .then(Iterables.sortBy(x => x.age))
        .then(Iterables.toArray).result
    ).toEqual([{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }])
  })
  it('sorts without partial application', () => {
    expect(
      Iterables.toArray(
        Iterables.sortBy(
          (function*() {
            yield { name: 'amy', age: 21 }
            yield { name: 'bob', age: 2 }
            yield { name: 'cat', age: 18 }
          })(),
          x => x.age
        )
      )
    ).toEqual([{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }])
  })
})

describe('sumBy', () => {
  it('sums ages', () => {
    expect(
      pipe(
        (function*() {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })()
      ).then(Iterables.sumBy(x => x.age)).result
    ).toEqual(41)
  })
  it('sums without partial application', () => {
    expect(
      Iterables.sumBy(
        (function*() {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        x => x.age
      )
    ).toEqual(41)
  })
})

describe('maxBy', () => {
  it('finds max age', () => {
    expect(
      pipe(
        (function*() {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })()
      ).then(Iterables.maxBy(x => x.age)).result
    ).toEqual(21)
  })
  it('fails on empty collection', () => {
    expect(() => pipe([]).then(Iterables.maxBy(x => x)).result).toThrow(
      `Can't find max of an empty collection`
    )
  })
  it('works without partial application', () => {
    expect(
      Iterables.maxBy(
        (function*() {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        x => x.age
      )
    ).toEqual(21)
  })
})

describe('minBy', () => {
  it('finds min age', () => {
    expect(
      pipe(
        (function*() {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })()
      ).then(Iterables.minBy(x => x.age)).result
    ).toEqual(2)
  })
  it('fails on empty collection', () => {
    expect(() => pipe([]).then(Iterables.minBy(x => x)).result).toThrow(
      `Can't find min of an empty collection`
    )
  })
  it('works without partial application', () => {
    expect(
      Iterables.minBy(
        (function*() {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
        })(),
        x => x.age
      )
    ).toEqual(2)
  })
})

describe('meanBy', () => {
  it('finds mean age', () => {
    expect(
      pipe(
        (function*() {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
          yield { name: 'dot', age: 39 }
        })()
      ).then(Iterables.meanBy(x => x.age)).result
    ).toEqual(20)
  })
  it('fails on empty collection', () => {
    expect(() => pipe([]).then(Iterables.meanBy(x => x)).result).toThrow(
      `Can't find mean of an empty collection`
    )
  })
  it('works without partial application', () => {
    expect(
      Iterables.meanBy(
        (function*() {
          yield { name: 'amy', age: 21 }
          yield { name: 'bob', age: 2 }
          yield { name: 'cat', age: 18 }
          yield { name: 'dot', age: 39 }
        })(),
        x => x.age
      )
    ).toEqual(20)
  })
})
