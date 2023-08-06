import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import cookieParser from "cookie-parser";
import mongoDBConnection from "./config/db.js";
import tourRouter from "./route/tours.js";
import userRouter from "./route/user.js";
import authRouter from "./route/auth.js";
import reviewRouter from "./route/reviews.js";
import bookingRouter from "./route/booking.js";

// app init
const app = express();

// environment variables
dotenv.config();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Include cookies and other credentials in CORS requests
};
app.use(cors(corsOptions));

// middlewares
app.use(express.json());
app.use(cookieParser());

// static folder
app.use(express.static("public"));

// routing
app.use("/api/v1/tour", tourRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/booking", bookingRouter);

// listen server
app.listen(port, () => {
  mongoDBConnection();
  console.log(`Server is running on port ${port}`.bgGreen.black);
});
