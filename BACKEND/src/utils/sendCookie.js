import jwt from "jsonwebtoken";

export const sendCookies = (user, res, message) => {
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.SECRET_KEY
  );
  const userData = user.toObject(); // convert mongoose doc to plain object
  delete userData.password; // remove password

  return res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })

    .json({ user: userData, message });
};
