# Collection Functions

[![npm version](https://badge.fury.io/js/collection-fns.svg)](https://badge.fury.io/js/collection-fns)
[![GitHub issues](https://img.shields.io/github/issues/danielrbradley/collection-fns.svg)](https://github.com/danielrbradley/collection-fns/issues)
[![TypeDoc docs](https://img.shields.io/badge/TypeDoc-docs-lightgrey.svg)](https://www.danielbradley.net/collection-fns/)
[![Travis](https://img.shields.io/travis/danielrbradley/collection-fns.svg)](https://travis-ci.org/danielrbradley/collection-fns)
[![Coveralls](https://img.shields.io/coveralls/danielrbradley/collection-fns.svg)](https://coveralls.io/github/danielrbradley/collection-fns)
[![Dev Dependencies](https://david-dm.org/danielrbradley/collection-fns/dev-status.svg)](https://david-dm.org/danielrbradley/collection-fns?type=dev) [![Greenkeeper badge](https://badges.greenkeeper.io/danielrbradley/collection-fns.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Really simple functions for working with built-in collection types, inspired by F#'s collection modules design.

### Features

- Modules for iterables, arrays, maps and sets.
- Composable functional design with full type-safety when used with TypeScript.

## Installation

Add package using NPM or yarn
```bash
npm i --save collection-fns
```
```bash
yarn add collection-fns
```

You can import the top level modules directly:

```javascript
import { Iterables, Arrays, Sets, Maps, pipe } from 'collection-fns'
```

Additionally, you can import the specific module functions from `dist/lib/[module]`:

```javascript
import { groupBy } from 'collection-fns/dist/lib/iterables'
```

## Examples

Calculating primes lazily with iterators:
```javascript
import { pipe } from 'collection-fns'
import { init, map, filter, count } from 'collection-fns/dist/lib/iterables';

const primes = pipe(
  init({ from: 1, to: 100 }),
  map(x => ({
    x,
    factors: pipe(
      init({ from: 1, to: x }),
      filter(y => x % y === 0)
    )
  })),
  filter(num => count(num.factors) === 2),
  map(num => num.x)
)

for (const prime of primes) {
  console.log(prime)
}
```

Grouping numbers into odd and even buckets
```javascript
import { pipe, Maps } from 'collection-fns'
import { init, groupBy } from 'collection-fns/dist/lib/arrays';

const oddAndEven = pipe(
  init({ from: 1, to: 25 }),
  groupBy(i => i % 2 === 0 ? 'even' : 'odd'),
  Maps.ofArray
)
```

This works by use of partial application, however all functional can also be called directly such as:

```javascript
Iterables.map(
  Iterables.init({ from: 1, to: 10 }),
  x => x * x))
```

## Pipes

The `pipe()` function is a stand-in until the pipe (`|>`) operator gets [implemented in ESNext](https://github.com/tc39/proposal-pipeline-operator#introduction).

For pipes of up to 26 steps, the multi-argument overloads can be used where the first argument is the initial value, and all following arguments are functions take the result of the step before and returning a new result. The result from the final step is then returned as the result of the pipe.

For longer pipes there is an alternative syntax:
1. The pipe is started by passing `pipe(...)` a single initial value.
2. Each `.then(...)` step in a pipe takes a callback that is passed the value from the previous step.
3. At the end of the pipe, access the `.result` property to get the value returned from the last step.

Taking the example from the proposal linked above:

```javascript
function doubleSay (str) {
  return str + ", " + str;
}
function capitalize (str) {
  return str[0].toUpperCase() + str.substring(1);
}
function exclaim (str) {
  return str + '!';
}
```

The following statements are equivalent:
```javascript
let result = exclaim(capitalize(doubleSay("hello")));
result // Prints: "Hello, hello!"

let result = pipe(
  "hello",
  doubleSay,
  capitalize,
  exclaim
)
result // Prints: "Hello, hello!"

let result =
  pipe("hello")
    .then(doubleSay)
    .then(capitalize)
    .then(exclaim)
    .result
result // Prints: "Hello, hello!"
```

## NPM scripts

 - `yarn test`: Run test suite
 - `yarn start`: Run `yarn build` in watch mode
 - `yarn test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `yarn test:prod`: Run linting and generate coverage
 - `yarn build`: Generate bundles and typings, create docs
 - `yarn lint`: Lints code
 - `yarn commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)
