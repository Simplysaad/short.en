require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const connectDb = require("./db.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.set("view engine", "ejs");
app.set("views", "Views/");
app.use(express.static("./Public"));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

//Routing

const url = require("./Server/Models/url");
const getRandomText = require("./random-text-generator.js");

// Get all URLs
app.get("/get-all-urls", async (req, res) => {
    try {
        const urls = await url.find({});
        return res.json(urls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Create link
app.get("/", async (req, res) => {
    try {
        res.render("create-url", {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

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

// Redirect to original URL
app.get("/:shortUrl", async (req, res) => {
    try {
        const shortUrl = req.params.shortUrl;
        const currentUrl = await url.findOne({ shortUrl });

        if (currentUrl) {
            res.redirect(currentUrl.originalUrl);
        } else {
            res.redirect("/");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
