import { NavLink } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { useAuthStore } from "../store/useAuthStore";
import { BiUser } from "react-icons/bi";
export const NavBar = () => {
  const { authUser, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoutBtn = () => {
    logout();
    setIsMenuOpen(false);
  };
  const userName = authUser?.user?.name;

  return (
    <header className="fixed z-[100] shadow-[-5px_0px_10px_rgb(0,0,0,.8)] flex justify-between w-full items-center h-[var(--navbar-height)] px-4  bg-[var(--ui-color)]">
      <nav>Logo</nav>

      <div className="flex gap-4 justify-center items-center">
        {userName && (
          <h1 className="text-sm font-semibold bg-[var(--ui-light)]/40 py-1 px-2 rounded-md flex justify-center items-center gap-1">
            <BiUser />
            {userName}
          </h1>
        )}

        <nav className=" flex justify-center items-center">
          <div className="relative">
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`cursor-pointer transition-all duration-300 transform ${
                isMenuOpen ? "rotate-90 scale-100" : "rotate-0 scale-100"
              }`}
            >
              {isMenuOpen ? (
                <ImCross className="md:hidden text-xl" />
              ) : (
                <TiThMenu className="md:hidden text-2xl" />
              )}
            </div>

            {isMenuOpen && (
              <div>
                <div className="absolute bg-[var(--ui-color)] shadow-[2px_2px_6px_0px_rgb(0,0,0,.5)] flex flex-col justify-center items-center gap-2 top-[40px] right-[-5px] p-5 md:hidden z-[100] rounded-lg">
                  {authUser && (
                    <button
                      onClick={handleLogoutBtn}
                      className="flex items-center justify-center bg-[var(--ui-light)]/40 py-1 w-22 rounded-md text-sm font-semibold gap-1 transform transition duration-200 hover:scale-110 hover:bg-[var(--ui-light)]"
                    >
                      <MdLogout className="text-md" />
                      Logout
                    </button>
                  )}

                  <NavLink to="/setting">
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center bg-[var(--ui-light)]/40 py-1 w-22 rounded-md text-sm font-semibold gap-1 transform transition duration-200 hover:scale-110 hover:bg-[var(--ui-light)]"
                    >
                      <IoSettingsSharp className="text-md" />
                      Settings
                    </button>
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex gap-3">
            <button
              onClick={logout}
              className="flex items-center justify-center bg-[var(--ui-light)]/40 py-1 w-22 rounded-md text-sm font-semibold gap-1 transform transition duration-200 hover:scale-110 hover:bg-[var(--ui-light)]"
            >
              <MdLogout className="text-md" />
              Logout
            </button>
            <NavLink to="/setting">
              <button className="flex items-center justify-center bg-[var(--ui-light)]/40 py-1 w-22 rounded-md text-sm font-semibold gap-1 transform transition duration-200 hover:scale-110 hover:bg-[var(--ui-light)]">
                <IoSettingsSharp className="text-md" />
                Settings
              </button>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};
