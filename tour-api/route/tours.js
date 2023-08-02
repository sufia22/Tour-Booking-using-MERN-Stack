import express from "express";
import {
  createTour,
  deleteTour,
  getAllTours,
  getFeaturedTours,
  getSingleTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../controllers/tourController.js";
import { verifyAdmin } from "../middlewares/tokenVerify.js";

// init router
const router = express.Router();

// routes
router.route("/").get(getAllTours).post(verifyAdmin, createTour);
router.route("/:id").get(getSingleTour).delete(verifyAdmin, deleteTour)
  .patchverifyAdmin,
  updateTour;
router.route("/search/getTourBySearch").get(getTourBySearch);
router.route("/search/getFeaturedTours").get(getFeaturedTours);
router.route("/search/getTourCount").get(getTourCount);

// export default router
export default router;
