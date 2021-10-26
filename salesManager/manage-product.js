const manageProductModule = function (ProductModel) {
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

  async function createProduct (req, res) {
    const body = req.body
    if (!checkNullReq(body)) {
      res.status(500).send('Missing property of product')
      return
    }

    /* Create Product Model */
    const newProduct = new ProductModel({
      _id: body.id,
      name: body.name,
      desc: body.desc,
      price: body.price,
      unit: body.unit,
      img: body.img
    })

    /* Check if the Product is existed */

    if (await checkExistedProduct(ProductModel, body.id)) {
      res.status(500).send('Product is existed')
      return
    }

    try {
      const item = await newProduct.save()
      res.status(200).send(item)
    } catch (error) {
      console.log(error)
      res.status(500).send('Fail')
    }
  }

  return {
    createProduct: createProduct
  }
}

module.exports = manageProductModule
