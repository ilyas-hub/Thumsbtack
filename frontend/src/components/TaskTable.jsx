import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md"; // Delete and Edit icons

export default function TaskTable({ tasks, onEdit, onDelete }) {
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Filtered and searched tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6 px-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Task List</h2>

      {/* Search and Filter Controls */}
      <div className="flex justify-between items-center mb-4">
        {/* Search by Title */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 w-1/2"
        />

        {/* Filter by Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 w-1/4"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task Table */}
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 font-medium text-gray-600">Title</th>
            <th className="border-b p-2 font-medium text-gray-600">
              Description
            </th>
            <th className="border-b p-2 font-medium text-gray-600">Status</th>
            <th className="border-b p-2 font-medium text-gray-600">Due Date</th>
            <th className="border-b p-2 font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-b p-2">{task.title}</td>
                <td className="border-b p-2">{task.description || "-"}</td>
                <td className="border-b p-2">{task.status}</td>
                <td className="border-b p-2">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="border-b p-2 flex space-x-2">
                  <button
                    onClick={() => onEdit(task)} // Pass the entire task object
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <MdEdit size={20} />
                  </button>

                  <button
                    onClick={() => onDelete(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No tasks found. Try adjusting your search or filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
