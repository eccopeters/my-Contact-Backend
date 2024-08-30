import express from "express";
import { signUpUser, loginUser, currentUser } from "../controller/userController.js";
import validateToken from "../middleware/validateToken.js";

const router = express.Router()

router.route("/login").post(loginUser)
router.route("/signup").post(signUpUser)
router.route("/currentUser", validateToken).get(currentUser)

export default router