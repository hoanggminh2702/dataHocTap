const validateBody = require('./validateBody')
const manageOrders = function (OrdersModel) {
  return {
    /* create a bill */
    createBill: async function (req, res) {
      const body = req.body

      if (!validateBody(OrdersModel).checkNullReq(body, 4)) {
        res.status(500).send('Missing property of product')
        return
      }

      const item = {}

      for (let key of Object.keys(body.items)) {
        item[key] = body.items[key].quantity
      }
      const newOrder = new OrdersModel({
        username: body.username,
        items: item,
        date: Date.parse(body.date),
        totalAmount: body.totalAmount
      })

      try {
        const item = await newOrder.save()
        res.status(200).json({
          message: 'Buy successfuly',
          item: item
        })
      } catch (error) {
        res.status(500).json('Fail')
        console.log(error)
      }
    },
    /* get all the orders */
    getOrders: async function (req, res) {
      try {
        const orders = await OrdersModel.find({}).exec()
        res.status(200).json({
          message: 'Successful',
          orders: orders
        })
      } catch (error) {
        res.status(500).json({
          message: 'Fail'
        })
      }
    }
  }
}

module.exports = manageOrders
