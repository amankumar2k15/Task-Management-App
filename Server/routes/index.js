const express = require("express")
const router = express.Router()

const userRoute = require("./userRoute")
const taskRoute = require("./taskRoute")

router.use("/user", userRoute)
router.use("/task", taskRoute)


module.exports = router