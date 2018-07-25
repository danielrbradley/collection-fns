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
export function map<T, U>(mapping: (item: T, index: number) => U): (source: T[]) => U[]
/**
 * Creates a new array whose elements are the results of applying the specified mapping to each of the elements of the source collection.
 * @param source The input collection.
 * @param mapping A function to transform items from the input collection.
 */
export function map<T, U>(source: T[], mapping: (item: T, index: number) => U): U[]
export function map<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T, index: number) => U = partial ? a : b
  function exec(source: T[]) {
    return source.map(mapping)
  }
  return partial ? exec : exec(a)
}

/**
 * Returns a new array containing only the elements of the collection for which the given predicate returns true.
 * @param predicate A function to test whether each item in the input collection should be included in the output.
 */
export function filter<T>(predicate: (item: T, index: number) => boolean): (source: T[]) => T[]
/**
 * Returns a new array containing only the elements of the collection for which the given predicate returns true.
 * @param source The input collection.
 * @param predicate A function to test whether each item in the input collection should be included in the output.
 */
export function filter<T>(source: T[], predicate: (item: T, index: number) => boolean): T[]
export function filter<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T, index: number) => boolean = partial ? a : b
  function exec(source: T[]) {
    return source.filter(predicate)
  }
  return partial ? exec : exec(a)
}

/**
 * Applies the given function to each element of the array and returns a new array comprised of the results for each element where the function returns a value.
 * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
 */
export function choose<T, U>(
  chooser: (item: T, index: number) => U | undefined
): (source: T[]) => U[]
/**
 * Applies the given function to each element of the array and returns a new array comprised of the results for each element where the function returns a value.
 * @param source The input collection.
 * @param chooser A function to transform items from the input collection to a new value to be included, or undefined to be excluded.
 */
export function choose<T, U>(source: T[], chooser: (item: T, index: number) => U | undefined): U[]
export function choose<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const chooser: (item: T, index: number) => U | undefined = partial ? a : b
  function exec(source: T[]) {
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
 */
export function collect<T, U>(
  mapping: (item: T, index: number) => Iterable<U>
): (source: T[]) => U[]
/**
 * Applies the given function to each element of the source array and concatenates all the results.
 * @param source The input collection.
 * @param mapping A function to transform elements of the input collection into collections that are concatenated.
 */
export function collect<T, U>(source: T[], mapping: (item: T, index: number) => Iterable<U>): U[]
export function collect<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T, index: number) => Iterable<U> = partial ? a : b
  function exec(source: T[]) {
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
export function distinctBy<T, Key>(selector: (item: T, index: number) => Key): (source: T[]) => T[]
/**
 * Returns an array that contains no duplicate entries according to the equality comparisons on
 * the keys returned by the given key-generating function. If an element occurs multiple times in
 * the sequence then the later occurrences are discarded.
 * @param source The input collection.
 * @param selector A function that transforms the array items into comparable keys.
 */
export function distinctBy<T, Key>(source: T[], selector: (item: T, index: number) => Key): T[]
export function distinctBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T, index: number) => Key = partial ? a : b
  function exec(source: T[]): T[] {
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
 */
export function exists<T>(predicate: (item: T, index: number) => boolean): (source: T[]) => boolean
/**
 * Tests if any element of the array satisfies the given predicate.
 * @param source The input collection.
 * @param predicate A function to test each item of the input collection.
 */
export function exists<T>(source: T[], predicate: (item: T, index: number) => boolean): boolean
export function exists<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T, index: number) => boolean = partial ? a : b
  function exec(source: T[]): boolean {
    return source.some(predicate)
  }
  return partial ? exec : exec(a)
}

/**
 * Returns the first element for which the given function returns true.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @param source The input collection.
 * @throws If no item is found matching the criteria of the predicate.
 */
export function get<T>(predicate: (item: T, index: number) => boolean): (source: T[]) => T
/**
 * Returns the first element for which the given function returns true.
 * @param source The input collection.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @throws If no item is found matching the criteria of the predicate.
 */
export function get<T>(source: T[], predicate: (item: T, index: number) => boolean): T
export function get<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T, index: number) => boolean = partial ? a : b
  function exec(source: T[]): T | undefined {
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
 */
export function find<T>(
  predicate: (item: T, index: number) => boolean
): (source: T[]) => T | undefined
/**
 * Returns the first element for which the given function returns true, otherwise undefined.
 * @param source The input collection.
 * @param predicate A function to test whether an item in the collection should be returned.
 */
export function find<T>(source: T[], predicate: (item: T, index: number) => boolean): T | undefined
export function find<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T, index: number) => boolean = partial ? a : b
  function exec(source: T[]): T | undefined {
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
 */
export function groupBy<T, Key>(
  selector: (item: T, index: number) => Key
): (source: T[]) => [Key, T[]][]
/**
 * Applies a key-generating function to each element of an array and yields an array of unique
 * keys and an array of all elements that have each key.
 * @param source The input collection.
 * @param selector A function that transforms an element of the collection into a comparable key.
 */
export function groupBy<T, Key>(
  source: T[],
  selector: (item: T, index: number) => Key
): [Key, T[]][]
export function groupBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T, index: number) => Key = partial ? a : b
  function exec(source: T[]): [Key, T[]][] {
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
 */
export function init(options: InitRange | InitCount): number[]
/**
 * Generates a new array containing the specified number sequence.
 * @param count The number of sequential numbers to generate.
 * @throws When the options would result in an iterable that would not complete. If this is the
 * desired behaviour, use initInfinite.
 */
// tslint:disable-next-line:unified-signatures
export function init(count: number): number[]
/**
 * Generates a new array containing elements generated by the initializer funciton.
 * @param options The sequence of numbers to generate.
 * @param initializer A function that generates an item in the array from a given number.
 * @throws When the options would result in an array of infinite size.
 */
export function init<T>(options: InitRange | InitCount, initializer: (index: number) => T): T[]
/**
 * Generates a new array containing elements generated by the initializer funciton.
 * @param count The number of sequential numbers to generate.
 * @param initializer A function that generates an item in the array from a given number.
 * @throws When the options would result in an array of infinite size.
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

/**
 * Returns the number of items in the array.
 * @param source The input collection.
 */
export function length<T>(source: T[]): number {
  return source.length
}

/**
 * Returns the number of items in the array.
 * @param source The input collection.
 */
export function count<T>(source: T[]): number {
  return source.length
}

/**
 * Returns a new array ordered by the selected key.
 * If no selector is specified, the elements will be compared directly.
 * @param selector An optional function to transform items of the input sequence into comparable keys.
 * @param source The input collection.
 */
export function sort<T, Key>(selector?: (item: T) => Key): (source: T[]) => T[]
/**
 * Returns a new array ordered by the selected key.
 * If no selector is specified, the elements will be compared directly.
 * @param source The input collection.
 * @param selector An optional function to transform items of the input sequence into comparable keys.
 */
export function sort<T, Key>(source: T[], selector?: (item: T) => Key): T[]
export function sort<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function' || typeof a === 'undefined'
  const optionalSelector: (item: T) => Key = partial ? a : b
  const selector = optionalSelector === undefined ? (x: T) => x : optionalSelector
  function exec(source: T[]): T[] {
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
 */
export function sortDescending<T, Key>(selector?: (item: T) => Key): (source: T[]) => T[]
/**
 * Yields an iterable ordered by the selected key descending.
 * If no selector is specified, the elements will be compared directly.
 * @param source The input collection.
 * @param selector An optional function to transform items of the input sequence into comparable keys.
 */
export function sortDescending<T, Key>(source: T[], selector?: (item: T) => Key): T[]
export function sortDescending<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function' || typeof a === 'undefined'
  const optionalSelector: (item: T) => Key = partial ? a : b
  const selector = optionalSelector === undefined ? (x: T) => x : optionalSelector
  function exec(source: T[]): T[] {
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
 */
export function sortBy<T, Key>(selector: (item: T) => Key): (source: T[]) => T[]
/**
 * Applies a key-generating function to each element of the array and returns a new array ordered by the keys.
 * @param source The input collection.
 * @param selector A function to transform items of the input sequence into comparable keys.
 */
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

/**
 * Applies a key-generating function to each element of the array and returns a new array ordered by the keys, descending.
 * @param selector A function to transform items of the input sequence into comparable keys.
 * @param source The input collection.
 */
export function sortByDescending<T, Key>(selector: (item: T) => Key): (source: T[]) => T[]
/**
 * Applies a key-generating function to each element of the array and returns a new array ordered by the keys, descending.
 * @param source The input collection.
 * @param selector A function to transform items of the input sequence into comparable keys.
 */
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

/**
 * Returns a new array with the order of elements reversed.
 * @param source The input collection.
 */
export function reverse<T>(source: T[]): T[] {
  return Array.from(source).reverse()
}

/**
 * Returns the sum of the values returned by the selector for each element in the array.
 * @param selector A function to transform each element into a summable value.
 * @param source The input collection.
 */
export function sumBy<T>(selector: (item: T) => number): (source: T[]) => number
/**
 * Returns the sum of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a summable value.
 */
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

/**
 * Returns the maximum of the values returned by the selector for each element in the array.
 * @param selector A function to transform each element into a comparable value.
 * @param source The input collection.
 * @throws If the collection is empty.
 */
export function maxBy<T>(selector: (item: T) => number): (source: T[]) => number
/**
 * Returns the maximum of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a comparable value.
 * @throws If the collection is empty.
 */
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

/**
 * Returns the minimum of the values returned by the selector for each element in the array.
 * @param selector A function to transform each element into a comparable value.
 * @param source The input collection.
 * @throws If the collection is empty.
 */
export function minBy<T>(selector: (item: T) => number): (source: T[]) => number
/**
 * Returns the minimum of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a comparable value.
 * @throws If the collection is empty.
 */
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

/**
 * Returns the mean (average) of the values returned by the selector for each element in the array.
 * @param selector A function to transform each element into a summable value.
 * @param source The input collection.
 * @throws If the collection is empty.
 */
export function meanBy<T>(selector: (item: T) => number): (source: T[]) => number
/**
 * Returns the mean (average) of the values returned by the selector for each element in the array.
 * @param source The input collection.
 * @param selector A function to transform each element into a summable value.
 * @throws If the collection is empty.
 */
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
