import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isSiggningIn: false,
  isCheckingAuth: false,
  allUsers: [],
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/user/profile");
      set({ authUser: res.data });
      get().connectSocket();
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
      get().connectSocket();
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
      get().connectSocket();
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
      get().disconnectSocket();
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
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: {
        userId: authUser?.user?._id,
      },
    });
    socket.connect();
    set({ socket: socket });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
