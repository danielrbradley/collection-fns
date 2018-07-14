# Collection Functions

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Travis](https://img.shields.io/travis/danielrbradley/collection-fns.svg)](https://travis-ci.org/danielrbradley/collection-fns)
[![Coveralls](https://img.shields.io/coveralls/danielrbradley/collection-fns.svg)](https://coveralls.io/github/danielrbradley/collection-fns)
[![Dev Dependencies](https://david-dm.org/danielrbradley/collection-fns/dev-status.svg)](https://david-dm.org/danielrbradley/collection-fns?type=dev)

Really simple functions for working with built-in collection types, inspired by F#'s collection modules design.

### Features

- Covers, iterables, arrays, maps and sets.
- Composable functional design.

### Example usage

Calculating primes without loops:
```javascript
const primes = pipe(init(x => x, 100))
  .then(
    map(x => ({
      x,
      factors: pipe(init(i => i + 1, x))
        .then(filter(y => x % y === 0))
        .result
    }))
  )
  .then(filter(num => Iterables.length(num.factors) === 2))
  .then(map(num => num.x))
  .then(toArray)
  .result
```

### Importing library

You can import the generated bundle to use the whole library:

```javascript
import myLib from 'collection-fns'
```

Additionally, you can import the specific modules from `dist/lib`:

```javascript
import { groupBy } from 'collection-fns/dist/lib/iterable'
```

### NPM scripts

 - `yarn t`: Run test suite
 - `yarn start`: Run `yarn build` in watch mode
 - `yarn test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `yarn test:prod`: Run linting and generate coverage
 - `yarn build`: Generate bundles and typings, create docs
 - `yarn lint`: Lints code
 - `yarn commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)
