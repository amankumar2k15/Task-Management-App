const { success, error } = require("../helper/baseResponse");
const taskModel = require("../model/taskModel");

// API to create a Task
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.userId;
        if (!userId) return res.status(401).json(error("Please authenticate using a token", 401))

        const newTask = new taskModel({ title, description, userId })
        await newTask.save()

        return res.status(201).json(success("Task Created Successfully", newTask, 201))
    } catch (err) {
        console.log(err)
        return res.status(500).json(error(err.message, 500))
    }
}

// API to get all the tasks
const getTask = async (req, res) => {
    try {
        const userId = req.user.userId;
        const tasks = await taskModel.find({ userId })
        return res.status(200).json(success("Tasks fetched successfully", tasks, 200))
    } catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

//API to delete the task
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user.userId;
        if (!userId) return res.status(401).json(error("Please authenticate using a token", 401))

        const task = await taskModel.findOne({ _id: taskId })
        if (!task) return res.status(404).json(error("Task not found or unauthorized", 404));

        await taskModel.findByIdAndDelete(taskId)
        return res.status(200).json({ message: "Task Deleted Successfully", status: 200 })
    } catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}


//API to update the task
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id
        const userId = req.user.userId;
        if (!userId) return res.status(401).json(error("Please authenticate using a token", 401))

        const task = await taskModel.findOne({ _id: taskId })
        if (!task) return res.status(404).json(error("Task not found or unauthorized", 404));

        const { title, description } = req.body
        const updatedTask = await taskModel.findByIdAndUpdate(taskId, { title, description }, { new: true })

        return res.status(200).json(success("Task Updated successfully", updatedTask, 200))

    } catch (err) {
        return res.status(500).json(error(err.message, 500))
    }

}

module.exports = { createTask, getTask, deleteTask, updateTask }