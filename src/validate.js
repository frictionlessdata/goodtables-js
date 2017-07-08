const clone = require('lodash/clone')
const {ApiClient} = require('./client')
const {pop} = require('./helpers')


// Module API

module.exports.validate = async (source, options={}) => {
  options = clone(options)

  // Extract api config
  const apiUrl = pop(options, 'apiUrl')
  const apiToken = pop(options, 'apiToken')
  const apiSourceId = pop(options, 'apiSourceId')

  // Get report from api client
  const client = new ApiClient({apiUrl, apiToken, apiSourceId})
  const apiJobId = await client.addReport(source, options)
  const report = await client.getReport(apiJobId)

  return report
}
