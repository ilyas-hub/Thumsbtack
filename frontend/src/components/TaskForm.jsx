import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineSave } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

export default function TaskForm({ onSubmit, initialTask = null }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(task);
      toast.success(
        initialTask ? "Task updated successfully!" : "Task created successfully!"
      );
      setTask({ title: "", description: "", status: "Pending", dueDate: "" });
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message); // Show error message from server
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setTask({ title: "", description: "", status: "Pending", dueDate: "" });
    toast.info("Task creation/edit canceled.");
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gray-100">
      <div className="w-[50%]">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {initialTask ? "Edit Task" : "Add Task"}
          </h2>

          {/* Title & Description in a single row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Title</label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Task Title"
                required
                className="mt-1 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Description
              </label>
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Task Description (optional)"
                className="mt-1 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
               {/* Status */}
               <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            />
          </div>
          </div>
     

          {/* Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              type="submit"
              className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
            >
              <AiOutlineSave className="mr-2" />
              {initialTask ? "Update Task" : "Add Task"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center justify-center bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
            >
              <MdOutlineCancel className="mr-2" />
              Cancel
            </button>
          </div>
        </form>

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </div>
  );
}
