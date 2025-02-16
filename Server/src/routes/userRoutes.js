import express from "express";
import { login, logout, refreshAccessToken, register } from "../controllers/userController.js";
import { authenticatedUser } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/refresh", refreshAccessToken);
router.get("/checkAuth", authenticatedUser, (req, res) => res.status(200).json({ message: "Authorized" }))




export default router
