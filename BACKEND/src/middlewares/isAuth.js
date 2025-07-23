import { CustomErrHandler } from "./CustomErrHandler.js";
import jwt from "jsonwebtoken";
export const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return next(new CustomErrHandler(400, "Please Login"));
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
  }
};
