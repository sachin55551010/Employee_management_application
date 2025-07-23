import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isLoggingIn: false,
  isSiggningIn: false,
  isCheckingAuth: false,
  allUsers: [],

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/user/profile");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/signup", data);
      toast.success(res.data.message);
      set({ authUser: res.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/user/login", data);
      set({ authUser: res.data });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/user/logout");
      toast.success(res.data.message);
      set({ authUser: null });
    } catch (error) {
      console.log(error);
    }
  },
  getAllUsers: async () => {
    try {
      const res = await axiosInstance.get("/user/all-users");
      set({ allUsers: res.data.users });
    } catch (error) {
      console.log(error);
    }
  },
}));
