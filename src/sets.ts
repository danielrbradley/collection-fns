import { Iterables } from './collection-fns'

export function ofIterable<T>(source: Iterable<T>): Set<T> {
  return new Set(source)
}

export function ofArray<T>(source: T[]): Set<T> {
  return new Set(source)
}

export function asIterable<T>(source: Set<T>): Iterable<T> {
  return source
}

export function toArray<T>(source: Set<T>): T[] {
  return Array.from(source)
}

export function map<T, U>(mapping: (item: T) => U): (source: Set<T>) => Set<U>
export function map<T, U>(source: Set<T>, mapping: (item: T) => U): Set<U>
export function map<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T) => U = partial ? a : b
  function exec(source: Set<T>) {
    return new Set(Iterables.map(source.values(), mapping))
  }
  return partial ? exec : exec(a)
}

export function filter<T>(predicate: (item: T) => boolean): (source: Set<T>) => Set<T>
export function filter<T>(source: Set<T>, predicate: (item: T) => boolean): Set<T>
export function filter<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: Set<T>) {
    return new Set(Iterables.filter(source.values(), predicate))
  }
  return partial ? exec : exec(a)
}

export function choose<T, U>(chooser: (item: T) => U | undefined): (source: Set<T>) => Set<U>
export function choose<T, U>(source: Set<T>, chooser: (item: T) => U | undefined): Set<U>
export function choose<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const chooser: (item: T) => U | undefined = partial ? a : b
  function exec(source: Set<T>) {
    return new Set<U>(Iterables.choose(source.values(), chooser))
  }
  return partial ? exec : exec(a)
}

export function collect<T, U>(mapping: (item: T) => Iterable<U>): (source: Set<T>) => Set<U>
export function collect<T, U>(source: Set<T>, mapping: (item: T) => Iterable<U>): Set<U>
export function collect<T, U>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const mapping: (item: T) => Iterable<U> = partial ? a : b
  function exec(source: Set<T>) {
    return new Set<U>(Iterables.collect(source, mapping))
  }
  return partial ? exec : exec(a)
}

export function append<T>(second: Set<T>): (first: Set<T>) => Set<T>
export function append<T>(first: Set<T>, second: Set<T>): Set<T>
export function append<T>(a: any, b?: any): any {
  const partial = b === undefined
  const second: Set<T> = partial ? a : b
  function exec(first: Set<T>): Set<T> {
    return new Set<T>(Iterables.append(first, second))
  }
  return partial ? exec : exec(a)
}

export function concat<T>(sources: Iterable<Set<T>>): Set<T> {
  const target = new Set<T>()
  for (const source of sources) {
    for (const item of source) {
      target.add(item)
    }
  }
  return target
}

export function exists<T>(predicate: (item: T) => boolean): (source: Set<T>) => boolean
export function exists<T>(source: Set<T>, predicate: (item: T) => boolean): boolean
export function exists<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: Set<T>): boolean {
    return Iterables.exists(source, predicate)
  }
  return partial ? exec : exec(a)
}

export function contains<T>(item: T): (source: Set<T>) => boolean
export function contains<T>(source: Set<T>, item: T): boolean
export function contains<T>(a: any, b?: any): any {
  const partial = b === undefined
  const item: T = partial ? a : b
  function exec(source: Set<T>): boolean {
    return source.has(item)
  }
  return partial ? exec : exec(a)
}

export function find<T>(predicate: (item: T) => boolean): (source: Set<T>) => T | undefined
export function find<T>(source: Set<T>, predicate: (item: T) => boolean): T | undefined
export function find<T>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const predicate: (item: T) => boolean = partial ? a : b
  function exec(source: Set<T>): T | undefined {
    for (const item of source) {
      if (predicate(item)) {
        return item
      }
    }
    return undefined
  }
  return partial ? exec : exec(a)
}

export function count<T>(source: Set<T>): number {
  return source.size
}
