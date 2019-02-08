/**
 * Creates an array from the source iterable object.
 * @param source An Iterable objext to convert to an array.
 * @example
 * Arrays.ofIterable((function*() {
 *    yield 1
 *    yield 2
 *  })()) // [1, 2]
 *
 * // or using pipe
 * pipe(
 *  (function*() {
 *     yield 1
 *     yield 2
 *   })(),
 *   Arrays.ofIterable
 * ) // [1, 2]
 */
export function ofIterable<T>(source: Iterable<T>): T[] {
  return Array.from(source)
}

/**
 * Creates a new array whose elements are the results of applying the specified mapping to each of the elements of the source collection.
 * @param mapping A function to transform items from the input collection.
 * @example
 * Arrays.map([1, 2], x => x * 2) // [2, 4]
 * // or using pipe
 * pipe([1, 2], Arrays.map(x => x * 2)) // [2, 4]
 */
export function map<T, U>(mapping: (item: T, index: number) => U): (source: ReadonlyArray<T>) => U[]
/**
 * Creates a new array whose elements are the results of applying the specified mapping to each of the elements of the source collection.
 * @param source The input collection.
 * @param mapping A function to transform items from the input collection.
 * @example
 * Arrays.map([1, 2], x => x * 2) // [2, 4]
 * // or using pipe
 * pipe([1, 2], Arrays.map(x => x * 2)) // [2, 4]
 */
export function map<T, U>(source: ReadonlyArray<T>, mapping: (item: T, index: number) => U): U[]
export function map<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T, index: number) => U = partial ? a : b
  function exec(source: ReadonlyArray<T>) {
    return source.map(mapping)
  }
  return partial ? exec : exec(a)
}

/**
 * Returns a new array containing only the elements of the collection for which the given predicate returns true.
 * @param predicate A function to test whether each item in the input collection should be included in the output.
 * @example
 * Arrays.filter([1, 2, 3, 4], x => x % 2 === 0) // [2, 4]
 * // or using pipe
 * pipe([1, 2, 3, 4], Arrays.filter(x => x % 2 === 0)) // [2, 4]
 */
export function filter<T>(
  predicate: (item: T, index: number) => boolean
): (source: ReadonlyArray<T>) => T[]
/**
 * Returns a new array containing only the elements of the collection for which the given predicate returns true.
 * @param source The input collection.
 * @param predicate A function to test whether each item in the input collection should be included in the output.
 * @example
 * Arrays.filter([1, 2, 3, 4], x => x % 2 === 0) // [2, 4]
 * // or using pipe
 * pipe([1, 2, 3, 4], Arrays.filter(x => x % 2 === 0)) // [2, 4]
 */
export function filter<T>(
  source: ReadonlyArray<T>,
  predicate: (item: T, index: number) => boolean
): T[]
export function filter<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T, index: number) => boolean = partial ? a : b
  function exec(source: ReadonlyArray<T>) {
    return source.filter(predicate)
  }
  return partial ? exec : exec(a)
}

/**
 * Applies the given function to each element of the array and returns a new array comprised of the results for each element where the function returns a value.
 * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
 * @example
 * Arrays.choose(
 *  [1, 2, 3],
 *  x => (x % 2 === 1 ? x * 2 : undefined)
 * ) // [2, 6]
 *
 * // or using pipe
 * pipe(
 *  [1, 2, 3],
 *  Arrays.choose(x => (x % 2 === 1 ? x * 2 : undefined))
 * ) // [2, 6]
 */
export function choose<T, U>(
  chooser: (item: T, index: number) => U | undefined
): (source: ReadonlyArray<T>) => U[]
/**
 * Applies the given function to each element of the array and returns a new array comprised of the results for each element where the function returns a value.
 * @param source The input collection.
 * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
 * @example
 * Arrays.choose(
 *  [1, 2, 3],
 *  x => (x % 2 === 1 ? x * 2 : undefined)
 * ) // [2, 6]
 * // or using pipe
 * pipe(
 *  [1, 2, 3],
 *  Arrays.choose(x => (x % 2 === 1 ? x * 2 : undefined))
 * ) // [2, 6]
 */
export function choose<T, U>(
  source: ReadonlyArray<T>,
  chooser: (item: T, index: number) => U | undefined
): U[]
export function choose<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const chooser: (item: T, index: number) => U | undefined = partial ? a : b
  function exec(source: ReadonlyArray<T>) {
    const target = []
    let index = 0
    for (const item of source) {
      const chosen = chooser(item, index)
      if (chosen !== undefined) {
        target.push(chosen)
      }
      index++
    }
    return target
  }
  return partial ? exec : exec(a)
}

/**
 * Applies the given function to each element of the source array and concatenates all the results.
 * @param mapping A function to transform elements of the input collection into collections that are concatenated.
 * @example
 * Arrays.collect([1, 2], x => [x, x]) // [1, 1, 2, 2]
 * // or using pipe
 * pipe([1, 2], Arrays.collect(x => [x, x])) // [1, 1, 2, 2]
 */
export function collect<T, U>(
  mapping: (item: T, index: number) => Iterable<U>
): (source: ReadonlyArray<T>) => U[]
/**
 * Applies the given function to each element of the source array and concatenates all the results.
 * @param source The input collection.
 * @param mapping A function to transform elements of the input collection into collections that are concatenated.
 * @example
 * Arrays.collect([1, 2], x => [x, x]) // [1, 1, 2, 2]
 * // or using pipe
 * pipe([1, 2], Arrays.collect(x => [x, x])) // [1, 1, 2, 2]
 */
export function collect<T, U>(
  source: ReadonlyArray<T>,
  mapping: (item: T, index: number) => Iterable<U>
): U[]
export function collect<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T, index: number) => Iterable<U> = partial ? a : b
  function exec(source: ReadonlyArray<T>) {
    const target = []
    let index = 0
    for (const item of source) {
      const children = mapping(item, index)
      for (const child of children) {
        target.push(child)
      }
      index++
    }
    return target
  }
  return partial ? exec : exec(a)
}

/**
 * Wraps the two given arrays as a single concatenated array.
 * @param second The second array.
 * @param first The first array.
 * @example
 * Arrays.append([1], [2]) // [1, 2]
 * // or using pipe
 * pipe([1], Arrays.append([2])) // [1, 2]
 */
export function append<T>(second: T[]): (first: T[]) => T[]
/**
 * Wraps the two given arrays as a single concatenated array.
 * @param first The first array.
 * @param second The second array.
 * @example
 * Arrays.append([1], [2]) // [1, 2]
 * // or using pipe
 * pipe([1], Arrays.append([2])) // [1, 2]
 */
export function append<T>(first: ReadonlyArray<T>, second: ReadonlyArray<T>): T[]
export function append<T>(a: any, b?: any): any {
  const partial = b === undefined
  const second: T[] = partial ? a : b
  function exec(first: T[]): T[] {
    return ([] as T[]).concat(first).concat(second)
  }
  return partial ? exec : exec(a)
}

/**
 * Combines the given collection-of-arrays as a single concatenated array.
 * @param sources The input collection.
 * @example
 * Arrays.concat([[1, 2], [3, 4], [5]]) // [1, 2, 3, 4, 5]
 * // or using pipe
 * pipe([[1, 2], [3, 4], [5]], Arrays.concat) // [1, 2, 3, 4, 5]
 */
export function concat<T>(sources: Iterable<ReadonlyArray<T>>): T[] {
  const target = []
  for (const source of sources) {
    for (const item of source) {
      target.push(item)
    }
  }
  return target
}

/**
 * Returns an array that contains no duplicate entries according to the equality comparisons on
 * the elements. If an element occurs multiple times in the sequence then the later occurrences are
 * discarded.
 * @param source The input collection.
 * @example
 * Arrays.distinct(['amy', 'bob', 'bob', 'cat']) // ['amy', 'bob', 'cat']
 * // or using pipe
 * pipe(['amy', 'bob', 'bob', 'cat'], Arrays.distinct) // ['amy', 'bob', 'cat']
 */
export function distinct<T>(source: ReadonlyArray<T>): T[] {
  const asSet = new Set<T>(source)
  return Array.from(asSet)
}

/**
 * Returns an array that contains no duplicate entries according to the equality comparisons on
 * the keys returned by the given key-generating function. If an element occurs multiple times in
 * the sequence then the later occurrences are discarded.
 * @param selector A function that transforms the array items into comparable keys.
 * @param source The input collection.
 * @example
 * pipe([
 *   { name: 'amy', id: 1 },
 *   { name: 'bob', id: 2 },
 *   { name: 'bob', id: 3 },
 *   { name: 'cat', id: 3 }
 *  ],
 *  Arrays.distinctBy(x => x.name)
 * ) // [{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }, { name: 'cat', id: 3 }]
 * // or using pipe
 * Arrays.distinctBy([
 *   { name: 'amy', id: 1 },
 *   { name: 'bob', id: 2 },
 *   { name: 'bob', id: 3 },
 *   { name: 'cat', id: 3 }
 *  ],
 *  x => x.name
 * ) // [{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }, { name: 'cat', id: 3 }]
 */
export function distinctBy<T, Key>(
  selector: (item: T, index: number) => Key
): (source: ReadonlyArray<T>) => T[]
/**
 * Returns an array that contains no duplicate entries according to the equality comparisons on
 * the keys returned by the given key-generating function. If an element occurs multiple times in
 * the sequence then the later occurrences are discarded.
 * @param source The input collection.
 * @param selector A function that transforms the array items into comparable keys.
 * @example
 * pipe([
 *   { name: 'amy', id: 1 },
 *   { name: 'bob', id: 2 },
 *   { name: 'bob', id: 3 },
 *   { name: 'cat', id: 3 }
 *  ],
 *  Arrays.distinctBy(x => x.name)
 * ) // [{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }, { name: 'cat', id: 3 }]
 * // or using pipe
 * Arrays.distinctBy([
 *   { name: 'amy', id: 1 },
 *   { name: 'bob', id: 2 },
 *   { name: 'bob', id: 3 },
 *   { name: 'cat', id: 3 }
 *  ],
 *  x => x.name
 * ) // [{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }, { name: 'cat', id: 3 }]
 */
export function distinctBy<T, Key>(
  source: ReadonlyArray<T>,
  selector: (item: T, index: number) => Key
): T[]
export function distinctBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T, index: number) => Key = partial ? a : b
  function exec(source: ReadonlyArray<T>): T[] {
    const seen = new Map<Key, T>()
    let index = 0
    for (const item of source) {
      const key = selector(item, index)
      if (!seen.has(key)) {
        seen.set(key, item)
      }
      index++
    }
    return Array.from(seen.values())
  }
  return partial ? exec : exec(a)
}

/**
 * Tests if any element of the array satisfies the given predicate.
 * @param predicate A function to test each item of the input collection.
 * @param source The input collection.
 * @example
 * Arrays.exists([1, 2], x => x === 1) // true
 * // or using pipe
 * pipe([1, 2], Arrays.exists(x => x === 1)) // true
 */
export function exists<T>(
  predicate: (item: T, index: number) => boolean
): (source: ReadonlyArray<T>) => boolean
/**
 * Tests if any element of the array satisfies the given predicate.
 * @param source The input collection.
 * @param predicate A function to test each item of the input collection.
 * @example
 * Arrays.exists([1, 2], x => x === 1) // true
 * // or using pipe
 * pipe([1, 2], Arrays.exists(x => x === 1)) // true
 */
export function exists<T>(
  source: ReadonlyArray<T>,
  predicate: (item: T, index: number) => boolean
): boolean
export function exists<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T, index: number) => boolean = partial ? a : b
  function exec(source: ReadonlyArray<T>): boolean {
    return source.some(predicate)
  }
  return partial ? exec : exec(a)
}

/**
 * Returns the first element for which the given function returns true.
 * If you don't want exceptions, use `find` instead.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @param source The input collection.
 * @throws If no item is found matching the criteria of the predicate.
 * @example
 * Arrays.get([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], x => x.name === 'bob') // { name: 'bob', id: 2 }
 * // or using pipe
 * pipe([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], Arrays.get(x => x.name === 'bob')) // { name: 'bob', id: 2 }
 */
export function get<T>(
  predicate: (item: T, index: number) => boolean
): (source: ReadonlyArray<T>) => T
/**
 * Returns the first element for which the given function returns true or throws if not found.
 * If you don't want exceptions, use `find` instead.
 * @param source The input collection.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @throws If no item is found matching the criteria of the predicate.
 * @example
 * Arrays.get([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], x => x.name === 'bob') // { name: 'bob', id: 2 }
 * // or using pipe
 * pipe([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], Arrays.get(x => x.name === 'bob')) // { name: 'bob', id: 2 }
 */
export function get<T>(source: ReadonlyArray<T>, predicate: (item: T, index: number) => boolean): T
export function get<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T, index: number) => boolean = partial ? a : b
  function exec(source: ReadonlyArray<T>): T | undefined {
    let index = 0
    for (const item of source) {
      if (predicate(item, index)) {
        return item
      }
      index++
    }
    throw new Error('Element not found matching criteria')
  }
  return partial ? exec : exec(a)
}

/**
 * Returns the first element for which the given function returns true, otherwise undefined.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @param source The input collection.
 * @example
 * Arrays.find([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], x => x.name === 'bob') // { name: 'bob', id: 2 }
 * // or using pipe
 * pipe([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], Arrays.find(x => x.name === 'bob')) // { name: 'bob', id: 2 }
 */
export function find<T>(
  predicate: (item: T, index: number) => boolean
): (source: ReadonlyArray<T>) => T | undefined
/**
 * Returns the first element for which the given function returns true, otherwise undefined.
 * @param source The input collection.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @example
 * Arrays.find([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], x => x.name === 'bob') // { name: 'bob', id: 2 }
 * // or using pipe
 * pipe([{ name: 'amy', id: 1 }, { name: 'bob', id: 2 }], Arrays.find(x => x.name === 'bob')) // { name: 'bob', id: 2 }
 */
export function find<T>(
  source: ReadonlyArray<T>,
  predicate: (item: T, index: number) => boolean
): T | undefined
export function find<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T, index: number) => boolean = partial ? a : b
  function exec(source: ReadonlyArray<T>): T | undefined {
    let index = 0
    for (const item of source) {
      if (predicate(item, index)) {
        return item
      }
      index++
    }
    return undefined
  }
  return partial ? exec : exec(a)
}

/**
 * Applies a key-generating function to each element of an array and yields an array of unique
 * keys and an array of all elements that have each key.
 * @param selector A function that transforms an element of the collection into a comparable key.
 * @param source The input collection.
 * @example
 * Arrays.groupBy(
 *  [{ name: 'amy', age: 1 }, { name: 'bob', age: 2 }, { name: 'cat', age: 2 }],
 *  x => x.age
 * ) // [[1, [{ name: 'amy', age: 1 }]], [2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]]]
 * // or using pipe
 * pipe(
 *  [{ name: 'amy', age: 1 }, { name: 'bob', age: 2 }, { name: 'cat', age: 2 }],
 *  Arrays.groupBy(x => x.age)
 * ) // [[1, [{ name: 'amy', age: 1 }]], [2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]]]
 */
export function groupBy<T, Key>(
  selector: (item: T, index: number) => Key
): (source: ReadonlyArray<T>) => [Key, T[]][]
/**
 * Applies a key-generating function to each element of an array and yields an array of unique
 * keys and an array of all elements that have each key.
 * @param source The input collection.
 * @param selector A function that transforms an element of the collection into a comparable key.
 * @example
 * Arrays.groupBy(
 *  [{ name: 'amy', age: 1 }, { name: 'bob', age: 2 }, { name: 'cat', age: 2 }],
 *  x => x.age
 * ) // [[1, [{ name: 'amy', age: 1 }]], [2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]]]
 * // or using pipe
 * pipe(
 *  [{ name: 'amy', age: 1 }, { name: 'bob', age: 2 }, { name: 'cat', age: 2 }],
 *  Arrays.groupBy(x => x.age)
 * ) // [[1, [{ name: 'amy', age: 1 }]], [2, [{ name: 'bob', age: 2 }, { name: 'cat', age: 2 }]]]
 */
export function groupBy<T, Key>(
  source: ReadonlyArray<T>,
  selector: (item: T, index: number) => Key
): [Key, T[]][]
export function groupBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T, index: number) => Key = partial ? a : b
  function exec(source: ReadonlyArray<T>): [Key, T[]][] {
    const groups = new Map<Key, T[]>()
    let index = 0
    for (const item of source) {
      const key = selector(item, index)
      const group = groups.get(key)
      if (group === undefined) {
        groups.set(key, [item])
      } else {
        group.push(item)
      }
      index++
    }
    return Array.from(groups.entries())
  }
  return partial ? exec : exec(a)
}

export interface InitRange {
  from: number
  to: number
  increment?: number
}

export interface InitCount {
  start?: number
  count: number
  increment?: number
}

/**
 * Generates a new array containing the specified number sequence.
 * @param options The sequence of numbers to generate.
 * @throws When the options would result in an iterable that would not complete. If this is the
 * desired behaviour, use initInfinite.
 * @example
 * Arrays.init(3) // [0, 1, 2]
 * Arrays.init(3, x => x * x) // [0, 1, 4]
 * Arrays.init({ from: 1, to: 3 }) // [1, 2, 3]
 * Arrays.init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * Arrays.init({ from: 1, to: -1 }) // [1, 0, -1]
 * Arrays.init({ start: 3, count: 3 }) // [3, 4, 5]
 * Arrays.init({ count: 3, increment: 2 }) // [0, 2, 4]
 * Arrays.init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
export function init(options: InitRange | InitCount): number[]
/**
 * Generates a new array containing the specified number sequence.
 * @param count The number of sequential numbers to generate.
 * @throws When the options would result in an iterable that would not complete. If this is the
 * desired behaviour, use initInfinite.
 * @example
 * Arrays.init(3) // [0, 1, 2]
 * Arrays.init(3, x => x * x) // [0, 1, 4]
 * Arrays.init({ from: 1, to: 3 }) // [1, 2, 3]
 * Arrays.init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * Arrays.init({ from: 1, to: -1 }) // [1, 0, -1]
 * Arrays.init({ start: 3, count: 3 }) // [3, 4, 5]
 * Arrays.init({ count: 3, increment: 2 }) // [0, 2, 4]
 * Arrays.init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
// tslint:disable-next-line:unified-signatures
export function init(count: number): number[]
/**
 * Generates a new array containing elements generated by the initializer funciton.
 * @param options The sequence of numbers to generate.
 * @param initializer A function that generates an item in the array from a given number.
 * @throws When the options would result in an array of infinite size.
 * @example
 * Arrays.init(3) // [0, 1, 2]
 * Arrays.init(3, x => x * x) // [0, 1, 4]
 * Arrays.init({ from: 1, to: 3 }) // [1, 2, 3]
 * Arrays.init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * Arrays.init({ from: 1, to: -1 }) // [1, 0, -1]
 * Arrays.init({ start: 3, count: 3 }) // [3, 4, 5]
 * Arrays.init({ count: 3, increment: 2 }) // [0, 2, 4]
 * Arrays.init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
export function init<T>(options: InitRange | InitCount, initializer: (index: number) => T): T[]
/**
 * Generates a new array containing elements generated by the initializer funciton.
 * @param count The number of sequential numbers to generate.
 * @param initializer A function that generates an item in the array from a given number.
 * @throws When the options would result in an array of infinite size.
 * @example
 * Arrays.init(3) // [0, 1, 2]
 * Arrays.init(3, x => x * x) // [0, 1, 4]
 * Arrays.init({ from: 1, to: 3 }) // [1, 2, 3]
 * Arrays.init({ from: 1, to: 2, increment: 0.5 }) // [1, 1.5, 2]
 * Arrays.init({ from: 1, to: -1 }) // [1, 0, -1]
 * Arrays.init({ start: 3, count: 3 }) // [3, 4, 5]
 * Arrays.init({ count: 3, increment: 2 }) // [0, 2, 4]
 * Arrays.init({ start: 3, count: 5, increment: 2 }) // [3, 5, 7, 9, 11]
 */
export function init<T>(
  // tslint:disable-next-line:unified-signatures
  count: number,
  initializer: (index: number) => T
): T[]
export function init<T>(
  options: number | InitRange | InitCount,
  initializer?: (index: number) => T
): any[] {
  function normaliseOptions() {
    if (typeof options === 'number') {
      return {
        start: 0,
        count: options,
        increment: 1
      }
    }
    if ('from' in options) {
      const sign = options.to < options.from ? -1 : 1
      if (
        options.increment !== undefined &&
        (options.increment === 0 || options.increment / sign < 0)
      ) {
        throw new Error('Requested array is of infinite size.')
      }
      const increment = options.increment ? options.increment : sign
      return {
        start: options.from,
        count: Math.floor((options.to - options.from) / increment + 1),
        increment: increment
      }
    }
    const start = options.start === undefined ? 0 : options.start
    return {
      start,
      count: options.count,
      increment: options.increment === undefined ? 1 : options.increment
    }
  }
  const { start, count, increment } = normaliseOptions()
  const map = initializer === undefined ? (x: number) => x : initializer
  const target = []
  let current = start
  for (let index = 0; index < count; index++) {
    target.push(map(current))
    current += increment
  }
  return target
}

/**
 * Returns the number of items in the array.
 * @param source The input collection.
 * @example
 * Arrays.length([1, 2, 3, 4, 5] // 5
 * // or using pipe
 * pipe([1, 2, 3, 4, 5], Arrays.length) // 5
 */
export function length<T>(source: ReadonlyArray<T>): number {
  return source.length
}

/**
 * Returns the number of items in the array.
 * @param source The input collection.
 * @example
 * Arrays.count([1, 2, 3, 4, 5] // 5
 * // or using pipe
 * pipe([1, 2, 3, 4, 5], Arrays.count) // 5
 */
export function count<T>(source: ReadonlyArray<T>): number {
  return source.length
}

/**
 * Returns a new array ordered by the selected key.
 * If no selector is specified, the elements will be compared directly.
 * @param selector An optional function to transform items of the input sequence into comparable keys.
 * @param source The input collection.
 * @example
 * Arrays.sort([21, 2, 18]) // [2, 18, 21]
 *
 * // with selector
 * Arrays.sort(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
 *
 * // with piping
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.sort(x => x.age)
 * ) // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
 */
export function sort<T, Key>(selector?: (item: T) => Key): (source: ReadonlyArray<T>) => T[]
/**
 * Returns a new array ordered by the selected key.
 * If no selector is specified, the elements will be compared directly.
 * @param source The input collection.
 * @param selector An optional function to transform items of the input sequence into comparable keys.
 * @example
 * Arrays.sort([21, 2, 18]) // [2, 18, 21]
 *
 * // with selector
 * Arrays.sort(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
 *
 * // with piping
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.sort(x => x.age)
 * ) // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
 */
export function sort<T, Key>(source: ReadonlyArray<T>, selector?: (item: T) => Key): T[]
export function sort<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function' || typeof a === 'undefined'
  const optionalSelector: (item: T) => Key = partial ? a : b
  const selector = optionalSelector === undefined ? (x: T) => x : optionalSelector
  function exec(source: ReadonlyArray<T>): T[] {
    const copy = Array.from(source)
    copy.sort((a: T, b: T) => {
      return selector(a) > selector(b) ? 1 : -1
    })
    return copy
  }
  return partial ? exec : exec(a)
}

/**
 * Yields an iterable ordered by the selected key, descending.
 * If no selector is specified, the elements will be compared directly.
 * @param selector An optional function to transform items of the input sequence into comparable keys.
 * @param source The input collection.
 * @example
 * Arrays.sortDescending([21, 2, 18]) // [21, 18, 2]
 *
 * // with selector
 * Arrays.sortDescending(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
 *
 * // with piping
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.sortDescending(x => x.age)
 * ) // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
 */
export function sortDescending<T, Key>(
  selector?: (item: T) => Key
): (source: ReadonlyArray<T>) => T[]
/**
 * Yields an iterable ordered by the selected key descending.
 * If no selector is specified, the elements will be compared directly.
 * @param source The input collection.
 * @param selector An optional function to transform items of the input sequence into comparable keys.
 * @example
 * Arrays.sortDescending([21, 2, 18]) // [21, 18, 2]
 *
 * // with selector
 * Arrays.sortDescending(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
 *
 * // with piping
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.sortDescending(x => x.age)
 * ) // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
 */
export function sortDescending<T, Key>(source: ReadonlyArray<T>, selector?: (item: T) => Key): T[]
export function sortDescending<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function' || typeof a === 'undefined'
  const optionalSelector: (item: T) => Key = partial ? a : b
  const selector = optionalSelector === undefined ? (x: T) => x : optionalSelector
  function exec(source: ReadonlyArray<T>): T[] {
    const copy = Array.from(source)
    copy.sort((a: T, b: T) => {
      return selector(a) < selector(b) ? 1 : -1
    })
    return copy
  }
  return partial ? exec : exec(a)
}

/**
 * Applies a key-generating function to each element of the array and returns a new array ordered by the keys.
 * @param selector A function to transform items of the input sequence into comparable keys.
 * @param source The input collection.
 * @example
 * Arrays.sortBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
 *
 * // with piping
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.sortBy(x => x.age)
 * ) // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
 */
export function sortBy<T, Key>(selector: (item: T) => Key): (source: ReadonlyArray<T>) => T[]
/**
 * Applies a key-generating function to each element of the array and returns a new array ordered by the keys.
 * @param source The input collection.
 * @param selector A function to transform items of the input sequence into comparable keys.
 * @example
 * Arrays.sortBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
 *
 * // with piping
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.sortBy(x => x.age)
 * ) // [{ name: 'bob', age: 2 }, { name: 'cat', age: 18 }, { name: 'amy', age: 21 }]
 */
export function sortBy<T, Key>(source: ReadonlyArray<T>, selector: (item: T) => Key): T[]
export function sortBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function exec(source: ReadonlyArray<T>): T[] {
    const copy = Array.from(source)
    copy.sort((a: T, b: T) => {
      return selector(a) > selector(b) ? 1 : -1
    })
    return copy
  }
  return partial ? exec : exec(a)
}

/**
 * Applies a key-generating function to each element of the array and returns a new array ordered by the keys, descending.
 * @param selector A function to transform items of the input sequence into comparable keys.
 * @param source The input collection.
 * @example
 * // with selector
 * Arrays.sortByDescending(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
 *
 * // with piping
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.sortByDescending(x => x.age)
 * ) // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
 */
export function sortByDescending<T, Key>(
  selector: (item: T) => Key
): (source: ReadonlyArray<T>) => T[]
/**
 * Applies a key-generating function to each element of the array and returns a new array ordered by the keys, descending.
 * @param source The input collection.
 * @param selector A function to transform items of the input sequence into comparable keys.
 * @example
 * // with selector
 * Arrays.sortByDescending(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
 *
 * // with piping
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.sortByDescending(x => x.age)
 * ) // [{ name: 'amy', age: 21 }, { name: 'cat', age: 18 }, { name: 'bob', age: 2 }]
 */
export function sortByDescending<T, Key>(source: ReadonlyArray<T>, selector: (item: T) => Key): T[]
export function sortByDescending<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function exec(source: ReadonlyArray<T>): T[] {
    const copy = Array.from(source)
    copy.sort((a: T, b: T) => {
      return selector(a) > selector(b) ? -1 : 1
    })
    return copy
  }
  return partial ? exec : exec(a)
}

/**
 * Returns a new array with the order of elements reversed.
 * @param source The input collection.
 * @example
 * Arrays.reverse([8, 3, 5]) // [5, 3, 8]
 * // or using pipe
 * pipe([8, 3, 5], Arrays.reverse) // [5, 3, 8]
 */
export function reverse<T>(source: ReadonlyArray<T>): T[] {
  return Array.from(source).reverse()
}

/**
 * Returns the sum of the values in the collection.
 * @param source The input collection.
 * @example
 * Arrays.sum([21, 2, 18]) // 41
 * // or using pipe
 * pipe([21, 2, 18], Arrays.sum) // 41
 */
export function sum(source: ReadonlyArray<number>): number {
  let sum = 0
  for (const item of source) {
    sum += item
  }
  return sum
}

/**
 * Returns the sum of the values returned by the selector for each element in the array.
 * @param selector A function to transform each element into a summable value.
 * @param source The input collection.
 * @example
 * Arrays.sumBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 41
 *
 * // or using pipe
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.sumBy(x => x.age)
 * ) // 41
 */
export function sumBy<T>(selector: (item: T) => number): (source: ReadonlyArray<T>) => number
/**
 * Returns the sum of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a summable value.
 * @example
 * Arrays.sumBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 41
 *
 * // or using pipe
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.sumBy(x => x.age)
 * ) // 41
 */
export function sumBy<T>(source: ReadonlyArray<T>, selector: (item: T) => number): number
export function sumBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: ReadonlyArray<T>): number {
    let sum = 0
    for (const item of source) {
      sum += selector(item)
    }
    return sum
  }
  return partial ? exec : exec(a)
}

/**
 * Returns the maximum of the values in the collection.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * Arrays.max([21, 2, 18]) // 21
 * // or using pipe
 * pipe([21, 2, 18], Arrays.max) // 21
 */
export function max(source: ReadonlyArray<number>): number {
  let max: number | null = null
  for (const item of source) {
    if (max === null || item > max) {
      max = item
    }
  }
  if (max === null) {
    throw new Error(`Can't find max of an empty collection`)
  }
  return max
}

/**
 * Returns the maximum of the values returned by the selector for each element in the array.
 * @param selector A function to transform each element into a comparable value.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * Arrays.maxBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 21
 *
 * // or using pipe
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.maxBy(x => x.age)
 * ) // 21
 */
export function maxBy<T>(selector: (item: T) => number): (source: ReadonlyArray<T>) => number
/**
 * Returns the maximum of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a comparable value.
 * @throws If the collection is empty.
 * @example
 * Arrays.maxBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 21
 *
 * // or using pipe
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.maxBy(x => x.age)
 * ) // 21
 */
export function maxBy<T>(source: ReadonlyArray<T>, selector: (item: T) => number): number
export function maxBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: ReadonlyArray<T>): number {
    let max: number | null = null
    for (const item of source) {
      const value = selector(item)
      if (max === null || value > max) {
        max = value
      }
    }
    if (max === null) {
      throw new Error(`Can't find max of an empty array`)
    }
    return max
  }
  return partial ? exec : exec(a)
}

/**
 * Returns the minimum of the values in the collection.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * Arrays.min([21, 2, 18]) // 2
 * // or using pipe
 * pipe([21, 2, 18], Arrays.min) // 2
 */
export function min(source: ReadonlyArray<number>): number {
  let min: number | null = null
  for (const item of source) {
    if (min === null || item < min) {
      min = item
    }
  }
  if (min === null) {
    throw new Error(`Can't find min of an empty collection`)
  }
  return min
}

/**
 * Returns the minimum of the values returned by the selector for each element in the array.
 * @param selector A function to transform each element into a comparable value.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * Arrays.minBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 2
 *
 * // or using pipe
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.minBy(x => x.age)
 * ) // 2
 */
export function minBy<T>(selector: (item: T) => number): (source: ReadonlyArray<T>) => number
/**
 * Returns the minimum of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a comparable value.
 * @throws If the collection is empty.
 * @example
 * Arrays.minBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 2
 *
 * // or using pipe
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 2 }, { name: 'cat', age: 18 }],
 *  Arrays.minBy(x => x.age)
 * ) // 2
 */
export function minBy<T>(source: ReadonlyArray<T>, selector: (item: T) => number): number
export function minBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: ReadonlyArray<T>): number {
    let min: number | null = null
    for (const item of source) {
      const value = selector(item)
      if (min === null || value < min) {
        min = value
      }
    }
    if (min === null) {
      throw new Error(`Can't find min of an empty array`)
    }
    return min
  }
  return partial ? exec : exec(a)
}

/**
 * Returns the mean (average) of the values in the collection.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * Arrays.mean([21, 2, 18, 39]) // 20
 * // or using pipe
 * pipe([21, 2, 18, 39], Arrays.mean) // 20
 */
export function mean(source: ReadonlyArray<number>): number {
  let sum = 0
  let count = 0
  for (const item of source) {
    sum += item
    count++
  }
  if (count === 0) {
    throw new Error(`Can't find mean of an empty collection`)
  }
  return sum / count
}

/**
 * Returns the mean (average) of the values returned by the selector for each element in the array.
 * @param selector A function to transform each element into a summable value.
 * @param source The input collection.
 * @throws If the collection is empty.
 * @example
 * Arrays.meanBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 3 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 14
 *
 * // or using pipe
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 3 }, { name: 'cat', age: 18 }],
 *  Arrays.meanBy(x => x.age)
 * ) // 14
 */
export function meanBy<T>(selector: (item: T) => number): (source: ReadonlyArray<T>) => number
/**
 * Returns the mean (average) of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a summable value.
 * @throws If the collection is empty.
 * @example
 * Arrays.meanBy(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 3 }, { name: 'cat', age: 18 }],
 *  x => x.age
 * ) // 14
 *
 * // or using pipe
 * pipe(
 *  [{ name: 'amy', age: 21 }, { name: 'bob', age: 3 }, { name: 'cat', age: 18 }],
 *  Arrays.meanBy(x => x.age)
 * ) // 14
 */
export function meanBy<T>(source: ReadonlyArray<T>, selector: (item: T) => number): number
export function meanBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: ReadonlyArray<T>): number {
    let sum = 0
    let count = 0
    for (const item of source) {
      sum += selector(item)
      count++
    }
    if (count === 0) {
      throw new Error(`Can't find mean of an empty array`)
    }
    return sum / count
  }
  return partial ? exec : exec(a)
}
