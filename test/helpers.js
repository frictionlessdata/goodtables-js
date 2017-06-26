// Helpers

module.exports.catchError = async (func, ...args) => {
  let error
  try {
    await func(...args)
  } catch (exception) {
    error = exception
  }
  return error
}
