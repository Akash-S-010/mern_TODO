import jwt from "jsonwebtoken";

export const authenticatedUser = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken; 
        if (!accessToken) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) return res.status(401).json({ error: "User not found" });

        next();
    } catch (error) {
        console.log("Error in authMiddleware", error.message);
        return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
}