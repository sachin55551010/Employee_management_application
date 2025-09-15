import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useTaskStore = create((set, get) => ({
  allTasks: [],
  refresh: false,
  taskCount: null,
  isTaskCreated: false,
  isCheckingTask: false,
  isTaskDeleted: false,

  createTask: async (data) => {
    set({ isTaskCreated: true });
    try {
      const res = await axiosInstance.post("/task/create", data);

      set((state) => ({ refresh: !state.refresh }));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isTaskCreated: false });
    }
  },

  getAllTask: async (filters = {}) => {
    set({ isCheckingTask: true });
    try {
      const { status, priority, search } = filters;
      const res = await axiosInstance.get("/task/all-task", {
        params: {
          ...(status && { status }),
          ...(priority && { priority }),
          ...(search && { search }),
        },
      });

      set({ allTasks: res.data.tasks });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingTask: false });
    }
  },
  deleteTask: async (id) => {
    set({ isTaskDeleted: true });
    try {
      const res = await axiosInstance.delete(`/task/delete/${id}`);
      set((state) => ({ refresh: !state.refresh }));
      toast.success(res.data.message);
    } catch (error) {
      console.log();
      toast.error(error.response.data.message);
    } finally {
      set({ isTaskDeleted: false });
    }
  },
  updateTask: async (id, data) => {
    set({ isTaskCreated: true });
    try {
      const res = await axiosInstance.put(`/task/update/${id}`, data);
      set((state) => ({ refresh: !state.refresh }));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isTaskCreated: false });
    }
  },
  updateTaskCount: async () => {
    try {
      const res = await axiosInstance.get("/task/count");
      set({ taskCount: res.data.taskCounts });
    } catch (error) {
      console.log(error);
    }
  },

  updateTaskStatus: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/task/update-status/${id}`, data);
      set((state) => ({ refresh: !state.refresh }));
    } catch (error) {
      console.log(error);
    }
  },
  subscribeTasks: () => {
    const socket = useAuthStore.getState().socket;

    socket.on("newTask", (newTask) => {
      set({
        allTasks: [...get().allTasks, newTask],
      });
      get().updateTaskCount();
    });

    socket.on("deleteTask", (id) => {
      set({
        allTasks: get().allTasks.filter((task) => task._id !== id),
      });
      get().updateTaskCount();
    });
    socket.on("updatedTask", (id, updatedTask) => {
      set({
        allTasks: get().allTasks.map((task) =>
          task._id === id ? updatedTask : task
        ),
      });
      console.log("task updated");
    });

    socket.on("taskCountsUpdated", (counts) => {
      set({
        taskCounts: counts,
      });
    });
    socket.on("updatedStatus", (id, updatedStatus) => {
      set({
        allTasks: get().allTasks.map((task) =>
          task._id === id ? updatedStatus : task
        ),
      });
      get().updateTaskCount();
    });
  },
}));
