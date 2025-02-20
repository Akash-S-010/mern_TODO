import React from "react";
import avatar from "../assets/user-avatar.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  return (
    <div className="profile h-screen bg-slate-900 flex justify-center items-center px-4">
      <div className="card bg-slate-100 px-6 py-6 sm:px-10 sm:py-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Profile</h1>
        <p className="text-slate-500 text-center text-sm sm:text-base">
          Your profile information
        </p>
        <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] mx-auto mt-4 sm:mt-5">
          <img
            src={avatar}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="details mt-5">
          <div className="input-container w-full mb-4">
            <label htmlFor="name" className="block mb-1 text-sm sm:text-base">
              User Name
            </label>
            <div className="border w-full px-3 py-2 rounded-md border-2 border-slate-400 font-semibold text-slate-600 text-sm sm:text-base">
              {authUser?.name}
            </div>
          </div>
          <div className="input-container w-full">
            <label htmlFor="email" className="block mb-1 text-sm sm:text-base">
              Email
            </label>
            <div className="border w-full px-3 py-2 rounded-md border-2 border-slate-400 font-semibold text-slate-600 text-sm sm:text-base">
              {authUser?.email}
            </div>
          </div>
          <div className="account-information mt-6 sm:mt-8">
            <h1 className="text-lg sm:text-xl font-semibold">
              Account Information
            </h1>
            <div className="w-full flex justify-between mt-4 sm:mt-5 text-sm sm:text-base">
              <p>Member Since</p>
              <p>{authUser?.createdAt.split("T")[0]}</p>
            </div>
          </div>
          <hr className="my-2 border border-slate-400" />
          <div className="w-full flex justify-between text-sm sm:text-base">
            <p>Account Status</p>
            <p className="text-green-600">Active</p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <button
            className="bg-slate-600 transition hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-md text-sm cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
