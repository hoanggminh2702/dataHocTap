const validateBody = require('./validateBody')

/* Create New Product Function */

const createProduct = function (ProductModel) {
  return async function (req, res) {
    const body = req.body
    if (!validateBody(ProductModel).checkNullReq(body, 7)) {
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
      quantity: body.quantity,
      bought: 0,
      img: body.img
    })

    /* Check if the Product is existed */

    if (
      await validateBody(ProductModel).checkExistedProduct(
        ProductModel,
        body.id
      )
    ) {
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
}

const getProducts = function (ProductModel) {
  return async function (req, res) {
    //TODO handle the request param
    const limit = Number(req.query.take) ?? 15
    let skip = req.query.page ?? 0

    const search = req.query.search ?? ''

    if (skip != '') skip = (skip - 1) * limit

    const filter = {}

    if (search != '') {
      filter.name = new RegExp(search, 'i')
    }

    // TODO: implement filter logic
    try {
      const countDocuments = await ProductModel.countDocuments(filter).exec()
      const items = await ProductModel.find(filter)
        .skip(skip)
        .limit(limit)
        .exec()
      res.status(200).send({
        items: items,
        countDocuments: countDocuments
      })
    } catch (error) {
      console.log(error)
      res.status(404).send('Fail')
    }
  }
}

/* Delete Product */
const deleteProduct = function (ProductModel) {
  return async function (req, res) {
    const id = req.params['id']
    if (
      !(await validateBody(ProductModel).checkExistedProduct(ProductModel, id))
    ) {
      res.status(404).send('The product is not existed')
      return
    }

    try {
      const deletedItems = await ProductModel.findByIdAndDelete(id)
      res.status(200).send(deletedItems)
    } catch (error) {
      res.status(500).send('Fail to delete the product')
      console.log(error)
    }
  }
}

/* Get Product By Id */
const getProductById = function (ProductModel) {
  return async function (req, res) {
    const id = req.query.id
    try {
      const item = await ProductModel.findById(id).exec()
      res.status(200).send(item)
    } catch (error) {
      res.status(404).send('Not found the product')
      console.log(error)
    }
  }
}

/* ------------------------ */

const manageProductModule = function (ProductModel) {
  // xuất ra các function có truyền model vào trong để thực thi
  return {
    createProduct: createProduct(ProductModel),
    getProducts: getProducts(ProductModel),
    deleteProduct: deleteProduct(ProductModel),
    getProductById: getProductById(ProductModel)
  }
}

module.exports = manageProductModule
