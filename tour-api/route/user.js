import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../middlewares/tokenVerify.js";

// init router
const router = express.Router();

// routes
router.route("/").get(verifyAdmin, getAllUsers).post(createUser);
router
  .route("/:id")
  .get(verifyUser, getSingleUser)
  .delete(verifyUser, deleteUser)
  .patch(verifyUser, updateUser);

// export default router
export default router;
