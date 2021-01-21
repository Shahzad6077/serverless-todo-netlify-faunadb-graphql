const { formattedResponse } = require("./utils/formattedResponse")

exports.handler = async (event, context) => {
  const { identity, user } = context.clientContext
  console.log("Testing-->", identity, user)
  return formattedResponse(200, { msg: "Hello tester" })
}
