function checkNullReq (body) {
  return (
    Object.keys(body).every(function (key) {
      return body[key] != null && body[key] != ''
    }) && Object.keys(body).length == 6
  )
}

async function checkExistedProduct (model, id) {
  return await model.findById(id).exec()
}


async function createProduct()
