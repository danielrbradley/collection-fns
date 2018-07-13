export class Pipe<T> {
  result: T
  constructor(input: T) {
    this.result = input
  }
  then<U>(next: (value: T) => U) {
    return new Pipe(next(this.result))
  }
}

export function pipe<T>(input: T) {
  return new Pipe(input)
}
