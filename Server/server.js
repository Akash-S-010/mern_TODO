import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/dbConnect.js";
import userRoutes from "./src/routes/userRoutes.js"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001

app.use(express.json());
app.use(cors());


// User Routes------
app.use("/users", userRoutes)




app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
})