const formattedResponse = (statusCode, body) => {
  return {
    statusCode,
    body: JSON.stringify(body),
  }
}
exports.formattedResponse = formattedResponse
