const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortUrlId: {
    type: String,
    unique: true,
    required: true
  },
  shortUrl:{
    type: String,
    unique: true,
    required: true
  },
  clickCount: {
    type: Number,
    default: 0
  },
  timestamps: [{
    type: Date,
    default: Date.now
  }],
  expiryDate:{
    type: Date
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});
const url = new mongoose.model("Url", urlSchema)
module.exports = url