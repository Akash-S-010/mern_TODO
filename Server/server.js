import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/dbConnect.js";
import userRoutes from "./src/routes/userRoutes.js"
import cookieParser from "cookie-parser";
import { authenticatedUser } from "./src/middlewares/authMiddleware.js";
import taskRoutes from "./src/routes/taskRoutes.js"


const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001

app.use(
    cors({
      origin: "http://localhost:5174",
      credentials: true,
    })
  );
app.use(express.json());
app.use(cookieParser());


// User Routes------
app.use("/users", userRoutes)
app.use("/tasks", authenticatedUser, taskRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})