const mongoose = require('mongoose');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const cors = require('cors');
const port = 8080;

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://training:Admin$56789@123.30.145.67:27017/Training')
    const taskSchema = new mongoose.Schema({
        _id: String,
        name: String,
        description: String,
        time: Date
    });

    const TaskModel = mongoose.model('Task', taskSchema);

    app.use(cors({
        origin: '*',
    }));
    app.use(express.json());

    // API get Task by Id
    app.get('/api/getTask', async (req, res) => {
        try {
            const itemId = req.query.id;

            let item = await TaskModel.findById(itemId).exec();
            if (!item) {
                res.status(404).send();
                return;
            }

            res.status(200).send(item);
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    });

    // API get Task for Table Listing
    app.get('/api/getTaskList', async (req, res) => {
        // var skip = req.query.skip ?? 0;
        // var limit = req.query.limit ?? 10;

        let skip = req.query.page == null ? 0 : (req.query.page - 1) * 5
        let limit = req.query.page == null ? 5 : 5*1

        // TODO: Implement pagination logic here

        let totalCount = await TaskModel.countDocuments({}).exec();
        let data = await TaskModel.find({}).skip(skip).limit(limit).exec();

        let returnData = {
            totalCount: totalCount,
            items: data
        };

        res.status(200).send(returnData);
    });

    // API create Task
    app.post('/api/createTask', async (req, res) => {
        try {
            const body = req.body;

            let existedTask = await TaskModel.find({ name: body.name }).exec();
            if(existedTask.length) {
                res.status(500).send('Trùng tên task');
                return;
            } 
            // TODO: Implement validation logic here

            let item = new TaskModel({
                _id: uuidv4(),
                name: body.name,
                description: body.description,
                time: Date.parse(body.time)
            });
            
            await item.save();

            res.status(200).send(item);

            
        } catch (e) {
            res.status(400).send();
        }
    });

    // API edit task
    app.post('/api/editTask', async (req, res) => {
        try {
            const body = req.body;

            if (!body.id) {
                res.status(400).send();
                return;
            }

            let item = await TaskModel.findById(body.id).exec();
            let existedTask = await TaskModel.find({ name: body.name }).exec();

            if (!item) {
                res.status(404).send();
                return;
            }

            if (item.name != body.name && existedTask.length) {
                res.status(500).send('Trùng tên task');
                return;
            }

            // TODO: Implement validation logic here
            
            item.name = body.name;
            item.description = body.description;
            item.time = Date.parse(body.time);

            await item.save();

            res.status(200).send(item);
        } catch (e) {
            console.log(e);
            res.status(400).send();
        }
    });

    // API delete Task
    app.post('/api/deleteTask', async (req, res) => {
        try {
            const body = req.body;
            let item = await TaskModel.findById(body.id).exec();
            await TaskModel.deleteOne({ _id: body.id });
            
            res.status(204).send(item);
        } catch {
            res.status(400).send();
        }
        
    });

    app.listen(port, () => {
        console.log(`Now listening at http://localhost:${port}`);
    });
}

//tìm hiểu axios mongo, db, express js