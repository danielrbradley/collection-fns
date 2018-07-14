export const toArray = <T>(source: Iterable<T>): T[] => {
  return Array.from(source)
}

export function map<T, U>(mapping: (item: T) => U): (source: Iterable<T>) => Iterable<U>
export function map<T, U>(source: Iterable<T>, mapping: (item: T) => U): Iterable<U>
export function map<T, U>(a: any, b?: any): any {
  if (typeof a === 'function') {
    const mapping = a as (item: T) => U
    return function*(source: Iterable<T>) {
      for (const item of source) {
        yield mapping(item)
      }
    }
  } else {
    const source = a as Iterable<T>
    const mapping = b as (item: T) => U
    return (function*() {
      for (const item of source) {
        yield mapping(item)
      }
    })()
  }
}

export function filter<T>(predicate: (item: T) => boolean): (source: Iterable<T>) => Iterable<T>
export function filter<T>(source: Iterable<T>, predicate: (item: T) => boolean): Iterable<T>
export function filter<T>(a: any, b?: any): any {
  if (typeof a === 'function') {
    const predicate = a as (item: T) => boolean
    return function*(source: Iterable<T>): Iterable<T> {
      for (const item of source) {
        if (predicate(item)) {
          yield item
        }
      }
    }
  } else {
    const source = a as Iterable<T>
    const predicate = b as (item: T) => boolean
    return (function*() {
      for (const item of source) {
        if (predicate(item)) {
          yield item
        }
      }
    })()
  }
}

export const choose = <T, U>(chooser: (item: T) => U | undefined) =>
  function*(source: Iterable<T>): Iterable<U> {
    for (const item of source) {
      const chosen = chooser(item)
      if (chosen !== undefined) {
        yield chosen
      }
    }
  }

export const collect = <T, U>(mapping: (item: T) => Iterable<U>) =>
  function*(source: Iterable<T>): Iterable<U> {
    for (const item of source) {
      const children = mapping(item)
      for (const child of children) {
        yield child
      }
    }
  }

export const append = <T>(first: Iterable<T>) =>
  function*(second: Iterable<T>): Iterable<T> {
    for (const item of first) {
      yield item
    }
    for (const item of second) {
      yield item
    }
  }

export const concat = function*<T>(sources: Iterable<Iterable<T>>): Iterable<T> {
  for (const source of sources) {
    for (const item of source) {
      yield item
    }
  }
}

export const distinctBy = <T, Key>(selector: (item: T) => Key) =>
  function*(source: Iterable<T>): Iterable<T> {
    const seen = new Set<Key>()
    for (const item of source) {
      const key = selector(item)
      if (!seen.has(key)) {
        seen.add(key)
        yield item
      }
    }
  }

export const exists = <T>(predicate: (item: T) => boolean) => (source: Iterable<T>): boolean => {
  for (const item of source) {
    if (predicate(item)) {
      return true
    }
  }
  return false
}

export const find = <T>(predicate: (item: T) => boolean) => (
  source: Iterable<T>
): T | undefined => {
  for (const item of source) {
    if (predicate(item)) {
      return item
    }
  }
  return undefined
}

export const groupBy = <T, Key>(selector: (item: T) => Key) => (
  source: Iterable<T>
): Iterable<[Key, Iterable<T>]> => {
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

export const init = (count: number) =>
  function*<T>(initializer: (index: number) => T): Iterable<T> {
    for (let index = 0; index < count; index++) {
      yield initializer(index)
    }
  }

export const length = <T>(source: Iterable<T>): number => {
  let length = 0
  for (const _ of source) {
    length++
  }
  return length
}

function compareBy<T>(getProp: (item: T) => any) {
  return (a: T, b: T) => {
    return getProp(a) > getProp(b) ? 1 : -1
  }
}

export const sortBy = <T, Key>(selector: (item: T) => Key) => (
  source: Iterable<T>
): Iterable<T> => {
  const copy = Array.from(source)
  copy.sort(compareBy(selector))
  return copy
}

export const sumBy = <T>(selector: (item: T) => number) => (source: Iterable<T>): number => {
  let sum = 0
  for (const item of source) {
    sum += selector(item)
  }
  return sum
}

export const maxBy = <T>(selector: (item: T) => number) => (source: Iterable<T>): number => {
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

export const minBy = <T>(selector: (item: T) => number) => (source: Iterable<T>): number => {
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

export const meanBy = <T>(selector: (item: T) => number) => (source: Iterable<T>): number => {
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
