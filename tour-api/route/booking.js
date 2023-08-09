import express from "express";
import { verifyAdmin, verifyUser } from "../middlewares/tokenVerify.js";
import {
  createBooking,
  getAllBooking,
  getSingleBooking,
} from "../controllers/bookingController.js";

// init router
const router = express.Router();

// routes
router.route("/").get(getAllBooking).post(createBooking);
router.route("/:id").get(getSingleBooking);

// export default router
export default router;
