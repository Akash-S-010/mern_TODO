import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/tokenUtil.js";
import jwt from "jsonwebtoken"


// ----User register function---------------------------
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please fill all the fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Password hashing-------
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        if (newUser) {
            res.status(201).json({ message: "User registered successfully" });
        } else {
            return res.status(400).json({ error: "User registration failed" });
        }


    } catch (error) {

        console.log("Error in registerController", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// ----User login function---------------------------
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const accessToken = generateToken(user._id);

        // Set tokens in cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

        });

        // Send response
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
          });

    } catch (error) {

        console.log("Error in loginController", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// -----User logout function-------------------------
export const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        console.log("Logout error:", error);
        return res.status(500).json({ error: "Logout failed" });
    }
}

