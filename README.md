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

> The package use semantic versioning. It means that major versions  could include breaking changes. It's highly recommended to specify `goodtables` version range in your `package.json` file e.g. `tabulator: ^1.0` which  will be added by default by `npm install --save`.

#### NPM

```bash
$ npm install goodtables
```

#### CDN

```html
<script src="//unpkg.com/tableschema/dist/goodtables.min.js"></script>
```

### Examples

There are main examples and more are available in [examples](https://github.com/frictionlessdata/tableschema-js/tree/master/examples) directory.

```js
import {Schema} from 'tableschema'

const descriptor = {
  fields: [
    {name: 'name', type: 'string'},
    {name: 'age', type: 'integer'},
  ]
}

Schema.load(descriptor).then(schema => {
    schema.getField('age').castValue('21') // 21
})
```

## Documentation

### validate

Given a schema as JSON object, `validate` returns `Promise`, which success for a valid Table Schema, or reject with array of errors.

#### async validate(descriptor)

This funcion is async so it has to be used with `await` keyword or as a `Promise`.

- descriptor (String/Object) - gets schema descriptor (local/remote path or object)
- (Error[]) - raises list of validation errors for invalid
- (Boolean) - returns true for valid

List of actions on descriptor:
- retrieved (if path/url)
- dereferenced (schema/dialect)
- expanded (with profile defaults)
- validated (against table-schema profile)

Let's see on example:

```js
var validate = require('tableschema').validate;
var schema = {
   fields: [
     {
       name: 'id',
       title: '',
       description: '',
       type: 'integer',
       format: 'default'
     },
     {
       name: 'age',
       title: '',
       description: '',
       type: 'integer',
       format: 'default'
     },
     {
       name: 'name',
       title: '',
       description: '',
       type: 'string',
       format: 'default'
     }
   ]
};

validate(schema).then(function() {
  // do something with valid schema here
}).catch(function(errors) {
  // uh oh, some validation errors in the errors array
})
```
Note: `validate()` validates whether a **schema** is a validate Table Schema accordingly to the (specifications)[http://schemas.datapackages.org/json-table-schema.json]. It does **not** validate data against a schema.


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
