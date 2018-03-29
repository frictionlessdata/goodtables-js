const axios = require('axios')
const size = require('lodash/size')
const clone = require('lodash/clone')
const pickBy = require('lodash/pickBy')
const mapKeys = require('lodash/mapKeys')
const isArray = require('lodash/isArray')
const snakeCase = require('lodash/snakeCase')
const {pop, poll} = require('./helpers')
const config = require('./config')


// Module API

class ApiClient {

  // Public

  constructor({apiUrl, apiToken, apiSourceId}) {

    // Validate params
    if (!apiToken || !apiSourceId) {
      throw new Error('Options "apiToken" and "apiSourceId" are required')
    }

    // Assign params
    this._apiUrl = apiUrl || config.DEFAULT_API_URL
    this._apiToken = apiToken
    this._apiSourceId = apiSourceId
    this._requestConfig = {headers: {Authorization: this._apiToken}}
  }

  async addReport(source, options={}) {
    options = clone(options)

    // Extract job config
    const checks = pop(options, 'checks')
    const errorLimit = pop(options, 'errorLimit')
    const tableLimit = pop(options, 'tableLimit')
    const rowLimit = pop(options, 'rowLimit')
    const inferSchema = pop(options, 'inferSchema')
    const inferFields = pop(options, 'inferFields')
    const orderFields = pop(options, 'orderFields')

    // Prepare source
    if (!isArray(source)) source = [Object.assign(options, {source})]
    source = source.map(item => mapKeys(item, (value, key) => snakeCase(key)))

    // Prepare settings
    let settings = {checks,
      errorLimit, tableLimit, rowLimit,
      inferSchema, inferFields, orderFields}
    settings = pickBy(settings, value => value !== undefined)
    settings = mapKeys(settings, (value, key) => snakeCase(key))

    // Extract files
    const files = {}
    const fileType = (typeof File !== 'undefined') ? File : Buffer
    for (const item of source) {
      for (const key of ['source', 'schema']) {
        if (item[key] instanceof fileType) {
          const name = `file${size(files)}`
          files[name] = item[key]
          item[key] = name
        }
      }
    }

    // Prepare payload
    let payload = {source, settings}
    if (size(files) > 0) {
      payload = new FormData()
      payload.append('data', JSON.stringify({source, settings}))
      for (const [name, file] of Object.entries(files)) {
        payload.append(name, file)
      }
    }

    // Get job
    let job
    try {
      const url = `${this._apiUrl}/source/${this._apiSourceId}/job`
      const response = await axios.post(url, payload, this._requestConfig)
      job = response.data.job
    } catch (error) {
      throw new Error(`Can't create a job on API. Reason: "${error}"`)
    }

    return job.id
  }

  async getReport(apiJobId) {
    let report

    // Get report
    try {
      report = await poll({seconds: 3, attempts: 60}, async () => {
        const url = `${this._apiUrl}/source/${this._apiSourceId}/job/${apiJobId}`
        const response = await axios.get(url, this._requestConfig)
        const job = response.data.job
        if (job.finished) {
          if (job.error) {
            throw new Error(`Errored report from API. Reason: "${job.error.message}"`)
          }
          return job.report
        }
      })
    } catch (error) {
      throw new Error(`Can't get a report from API. Reason: "${error}"`)
    }

    return report
  }

}
module.exports.ApiClient = ApiClient
