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
  shortUrl: {
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
  expiryDate: {
    type: Date
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});
const url = new mongoose.model("Url", urlSchema)
module.exports = url



// const urlSchema = new mongoose.Schema({
//   originalUrl: { type: String, required: true },
//   shortUrlId: { type: String, unique: true, required: true },
//   shortUrl: { type: String, unique: true, required: true },
//   clickCount: { type: Number, default: 0 },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   customShortUrl: { type: String },
//   passwordProtected: { type: Boolean, default: false },
//   password: { type: String },
//   geoTargeting: {
//     enabled: { type: Boolean, default: false },
//     locations: [{ type: String }]
//   },
//   deviceTargeting: {
//     enabled: { type: Boolean, default: false },
//     devices: [{ type: String }]
//   },
//   expiryType: { type: String, enum: ["never", "after X clicks", "on specific date"] },
//   expiryDate: { type: Date },
//   expiryClicks: { type: Number },
//   tags: [{ type: String }],
//   dateCreated: { type: Date, default: Date.now }
// });
// 


