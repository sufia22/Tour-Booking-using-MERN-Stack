import express from "express";
import { login, register } from "../controllers/authController.js";

// init router
const router = express.Router();

// routes
router.route("/register").post(register);
router.route("/login").post(login);

// export default router
export default router;
