import express from "express";
import { createReview } from "../controllers/reviewController.js";
import { verifyUser } from "../middlewares/tokenVerify.js";

// init router
const router = express.Router();

// routes
router.route("/:tourID").post(verifyUser, createReview);

// export default router
export default router;
