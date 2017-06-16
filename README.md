# goodtables-js

[![Travis](https://travis-ci.org/frictionlessdata/tableschema-js.svg?branch=master)](https://travis-ci.org/frictionlessdata/goodtables-js)
[![Coveralls](https://coveralls.io/repos/github/frictionlessdata/goodtables-js/badge.svg?branch=master)](https://coveralls.io/github/frictionlessdata/goodtables-js?branch=master)
[![NPM](https://img.shields.io/npm/v/goodtables.svg)](https://www.npmjs.com/package/goodtables)
[![Gitter](https://img.shields.io/gitter/room/frictionlessdata/chat.svg)](https://gitter.im/frictionlessdata/chat)

An API wrapper for a goodtables.io service. goodtables.io is an open source web service for validating tabular data sources.

## Features

 - `inspect` function to inspect tabular data and output a `goodtables` report
 - `validate` function to inspect tabular data an throw an error on invalid
 - `goodtables.io API` as a primary backend

## Getting started

### Installation

The package use semantic versioning. It means that major versions  could include breaking changes. It's highly recommended to specify `goodtables` version range in your `package.json` file e.g. `tabulator: ^1.0` which  will be added by default by `npm install --save`.

#### NPM

```bash
$ npm install goodtables
```

#### CDN

```html
<script src="//unpkg.com/goodtables/dist/goodtables.min.js"></script>
```

### Examples

Code examples in this readme requires Node v8.0+ or proper modern browser . Also you need to wrap code into async function if there is `await` keyword used.

```js
const source = '<SOURCE_URL>'
const options = {
  api_url: 'https://goodtables.io/api',
  api_token: '<API_TOKEN>',
  api_source_id: '<API_SOURCE_ID>',
}
const report = await goodtables.inspect(source, options)
```

## Documentation

### inspect

This function gets a tabular dataset and returns a goodtables `report`.

#### `async inspect(source, options)`

...


## Contributing

The project follows the [Open Knowledge International coding standards](https://github.com/okfn/coding-standards). There are common commands to work with the project:

```
$ npm install
$ npm run build
$ npm run test
```

## Changelog

Here described only breaking and the most important changes. The full changelog could be found in nicely formatted [commit history](https://github.com/frictionlessdata/goodtables-js/commits/master).

### v0.4

This version includes breaking changes and now uses `goodtables.io/api` as a main backend.

### [v0.3](https://github.com/frictionlessdata/goodtables-js/tree/v0.3.0)

This version uses `goodtables-web` service as a backend.
