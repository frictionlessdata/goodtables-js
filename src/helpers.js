// Module API

module.exports.pop = (object, key, defaultValue = undefined) => {
  let value = object[key]
  if (value === undefined) value = defaultValue
  delete object[key]
  return value
}

module.exports.poll = ({ seconds, attempts }, action) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (attempts === 0) {
        clearInterval(interval)
        reject(new Error('Reached maximum attemtps'))
      } else {
        attempts -= 1
        action()
          .then((result) => {
            if (result) {
              clearInterval(interval)
              resolve(result)
            }
          })
          .catch((error) => {
            reject(error)
          })
      }
    }, seconds * 1000)
  })
}
