import jwt from "jsonwebtoken";

export const authenticatedUser = (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET)
        req.user = decoded
        next();

    } catch (error) {
        return res.status(403).json({ error: "Forbidden: Invalid token" });
        console.log("Error in authMiddleware", error.message);
    }
}