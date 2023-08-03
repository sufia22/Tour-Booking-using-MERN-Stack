import Tour from "../models/Tour.js";
import asyncHandler from "express-async-handler";

/**
 * @DESC Get all tour data
 * @ROUTE /api/v1/tour
 * @method GET
 * @access public
 */
export const getAllTours = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page);
  const tours = await Tour.find().populate("reviews");

  if (tours) {
    res.status(200).json({
      tours,
      message: "Get all tours successfully",
    });
  } else {
    res.status(404).json({
      tours,
      message: "Tours data not found",
    });
  }
});

/**
 * @DESC Get Single tour data
 * @ROUTE /api/v1/tour/:id
 * @method GET
 * @access public
 */
export const getSingleTour = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tour = await Tour.findById(id).populate("reviews");

  if (!tour) {
    return res.status(404).json({ message: "Tour data not found" });
  }

  res.status(200).json({
    tour,
    message: "Tour data not found",
  });
});

/**
 * @DESC Create new tour
 * @ROUTE /api/v1/tour
 * @method POST
 * @access public
 */
export const createTour = asyncHandler(async (req, res) => {
  const {
    title,
    city,
    address,
    distance,
    photo,
    desc,
    price,
    maxGroupSize,
    reviews,
    featured,
  } = req.body;

  if (
    !title ||
    !city ||
    !address ||
    !distance ||
    !photo ||
    !desc ||
    !price ||
    !maxGroupSize
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // check permission
  const tourCheck = await Tour.findOne({ title });

  if (tourCheck) {
    return res.status(400).json({ message: "Tour already exists" });
  }

  // create new permission
  const tour = await Tour.create({
    title,
    city,
    address,
    distance,
    photo,
    desc,
    price,
    maxGroupSize,
    reviews,
    featured,
  });

  res.status(201).json({
    tour,
    message: "Tour created successfully",
  });
});

/**
 * @DESC Delete tour
 * @ROUTE /api/v1/permission/:id
 * @method DELETE
 * @access public
 */
export const deleteTour = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const tour = await Tour.findByIdAndDelete(id);

  res.status(200).json({
    tour,
    message: "tour deleted successfully",
  });
});

/**
 * @DESC Update tour
 * @ROUTE /api/v1/tour/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateTour = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    title,
    city,
    address,
    distance,
    photo,
    desc,
    price,
    maxGroupSize,
    reviews,
    featured,
  } = req.body;

  const tour = await Tour.findByIdAndUpdate(
    id,
    {
      title,
      city,
      address,
      distance,
      photo,
      desc,
      price,
      maxGroupSize,
      reviews,
      featured,
    },
    { new: true }
  );

  res.status(200).json({ tour, message: "Tour updated successfully" });
});

/**
 * @DESC search by tour
 * @ROUTE /api/v1/tour/:id
 * @method DELETE
 * @access public
 */
export const getTourBySearch = asyncHandler(async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  const tour = await Tour.find({
    city,
    distance: { $gte: distance },
    maxGroupSize: { $gte: maxGroupSize },
  }).populate("reviews");

  res.status(200).json({
    tour,
    message: "successfull",
  });
});

/**
 * @DESC Get feature tour data
 * @ROUTE /api/v1/tour
 * @method GET
 * @access public
 */
export const getFeaturedTours = asyncHandler(async (req, res) => {
  const tours = await Tour.find({ featured: true })
    .limit(8)
    .populate("reviews");

  if (tours.length > 0) {
    res.status(200).json({
      tours,
      message: "Get all featured tours successfully",
    });
  } else {
    res.status(404).json({
      tours,
      message: "Featured tour not found",
    });
  }
});

/**
 * @DESC Get tour count
 * @ROUTE /api/v1/tour
 * @method GET
 * @access public
 */
export const getTourCount = asyncHandler(async (req, res) => {
  const tourCount = await Tour.estimatedDocumentCount();

  if (tourCount) {
    res.status(200).json({
      tours: tourCount,
      message: "Successfull",
    });
  } else {
    res.status(404).json({
      message: "failed to fetch",
    });
  }
});
