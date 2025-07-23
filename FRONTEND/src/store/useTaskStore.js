import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";
import toast from "react-hot-toast";

export const useTaskStore = create((set) => ({
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
      console.log(res.data);
      set((state) => ({ refresh: !state.refresh }));
    } catch (error) {
      console.log(error);
    }
  },
}));
