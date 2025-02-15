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

        const { accessToken, refreshToken } = generateToken(user._id);

        // Set tokens in cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 5 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Send response
        res.status(200).json({message: "Login successful"});

    } catch (error) {

        console.log("Error in loginController", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// -----User logout function-------------------------
export const logout = async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
}

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }   

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_SECRET, { expiresIn: "5m" });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "none",    
            secure: process.env.NODE_ENV !== "development",
            maxAge: 5 * 60 * 1000
        });

        res.status(200).json({ message: "Access token refreshed successfully" });
    } catch (error) {
        console.log("Error in refreshAccessToken:", error.message);
        res.status(403).json({ error: "Forbidden: Invalid token" });
    }
};