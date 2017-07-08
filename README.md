# goodtables.js

[![Travis](https://travis-ci.org/frictionlessdata/tableschema-js.svg?branch=master)](https://travis-ci.org/frictionlessdata/goodtables-js)
[![Coveralls](https://coveralls.io/repos/github/frictionlessdata/goodtables-js/badge.svg?branch=master)](https://coveralls.io/github/frictionlessdata/goodtables-js?branch=master)
[![NPM](https://img.shields.io/npm/v/goodtables.svg)](https://www.npmjs.com/package/goodtables)
[![Gitter](https://img.shields.io/gitter/room/frictionlessdata/chat.svg)](https://gitter.im/frictionlessdata/chat)

An API wrapper for a goodtables.io, an open source web service for validating tabular data sources ([DEMO](https://frictionlessdata.github.io/goodtables-js/)).

## Features

 - `validate` function to validate tabular data and output a `goodtables` report
 - `goodtables.io/api` as a cloud backend

## Getting started

### Installation

The package use semantic versioning. It means that major versions  could include breaking changes. It's highly recommended to specify `goodtables` version range in your `package.json` file e.g. `goodtables: ^1.0` which  will be added by default by `npm install --save`.

#### NPM

```bash
$ npm install goodtables
```

#### CDN

```html
<script src="//unpkg.com/goodtables/dist/goodtables.min.js"></script>
```

### Examples

Code examples in this readme requires Node v8.0+ or proper modern browser . Also you have to wrap code into async function if there is `await` keyword used.

```js
const source = '<SOURCE_URL>'
const options = {
  apiUrl: 'https://goodtables.io/api',
  apiToken: '<API_TOKEN>',
  apiSourceId: '<API_SOURCE_ID>',
}
const report = await goodtables.validate(source, options)
```

## Documentation

### Validate

This function gets a tabular dataset and returns a goodtables report.

#### `async validate(source, options)`

- `source (String/Object)`
- `options`
  - [API]
  - `apiUrl`
  - `apiToken`
  - `apiSourceId`
  - [Validation]
  - `checks`
  - `errorLimit`
  - `tableLimit`
  - `rowLimit`
  - `inferSchema`
  - `inferFields`
  - `orderFields`
  - [Source]
  - `preset`
  - `schema`
- `(Object)` - returns a goodtables report

### Spec

Data quality spec is shipped with the library.

#### `spec`

- `(Object)` - returns data quality spec

### API Client

> It's a provisional API. If you use it as a part of other program please pin concrete library version to your requirements file.

#### `new ApiClient({apiUrl, apiToken, apiSourceId})`
#### `apiClient.addReport(source, options)`
#### `apiClient.getReport(apiJobId)`

## Contributing

The project follows the [Open Knowledge International coding standards](https://github.com/okfn/coding-standards). There are common commands to work with the project:

```
$ npm install
$ npm run build
$ npm run test
```

## Changelog

Here described only breaking and the most important changes. The full changelog could be found in nicely formatted [commit history](https://github.com/frictionlessdata/goodtables-js/commits/master).

### v0.7

New functionality added:
- `source` and `schema` now could be a `File` object in browser to allow file uploading

### [v0.6](https://github.com/frictionlessdata/goodtables-js/tree/v0.6.0)

New provisional API added:
- published `ApiClient` class

### [v0.5](https://github.com/frictionlessdata/goodtables-js/tree/v0.5.0)

New API added:
- published data quality spec as `spec`

### [v0.4](https://github.com/frictionlessdata/goodtables-js/tree/v0.4.0)

This version includes breaking changes and now uses `goodtables.io/api` as a backend.

### [v0.3](https://github.com/frictionlessdata/goodtables-js/tree/v0.3.0)

This version uses `goodtables-web` service as a backend.
