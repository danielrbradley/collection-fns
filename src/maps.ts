import { Iterables } from './collection-fns'

export function ofIterable<Key, T>(source: Iterable<[Key, T]>): Map<Key, T> {
  return new Map(source)
}

export function toIterable<Key, T>(source: Map<Key, T>): Iterable<[Key, T]> {
  return source.entries()
}

export function map<Key, T, U>(source: Map<Key, T>, mapping: (key: Key, value: T) => U): Map<Key, U>
export function map<Key, T, U>(
  mapping: (key: Key, value: T) => U
): (source: Map<Key, T>) => Map<Key, U>
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

export function filter<Key, T>(
  source: Map<Key, T>,
  predicate: (key: Key, value: T) => boolean
): Map<Key, T>
export function filter<Key, T>(
  predicate: (key: Key, value: T) => boolean
): (source: Map<Key, T>) => Map<Key, T>
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

export function choose<Key, T, U>(
  source: Map<Key, T>,
  chooser: (key: Key, value: T) => U | undefined
): Map<Key, U>
export function choose<Key, T, U>(
  chooser: (key: Key, value: T) => U | undefined
): (source: Map<Key, T>) => Map<Key, U>
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

export function get<Key, T>(source: Map<Key, T>, key: Key): T
export function get<Key, T>(key: Key): (source: Map<Key, T>) => T
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

export function find<Key, T>(source: Map<Key, T>, key: Key): T | undefined
export function find<Key, T>(key: Key): (source: Map<Key, T>) => T | undefined
export function find<Key, T>(a: any, b?: any): any {
  const partial = b === undefined
  const key: Key = partial ? a : b
  function exec(source: Map<Key, T>) {
    return source.get(key)
  }
  return partial ? exec : exec(a)
}

export function exists<Key, T>(
  source: Map<Key, T>,
  predicate: (key: Key, value: T) => boolean
): boolean
export function exists<Key, T>(
  predicate: (key: Key, value: T) => boolean
): (source: Map<Key, T>) => boolean
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
