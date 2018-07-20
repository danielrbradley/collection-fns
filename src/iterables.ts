/**
 * Creates an array from the source iterable object.
 * @param source An Iterable objext to convert to an array.
 */
export function toArray<T>(source: Iterable<T>): T[] {
  return Array.from(source)
}

/**
 * Creates a new iterable whose elements are the results of applying the specified mapping to each of the elements of the source collection.
 * @param mapping A function to transform items from the input collection.
 */
export function map<T, U>(mapping: (item: T) => U): (source: Iterable<T>) => Iterable<U>
/**
 * Creates a new iterable whose elements are the results of applying the specified mapping to each of the elements of the source collection.
 * @param source The input collection.
 * @param mapping A function to transform items from the input collection.
 */
export function map<T, U>(source: Iterable<T>, mapping: (item: T) => U): Iterable<U>
export function map<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T) => U = partial ? a : b
  function* exec(source: Iterable<T>) {
    for (const item of source) {
      yield mapping(item)
    }
  }
  return partial ? exec : exec(a)
}

/**
 * Returns a new iterable containing only the elements of the collection for which the given predicate returns true.
 * @param predicate A function to test whether each item in the input collection should be included in the output.
 */
export function filter<T>(predicate: (item: T) => boolean): (source: Iterable<T>) => Iterable<T>
/**
 * Returns a new iterable containing only the elements of the collection for which the given predicate returns true.
 * @param source The input collection.
 * @param predicate A function to test whether each item in the input collection should be included in the output.
 */
export function filter<T>(source: Iterable<T>, predicate: (item: T) => boolean): Iterable<T>
export function filter<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function* exec(source: Iterable<T>) {
    for (const item of source) {
      if (predicate(item)) {
        yield item
      }
    }
  }
  return partial ? exec : exec(a)
}

/**
 * Applies the given function to each element of the sequence and returns a new sequence comprised of the results for each element where the function returns a value.
 * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
 */
export function choose<T, U>(
  chooser: (item: T) => U | undefined
): (source: Iterable<T>) => Iterable<U>
/**
 * Applies the given function to each element of the sequence and returns a new sequence comprised of the results for each element where the function returns a value.
 * @param source The input collection.
 * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
 */
export function choose<T, U>(source: Iterable<T>, chooser: (item: T) => U | undefined): Iterable<U>
export function choose<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const chooser: (item: T) => U | undefined = partial ? a : b
  function* exec(source: Iterable<T>) {
    for (const item of source) {
      const chosen = chooser(item)
      if (chosen !== undefined) {
        yield chosen
      }
    }
  }
  return partial ? exec : exec(a)
}

/**
 * Applies the given function to each element of the source iterable and concatenates all the results.
 * @param mapping A function to transform elements of the input collection into collections that are concatenated.
 */
export function collect<T, U>(
  mapping: (item: T) => Iterable<U>
): (source: Iterable<T>) => Iterable<U>
/**
 * Applies the given function to each element of the source iterable and concatenates all the results.
 * @param source The input collection.
 * @param mapping A function to transform elements of the input collection into collections that are concatenated.
 */
export function collect<T, U>(source: Iterable<T>, mapping: (item: T) => Iterable<U>): Iterable<U>
export function collect<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T) => Iterable<U> = partial ? a : b
  function* exec(source: Iterable<T>) {
    for (const item of source) {
      const children = mapping(item)
      for (const child of children) {
        yield child
      }
    }
  }
  return partial ? exec : exec(a)
}

/**
 * Wraps the two given iterables as a single concatenated iterable.
 * @param second The second iterable.
 * @param first The first iterable.
 */
export function append<T>(second: Iterable<T>): (first: Iterable<T>) => Iterable<T>
/**
 * Wraps the two given iterables as a single concatenated iterable.
 * @param first The first iterable.
 * @param second The second iterable.
 */
export function append<T>(first: Iterable<T>, second: Iterable<T>): Iterable<T>
export function append<T>(a: any, b?: any): any {
  const partial = b === undefined
  const second: Iterable<T> = partial ? a : b
  function* exec(first: Iterable<T>): Iterable<T> {
    for (const item of first) {
      yield item
    }
    for (const item of second) {
      yield item
    }
  }
  return partial ? exec : exec(a)
}

/**
 * Combines the given collection-of-iterables as a single concatenated iterable.
 * @param sources The input collection.
 */
export function* concat<T>(sources: Iterable<Iterable<T>>): Iterable<T> {
  for (const source of sources) {
    for (const item of source) {
      yield item
    }
  }
}

/**
 * Returns a iterable that contains no duplicate entries according to the equality comparisons on
 * the keys returned by the given key-generating function. If an element occurs multiple times in
 * the sequence then the later occurrences are discarded.
 * @param selector A function that transforms the collection items into comparable keys.
 * @param source The input collection.
 */
export function distinctBy<T, Key>(selector: (item: T) => Key): (source: Iterable<T>) => Iterable<T>
/**
 * Returns a iterable that contains no duplicate entries according to the equality comparisons on
 * the keys returned by the given key-generating function. If an element occurs multiple times in
 * the sequence then the later occurrences are discarded.
 * @param source The input collection.
 * @param selector A function that transforms the collection items into comparable keys.
 */
export function distinctBy<T, Key>(source: Iterable<T>, selector: (item: T) => Key): Iterable<T>
export function distinctBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function* exec(source: Iterable<T>): Iterable<T> {
    const seen = new Set<Key>()
    for (const item of source) {
      const key = selector(item)
      if (!seen.has(key)) {
        seen.add(key)
        yield item
      }
    }
  }
  return partial ? exec : exec(a)
}

export function exists<T>(predicate: (item: T) => boolean): (source: Iterable<T>) => boolean
export function exists<T>(source: Iterable<T>, predicate: (item: T) => boolean): boolean
export function exists<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: Iterable<T>): boolean {
    for (const item of source) {
      if (predicate(item)) {
        return true
      }
    }
    return false
  }
  return partial ? exec : exec(a)
}

export function get<T>(predicate: (item: T) => boolean): (source: Iterable<T>) => T
export function get<T>(source: Iterable<T>, predicate: (item: T) => boolean): T
export function get<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: Iterable<T>): T | undefined {
    for (const item of source) {
      if (predicate(item)) {
        return item
      }
    }
    throw new Error('Element not found matching criteria')
  }
  return partial ? exec : exec(a)
}

export function find<T>(predicate: (item: T) => boolean): (source: Iterable<T>) => T | undefined
export function find<T>(source: Iterable<T>, predicate: (item: T) => boolean): T | undefined
export function find<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: Iterable<T>): T | undefined {
    for (const item of source) {
      if (predicate(item)) {
        return item
      }
    }
    return undefined
  }
  return partial ? exec : exec(a)
}

export function groupBy<T, Key>(
  selector: (item: T) => Key
): (source: Iterable<T>) => Iterable<[Key, ReadonlyArray<T>]>
export function groupBy<T, Key>(
  source: Iterable<T>,
  selector: (item: T) => Key
): Iterable<[Key, Iterable<T>]>
export function groupBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function exec(source: Iterable<T>): Iterable<[Key, ReadonlyArray<T>]> {
    const groups = new Map<Key, T[]>()
    for (const item of source) {
      const key = selector(item)
      const group = groups.get(key)
      if (group === undefined) {
        groups.set(key, [item])
      } else {
        group.push(item)
      }
    }
    return groups.entries()
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

export function* init(options: number | InitRange | InitCount): Iterable<number> {
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
        throw new Error(
          'Iterable will never complete.\nUse initInfinite if this is desired behaviour'
        )
      }
      const increment = options.increment ? options.increment : sign
      return {
        start: options.from,
        count: (options.to - options.from) / increment + 1,
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
  let current = start
  for (let index = 0; index < count; index++) {
    yield current
    current += increment
  }
}

export function* initInfinite(options?: { start?: number; increment?: number }): Iterable<number> {
  const start = options !== undefined && options.start !== undefined ? options.start : 0
  const increment = options !== undefined && options.increment !== undefined ? options.increment : 1
  for (let index = start; true; index += increment) {
    yield index
  }
}

export function take<T>(count: number): (source: Iterable<T>) => Iterable<T>
export function take<T>(source: Iterable<T>, count: number): Iterable<T>
export function take<T>(a: any, b?: any): any {
  const partial = typeof a === 'number'
  const count: number = partial ? a : b
  function* exec(source: Iterable<T>): Iterable<T> {
    let i = 0
    for (const item of source) {
      if (i < count) {
        i++
        yield item
      } else {
        break
      }
    }
  }
  return partial ? exec : exec(a)
}

export function length<T>(source: Iterable<T>): number {
  return count(source)
}

export function count<T>(source: Iterable<T>): number {
  let length = 0
  for (const _ of source) {
    length++
  }
  return length
}

export function sortBy<T, Key>(selector: (item: T) => Key): (source: Iterable<T>) => Iterable<T>
export function sortBy<T, Key>(source: Iterable<T>, selector: (item: T) => Key): Iterable<T>
export function sortBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function exec(source: Iterable<T>): Iterable<T> {
    const copy = Array.from(source)
    copy.sort((a: T, b: T) => {
      return selector(a) > selector(b) ? 1 : -1
    })
    return copy
  }
  return partial ? exec : exec(a)
}

export function sortByDescending<T, Key>(
  selector: (item: T) => Key
): (source: Iterable<T>) => Iterable<T>
export function sortByDescending<T, Key>(
  source: Iterable<T>,
  selector: (item: T) => Key
): Iterable<T>
export function sortByDescending<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function exec(source: Iterable<T>): Iterable<T> {
    const copy = Array.from(source)
    copy.sort((a: T, b: T) => {
      return selector(a) > selector(b) ? -1 : 1
    })
    return copy
  }
  return partial ? exec : exec(a)
}

export function* reverse<T>(source: Iterable<T>): Iterable<T> {
  const asArray = Array.from(source)
  for (let index = asArray.length - 1; index >= 0; index--) {
    yield asArray[index]
  }
}

export function sumBy<T>(selector: (item: T) => number): (source: Iterable<T>) => number
export function sumBy<T>(source: Iterable<T>, selector: (item: T) => number): number
export function sumBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: Iterable<T>): number {
    let sum = 0
    for (const item of source) {
      sum += selector(item)
    }
    return sum
  }
  return partial ? exec : exec(a)
}

export function maxBy<T>(selector: (item: T) => number): (source: Iterable<T>) => number
export function maxBy<T>(source: Iterable<T>, selector: (item: T) => number): number
export function maxBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: Iterable<T>): number {
    let max: number | null = null
    for (const item of source) {
      const value = selector(item)
      if (max === null || value > max) {
        max = value
      }
    }
    if (max === null) {
      throw new Error(`Can't find max of an empty collection`)
    }
    return max
  }
  return partial ? exec : exec(a)
}

export function minBy<T>(selector: (item: T) => number): (source: Iterable<T>) => number
export function minBy<T>(source: Iterable<T>, selector: (item: T) => number): number
export function minBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: Iterable<T>): number {
    let min: number | null = null
    for (const item of source) {
      const value = selector(item)
      if (min === null || value < min) {
        min = value
      }
    }
    if (min === null) {
      throw new Error(`Can't find min of an empty collection`)
    }
    return min
  }
  return partial ? exec : exec(a)
}

export function meanBy<T>(selector: (item: T) => number): (source: Iterable<T>) => number
export function meanBy<T>(source: Iterable<T>, selector: (item: T) => number): number
export function meanBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: Iterable<T>): number {
    let sum = 0
    let count = 0
    for (const item of source) {
      sum += selector(item)
      count++
    }
    if (count === 0) {
      throw new Error(`Can't find mean of an empty collection`)
    }
    return sum / count
  }
  return partial ? exec : exec(a)
}
