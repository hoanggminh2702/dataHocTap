function validateBody (model) {
  return {
    /* Check the request */
    checkNullReq: function (body, numberObProperty) {
      let countProperty
      if (Number.isFinite(numberObProperty)) {
        countProperty = Object.keys(body).length == numberObProperty
      } else {
        countProperty = 1
      }
      return (
        Object.keys(body).every(function (key) {
          return body[key] != null && body[key] != ''
        }) && countProperty
      )
    },

    /* check Existed Product */
    checkExistedProduct: async function checkExistedProduct (model, id) {
      return await model.findById(id).exec()
    }
  }
}

module.exports = validateBody
