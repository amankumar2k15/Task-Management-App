const { body } = require("express-validator");
const userModel = require("../model/userModel");

const registerValidator = [
    body("name")
        .notEmpty().withMessage("Please enter the name")
        .isString().withMessage("Please enter the valid name"),

    body("email")
        .notEmpty().withMessage("Please enter your email")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage("Please enter a valid email")
        .custom(async (value) => {
            const existingEmail = await userModel.findOne({ email: value })
            if (existingEmail) {
                throw new Error("User with this email already exist!");
            }
        }),
    body("password")
        .notEmpty().withMessage("Please enter the password")
        .isString().withMessage("Please enter a valid Password")
]

const loginValidator = [
    body("email")
        .notEmpty().withMessage("Please enter your email")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage("Please enter a valid email"),
    body("password")
        .notEmpty().withMessage("Please enter the password")
        .isString().withMessage("Please enter a valid Password")
]

const taskValidor = [
    body("title")
        .notEmpty().withMessage("Please enter the title"),
    body("description")
        .notEmpty().withMessage("Please enter the description")
]

module.exports = { registerValidator, loginValidator, taskValidor }