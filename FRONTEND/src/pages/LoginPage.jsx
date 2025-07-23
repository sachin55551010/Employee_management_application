import { useState } from "react";
import { FaRegMessage } from "react-icons/fa6";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { MdLockOutline } from "react-icons/md";
import { useAuthStore } from "../store/useAuthStore";
import { PiSpinnerBold } from "react-icons/pi";
export const LoginPage = () => {
  const { login, isLoggingIn } = useAuthStore();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isEyeOn, setIsEyeOn] = useState(false);

  const handleEyeClickBtn = () => {
    setIsEyeOn(!isEyeOn);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(loginData);
  };
  return (
    <div className=" min-h-screen flex justify-center py-8 pt-[var(--navbar-height)]">
      {/* header of from */}
      <div className="h-fit pt-[var(--navbar-height)]">
        <div className="flex not-only:flex-col items-center gap-2">
          <FaRegMessage className="text-3xl" />
          <h1 className="text-2xl font-bold">Please Login</h1>
        </div>

        {/* signup form section */}
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-3 mt-4">
            <label
              className="flex flex-col gap-1 cursor-pointer text-sm font-bold relative"
              htmlFor="email"
            >
              Email
              <input
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                id="email"
                className="border-1 rounded-md h-9 pl-7 w-80 outline-0"
                type="email"
                placeholder="example@gmail.com"
                required
              />
              <HiOutlineMail className="absolute top-[55%] left-[2%] text-[1.1rem]" />
            </label>

            <label
              className="flex flex-col gap-1 cursor-pointer text-sm font-bold relative"
              htmlFor="password"
            >
              Password
              <input
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                id="password"
                className="border-1 rounded-md h-9 pl-7 w-80 outline-0"
                type={isEyeOn ? "text" : "password"}
                placeholder="*******"
                required
              />
              {isEyeOn ? (
                <HiEye
                  onClick={handleEyeClickBtn}
                  className="absolute top-[55%] right-[3%] text-xl"
                />
              ) : (
                <HiEyeOff
                  onClick={handleEyeClickBtn}
                  className="absolute top-[55%] right-[3%] text-xl"
                />
              )}
              <MdLockOutline className="absolute top-[55%] left-[2%] text-[1.1rem]" />
            </label>
          </div>
          <button
            className="bg-orange-500 w-full mt-5 rounded-md py-1.5 cursor-pointer relative disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoggingIn}
          >
            Log In
            {isLoggingIn && (
              <PiSpinnerBold className="text-xl absolute top-[25%] right-[20%] animate-spin" />
            )}
          </button>

          <div className="text-center mt-3">
            <p>
              Dont have an Account ?{" "}
              <NavLink className="text-orange-500" to="/signup">
                Sign up
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
