const axios = require('axios')
const lodash = require('lodash')
const {assert} = require('chai')
const AxiosMockAdapter = require('axios-mock-adapter')
const {validate} = require('../src')
const {catchError} = require('./helpers')

// Tests

describe('validate', () => {

  it('should return report', async () => {
    const source = 'source'
    const apiConfig = {apiUrl: 'apiUrl', apiToken: 'apiToken', apiSourceId: 'apiSourceId'}
    const jobConfig = {checks: 'checks', errorLimit: 'errorLimit'}
    const sourceConfig = {skipRows: 'skipRows'}
    const options = lodash.merge(apiConfig, jobConfig, sourceConfig)
    const job = {id: 1, finished: true, report: {valid: true}}
    const http = new AxiosMockAdapter(axios)

    // Assert post call
    http.onPost().reply(config => {
      const data = JSON.parse(config.data)
      assert.deepEqual(config.url, `${options.apiUrl}/source/${options.apiSourceId}/job`)
      assert.deepEqual(config.headers.Authorization, options.apiToken)
      assert.deepEqual(data.source, [{source, skip_rows: 'skipRows'}])
      assert.deepEqual(data.settings, {checks: 'checks', error_limit: 'errorLimit'})
      return [200, {job}]
    })

    // Assert get call
    let attempts = 0
    http.onGet().reply(config => {
      attempts += 1
      assert.deepEqual(config.url, `${options.apiUrl}/source/${options.apiSourceId}/job/${job.id}`)
      assert.deepEqual(config.headers.Authorization, options.apiToken)
      return (attempts > 1) ? [200, {job}] : [200, {job: {finished: false}}]
    })

    // Assert report
    const report = await validate(source, options)
    assert.deepEqual(report, job.report)

  })

  it('should throw error without API token', async () => {
    const source = 'source'
    const options = {apiUrl: 'apiUrl', apiSourceId: 'apiSourceId'}
    const error = await catchError(validate, source, options)
    assert.include(error.message, 'apiToken')
  })

  it('should throw error without API source id', async () => {
    const source = 'source'
    const options = {apiUrl: 'apiUrl', apiToken: 'apiToken'}
    const error = await catchError(validate, source, options)
    assert.include(error.message, 'apiSourceId')
  })

  it('should throw error on unavailable API', async () => {
    const source = 'source'
    const options = {apiUrl: 'apiUrl', apiToken: 'apiToken', apiSourceId: 'apiSourceId'}
    const http = new AxiosMockAdapter(axios)
    http.onPost().reply(404)
    const error = await catchError(validate, source, options)
    assert.include(error.message, 'create a job')
  })

})
