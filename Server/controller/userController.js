const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const { sendMail } = require("../helper/sendMail");
const { success, error } = require("../helper/baseResponse");
const jwt = require("jsonwebtoken")
require("dotenv").config()

// API to register the user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt)

        const newUser = new userModel({
            ...req.body,
            password: hashPassword
        })

        await newUser.save()
        await sendMail({
            to: email,
            text: `Thank you for creating an account in Task Management App, 
            Your Credentials are :
            Email: ${email}
            password : ${password}`
        })

        return res.status(201).json(success("User created successfully", newUser, 201))
    } catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}


//API to login the user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) return res.status(401).json(error("Invalid email", 401))

        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json(error("Wrong Password Entered", 400));

        const payload = {
            userId: user._id,
            email: user.email
        }

        const jwt_token = jwt.sign(payload, process.env.JWT_SECRET_KEY)

        let body = {
            username: user.name,
            token: jwt_token,
        };

        return res.status(200).json(success("Logged in Successfully", body, 200))

    } catch (err) {
        return res.status(500).json(error(err.message, 500))
    }
}

module.exports = { register, login }