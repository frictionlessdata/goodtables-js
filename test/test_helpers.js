const { poll } = require('../src/helpers')
const { assert } = require('chai')

describe('helpers', () => {
  describe('poll', () => {
    it('should call callback up to `attempts` times', () => {
      const attempts = 2
      let numberAttempts = 0

      return poll({ seconds: 0, attempts }, async () => {
        numberAttempts += 1
        return attempts === numberAttempts
      })
    })

    it('should fail if callback has not returned true after `attempts` times', () =>
      assert.isRejected(poll({ seconds: 0, attempts: 1 }, async () => {})))

    it('should keep retrying until callback returns truthy if `attempts` is undefined', () => {
      const attempts = 2
      let numberAttempts = 0

      return poll({ seconds: 0 }, async () => {
        numberAttempts += 1
        return attempts === numberAttempts
      }).then(() => assert.equal(attempts, numberAttempts))
    })

    it('should resolve the value returned by the callback', () => {
      const result = 42
      return assert.eventually.equal(
        poll({ seconds: 0 }, async () => result),
        result
      )
    })

    it('should reject the error rejected by the callback', () => {
      const errorMessage = 'foobar'
      return assert.isRejected(
        poll({ seconds: 0 }, async () => {
          throw Error(errorMessage)
        }),
        errorMessage
      )
    })
  })
})
