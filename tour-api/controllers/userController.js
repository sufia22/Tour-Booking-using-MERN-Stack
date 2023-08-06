import User from "../models/User.js";
import asyncHandler from "express-async-handler";

/**
 * @DESC Get all User data
 * @ROUTE /api/v1/User
 * @method GET
 * @access public
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users.length > 0) {
    res.status(200).json({
      users,
      message: "Get all Users successfully",
    });
  } else {
    res.status(404).json({
      users,
      message: "Users data not found",
    });
  }
});

/**
 * @DESC Get Single User data
 * @ROUTE /api/v1/User/:id
 * @method GET
 * @access public
 */
export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User data not found" });
  }

  res.status(200).json({
    user,
    message: "User data not found",
  });
});

/**
 * @DESC Create new User
 * @ROUTE /api/v1/User
 * @method POST
 * @access public
 */
export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, photo } = req.body;

  if (!username || !email || !password || !photo) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // check email
  const userEmailCheck = await User.findOne({ email });

  if (userEmailCheck) {
    return res.status(400).json({ message: "User already exists" });
  }

  // create new user
  const user = await User.create({
    username,
    email,
    password,
    photo,
  });

  res.status(201).json({
    user,
    message: "User created successfully",
  });
});

/**
 * @DESC Delete User
 * @ROUTE /api/v1/user/:id
 * @method DELETE
 * @access public
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  res.status(200).json({
    user,
    message: "User deleted successfully",
  });
});

/**
 * @DESC Update User
 * @ROUTE /api/v1/User/:id
 * @method PUT/PATCH
 * @access public
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { username, email, password, photo } = req.body;

  if (!username) {
    return res.status(400).json({ message: "User name is required" });
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      username,
      email,
      password,
      photo,
    },
    { new: true }
  );

  res.status(200).json({ user, message: "User updated successfully" });
});
