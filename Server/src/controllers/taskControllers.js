import Task from "../models/taskModel.js";


// -----Create task function-------------------------
export const createTask = async (req, res) => {

    try {

        const { task } = req.body

        if (!task) {
            return res.status(400).json({ error: "Task is required" });
        }

        const newTask = new Task({
            task,
            user: req.user._id, 
          });
      
          await newTask.save();

        res.status(201).json({ message: "Task created successfully", task: newTask });


    } catch (error) {

        console.log("Error in createTask:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// -----Get all tasks function-------------------------
export const getAllTasks = async (req, res) => {

    try {

        const tasks = await Task.find({ user: req.user._id });
        if (tasks.length === 0) {
            return res.status(404).json({ error: "No tasks found" });
        }

        res.status(200).json({ tasks });

    } catch (error) {

        console.log("Error in getAllTasks:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateTask = async (req, res) => {

    const { id } = req.params;
    const { task } = req.body;

    try {

        const taskToUpdate = await Task.findByIdAndUpdate(
            id,
            { task},
            { new: true }
        );

        if (!taskToUpdate) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ message: "Task updated successfully",task: taskToUpdate });

    } catch (error) {

        console.log("Error in updateTodo:", error.message);
        res.status(500).json({ error: "Internal server error" });

    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        
        const taskToDelete = await Task.findByIdAndDelete(id);

        if (!taskToDelete) return res.status(404).json({ message: "Task not found" });    

        res.status(200).json({ message: "Task deleted successfully" });

    } catch (error) {
        
        console.log("Error in deleteTask:", error.message);
        res.status(500).json({ error: "Internal server error" });

    }
}
