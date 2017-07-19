# goodtables-js

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

The whole public API of this package is described here and follows semantic versioning rules. Everyting outside of this readme are private API and could be changed without any notification on any new version.

This package is only wrapper around main `goodltabes-py` via goodtables.io API. Read full [documentation](https://github.com/frictionlessdata/goodtables-py#documentation) to learn the package in details. Please note that JavaScript version of the library uses `camelCase` naming for classes, arguments etc instead of `snake_case` in the Python counterpart.

### Validate

This function gets a tabular dataset and returns a goodtables report.

#### `async validate(source, options)`

- **[Arguments - for `table` preset]**
- `source (url/Object/File)` - validation source containing data table
- `preset (String)` - dataset type could be `table` (default), `datapackage`, `nested` or custom. For the most cases preset will be inferred from the source.
- `schema (url/Object/File)` - Table Schema to validate data source against
- `headers (Array/Number)` - headers list or source row number containing headers. If number is given for plain source headers row and all rows before will be removed and for keyed source no rows will be removed.
- `scheme (String)` - source scheme with `file` as default. For the most cases scheme will be inferred from source. See [list of the supported schemes](https://github.com/frictionlessdata/tabulator-py#schemes).
- `format (String)` - source format with `None` (detect) as default. For the most cases format will be inferred from source. See [list of the supported formats](https://github.com/frictionlessdata/tabulator-py#formats).
- `encoding (String)` - source encoding with  `None` (detect) as default.
- `skipRows (Number/String[])` - list of rows to skip by row number or row comment. Example: `skip_rows=[1, 2, '#', '//']` - rows 1, 2 and all rows started with `#` and `//` will be skipped.
- `<name> (<type>)` - additional options supported by different schema and format. See [list of schema options](https://github.com/frictionlessdata/tabulator-py#schemes) and [list of format options](https://github.com/frictionlessdata/tabulator-py#schemes).
- **[Arguments - for `datapackage` preset]**
- `source (url/Object/File)` - validation source containing data package descriptor
- `preset (String)` - dataset type could be `table` (default), `datapackage`, `nested` or custom. For the most cases preset will be inferred from the source.
- `<name> (<type>)` - options to pass to Data Package constructor
- **[Arguments - for `nested` preset]**
- `source (Object[])` - list of dictionaries with keys named after source option names
- `preset (String)` - dataset type could be `table` (default), `datapackage`, `nested` or custom. For the most cases preset will be inferred from the source.
- **[Arguments]**
- `checks (String/Object)` - checks configuration
- `inferSchema (Boolean)` - infer schema if not passed
- `inferFields (Boolean)` - infer schema for columns not presented in schema
- `orderFields (Boolean)` - order source columns based on schema fields order
- `errorLimit (Number)` - error limit per table
- `tableLimit (Number)` - table limit for dataset
- `rowLimit (Number)` - row limit per table
- `apiUrl (String)` - base url of goodtables.io API
- `apiToken (String)` - access token for goodtables.io API
- `apiSourceId (String)` - source identifier for goodtables.io API
- **[Raises]**
- `(Error)` - raise on any non-tabular error
- **[Returns]**
- `(Object)` - returns a `goodtables` report

### Spec

Data quality spec is shipped with the library.

#### `spec`

- `(Object)` - returns data quality spec

### API Client

> It's a provisional API. If you use it as a part of other program please pin concrete library version to your requirements file.

Under the hood `validate` function uses `ApiClient` class. It could be useful for the end-user if there is a need to split API job creation and report getting  into two steps.

#### `new ApiClient({apiUrl, apiToken, apiSourceId})`
#### `async apiClient.addReport(source, options)`
#### `async apiClient.getReport(apiJobId)`

## Contributing

The project follows the [Open Knowledge International coding standards](https://github.com/okfn/coding-standards). There are common commands to work with the project:

```
$ npm install
$ npm run build
$ npm run test
```

## Changelog

Here described only breaking and the most important changes. The full changelog could be found in nicely formatted [commit history](https://github.com/frictionlessdata/goodtables-js/commits/master).

### v1.0

First stable realese.

### [v0.7](https://github.com/frictionlessdata/goodtables-js/tree/v0.7.0)

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
