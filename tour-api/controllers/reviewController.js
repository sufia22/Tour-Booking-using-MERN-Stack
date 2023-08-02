import asyncHandler from "express-async-handler";
import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

/**
 * @DESC Get all tour data
 * @ROUTE /api/v1/tour
 * @method GET
 * @access public
 */
export const createReview = asyncHandler(async (req, res) => {
  const id = req.params.tourID;
  const newReview = new Review({ ...req.body });

  const savedReview = await newReview.save();
  await Tour.findByIdAndUpdate(
    id,
    { $push: { reviews: savedReview._id } },
    { new: true }
  );

  res.status(200).json({
    message: "Reviews submitted successfully",
    data: savedReview,
  });
});
