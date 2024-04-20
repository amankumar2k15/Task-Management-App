const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    title: { type: String, required: true },
    description: { type: String },
}, { timestamps: true })

module.exports = taskModel = mongoose.model("taskModel", taskSchema)