# goodtables-js

[![Travis](https://travis-ci.org/frictionlessdata/tableschema-js.svg?branch=master)](https://travis-ci.org/frictionlessdata/goodtables-js)
[![Coveralls](https://coveralls.io/repos/github/frictionlessdata/goodtables-js/badge.svg?branch=master)](https://coveralls.io/github/frictionlessdata/goodtables-js?branch=master)
[![NPM](https://img.shields.io/npm/v/goodtables.svg)](https://www.npmjs.com/package/goodtables)
[![Gitter](https://img.shields.io/gitter/room/frictionlessdata/chat.svg)](https://gitter.im/frictionlessdata/chat)

An API wrapper for a goodtables.io, an open source web service for validating tabular data sources ([DEMO](https://frictionlessdata.github.io/goodtables-js/)).

## Features

 - `validate` function to validate tabular data and output a `goodtables` report
 - `goodtables.io/api` as a cloud backend

## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting started](#getting-started)
  - [Installation](#installation)
- [Documentation](#documentation)
- [API Reference](#api-reference)
  - [ApiClient](#apiclient)
  - [validate()](#validate)
- [Contributing](#contributing)
- [Changelog](#changelog)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

## Documentation

Let's start with a simple example:

```js
const source = '<SOURCE_URL>'
const options = {
  // any goodtables options e.g.
  skipChecks=['missing-header'],
}
const report = await goodtables.validate(source, options)
```

This package is only wrapper around main `goodltabes-py` via goodtables.io API. Read full [documentation](https://github.com/frictionlessdata/goodtables-py#documentation) to learn the package in details. Please note that JavaScript version of the library uses `camelCase` naming for classes, arguments etc instead of `snake_case` in the Python counterpart.

Data quality spec is shipped with the library.

```js
const spec = goodtables.spec
```

Under the hood `validate` function uses `ApiClient` class. It could be useful for the end-user if there is a need to split API job creation and report getting  into two steps.

```js
new ApiClient({apiUrl, apiToken, apiSourceId})
async apiClient.addReport(source, options)
async apiClient.getReport(apiJobId)
```

## API Reference

### ApiClient
APIClient


### validate()
Validate

See `goodtables-py`


## Contributing

> The project follows the [Open Knowledge International coding standards](https://github.com/okfn/coding-standards). There are common commands to work with the project:

```
$ npm install
$ npm run build
$ npm run test
```

## Changelog

Here described only breaking and the most important changes. The full changelog could be found in nicely formatted [commit history](https://github.com/frictionlessdata/goodtables-js/commits/master).

#### v1.0

First stable realese.

#### v0.7

New functionality added:
- `source` and `schema` now could be a `File` object in browser to allow file uploading

#### v0.6

New provisional API added:
- published `ApiClient` class

#### v0.5

New API added:
- published data quality spec as `spec`

#### v0.4

This version includes breaking changes and now uses `goodtables.io/api` as a backend.

#### v0.3

This version uses `goodtables-web` service as a backend.
