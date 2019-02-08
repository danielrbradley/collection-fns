import * as Iterables from './iterables'

/**
 * Creates a set from the source iterable object.
 * NOTE: Duplicate items will be ignored.
 * @param source An iterable objext to convert to a set.
 */
export function ofIterable<T>(source: Iterable<T>): Set<T> {
  return new Set(source)
}

/**
 * Creates a set from the source array object.
 * NOTE: Duplicate items will be ignored.
 * @param source An array objext to convert to a set.
 */
export function ofArray<T>(source: ReadonlyArray<T>): Set<T> {
  return new Set(source)
}

/**
 * Returns the source, but with the type restricted to being only iterable.
 * @param source A set objext to return as an iterable.
 */
export function asIterable<T>(source: ReadonlySet<T>): Iterable<T> {
  return source
}

/**
 * Creates an array from the source set object.
 * @param source A set objext to convert to an array.
 */
export function toArray<T>(source: ReadonlySet<T>): T[] {
  return Array.from(source)
}

/**
 * Creates a new set whose elements are the results of applying the specified mapping to each of the elements of the source set.
 * NOTE: Duplicate items will be ignored.
 * @param mapping A function to transform items from the input collection.
 */
export function map<T, U>(mapping: (item: T) => U): (source: ReadonlySet<T>) => Set<U>
/**
 * Creates a new set whose elements are the results of applying the specified mapping to each of the elements of the source set.
 * NOTE: Duplicate items will be ignored.
 * @param source The input collection.
 * @param mapping A function to transform items from the input collection.
 */
export function map<T, U>(source: ReadonlySet<T>, mapping: (item: T) => U): Set<U>
export function map<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T) => U = partial ? a : b
  function exec(source: ReadonlySet<T>) {
    return new Set(Iterables.map(source.values(), mapping))
  }
  return partial ? exec : exec(a)
}

/**
 * Returns a new set containing only the elements of the source set for which the given predicate returns true.
 * @param predicate A function to test whether each item in the input set should be included in the output set.
 */
export function filter<T>(predicate: (item: T) => boolean): (source: ReadonlySet<T>) => Set<T>
/**
 * Returns a new set containing only the elements of the source set for which the given predicate returns true.
 * @param source The input collection.
 * @param predicate A function to test whether each item in the input set should be included in the output set.
 */
export function filter<T>(source: ReadonlySet<T>, predicate: (item: T) => boolean): Set<T>
export function filter<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: ReadonlySet<T>) {
    return new Set(Iterables.filter(source.values(), predicate))
  }
  return partial ? exec : exec(a)
}

/**
 * Applies the given function to each element of the set and returns a new set comprised of the results for each element where the function returns a value.
 * NOTE: Duplicate items will be ignored.
 * @param chooser A function to transform items from the input set to a new value to be included, or undefined to be excluded.
 */
export function choose<T, U>(
  chooser: (item: T) => U | undefined
): (source: ReadonlySet<T>) => Set<U>
/**
 * Applies the given function to each element of the set and returns a new set comprised of the results for each element where the function returns a value.
 * NOTE: Duplicate items will be ignored.
 * @param source The input collection.
 * @param chooser A function to transform items from the input set to a new value to be included, or undefined to be excluded.
 */
export function choose<T, U>(source: ReadonlySet<T>, chooser: (item: T) => U | undefined): Set<U>
export function choose<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const chooser: (item: T) => U | undefined = partial ? a : b
  function exec(source: ReadonlySet<T>) {
    return new Set<U>(Iterables.choose(source.values(), chooser))
  }
  return partial ? exec : exec(a)
}

/**
 * Applies the given function to each element of the source set and concatenates all the results.
 * NOTE: Duplicate items will be ignored.
 * @param mapping A function to transform elements of the input set into collections that are concatenated.
 */
export function collect<T, U>(mapping: (item: T) => Iterable<U>): (source: ReadonlySet<T>) => Set<U>
/**
 * Applies the given function to each element of the source set and concatenates all the results.
 * NOTE: Duplicate items will be ignored.
 * @param source The input collection.
 * @param mapping A function to transform elements of the input set into collections that are concatenated.
 */
export function collect<T, U>(source: ReadonlySet<T>, mapping: (item: T) => Iterable<U>): Set<U>
export function collect<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T) => Iterable<U> = partial ? a : b
  function exec(source: ReadonlySet<T>) {
    return new Set<U>(Iterables.collect(source, mapping))
  }
  return partial ? exec : exec(a)
}

/**
 * Wraps the two given sets as a single concatenated set.
 * NOTE: Duplicate items will be ignored.
 * @param second The second set.
 * @param first The first set.
 */
export function append<T>(second: ReadonlySet<T>): (first: ReadonlySet<T>) => Set<T>
/**
 * Wraps the two given sets as a single concatenated set.
 * NOTE: Duplicate items will be ignored.
 * @param first The first set.
 * @param second The second set.
 */
export function append<T>(first: ReadonlySet<T>, second: ReadonlySet<T>): Set<T>
export function append<T>(a: any, b?: any): any {
  const partial = b === undefined
  const second: Set<T> = partial ? a : b
  function exec(first: ReadonlySet<T>): Set<T> {
    return new Set<T>(Iterables.append(first, second))
  }
  return partial ? exec : exec(a)
}

/**
 * Combines the given collection-of-sets as a single concatenated set.
 * NOTE: Duplicate items will be ignored.
 * @param sources The input collection.
 */
export function concat<T>(sources: Iterable<ReadonlySet<T>>): Set<T> {
  const target = new Set<T>()
  for (const source of sources) {
    for (const item of source) {
      target.add(item)
    }
  }
  return target
}

/**
 * Tests if any element of the set satisfies the given predicate.
 * @param predicate A function to test each item of the input collection.
 * @param source The input collection.
 */
export function exists<T>(predicate: (item: T) => boolean): (source: ReadonlySet<T>) => boolean
/**
 * Tests if any element of the set satisfies the given predicate.
 * @param source The input collection.
 * @param predicate A function to test each item of the input collection.
 */
export function exists<T>(source: ReadonlySet<T>, predicate: (item: T) => boolean): boolean
export function exists<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: ReadonlySet<T>): boolean {
    return Iterables.exists(source, predicate)
  }
  return partial ? exec : exec(a)
}

/**
 * Evaluates to true if the given item is in the source set.
 * @param item The item to look for.
 * @param source The input collection.
 */
export function contains<T>(item: T): (source: ReadonlySet<T>) => boolean
/**
 * Evaluates to true if the given item is in the source set.
 * @param source The input collection.
 * @param item The item to look for.
 */
export function contains<T>(source: ReadonlySet<T>, item: T): boolean
export function contains<T>(a: any, b?: any): any {
  const partial = b === undefined
  const item: T = partial ? a : b
  function exec(source: ReadonlySet<T>): boolean {
    return source.has(item)
  }
  return partial ? exec : exec(a)
}

/**
 * Returns the first element for which the given function returns true.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @param source The input collection.
 * @throws If no item is found matching the criteria of the predicate.
 */
export function get<T>(predicate: (item: T) => boolean): (source: ReadonlySet<T>) => T
/**
 * Returns the first element for which the given function returns true.
 * @param source The input collection.
 * @param predicate A function to test whether an item in the collection should be returned.
 * @throws If no item is found matching the criteria of the predicate.
 */
export function get<T>(source: ReadonlySet<T>, predicate: (item: T) => boolean): T
export function get<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: ReadonlySet<T>): T | undefined {
    for (const item of source) {
      if (predicate(item)) {
        return item
      }
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
export function find<T>(predicate: (item: T) => boolean): (source: ReadonlySet<T>) => T | undefined
/**
 * Returns the first element for which the given function returns true, otherwise undefined.
 * @param source The input collection.
 * @param predicate A function to test whether an item in the collection should be returned.
 */
export function find<T>(source: ReadonlySet<T>, predicate: (item: T) => boolean): T | undefined
export function find<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: ReadonlySet<T>): T | undefined {
    for (const item of source) {
      if (predicate(item)) {
        return item
      }
    }
    return undefined
  }
  return partial ? exec : exec(a)
}

/**
 * Returns the number of items in the collection.
 * @param source The input collection.
 */
export function count<T>(source: ReadonlySet<T>): number {
  return source.size
}
