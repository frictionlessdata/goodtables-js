const assert = require('chai').assert
const inspect = require('../src').inspect


// Tests

describe('inspect', () => {

  it('should work', async () => {
    const source = 'https://raw.githubusercontent.com/frictionlessdata/goodtables-py/master/data/invalid.csv'
    const options = {
      api_url: 'https://staging.goodtables.io/api',
      api_token: '4648C12FA72133E03E090787A61B6E4EE78607B0',
      api_source_id: '90c9b09e-8030-453d-a8de-9f07ae780452',
    }
    const report = await inspect(source, options)
    assert.equal(report['table-count'], 1)
    assert.equal(report['error-count'], 7)
  })

})
