/**
 * Creates an array from the source iterable object.
 * @param source An Iterable objext to convert to an array.
 */
export function ofIterable<T>(source: Iterable<T>): T[] {
  return Array.from(source)
}

/**
 * Creates a new array whose elements are the results of applying the specified mapping to each of the elements of the source collection.
 * @param mapping A function to transform items from the input collection.
 */
export function map<T, U>(mapping: (item: T) => U): (source: T[]) => U[]
/**
 * Creates a new array whose elements are the results of applying the specified mapping to each of the elements of the source collection.
 * @param source The input collection.
 * @param mapping A function to transform items from the input collection.
 */
export function map<T, U>(source: T[], mapping: (item: T) => U): U[]
export function map<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T) => U = partial ? a : b
  function exec(source: T[]) {
    return source.map(mapping)
  }
  return partial ? exec : exec(a)
}

/**
 * Returns a new array containing only the elements of the collection for which the given predicate returns true.
 * @param predicate A function to test whether each item in the input collection should be included in the output.
 */
export function filter<T>(predicate: (item: T) => boolean): (source: T[]) => T[]
/**
 * Returns a new array containing only the elements of the collection for which the given predicate returns true.
 * @param source The input collection.
 * @param predicate A function to test whether each item in the input collection should be included in the output.
 */
export function filter<T>(source: T[], predicate: (item: T) => boolean): T[]
export function filter<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: T[]) {
    return source.filter(predicate)
  }
  return partial ? exec : exec(a)
}

/**
 * Applies the given function to each element of the array and returns a new array comprised of the results for each element where the function returns a value.
 * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
 */
export function choose<T, U>(chooser: (item: T) => U | undefined): (source: T[]) => U[]
/**
 * Applies the given function to each element of the array and returns a new array comprised of the results for each element where the function returns a value.
 * @param source The input collection.
 * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
 */
export function choose<T, U>(source: T[], chooser: (item: T) => U | undefined): U[]
export function choose<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const chooser: (item: T) => U | undefined = partial ? a : b
  function exec(source: T[]) {
    const target = []
    for (const item of source) {
      const chosen = chooser(item)
      if (chosen !== undefined) {
        target.push(chosen)
      }
    }
    return target
  }
  return partial ? exec : exec(a)
}

/**
 * Applies the given function to each element of the source array and concatenates all the results.
 * @param mapping A function to transform elements of the input collection into collections that are concatenated.
 */
export function collect<T, U>(mapping: (item: T) => Iterable<U>): (source: T[]) => U[]
/**
 * Applies the given function to each element of the source array and concatenates all the results.
 * @param source The input collection.
 * @param mapping A function to transform elements of the input collection into collections that are concatenated.
 */
export function collect<T, U>(source: T[], mapping: (item: T) => Iterable<U>): U[]
export function collect<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T) => Iterable<U> = partial ? a : b
  function exec(source: T[]) {
    const target = []
    for (const item of source) {
      const children = mapping(item)
      for (const child of children) {
        target.push(child)
      }
    }
    return target
  }
  return partial ? exec : exec(a)
}

/**
 * Wraps the two given arrays as a single concatenated array.
 * @param second The second array.
 * @param first The first array.
 */
export function append<T>(second: T[]): (first: T[]) => T[]
/**
 * Wraps the two given arrays as a single concatenated array.
 * @param first The first array.
 * @param second The second array.
 */
export function append<T>(first: T[], second: T[]): T[]
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
 */
export function concat<T>(sources: Iterable<T[]>): T[] {
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
 * the keys returned by the given key-generating function. If an element occurs multiple times in
 * the sequence then the later occurrences are discarded.
 * @param selector A function that transforms the array items into comparable keys.
 * @param source The input collection.
 */
export function distinctBy<T, Key>(selector: (item: T) => Key): (source: T[]) => T[]
/**
 * Returns an array that contains no duplicate entries according to the equality comparisons on
 * the keys returned by the given key-generating function. If an element occurs multiple times in
 * the sequence then the later occurrences are discarded.
 * @param source The input collection.
 * @param selector A function that transforms the array items into comparable keys.
 */
export function distinctBy<T, Key>(source: T[], selector: (item: T) => Key): T[]
export function distinctBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function exec(source: T[]): T[] {
    const seen = new Map<Key, T>()
    for (const item of source) {
      const key = selector(item)
      if (!seen.has(key)) {
        seen.set(key, item)
      }
    }
    return Array.from(seen.values())
  }
  return partial ? exec : exec(a)
}

/**
 * Tests if any element of the array satisfies the given predicate.
 * @param predicate A function to test each item of the input collection.
 * @param source The input collection.
 */
export function exists<T>(predicate: (item: T) => boolean): (source: T[]) => boolean
/**
 * Tests if any element of the array satisfies the given predicate.
 * @param source The input collection.
 * @param predicate A function to test each item of the input collection.
 */
export function exists<T>(source: T[], predicate: (item: T) => boolean): boolean
export function exists<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: T[]): boolean {
    return source.some(predicate)
  }
  return partial ? exec : exec(a)
}

export function get<T>(predicate: (item: T) => boolean): (source: T[]) => T
export function get<T>(source: T[], predicate: (item: T) => boolean): T
export function get<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: T[]): T | undefined {
    for (const item of source) {
      if (predicate(item)) {
        return item
      }
    }
    throw new Error('Element not found matching criteria')
  }
  return partial ? exec : exec(a)
}

export function find<T>(predicate: (item: T) => boolean): (source: T[]) => T | undefined
export function find<T>(source: T[], predicate: (item: T) => boolean): T | undefined
export function find<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: T[]): T | undefined {
    for (const item of source) {
      if (predicate(item)) {
        return item
      }
    }
    return undefined
  }
  return partial ? exec : exec(a)
}

export function groupBy<T, Key>(selector: (item: T) => Key): (source: T[]) => [Key, T[]][]
export function groupBy<T, Key>(source: T[], selector: (item: T) => Key): [Key, T[]][]
export function groupBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function exec(source: T[]): [Key, T[]][] {
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

export function init(options: number | InitRange | InitCount): number[]
export function init<T>(
  options: number | InitRange | InitCount,
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
  const map = initializer === undefined ? (x: number) => x : initializer
  const target = []
  let current = start
  for (let index = 0; index < count; index++) {
    target.push(map(current))
    current += increment
  }
  return target
}

export function length<T>(source: T[]): number {
  return source.length
}

export function count<T>(source: T[]): number {
  return source.length
}

export function sortBy<T, Key>(selector: (item: T) => Key): (source: T[]) => T[]
export function sortBy<T, Key>(source: T[], selector: (item: T) => Key): T[]
export function sortBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function exec(source: T[]): T[] {
    const copy = Array.from(source)
    copy.sort((a: T, b: T) => {
      return selector(a) > selector(b) ? 1 : -1
    })
    return copy
  }
  return partial ? exec : exec(a)
}

export function sortByDescending<T, Key>(selector: (item: T) => Key): (source: T[]) => T[]
export function sortByDescending<T, Key>(source: T[], selector: (item: T) => Key): T[]
export function sortByDescending<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function exec(source: T[]): T[] {
    const copy = Array.from(source)
    copy.sort((a: T, b: T) => {
      return selector(a) > selector(b) ? -1 : 1
    })
    return copy
  }
  return partial ? exec : exec(a)
}

export function reverse<T>(source: T[]): T[] {
  return Array.from(source).reverse()
}

export function sumBy<T>(selector: (item: T) => number): (source: T[]) => number
export function sumBy<T>(source: T[], selector: (item: T) => number): number
export function sumBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: T[]): number {
    let sum = 0
    for (const item of source) {
      sum += selector(item)
    }
    return sum
  }
  return partial ? exec : exec(a)
}

export function maxBy<T>(selector: (item: T) => number): (source: T[]) => number
export function maxBy<T>(source: T[], selector: (item: T) => number): number
export function maxBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: T[]): number {
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

export function minBy<T>(selector: (item: T) => number): (source: T[]) => number
export function minBy<T>(source: T[], selector: (item: T) => number): number
export function minBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: T[]): number {
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

export function meanBy<T>(selector: (item: T) => number): (source: T[]) => number
export function meanBy<T>(source: T[], selector: (item: T) => number): number
export function meanBy<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => number = partial ? a : b
  function exec(source: T[]): number {
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
