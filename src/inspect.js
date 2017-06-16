const axios = require('axios')
const clone = require('lodash/clone')
const isString = require('lodash/isString')
const config = require('./config')


// Module API

module.exports.inspect = async (source, options) => {
  options = clone(options)

  // Prepare api config
  const apiConfig = {}
  for (const [key, value] of Object.entries(options)) {
    if (config.API_CONFIG_KEYS.includes(key)) {
      apiConfig[key] = value
      delete options[key]
    }
  }

  // Prepare job config
  const jobConfig = {}
  for (const [key, value] of Object.entries(options)) {
    if (config.JOB_CONFIG_KEYS.includes(key)) {
      jobConfig[key] = value
      delete options[key]
    }
  }

  // Prepare source
  if (isString(source)) {
    source = [Object.assign(options, {source})]
  }

  // Get job
  const url = `${apiConfig.api_url}/source/${apiConfig.api_source_id}/job`
  const data = {source, settings: jobConfig}
  const headers = {Authorization: apiConfig.api_token}
  const response = await axios.post(url, data, {headers})
  const job = response.data.job

  // Get report
  const report = await poll({period: 1, timeout: 10}, async () => {
    const url = `${apiConfig.api_url}/source/${apiConfig.api_source_id}/job/${job.id}`
    const response = await axios.get(url, {headers})
    if (response.data.job.finished) {
      return response.data.job.report
    }
  })

  return report
}


// Internal

function poll({period, timeout}, action) {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (timeout < 0) {
        clearInterval(interval)
        reject('Timeout')
      } else {
        timeout = timeout - period
        action().then(result => {
          if (result) {
            clearInterval(interval)
            resolve(result)
          }
        })
      }
    }, period * 1000)
  })
}
