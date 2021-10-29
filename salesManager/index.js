const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose')
require('mongoose-double')(mongoose)
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const manageProduct = require('./manage-product')

const manageOrders = require('./manage-orders')

const SECRET_KEY = 'hoangminh2702'

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
      pass: String,
      role: String
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
            _id: findUser._id,
            username: findUser.username,
            role: findUser.role
          },
          SECRET_KEY,
          {
            expiresIn: '24h'
          }
        )

        // Send cho client 1 object chứa token của họ
        res.status(200).json({
          username: findUser.username,
          message: 'Successful',
          token: token,
          role: findUser.role
        })
      } else {
        res.status(500).send('Please check your username or password again')
      }
    } catch (err) {
      console.log(err)
      res.status(500).send('Please check your username or password again')
    }
  })

  /* Authen */
  // Đọc headers phần tử thứ 3 để lấy token, phần tử thứ 2 để check xem có chuyển qua hàm tiếp theo không
  function authen (req, res, next) {
    const token = req.headers.authorization.split(' ')[2]
    jwt.verify(token, SECRET_KEY, async function (err, data) {
      if (err) {
        res.status(500).json({
          message: 'Phiên đăng nhập hết hạn',
          username: data.username
        })
      } else {
        if (await UserModel.findById(data['_id'])) {
        } else {
          res.status(500).json({
            message: 'Tài khoản này hiện không khả dụng'
          })
          return
        }

        if (req.body.username != undefined) {
          if (req.body.username != data.username) {
            res.status(500).json({
              message: 'Phiên đăng nhập không hợp lệ',
              username: data.username
            })
            return
          }
        }
        if (req.headers.authorization.split(' ')[1] == '0') {
          res.status(200).json('Phiên đăng nhập hợp lệ')
          return
        }
        next()
      }
    })
  }

  function checkAdmin (req, res, next) {
    const token = req.headers.authorization.split(' ')[2]
    jwt.verify(token, SECRET_KEY, async function (err, data) {
      if (err) {
        res.status(500).json({
          message: 'Phiên đăng nhập hết hạn'
        })
      } else {
        /* Tại sao copy ra ngoài thì lại bị lỗi */
        if (data.role == ['admin']) {
          if (req.headers.authorization.split(' ')[1] == '0') {
            res.status(200).json({
              username: data.username,
              message: 'Đăng nhập với vai trò admin',
              isAdmin: true
            })
            return
          } else if (req.headers.authorization.split(' ')[1] == '1') {
            next()
          }
        } else {
          res.status(500).json({
            username: data.username,
            message: 'Đăng nhập với vai trò user',
            isAdmin: false
          })
        }
      }
    })
  }

  /* check expire or verify token */
  app.post('/api/verify', authen)
  /* Get all user */

  app.post('/api/verifyAdmin', checkAdmin)

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
      quantity: Number,
      bought: Number,
      img: String
    },
    {
      collection: 'Product'
    }
  )

  const ProductModel = mongoose.model('Product', productSchema)

  /* Get Product */
  app.get('/api/getProducts', manageProduct(ProductModel).getProducts)

  /* Create New Product */
  app.post(
    '/api/createProduct',
    authen,
    checkAdmin,
    manageProduct(ProductModel).createProduct
  )

  /* Update Product */
  app.post('/api/updateProduct', authen, checkAdmin, manageProduct(ProductModel).updateProduct)

  /* Delete Product */
  app.post(
    '/api/deleteProduct/:id',
    authen,
    checkAdmin,
    manageProduct(ProductModel).deleteProduct
  )

  /* Find Product By Id */
  app.get('/api/findById', manageProduct(ProductModel).getProductById)

  const ordersSchema = mongoose.Schema(
    {
      username: String,
      items: Object,
      date: Date,
      totalAmount: mongoose.Schema.Types.Double
    },
    {
      collection: 'Orders'
    }
  )

  const OrdersModel = mongoose.model('Orders', ordersSchema)
  /* Lấy danh sách các hoá đơn */
  app.get('/api/getOrders', manageOrders(OrdersModel, ProductModel).getOrders)
  /* Tạo ra 1 hoá đơn */
  app.post('/api/createBill', authen, manageOrders(OrdersModel, ProductModel).createBill)

  app.get('/api/totalRevenue', async function (req, res) {
    let start = new Date()
    start.setHours(0, 0, 0, 0)
    let endTime = new Date()
    endTime.setHours(23, 59, 59, 999)
    let end = new Date(endTime.getTime() - 30 * 86400 * 1000)
    const filter = {
      $gte: start,
      $lt: end
    }
    try {
      const ordersInMonth = await OrdersModel.find(filter).exec()
      let productsInMonth = {}
      let ordersInMonthArr = ordersInMonth.map(function (order) {
        return order.items
      })
      ordersInMonthArr.forEach(function (items) {
        for (let item of Object.keys(items)) {
          if (productsInMonth[item] == undefined) {
            productsInMonth[item] = items[item]
          } else {
            productsInMonth[item] += items[item]
          }
        }
      })

      const productsInMonthArr = []

      for (index of Object.keys(productsInMonth)) {
        const product = await ProductModel.findById(index).exec()
        price = product.price
        productsInMonthArr.push({
          product: index,
          quantity: productsInMonth[index],
          totalRevenueOfProduct: Number(productsInMonth[index]) * price
        })
      }

      function sortProduct (item2, item1) {
        if (item2.totalRevenueOfProduct > item1.totalRevenueOfProduct) return -1
        else if (item2.totalRevenueOfProduct < item1.totalRevenueOfProduct)
          return 1
        else return 0
      }

      productsInMonthArr.sort(sortProduct)

      let bestSeller = productsInMonthArr.find(function (product) {
        return (
          product.totalRevenueOfProduct ==
          productsInMonthArr[0].totalRevenueOfProduct
        )
      })

      let top10Products = productsInMonthArr.slice(0, 10)

      let totalRevenue = ordersInMonth.reduce(function (total, currentIndex) {
        return total + currentIndex.totalAmount
      }, 0)

      totalRevenue = totalRevenue.toLocaleString()

      res.status(200).json({
        revenue: `Tổng doanh thu trong tháng là: ${totalRevenue} vnđ`,
        bestSeller: bestSeller,
        top10Products: top10Products
      })
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  })

  /* Lắng nghe server trên port */
  app.listen(port, function () {
    console.log(`Now listening on port ${port}`)
  })
}
