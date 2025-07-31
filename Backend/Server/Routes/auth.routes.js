import User from "../Models/user.model.js";
import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const router = Router();
router.post("/register", async (req, res, next) => {
  try {
    const { name, emailAddress, password } = req.body;
    console.log(req.body);
    if (!name || !emailAddress || !password) {
      return res.status(400).json({
        success: false,
        message: "incomplete request",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const api_key = crypto.randomBytes(32).toString("hex");


    const newUser = new User({
      name,
      emailAddress,
      api_key,
      password: hashedPassword,
    });

    await newUser.save();

    req.session.userId = newUser._id;

    return res.status(201).json({
      success: true,
      message: "new user created",
      data: {
        newUser,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { emailAddress, password } = req.body;
    if (!emailAddress || !password) {
      return res.json({
        success: false,
        message: "incomplete request",
      });
    }

    const currentUser = await User.findOne({ emailAddress });
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (!isCorrectPassword) {
      return res.status(403).json({
        success: false,
        message: "invalid credentials",
      });
    }

    req.session.userId = currentUser._id;

    return res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: {
        currentUser,
      },
    });
  } catch (err) {
    next(err);
  }
});

const authRoutes = router;
export default authRoutes;
