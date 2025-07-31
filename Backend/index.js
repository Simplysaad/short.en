/**
 * @file Main application entry point and configuration
 * @requires dotenv Environment variable configuration
 * @requires express Web framework
 * @requires mongoose MongoDB object modeling
 * @requires path File path utilities
 * @requires ./Server/Config/db.js Database connection module
 */

import { config } from "dotenv";
config();

import express, { json, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";

import session from "express-session";
import MongoStore from "connect-mongo";

import connectDb from "./Server/Config/db.js";
import errorMiddleware from "./Server/Utils/error.middleware.js";
import mainRoutes from "./Server/Routes/main.routes.js";
import authRoutes from "./Server/Routes/auth.routes.js";

/**
 * @constant {express.Application} app Express application instance
 */
const app = express();

// Configure middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(errorMiddleware);
app.use(morgan("dev"));

app.use(
  session({
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URI,
    }),
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 360000,
      secure: false, // change to true in production
      httpOnly: true,
    },
  })
);
/**
 * @constant {number} PORT Server port from environment or default 3000
 */
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  connectDb();

  console.log(`App listening on port ${PORT}`);
});

app.use("/api", mainRoutes);
// app.use("/auth", authRoutes);
app.use("/", authRoutes);
