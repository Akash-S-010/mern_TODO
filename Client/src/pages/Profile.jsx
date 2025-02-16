import React from "react";
import avatar from "../assets/user-avatar.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {

  const { authUser } = useAuthStore();

  const navigate = useNavigate();
  return (
    <div className="profile h-screen bg-slate-700 flex justify-center items-center">
      <div className="card bg-slate-100 px-10 py-8 rounded">
        <h1 className="text-3xl font-bold text-center">Profile</h1>
        <p className="text-slate-500 text-center">Your profile information</p>
        <div className="w-[100px] h-[100px] mx-auto mt-5">
          <img
            src={avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="details mt-5">
          <div className="input-container w-md mb-4">
            <label htmlFor="name" className="block mb-1">
              User Name
            </label>
            <div className="border w-full px-3 py-2 rounded-md border-2 border-slate-400 font-semibold text-slate-600">
              {authUser.name}
            </div>
          </div>
          <div className="input-container w-md">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <div className="border w-full px-3 py-2 rounded-md border-2 border-slate-400 font-semibold text-slate-600">
              {authUser.email}
            </div>
          </div>
          <div className="account-information mt-8">
            <h1 className="text-xl font-semibold">Account Information</h1>
            <div className="w-full flex justify-between mt-5">
              <p>Member Since</p>
              <p>{authUser.createdAt}</p>
            </div>
          </div>
          <hr className="my-2 border border-slate-400" />
          <div className="w-full flex justify-between">
            <p>Account Status</p>
            <p className="text-green-600">Active</p>
          </div>
        </div>

        <div className="w-full flex justify-center mt-4">
        <button 
          className="bg-slate-600 transition hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-md text-sm cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Home
        </button>
      </div>
      </div>
    </div>
  );
};

export default Profile;
// onClick={() => navigate("/home")}