import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// token verify
const tokenVerify = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (err, decode) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      }

      const me = await User.findOne({ email: decode.email }).select(
        "-password"
      );

      req.me = me;

      next();
    })
  );
};

// export
export const verifyUser = (req, res, next) => {
  tokenVerify(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return res.status(400).json({ message: "You are not authenticated" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  tokenVerify(req, res, next, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(400).json({ message: "You are not authorized" });
    }
  });
};
