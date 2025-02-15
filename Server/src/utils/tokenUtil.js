import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: "5m" });
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

    return { accessToken, refreshToken };
};
