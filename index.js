/**
 * @file Main application entry point and configuration
 * @requires dotenv Environment variable configuration
 * @requires express Web framework
 * @requires mongoose MongoDB object modeling
 * @requires path File path utilities
 * @requires ./db.js Database connection module
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const connectDb = require("./db.js");

/** 
 * @constant {express.Application} app Express application instance
 */
const app = express();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database connection
connectDb();

// Configure view engine
app.set("view engine", "ejs");
app.set("views", "Views/");
app.use(express.static("./Public"));

/**
 * @constant {number} PORT Server port from environment or default 3000
 */
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Routing
/**
 * @module url URL Model
 * @requires ./Server/Models/url
 */
const url = require("./Server/Models/url");
const getRandomText = require("./random-text-generator.js");

/**
 * @route GET /get-all-urls
 * @description Get all shortened URLs from database
 * @async
 * @returns {Promise<Array>} JSON array of URL objects
 * @throws {500} Internal Server Error if database query fails
 */
app.get("/get-all-urls", async (req, res) => {
  try {
    const urls = await url.find({});
    return res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route GET /
 * @description Render URL creation form
 * @async
 * @returns {Promise<void>} Rendered HTML view
 * @throws {500} Internal Server Error if template rendering fails
 */
app.get("/", async (req, res) => {
  try {
    res.render("create-url", {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route POST /
 * @description Create new shortened URL
 * @async
 * @param {string} req.body.originalUrl Original URL to shorten
 * @returns {Promise<void>} Rendered confirmation view with new URL
 * @throws {500} Internal Server Error if database operation fails
 */
app.post("/", async (req, res) => {
  try {
    const { originalUrl } = req.body;
    console.log(originalUrl);

    const shortUrl = getRandomText(12);
    console.log(shortUrl);

    const newUrl = new url({ originalUrl, shortUrl });
    const savedUrl = await newUrl.save();

    res.render("confirmation", { currentUrl: savedUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route GET /:shortUrl
 * @description Redirect to original URL and track clicks
 * @async
 * @param {string} req.params.shortUrl Short URL identifier
 * @returns {void} Redirects to original URL or home page
 * @throws {500} Internal Server Error if database operation fails
 */
app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const currentUrl = await url.findOne({ shortUrl });

    if (currentUrl) {
      url.updateOne({
        _id: currentUrl._id
      }, {
        $inc: {
          clickCount: 1
        },
        $push: {
          timestamps: Date.now
        }
      })

      res.redirect(currentUrl.originalUrl);
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route POST /api
 * @description API endpoint for URL shortening
 * @async
 * @param {string} req.body.originalUrl Original URL to shorten
 * @param {string} [req.body.preferredText] Optional custom short text
 * @param {number} [req.body.expiryDays=30] Optional expiration days (default 30)
 * @returns {Promise<Object>} JSON response with created URL object
 * @throws {500} Internal Server Error if database operation fails
 */
app.post("/api", async (req, res) => {
  try {
    const { originalUrl, preferredText, expiryDays = 30 } = req.body;

    let shortUrlId = preferredText;

    if (!preferredText)
      shortUrlId = getRandomText(12);

    let shortUrl = "short-en.onrender.com/" + shortUrlId

    let currentDate = Date.now()
    let expiryDate = new Date(currentDate + (expiryDays * 24 * 60 * 60 * 1000))

    const newUrl = new url({ originalUrl, shortUrl, shortUrlId, expiryDate });
    const savedUrl = await newUrl.save();

    return res.status(200).json({
      ...savedUrl
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
})
