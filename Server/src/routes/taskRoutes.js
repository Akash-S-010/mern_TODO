import express from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/taskControllers.js";
const router = express.Router();

router.post("/create", createTask)
router.get("/getall", getAllTasks)
router.put("/update/:id", updateTask)
router.delete("/delete/:id", deleteTask)



export default router