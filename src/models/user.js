const { createHash } = require("../utils/hashbcrypt")
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    rol: {
        type: String,
        default: "user"
    }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;