const Task = require("../models/task");

// GET all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks); // Explicitly return a 200 status for successful retrieval
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Server error while fetching tasks" });
  }
};

// POST a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title || !description || !status || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (new Date(dueDate) < new Date()) {
      return res
        .status(400)
        .json({ message: "Due date cannot be in the past" });
    }

    const task = new Task({ title, description, status, dueDate });
    await task.save();
    res.status(201).json(task); // Explicitly return a 201 status for resource creation
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Server error while creating task" });
  }
};

// PUT update a task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    if (!title || !description || !status || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (new Date(dueDate) < new Date()) {
      return res
        .status(400)
        .json({ message: "Due date cannot be in the past" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status, dueDate, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Server error while updating task" });
  }
};

// DELETE a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server error while deleting task" });
  }
};
