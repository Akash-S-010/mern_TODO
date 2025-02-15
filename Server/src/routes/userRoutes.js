import express from "express";
import { login, logout, refreshAccessToken, register } from "../controllers/userController.js";
const router = express.Router();


router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/refresh", refreshAccessToken);



export default router
