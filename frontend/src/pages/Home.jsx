import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://thumsbtack-12.onrender.com/api/v1/getTasks`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (task) => {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      if (task.dueDate < currentDate) {
        toast.error("Due date cannot be in the past");
        return;
      }

      // Proceed with the API call if the validation passes
      const response = await axios.post(
        `https://thumsbtack-12.onrender.com/api/v1/createTask`,
        task
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      toast.success("Task created successfully!");
    } catch (error) {
      console.error(
        "Error adding task:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Edit a task
  const handleEditTask = async (task) => {
    try {
      const response = await axios.put(
        `https://thumsbtack-12.onrender.com/api/v1/updateTask/${task._id}`, 
        task // Pass the updated task data
      );
      setTasks(
        (prevTasks) =>
          prevTasks.map((t) => (t._id === task._id ? response.data : t)) // Update the task in the state
      );
      setEditTask(null); // Clear the edit mode
    } catch (error) {
      console.error(
        "Error editing task:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      console.log("idid", id);

      await axios.delete(
        `https://thumsbtack-12.onrender.com/api/v1/deleteTask/${id}`
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Remove task from state
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <TaskForm
        onSubmit={editTask ? handleEditTask : handleAddTask}
        initialTask={editTask}
      />
      <TaskTable
        tasks={tasks}
        onEdit={(task) => setEditTask(task)}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
