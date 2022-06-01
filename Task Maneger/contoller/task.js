const { findOneAndDelete } = require('../models/task')
const Task = require('../models/task')

const asynWrapper = require('../middleware/async')
const asyncWrapper = require('../middleware/async')

const { creteCustomError } = require('../errors/custom-errors')

const getAllTask = asynWrapper(async(req, res) => {

    const tasks = await Task.find({})

    //some kind of setting of api
    res.status(200).json({ tasks })
        //we can pass amount of task we need to pass

    // res.status(200).json({ tasks,amount:tasks.length })
    // res.status(200).json({ status: "success", data: { tasks, nbHits: tasks.length } })
})
const createTask = asynWrapper(async(req, res) => {

    const task = await Task.create(req.body)
    res.status(201).json({ task })

})

const getTask = asyncWrapper(async(req, res, next) => {

    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })

    // if id no is not matching
    if (!task) {

        return next(creteCustomError(`No task with this id:${taskID}`, 404))

        //return must need here

    }

    res.status(200).json({ task })

})
const deleteTask = asyncWrapper(async(req, res) => {

    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })

    if (!task) {
        //return must need here
        return next(creteCustomError(`No task with this id:${taskID}`, 404))

    }
    res.status(200).json({ task })


})

const updateTask = asyncWrapper(async(req, res) => {

    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!task) {
        //return must need here
        return next(creteCustomError(`No task with this id:${taskID}`, 404))

    }
    res.status(200).json({ task })

})
module.exports = {
    getAllTask,
    createTask,
    getTask,
    deleteTask,
    updateTask,
}