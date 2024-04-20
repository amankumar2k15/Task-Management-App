const bodyParser = require("body-parser")
const express = require("express")
const { createTask, getTask, deleteTask, updateTask } = require("../controller/taskController")
const verifyToken = require("../middleware/authMiddleware")
const { validate } = require("../middleware/validateMiddleware")
const { taskValidor } = require("../validator/user")

const router = express.Router()

router.post("/create-task", verifyToken, validate(taskValidor), createTask)
router.get("/get-task", verifyToken, getTask)
router.delete("/delete-task/:id", verifyToken, deleteTask)
router.patch("/update-task/:id", verifyToken, updateTask)

module.exports = router