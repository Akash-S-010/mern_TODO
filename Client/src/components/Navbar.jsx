import React from "react";
import avatar from "../assets/user-avatar.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {

  const { logOut } = useAuthStore();

  const handleLogout =  async() => {
    await logOut();
     navigate("/login");
  };

  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between px-10 bg-slate-900 py-4">
      <div>
        <h1 className="text-3xl text-white font-bold">ToDo</h1>
      </div>
      <div className="flex items-center gap-5">
        <div
          className="size-9 bg-slate-200 rounded-3xl cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
        </div>
        <button className="bg-red-600  hover:bg-red-700 transition text-white font-semibold px-4 py-2 rounded-md text-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
