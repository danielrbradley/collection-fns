import * as Iterables from './iterables'

/**
 * Creates a map from the source iterable object.
 * NOTE: Items with duplicate keys will be ignored.
 * @param source An iterable objext of tuples to convert to a map.
 */
export function ofIterable<Key, T>(source: Iterable<[Key, T]>): Map<Key, T> {
  return new Map(source)
}

/**
 * Creates a map from the source array object.
 * NOTE: Items with duplicate keys will be ignored.
 * @param source An array of tuples to convert to a map.
 */
export function ofArray<Key, T>(source: [Key, T][]): Map<Key, T> {
  return new Map(source)
}

/**
 * Creates a map from the source set object.
 * @param source A set objext to convert to a map.
 */
export function ofSet<T>(source: Set<T>): Map<T, T> {
  return new Map(source.entries())
}

/**
 * Returns the source, but with the type restricted to being only iterable of the map's entries.
 * @param source A map objext to return as an iterable.
 */
export function asIterable<Key, T>(source: Map<Key, T>): Iterable<[Key, T]> {
  return source
}

/**
 * Creates a new map whose values are the results of applying the specified mapping to each of the values of the source map.
 * @param mapping A function to transform entries from the input collection into new values.
 */
export function map<Key, T, U>(
  mapping: (key: Key, value: T) => U
): (source: Map<Key, T>) => Map<Key, U>
/**
 * Creates a new map whose values are the results of applying the specified mapping to each of the values of the source map.
 * @param source The input collection.
 * @param mapping A function to transform entries from the input collection into new values.
 */
export function map<Key, T, U>(source: Map<Key, T>, mapping: (key: Key, value: T) => U): Map<Key, U>
export function map<Key, T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (key: Key, value: T) => U = partial ? a : b
  function exec(source: Map<Key, T>) {
    const target = new Map<Key, U>()
    for (const pair of source.entries()) {
      const key = pair[0]
      const mapped = mapping(key, pair[1])
      target.set(key, mapped)
    }
    return target
  }
  return partial ? exec : exec(a)
}

/**
 * Returns a new map containing only the elements of the map for which the given predicate returns true.
 * @param predicate A function to test whether each item in the input map should be included in the output map.
 */
export function filter<Key, T>(
  predicate: (key: Key, value: T) => boolean
): (source: Map<Key, T>) => Map<Key, T>
/**
 * Returns a new map containing only the elements of the map for which the given predicate returns true.
 * @param source The input collection.
 * @param predicate A function to test whether each item in the input map should be included in the output map.
 */
export function filter<Key, T>(
  source: Map<Key, T>,
  predicate: (key: Key, value: T) => boolean
): Map<Key, T>
export function filter<Key, T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (key: Key, value: T) => boolean = partial ? a : b
  function exec(source: Map<Key, T>) {
    return new Map<Key, T>(
      Iterables.filter(source.entries(), entry => predicate(entry[0], entry[1]))
    )
  }
  return partial ? exec : exec(a)
}

/**
 * Applies the given function to each entry of the map and returns a new map comprised of the results for each element where the function returns a value.
 * @param chooser A function to transform entries from the input map to a new value to be included, or undefined to be excluded.
 */
export function choose<Key, T, U>(
  chooser: (key: Key, value: T) => U | undefined
): (source: Map<Key, T>) => Map<Key, U>
/**
 * Applies the given function to each entry of the map and returns a new map comprised of the results for each element where the function returns a value.
 * @param source The input collection.
 * @param chooser A function to transform entries from the input map to a new value to be included, or undefined to be excluded.
 */
export function choose<Key, T, U>(
  source: Map<Key, T>,
  chooser: (key: Key, value: T) => U | undefined
): Map<Key, U>
export function choose<Key, T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const chooser: (key: Key, value: T) => U | undefined = partial ? a : b
  function exec(source: Map<Key, T>) {
    const target = new Map<Key, U>()
    for (const pair of source.entries()) {
      const key = pair[0]
      const mapped = chooser(key, pair[1])
      if (mapped !== undefined) {
        target.set(key, mapped)
      }
    }
    return target
  }
  return partial ? exec : exec(a)
}

/**
 * Wraps the two given maps as a single concatenated map.
 * @param second The second map.
 * @param first The first map.
 */
export function append<Key, T>(second: Map<Key, T>): (first: Map<Key, T>) => Map<Key, T>
/**
 * Wraps the two given maps as a single concatenated map.
 * @param first The first map.
 * @param second The second map.
 */
export function append<Key, T>(first: Map<Key, T>, second: Map<Key, T>): Map<Key, T>
export function append<Key, T>(a: any, b?: any): any {
  const partial = b === undefined
  const second: Map<Key, T> = partial ? a : b
  function exec(first: Map<Key, T>): Map<Key, T> {
    return new Map<Key, T>(Iterables.append(first, second))
  }
  return partial ? exec : exec(a)
}

/**
 * Combines the given collection-of-maps as a single concatenated map.
 * NOTE: Duplicate items will be ignored.
 * @param sources The input collection.
 */
export function concat<Key, T>(sources: Iterable<Map<Key, T>>): Map<Key, T> {
  const target = new Map<Key, T>()
  for (const source of sources) {
    for (const item of source) {
      target.set(item[0], item[1])
    }
  }
  return target
}

/**
 * Returns the value for the given key.
 * @param key The key to lookup in the map.
 * @param source The input collection.
 * @throws If the key does not exist in the source collection.
 */
export function get<Key, T>(key: Key): (source: Map<Key, T>) => T
/**
 * Returns the value for the given key.
 * @param source The input collection.
 * @param key The key to lookup in the map.
 * @throws If the key does not exist in the source collection.
 */
export function get<Key, T>(source: Map<Key, T>, key: Key): T
export function get<Key, T>(a: any, b?: any): any {
  const partial = b === undefined
  const key: Key = partial ? a : b
  function exec(source: Map<Key, T>) {
    if (!source.has(key)) {
      throw new Error('Specified key not found')
    }
    return source.get(key) as T
  }
  return partial ? exec : exec(a)
}

/**
 * Returns the value for the given key, or undefined if not found.
 * @param key The key to lookup in the map.
 * @param source The input collection.
 */
export function find<Key, T>(key: Key): (source: Map<Key, T>) => T | undefined
/**
 * Returns the value for the given key, or undefined if not found.
 * @param source The input collection.
 * @param key The key to lookup in the map.
 */
export function find<Key, T>(source: Map<Key, T>, key: Key): T | undefined
export function find<Key, T>(a: any, b?: any): any {
  const partial = b === undefined
  const key: Key = partial ? a : b
  function exec(source: Map<Key, T>) {
    return source.get(key)
  }
  return partial ? exec : exec(a)
}

/**
 * Tests if any element of the map satisfies the given predicate.
 * @param predicate A function to test each item of the input collection.
 * @param source The input collection.
 */
export function exists<Key, T>(
  predicate: (key: Key, value: T) => boolean
): (source: Map<Key, T>) => boolean
/**
 * Tests if any element of the map satisfies the given predicate.
 * @param source The input collection.
 * @param predicate A function to test each item of the input collection.
 */
export function exists<Key, T>(
  source: Map<Key, T>,
  predicate: (key: Key, value: T) => boolean
): boolean
export function exists<Key, T>(a: any, b?: any): any {
  const partial = b === undefined
  const predicate: (key: Key, value: T) => boolean = partial ? a : b
  function exec(source: Map<Key, T>) {
    for (const item of source) {
      if (predicate(item[0], item[1])) {
        return true
      }
    }
    return false
  }
  return partial ? exec : exec(a)
}

export function count<Key, T>(source: Map<Key, T>): number {
  return source.size
}
