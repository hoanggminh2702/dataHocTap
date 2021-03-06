const mongoose = require('mongoose')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
const cors = require('cors')
const port = 8080

function randomDate (start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

main().catch(err => console.log(err))

async function main () {
  await mongoose.connect(
    'mongodb://training:Admin$56789@123.30.145.67:27017/Training'
  )
  const taskSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    time: Date
  })

  const TaskModel = mongoose.model('Task', taskSchema)

  app.use(
    cors({
      origin: '*'
    })
  )
  app.use(express.json())

  // API get Task by Id
  app.get('/api/getTask', async (req, res) => {
    try {
      const itemId = req.query.id

      let item = await TaskModel.findById(itemId).exec()
      if (!item) {
        res.status(404).send()
        return
      }

      res.status(200).send(item)
    } catch (e) {
      console.log(e)
      res.status(400).send()
    }
  })

  // API get Task for Table Listing
  app.get('/api/getTaskList', async (req, res) => {
    // limit = null => default = 10
    let limit = Number(req.query.limit) ?? 10
    // skip = page hiện tại - 1 * limit
    let skip =
      req.query.page == null || Number(req.query.page) == 0
        ? 0
        : (req.query.page - 1) * limit
    let sortField = req.query.sort
    let filter = {}
    let searchByName = req.query.name
    let filterByDate = req.query.date
    let filterByDate2 = req.query.date2

    if (searchByName != '') {
      let regEx = new RegExp(searchByName, 'i')
      filter.name = regEx
    }
    // Nếu cả from và to không rỗng thì filter từ from tới to
    if (filterByDate != '' && filterByDate2 != '') {
      let start = new Date(Date.parse(filterByDate)).setHours(0, 0, 0, 0)
      let end = new Date(Date.parse(filterByDate2)).setHours(23, 59, 59, 999)

      filter.time = {
        $gte: start,
        $lt: end
      }
      // Nếu to rỗng thì filter từ from tới last record
    } else if (filterByDate != '' && filterByDate2 == '') {
      // Tìm record mới nhất và lấy time của nó set bằng end
      let lastestRecord = await TaskModel.findOne()
        .sort({ time: -1 })
        .exec()
      let start = new Date(Date.parse(filterByDate)).setHours(0, 0, 0, 0)
      let end = new Date(Date.parse(lastestRecord.time)).setHours(
        23,
        59,
        59,
        999
      )
      if (start > end) {
        return res
          .status(500)
          .send({ message: 'The date is out of the lastest record date' })
      }

      filter.time = {
        $gte: start,
        $lt: end
      }
      // Ngược lại ở trên
    } else if (filterByDate == '' && filterByDate2 != '') {
      // Tìm oldest record và set nó thành start
      let oldestRecord = await TaskModel.findOne()
        .sort({ time: 1 })
        .exec()
      let start = new Date(Date.parse(oldestRecord.time)).setHours(0, 0, 0, 0)
      let end = new Date(Date.parse(filterByDate2)).setHours(23, 59, 59, 999)

      if (start > end) {
        return res
          .status(500)
          .send('The date is older than the oldest record date')
      }

      filter.time = {
        $gte: start,
        $lt: end
      }
    }

    // TODO: Implement pagination logic here
    // filter là 1 Object do đó chỉ cần thêm filter vào không cần dấu Object
    let totalCount = await TaskModel.countDocuments(filter)
      .sort(sortField)
      .exec()
    // Sử dụng reg để tìm những record có chứa từ khoá
    // 'name description time' chỉ số trường hiển thị
    // sort 'time' asc, '-time' desc
    /*let data = await TaskModel.find({ name: / /i }, 'name description time').sort( sortField ).skip(skip).limit(limit).exec();*/

    let data = await TaskModel.find(filter)
      .sort(sortField)
      .skip(skip)
      .limit(limit)
      .exec()

    let returnData = {
      totalCount: totalCount,
      items: data
    }

    res.status(200).send(returnData)
  })

  // API create Task
  app.post('/api/createTask', async (req, res) => {
    try {
      const body = req.body

      let existedTask = await TaskModel.find({ name: body.name }).exec()
      if (existedTask.length) {
        res.status(500).send('Trùng tên task')
        return
      }
      // TODO: Implement validation logic here

      let item = new TaskModel({
        _id: uuidv4(),
        name: body.name,
        description: body.description,
        time: Date.parse(body.time)
      })

      await item.save()

      res.status(200).send(item)
    } catch (e) {
      res.status(400).send()
    }
  })

  // API edit task
  app.post('/api/editTask', async (req, res) => {
    try {
      const body = req.body

      if (!body.id) {
        res.status(400).send()
        return
      }

      let item = await TaskModel.findById(body.id).exec()
      let existedTask = await TaskModel.find({ name: body.name }).exec()

      if (!item) {
        res.status(404).send()
        return
      }

      if (item.name != body.name && existedTask.length) {
        res.status(500).send('Trùng tên task')
        return
      }

      // TODO: Implement validation logic here

      item.name = body.name
      item.description = body.description
      item.time = Date.parse(body.time)

      await item.save()

      res.status(200).send(item)
    } catch (e) {
      res.status(400).send()
    }
  })

  // API delete Task
  app.post('/api/deleteTask', async (req, res) => {
    try {
      const body = req.body
      let item = await TaskModel.findById(body.id).exec()
      await TaskModel.deleteOne({ _id: body.id })
      res.status(200).send(item)
      console.log(item)
    } catch {
      res.status(400).send()
    }
  })

  app.listen(port, () => {
    console.log(`Now listening at http://localhost:${port}`)
  })
}

//tìm hiểu axios mongo, db, express js
