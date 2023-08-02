import asyncHandler from "express-async-handler";
import Booking from "../models/Booking.js";

/**
 * @DESC create booking
 * @ROUTE /api/v1/booking
 * @method POST
 * @access public
 */
export const createBooking = asyncHandler(async (req, res) => {
  const newBooking = new Booking(req.body);

  const savedBooking = await newBooking.save();

  if (savedBooking) {
    res.status(201).json({
      message: "Your tour is booked",
      data: savedBooking,
    });
  } else {
    res.status(404).json({
      message: "Failed to book",
    });
  }
});

/**
 * @DESC get all booking
 * @ROUTE /api/v1/booking
 * @method GET
 * @access public
 */
export const getAllBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.find();

  if (booking) {
    res.status(200).json({
      message: "successfull",
      data: booking,
    });
  } else {
    res.status(404).json({
      message: "not found",
    });
  }
});

/**
 * @DESC get booking
 * @ROUTE /api/v1/booking
 * @method GET
 * @access public
 */
export const getBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findById(id);

  if (booking) {
    res.status(200).json({
      message: "successfull",
      data: booking,
    });
  } else {
    res.status(404).json({
      message: "not found",
    });
  }
});
