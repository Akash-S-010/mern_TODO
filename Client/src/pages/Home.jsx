import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks/getall", {
        withCredentials: true,
      });
      setTasks(res.data.tasks);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return toast.error("Task cannot be empty");
    try {
      const res = await axios.post(
        "http://localhost:5000/tasks/create",
        { task: newTask },
        { withCredentials: true }
      );
      setTasks([...tasks, res.data.task]);
      setNewTask("");
      toast.success("Task Added!");
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/delete/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task Deleted!");
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const saveEditTask = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/tasks/update/${id}`,
        { task: editTaskText },
        { withCredentials: true }
      );
      setTasks(tasks.map((task) => (task._id === id ? res.data.task : task)));
      setEditTaskId(null);
      toast.success("Task Updated!");
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar />
      <div className="p-9 flex flex-col items-center">
        <h1 className="text-white font-semibold text-2xl mb-10">
          Create your task
        </h1>
        <div className="flex gap-1 mb-15">
          <input
            type="text"
            className="bg-white px-3 py-2 rounded-md shadow-sm border border-gray-300 outline-none"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task..."
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        <ul className="w-96 bg-slate-800 px-4 py-2 rounded-md shadow-xl border-1 border-slate-700 text-white text-xl flex flex-col gap-3">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks added</p>
          ) : (
            tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center p-3 bg-slate-800 rounded-lg shadow-md border border-slate-700"
              >
                {editTaskId === task._id ? (
                  <input
                    type="text"
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded-md outline-none"
                  />
                ) : (
                  <span className="flex-1">{task.task}</span>
                )}

                <div className="flex gap-2">
                  {editTaskId === task._id ? (
                    <button
                      className="bg-blue-500 px-3 py-1 text-white rounded-md"
                      onClick={() => saveEditTask(task._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 text-white rounded-md"
                      onClick={() => {
                        setEditTaskId(task._id);
                        setEditTaskText(task.task);
                      }}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white rounded-md"
                    onClick={() => deleteTask(task._id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
