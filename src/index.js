require('babel-polyfill')
const {validate} = require('./validate')
const spec = require('./spec.json')


// Module API

module.exports.validate = validate
module.exports.spec = spec
