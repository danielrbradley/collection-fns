import { pipe } from '../src/collection-fns'

describe('pipes', () => {
  it('can pipe simple values', () => {
    expect(pipe(1).then(x => x + 1).result).toEqual(2)
  })
})
