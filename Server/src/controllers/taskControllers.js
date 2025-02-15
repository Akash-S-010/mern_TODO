import Task from "../models/taskModel.js";


// -----Create task function-------------------------
export const createTask = async (req, res) => {

    try {

        const { task, completed } = req.body

        if (!task) {
            return res.status(400).json({ error: "Task is required" });
        }

        const newTask = await Task.create({
            task,
            completed: completed || false,
            user: req.user.userId
        })

        res.status(201).json({ message: "Task created successfully" });


    } catch (error) {

        console.log("Error in createTask:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// -----Get all tasks function-------------------------
export const getAllTasks = async (req, res) => {

    try {

        const tasks = await Task.find({ user: req.user.userId });

        if (!tasks) {
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
    const { task, completed } = req.body;

    try {

        const taskToUpdate = await Task.findByIdAndUpdate(
            id,
            { task, completed },
            { new: true }
        );

        if (!taskToUpdate) return res.status(404).json({ message: "Todo not found" });

        res.status(200).json({ message: "Todo updated successfully" });

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
