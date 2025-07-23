import { User } from "../models/user.model.js";
import { CustomErrHandler } from "../middlewares/CustomErrHandler.js";
import { sendCookies } from "../utils/sendCookie.js";
import bcrypt from "bcryptjs";

export const defaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin12345", 10); // default password
      await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Default admin created");
    } else {
      console.log("ℹ️ Default admin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate presence and non-empty values
    if (
      !name ||
      !email ||
      !password ||
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return next(
        new CustomErrHandler(
          400,
          "Name, email, and password are required and cannot be empty"
        )
      );
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new CustomErrHandler(400, "User already exists"));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: role || "employee",
    });
    sendCookies(user, res, "User registered successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate presence and non-empty values
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return next(
        new CustomErrHandler(
          400,
          "email, and password are required and cannot be empty"
        )
      );
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return next(new CustomErrHandler(400, "Invalid credentials"));
    }

    const isPassword = await bcrypt.compare(password, userExists.password);

    if (!isPassword)
      return next(new CustomErrHandler(400, "Invalid credentials"));

    sendCookies(userExists, res, "User Login successfully");
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({ message: "Logout successfully", success: true });
};

export const profile = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id).select("-password");
    res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "employee" }).select("-password");
    if (!users) return next(new CustomErrHandler(400, "No user found"));
    return res.status(200).json({ users, success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
