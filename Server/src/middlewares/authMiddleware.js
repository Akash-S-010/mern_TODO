import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; 

export const authenticatedUser = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken; 
        if (!accessToken) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        if (!decoded?.userId) return res.status(401).json({ error: "Invalid token" });

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(401).json({ error: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in authMiddleware:", error.message);
        return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
};
