const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose')
require('mongoose-double')(mongoose)
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const manageProduct = require('./manage-product')

main().catch(err => console.log(err))

async function main () {
  await mongoose.connect(
    'mongodb://training:Admin$56789@123.30.145.67:27017/Training'
  )

  /* ---------USER--------- */
  /* Same with define a constructor */
  const userSchema = new mongoose.Schema(
    {
      username: String,
      fullname: String,
      address: String,
      pass: String
    },
    {
      collection: 'User'
    }
  )

  const UserModel = mongoose.model('User', userSchema)

  app.use(
    cors({
      origin: '*'
    })
  )

  app.use(express.json())

  /* encode and check the password */
  const saltRounds = 10
  async function genEncodePassword (password) {
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  }

  async function comparePassword (password, hash) {
    return await bcrypt.compare(password, hash)
  }

  /* Login */
  app.post('/api/login', async function (req, res) {
    const account = req.body
    try {
      const findUser = await UserModel.findOne({
        username: account.username
      }).exec()
      if (await comparePassword(account.password, findUser.pass)) {
        // Tạo token nhận vào 2 tham số
        // 1. Object mà ta muốn chuyển đổi thành json
        // 2. jwt secretkey
        const token = jwt.sign(
          {
            _id: findUser._id
          },
          'hoangminh2702'
        )

        const headers = req.headers
        console.log(headers.authorization)

        // Send cho client 1 object chưa token của họ
        res.status(200).json({
          message: 'Successful',
          token: token
        })
      } else {
        res.status(500).send('Please check your username or password again')
      }
    } catch (err) {
      console.log(err)
      res.status(500).send('Please check your username or password again')
    }
  })

  /* Get all user */

  app.get('/api/getUser', async function (req, res) {
    try {
      let data = await UserModel.find({}).exec()
      let returnData = {
        items: data
      }
      res.status(200).send(returnData)
    } catch (err) {
      res.status(400).send('Lỗi')
    }
  })

  /* Create User */
  app.post('/api/createUser', async function (req, res) {
    const account = req.body
    // Kiểm tra xem có trường nào rỗng không
    if (
      !(
        account.username &&
        account.fullname &&
        account.address &&
        account.password
      )
    ) {
      res.status(500).send('Please fill all the input')
      return
    }

    // Kiểm tra xem có bị trùng username không
    const checkExistedUser = await UserModel.find({
      username: account.username
    }).exec()
    if (checkExistedUser.length) {
      res.status(500).send('Existed username')
      return
    }

    // Create User
    const newUser = new UserModel({
      username: account.username,
      fullname: account.fullname,
      pass: await genEncodePassword(account.password),
      address: account.address
    })

    console.log(newUser)

    try {
      await newUser.save()
      res.status(200).send({
        username: newUser.username,
        fullname: newUser.fullname,
        address: newUser.address
      })
    } catch (err) {
      res.status(500).send('Fail to create User')
    }
  })

  /* ---------PRODUCT--------- */

  const productSchema = mongoose.Schema(
    {
      _id: String,
      name: String,
      desc: String,
      price: mongoose.Schema.Types.Double,
      unit: String,
      img: String
    },
    {
      collection: 'Product'
    }
  )

  const ProductModel = mongoose.model('Product', productSchema)

  /* Create New Product */
  app.post('/api/createProduct', manageProduct(ProductModel).createProduct)

  /* Get Product */
  app.get('/api/getProducts', manageProduct(ProductModel).getProducts)

  /* Delete Product */
  app.post('/api/deleteProduct/:id', manageProduct(ProductModel).deleteProduct)

  /* Find Product By Id */
  app.get('/api/findById', manageProduct(ProductModel).getProductById)

  app.listen(port, function () {
    console.log(`Now listening on port ${port}`)
  })
}
