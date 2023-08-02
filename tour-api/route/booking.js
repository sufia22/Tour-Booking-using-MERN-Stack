import express from "express";
import { verifyAdmin, verifyUser } from "../middlewares/tokenVerify.js";
import {
  createBooking,
  getAllBooking,
  getBooking,
} from "../controllers/bookingController.js";

// init router
const router = express.Router();

// routes
router
  .route("/")
  .get(verifyAdmin, getAllBooking)
  .post(verifyUser, createBooking);
router.route("/:id").get(getBooking);

// export default router
export default router;
