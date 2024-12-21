const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        unique: true,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});
const url = new mongoose.model("Url", urlSchema)
module.exports = url