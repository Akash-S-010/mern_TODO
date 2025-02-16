import React from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Signup = () => {
  const { signup, isSigningUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await signup(data);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <Toaster />
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-white font-bold mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-gray-300">Username</label>
            <input
              type="text"
              {...register("name", { required: "name is required" })}
              className="w-full p-2 rounded bg-slate-700 text-white outline-none border border-slate-600 focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 rounded bg-slate-700 text-white outline-none border border-slate-600 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 rounded bg-slate-700 text-white outline-none border border-slate-600 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isSigningUp ? (
              <Loader className="size-5 mx-auto animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
