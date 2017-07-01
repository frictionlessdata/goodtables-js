const axios = require('axios')
const clone = require('lodash/clone')
const pickBy = require('lodash/pickBy')
const mapKeys = require('lodash/mapKeys')
const isString = require('lodash/isString')
const snakeCase = require('lodash/snakeCase')
const config = require('./config')


// Module API

module.exports.validate = async (source, options) => {
  options = clone(options)

  // Extract api config
  const apiUrl = pop(options, 'apiUrl', config.DEFAULT_API_URL)
  const apiToken = pop(options, 'apiToken')
  const apiSourceId = pop(options, 'apiSourceId')
  if (!apiToken || !apiSourceId) {
    throw new Error('Options "apiToken" and "apiSourceId" are required')
  }

  // Extract job config
  const checks = pop(options, 'checks')
  const errorLimit = pop(options, 'errorLimit')
  const tableLimit = pop(options, 'tableLimit')
  const rowLimit = pop(options, 'rowLimit')
  const inferSchema = pop(options, 'inferSchema')
  const inferFields = pop(options, 'inferFields')
  const orderFields = pop(options, 'orderFields')

  // Prepare source
  if (isString(source)) source = [Object.assign(options, {source})]
  source = source.map(item => mapKeys(item, (value, key) => snakeCase(key)))
  console.log(source)

  // Prepare settings
  let settings = {checks,
    errorLimit, tableLimit, rowLimit,
    inferSchema, inferFields, orderFields}
  settings = pickBy(settings, value => value !== undefined)
  settings = mapKeys(settings, (value, key) => snakeCase(key))

  // Prepare headers
  const headers = {Authorization: apiToken}

  // Get job
  let job
  try {
    const url = `${apiUrl}/source/${apiSourceId}/job`
    const response = await axios.post(url, {source, settings}, {headers})
    job = response.data.job
  } catch (error) {
    throw new Error(`Can't create a job on API. Reason: "${error}"`)
  }

  // Get report
  let report
  try {
    report = await poll({seconds: 1, attempts: 10}, async () => {
      const url = `${apiUrl}/source/${apiSourceId}/job/${job.id}`
      const response = await axios.get(url, {headers})
      if (response.data.job.finished) {
        return response.data.job.report
      }
    })
  } catch (error) {
    throw new Error(`Can't get a report from API. Reason: "${error}"`)
  }

  return report
}


// Internal

function pop(object, key, defaultValue=undefined) {
  let value = object[key]
  if (value === undefined) value = defaultValue
  delete object[key]
  return value
}


function poll({seconds, attempts}, action) {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (attempts === 0) {
        clearInterval(interval)
        reject(new Error('Reached maximum attemtps'))
      } else {
        attempts -= 1
        action().then(result => {
          if (result) {
            clearInterval(interval)
            resolve(result)
          }
        }).catch(error => {
          reject(error)
        })
      }
    }, seconds * 1000)
  })
}
