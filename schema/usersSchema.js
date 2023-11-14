const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userid: {
        type: Number,
        unique: true,
        required: true,
    },
    profile_pic: {
        type: String,
        deafult: "",
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("users", usersSchema);