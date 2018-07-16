export function toArray<T>(source: Iterable<T>): T[] {
  return Array.from(source)
}

export function map<T, U>(mapping: (item: T) => U): (source: Iterable<T>) => Iterable<U>
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

export function filter<T>(predicate: (item: T) => boolean): (source: Iterable<T>) => Iterable<T>
export function filter<T>(source: Iterable<T>, predicate: (item: T) => boolean): Iterable<T>
export function filter<T, U>(a: any, b?: any): any {
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

export function choose<T, U>(
  chooser: (item: T) => U | undefined
): (source: Iterable<T>) => Iterable<U>
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

export function collect<T, U>(
  mapping: (item: T) => Iterable<U>
): (source: Iterable<T>) => Iterable<U>
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

export function append<T>(second: Iterable<T>): (first: Iterable<T>) => Iterable<T>
export function append<T>(first: Iterable<T>, second: Iterable<T>): Iterable<T>
export function append<T, U>(a: any, b?: any): any {
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

export function* concat<T>(sources: Iterable<Iterable<T>>): Iterable<T> {
  for (const source of sources) {
    for (const item of source) {
      yield item
    }
  }
}

export function distinctBy<T, Key>(selector: (item: T) => Key): (source: Iterable<T>) => Iterable<T>
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
): (source: Iterable<T>) => Iterable<[Key, Iterable<T>]>
export function groupBy<T, Key>(
  source: Iterable<T>,
  selector: (item: T) => Key
): Iterable<[Key, Iterable<T>]>
export function groupBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function exec(source: Iterable<T>): Iterable<[Key, Iterable<T>]> {
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

export function init<T>(count: number): (initializer: (index: number) => T) => Iterable<T>
export function init<T>(initializer: (index: number) => T, count: number): Iterable<T>
export function init<T>(a: any, b?: any): any {
  const partial = typeof a === 'number'
  const count: number = partial ? a : b
  function* exec<T>(initializer: (index: number) => T): Iterable<T> {
    for (let index = 0; index < count; index++) {
      yield initializer(index)
    }
  }
  return partial ? exec : exec(a)
}

export function length<T>(source: Iterable<T>): number {
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

export function sortBy<T, Key>(selector: (item: T) => Key): (source: Iterable<T>) => Iterable<T>
export function sortBy<T, Key>(source: Iterable<T>, selector: (item: T) => Key): Iterable<T>
export function sortBy<T, Key>(a: any, b?: any): any {
  const partial = typeof a === 'function'
  const selector: (item: T) => Key = partial ? a : b
  function exec(source: Iterable<T>): Iterable<T> {
    const copy = Array.from(source)
    copy.sort(compareBy(selector))
    return copy
  }
  return partial ? exec : exec(a)
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
