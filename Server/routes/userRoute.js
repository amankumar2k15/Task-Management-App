const express = require("express")
const bodyParser = require("body-parser")
const { register, login } = require("../controller/userController")
const { validate } = require("../middleware/validateMiddleware")
const { registerValidator, loginValidator } = require("../validator/user")

const router = express.Router()

router.post("/register", validate(registerValidator), register)
router.post("/login", validate(loginValidator), login)

module.exports = router