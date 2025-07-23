import { CustomErrHandler } from "../middlewares/CustomErrHandler.js";
import { Task } from "../models/task.model.js";
export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate, assignedTo } = req.body;

    if (
      !title ||
      !description ||
      !priority ||
      !assignedTo ||
      title.trim() === "" ||
      description.trim() === ""
    )
      return next(new CustomErrHandler(400, "All fields are required"));

    const newTask = await Task.create({
      title,
      description,
      priority,
      assignedTo,
      dueDate,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      newTask,
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllTask = async (req, res, next) => {
  try {
    const { priority, status, search } = req.query;
    const { _id, role } = req.user;

    const filter = {};

    if (priority) filter.priority = priority;
    if (status) filter.status = status;
    if (role !== "admin") filter.assignedTo = _id;

    // Get tasks with full user info
    let tasks = await Task.find(filter).populate("assignedTo", "-password");

    // If search query exists, filter by assigned user's name
    if (search) {
      tasks = tasks.filter((task) =>
        task.assignedTo?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return res.status(200).json({ tasks, success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteTask = await Task.findByIdAndDelete(id);
    return res.status(201).json({
      deleteTask,
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedFields = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      updatedTask,
      message: "Task updated successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTaskCount = async (req, res, next) => {
  try {
    let taskCounts;
    const isAdmin = req.user.role;
    if (isAdmin === "admin") {
      const [all, Pending, Accepted, Completed, Rejected] = await Promise.all([
        Task.countDocuments(),
        Task.countDocuments({ status: "Pending" }),
        Task.countDocuments({ status: "Accepted" }),
        Task.countDocuments({ status: "Completed" }),
        Task.countDocuments({ status: "Rejected" }),
      ]);

      taskCounts = {
        all,
        Pending,
        Accepted,
        Completed,
        Rejected,
      };
    } else {
      const [all, Pending, Accepted, Completed, Rejected] = await Promise.all([
        Task.countDocuments({ assignedTo: req.user._id }),
        Task.countDocuments({ status: "Pending", assignedTo: req.user._id }),
        Task.countDocuments({ status: "Accepted", assignedTo: req.user._id }),
        Task.countDocuments({ status: "Completed", assignedTo: req.user._id }),
        Task.countDocuments({ status: "Rejected", assignedTo: req.user._id }),
      ]);
      taskCounts = {
        all,
        Pending,
        Accepted,
        Completed,
        Rejected,
      };
    }

    return res.status(200).json({ taskCounts, success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const statusAccepted = ["Pending", "Accepted", "Completed", "Rejected"];
    if (!statusAccepted.includes(status))
      return next(new CustomErrHandler(400, "Invalid status value"));

    const taskStatus = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(201).json({ taskStatus, success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
