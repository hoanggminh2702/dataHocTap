const validateBody = require('./validateBody')

/* Create New Product Function */

const createProduct = function (ProductModel) {
  return async function (req, res) {
    req.body.img = req.body.img
      ? req.body.img
      : 'https://keiclubmiennam.com/wp-content/uploads/2021/06/noimageavailable.png'
    const body = req.body
    if (!validateBody(ProductModel).checkNullReq(body, 7)) {
      res.status(500).json('Missing property of product')
      return
    }

    console.log(body)

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
      res.status(500).json('Product is existed')
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

/* Update Product */
const updateProduct = function (ProductModel) {
  return async function (req, res) {
    req.body.img = req.body.img
      ? req.body.img
      : 'https://keiclubmiennam.com/wp-content/uploads/2021/06/noimageavailable.png'
    const body = req.body
    if (!validateBody(ProductModel).checkNullReq(body, 7)) {
      res.status(500).json('Missing property of product')
      return
    }
    const filter = { _id: body.id }
    const update = {
      name: body.name,
      desc: body.desc,
      price: body.price,
      unit: body.unit,
      quantity: body.quantity,
      img: body.img
    }

    try {
      let updateProduct = await ProductModel.findOneAndUpdate(filter, update, {
        new: true
      })
      res.status(200).json({
        message: 'Update Successfully',
        product: updateProduct
      })
    } catch (err) {
      res.status(500).json({
        message: 'Update fail'
      })
    }
  }
}

/* Get Products */
const getProducts = function (ProductModel) {
  return async function (req, res) {
    //TODO handle the request param
    const limit = Number(req.query.take) ?? 15
    let skip = req.query.page ?? 0

    let price = req.query.price ?? ''

    const search = req.query.search ?? ''

    if (skip != '') skip = (skip - 1) * limit

    const filter = {}

    if (price != null || price != '')
      switch (price) {
        case '1':
          filter.price = {
            $lt: 50000
          }
          break
        case '2':
          filter.price = {
            $lt: 500000
          }
          break
        case '3':
          filter.price = {
            $lt: 5000000
          }
          break
        case '4':
          filter.price = {
            $gt: 5000000
          }
          break
        default:
          break
      }

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
      res.status(200).json(deletedItems)
    } catch (error) {
      res.status(500).json('Fail to delete the product')
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
      res.status(200).json(item)
    } catch (error) {
      res.status(404).json('Not found the product')
      console.log(error)
    }
  }
}

/* ------------------------ */

const manageProductModule = function (ProductModel) {
  // xu???t ra c??c function c?? truy???n model v??o trong ????? th???c thi
  return {
    createProduct: createProduct(ProductModel),
    getProducts: getProducts(ProductModel),
    deleteProduct: deleteProduct(ProductModel),
    getProductById: getProductById(ProductModel),
    updateProduct: updateProduct(ProductModel)
  }
}

module.exports = manageProductModule
