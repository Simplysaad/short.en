import { Router } from "express";
const router = Router();

import Link from "../Models/link.model.js";
import User from "../Models/user.model.js";

import getRandomText from "../Utils/random-text-generator.js";

/**
 * @route GET /api
 * @description Get all shortened URLs from database
 * @async
 * @returns {Promise<Array>} JSON array of URL objects
 * @throws {500} Internal Server Error if database query fails
 */

router.get("/", async (req, res) => {
  try {
    // const { userId } = req.session;
    // const currentUser = await User.findOne({ _id: userId });

    // if (!currentUser) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "user not logged in",
    //   });
    // }

    // let data = {};
    // if (currentUser.role === "admin") {
    //   data.allLinks = await Link.find();
    // }
    // data.currentUserLinks = await Link.find({ userId: currentUser._id });


    const allLinks = await Link.find();

    // const currentUserLinks = await Link.find({ userId: currentUser._id });

    return res.status(200).json({
      success: true,
      message: "current user links retrieved",
      data: {
        // currentUserLinks,
        allLinks
      }
    });
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
router.get("/:shortUrlId", async (req, res) => {
  try {
    const shortUrlId = req.params.shortUrlId;
    const currentUrl = await Link.findOne({ shortUrlId });

    if (currentUrl) {
      await Link.updateOne(
        { _id: currentUrl._id },
        {
          $inc: { clickCount: 1 },
          $push: { timestamps: Date.now() },
        }
      );

      return res.redirect(currentUrl.originalUrl);
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error redirecting to original url",
    });
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
router.post("/", async (req, res) => {
  try {
    let { originalUrl, customShortLink, expiryDate, expiryClicks } = req.body;
    // const { userId } = req.session;

    const shortLinkId = getRandomText(5);
    let expiryType = "never";

    if (expiryDate) {
      expiryDate = new Date(Date.now() + parseInt(expiryDate) * 24 * 60 * 60 * 1000);
      expiryType = "expiryDate";
    }

    if (expiryClicks) {
      expiryClicks = parseInt(expiryClicks);
      expiryType = "expiryClicks";
    }
    const newLink = new Link({
      originalUrl,
      // userId,
      role: "admin", // remove before production
      shortLinkId,
      expiryDate,
      customShortLink,
    });

    await newLink.save();

    return res.status(201).json({
      success: true,
      message: "link shortened successfully",
      data: {newLink},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error shortening link",
      error: err.message,
      stack: err.stack,
    });
  }
});

const mainRoutes = router;
export default mainRoutes;
