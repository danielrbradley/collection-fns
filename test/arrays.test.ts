import { pipe, Arrays } from '../src/collection-fns'

describe('ofIterable', () => {
  it('constructs an array', () => {
    const iterator = function*() {
      yield 1
      yield 2
    }
    expect(Arrays.ofIterable(iterator())).toEqual([1, 2])
  })
})

describe('map', () => {
  test('empty', () => {
    expect(Arrays.map(x => x)([])).toEqual([])
  })
  test('piped', () => {
    expect(pipe([1, 2]).then(Arrays.map(x => x * 2)).result).toEqual([2, 4])
  })
  test('invoke', () => {
    expect(Arrays.map([1, 2], x => x * 2)).toEqual([2, 4])
  })
})

describe('filter', () => {
  test('empty', () => {
    expect(Arrays.filter([], x => true)).toEqual([])
  })
  test('piped', () => {
    expect(pipe([1, 2, 3, 4]).then(Arrays.filter(x => x % 2 === 0)).result).toEqual([2, 4])
  })
  test('invoke', () => {
    expect(Arrays.filter([1, 2, 3, 4], x => x % 2 === 0)).toEqual([2, 4])
  })
})

describe('choose', () => {
  test('piped', () => {
    expect(
      pipe([1, 2, 3]).then(Arrays.choose(x => (x % 2 === 1 ? x * 2 : undefined))).result
    ).toEqual([2, 6])
  })
  test('invoke', () => {
    expect(Arrays.choose([1, 2, 3], x => (x % 2 === 1 ? x * 2 : undefined))).toEqual([2, 6])
  })
})

describe('collect', () => {
  test('piped', () => {
    expect(
      pipe([1, 2]).then(
        Arrays.collect(function(x) {
          return [x, x]
        })
      ).result
    ).toEqual([1, 1, 2, 2])
  })
  test('invoke', () => {
    expect(
      Arrays.collect([1, 2], function(x) {
        return [x, x]
      })
    ).toEqual([1, 1, 2, 2])
  })
})

describe('append', () => {
  test('piped', () => {
    expect(pipe([1]).then(Arrays.append([2])).result).toEqual([1, 2])
  })
  test('invoke', () => {
    expect(Arrays.append([1], [2])).toEqual([1, 2])
  })
})

test('concat', () => {
  expect(Arrays.concat([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5])
})

describe('distinctBy', () => {
  test('piping', () => {
    expect(
      pipe([
        { name: 'amy', id: 1 },
        { name: 'bob', id: 2 },
        { name: 'bob', id: 3 },
        { name: 'cat', id: 3 }
      ]).then(Arrays.distinctBy(x => x.name)).result
    ).toEqual([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }, { name: 'cat', id: 3 }])
  })
  test('invoke', () => {
    expect(
      Arrays.distinctBy(
        [
          { name: 'amy', id: 1 },
          { name: 'bob', id: 2 },
          { name: 'bob', id: 3 },
          { name: 'cat', id: 3 }
        ],
        x => x.name
      )
    ).toEqual([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }, { name: 'cat', id: 3 }])
  })
})

describe('exists', () => {
  it('matches existance', () => {
    expect(pipe([1, 2]).then(Arrays.exists(x => x === 1)).result).toEqual(true)
  })
  it('matches non-existance', () => {
    expect(pipe([1, 2]).then(Arrays.exists(x => x === 3)).result).toEqual(false)
  })
  test('invoke', () => {
    expect(Arrays.exists([1, 2], x => x === 1)).toEqual(true)
  })
})

describe('get', () => {
  test('piped match', () => {
    expect(
      pipe([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }]).then(Arrays.get(x => x.name === 'bob'))
        .result
    ).toEqual({ name: 'bob', id: 2 })
  })
  test('no match', () => {
    expect(
      () =>
        pipe([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }]).then(
          Arrays.get(x => x.name === 'cat')
        ).result
    ).toThrow('Element not found matching criteria')
  })
  test('invoke', () => {
    expect(
      Arrays.get([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], x => x.name === 'bob')
    ).toEqual({ name: 'bob', id: 2 })
  })
})

describe('find', () => {
  test('piped match', () => {
    expect(
      pipe([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }]).then(
        Arrays.find(x => x.name === 'bob')
      ).result
    ).toEqual({ name: 'bob', id: 2 })
  })
  it('returns undefined when not found', () => {
    expect(
      pipe([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }]).then(
        Arrays.find(x => x.name === 'cat')
      ).result
    ).toBeUndefined()
  })
  test('invoke', () => {
    expect(
      Arrays.find([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], x => x.name === 'bob')
    ).toEqual({ name: 'bob', id: 2 })
  })
})

describe('groupBy', () => {
  test('piped', () => {
    expect(
      pipe([{ name: 'amy', age: 1 }, { name: 'bob', age: 2 }, { name: 'cat', age: 2 }]).then(
        Arrays.groupBy(x => x.age)
      ).result
    ).toEqual([
      [1, [{ name: 'amy', age: 1 }]],
      [2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]]
    ])
  })
  test('invoke', () => {
    expect(
      Arrays.groupBy(
        [{ name: 'amy', age: 1 }, { name: 'bob', age: 2 }, { name: 'cat', age: 2 }],
        x => x.age
      )
    ).toEqual([
      [1, [{ name: 'amy', age: 1 }]],
      [2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]]
    ])
  })
})

describe('init', () => {
  test('empty', () => {
    expect(Arrays.init(0)).toEqual([])
  })
  test('just count', () => {
    expect(Arrays.init(5)).toEqual([0, 1, 2, 3, 4])
  })
  test('with mapping', () => {
    expect(Arrays.init(5, x => x * x)).toEqual([0, 1, 4, 9, 16])
  })
  test('from-to', () => {
    expect(Arrays.init({ from: 1, to: 3 })).toEqual([1, 2, 3])
  })
  test('from-to-same', () => {
    expect(Arrays.init({ from: 1, to: 1 })).toEqual([1])
  })
  test('from-to fractional-increment', () => {
    expect(Arrays.init({ from: 1, to: 2, increment: 0.5 })).toEqual([1, 1.5, 2])
  })
  test('from positive to negative', () => {
    expect(Arrays.init({ from: 1, to: -1 })).toEqual([1, 0, -1])
  })
  test('from negative to positive', () => {
    expect(Arrays.init({ from: -1, to: 1 })).toEqual([-1, 0, 1])
  })
  test('from-to zero increment fails', () => {
    expect(() => Arrays.init({ from: 1, to: 2, increment: 0 })).toThrow(
      'Requested array is of infinite size.'
    )
  })
  test('from-to negative fails', () => {
    expect(() => Arrays.init({ from: 1, to: 2, increment: -0.1 })).toThrow(
      'Requested array is of infinite size.'
    )
  })
  test('from-to negative crossing zero fails', () => {
    expect(() => Arrays.init({ from: -1, to: 1, increment: -1 })).toThrow(
      'Requested array is of infinite size.'
    )
  })
  test('from-to reversed fails', () => {
    expect(() => Arrays.init({ from: 2, to: 1, increment: 1 })).toThrow(
      'Requested array is of infinite size.'
    )
  })
  test('from-to reversed crossing zero fails', () => {
    expect(() => Arrays.init({ from: 1, to: -1, increment: 0.1 })).toThrow(
      'Requested array is of infinite size.'
    )
  })
  test('start-count', () => {
    expect(Arrays.init({ start: 3, count: 5 })).toEqual([3, 4, 5, 6, 7])
  })
  test('count prop', () => {
    expect(Arrays.init({ count: 5 })).toEqual([0, 1, 2, 3, 4])
  })
  test('start-count', () => {
    expect(Arrays.init({ start: 3, count: 5 })).toEqual([3, 4, 5, 6, 7])
  })
  test('count-increment', () => {
    expect(Arrays.init({ count: 5, increment: 3 })).toEqual([0, 3, 6, 9, 12])
  })
})

describe('length', () => {
  test('zero length', () => {
    expect(Arrays.length([])).toEqual(0)
  })
  test('non-zero length', () => {
    expect(Arrays.length([1, 2, 3, 4, 5])).toEqual(5)
  })
})

describe('sortBy', () => {
  test('piped', () => {
    expect(
      pipe([{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }]).then(
        Arrays.sortBy(x => x.age)
      ).result
    ).toEqual([{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }])
  })
  test('invoke', () => {
    expect(
      Arrays.sortBy(
        [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
        x => x.age
      )
    ).toEqual([{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }])
  })
})

describe('sumBy', () => {
  test('piping', () => {
    expect(
      pipe([{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }]).then(
        Arrays.sumBy(x => x.age)
      ).result
    ).toEqual(41)
  })
  test('invoke', () => {
    expect(
      Arrays.sumBy(
        [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
        x => x.age
      )
    ).toEqual(41)
  })
})

describe('maxBy', () => {
  test('piping', () => {
    expect(
      pipe([{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }]).then(
        Arrays.maxBy(x => x.age)
      ).result
    ).toEqual(21)
  })
  it('fails on empty collection', () => {
    expect(() => pipe([]).then(Arrays.maxBy(x => x)).result).toThrow(
      `Can't find max of an empty array`
    )
  })
  test('invoke', () => {
    expect(
      Arrays.maxBy(
        [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
        x => x.age
      )
    ).toEqual(21)
  })
})

describe('minBy', () => {
  test('piping', () => {
    expect(
      pipe([{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }]).then(
        Arrays.minBy(x => x.age)
      ).result
    ).toEqual(2)
  })
  it('fails on empty collection', () => {
    expect(() => pipe([]).then(Arrays.minBy(x => x)).result).toThrow(
      `Can't find min of an empty array`
    )
  })
  test('invoke', () => {
    expect(
      Arrays.minBy(
        [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
        x => x.age
      )
    ).toEqual(2)
  })
})

describe('meanBy', () => {
  test('piping', () => {
    expect(
      pipe([
        { name: 'amy', age: 21 },
        { name: 'bob', age: 2 },
        { name: 'cat', age: 18 },
        { name: 'dot', age: 39 }
      ]).then(Arrays.meanBy(x => x.age)).result
    ).toEqual(20)
  })
  it('fails on empty collection', () => {
    expect(() => pipe([]).then(Arrays.meanBy(x => x)).result).toThrow(
      `Can't find mean of an empty array`
    )
  })
  test('invoke', () => {
    expect(
      Arrays.meanBy(
        [
          { name: 'amy', age: 21 },
          { name: 'bob', age: 2 },
          { name: 'cat', age: 18 },
          { name: 'dot', age: 39 }
        ],
        x => x.age
      )
    ).toEqual(20)
  })
})
