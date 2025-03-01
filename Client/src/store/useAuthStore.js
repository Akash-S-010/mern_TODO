import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";


export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,


    checkAuthUser: async () => {
        try {
            const res = await axios.get("https://mern-todo-4yw0.onrender.com/users/checkAuth", {
                withCredentials: true, 
            });
    
            set({ authUser: res.data.user });
    
        } catch (error) {
            console.error("Error in checkAuthUser:", error.response?.data || error.message);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    
    

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axios.post("https://mern-todo-4yw0.onrender.com/users/login", data, {
                withCredentials: true,
            });

            if (res.status === 200) {
                set({ authUser: res.data.user });
                toast.success("Login Successful!");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Login Failed!");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axios.post("https://mern-todo-4yw0.onrender.com/users/register", data, {
                withCredentials: true,
            });

            if (res.status === 201) {
                toast.success("Signup Successful! Please login.");
            }
        } catch (error) {
            toast.error(error.response?.data?.error || "Signup Failed!");
        } finally {
            set({ isSigningUp: false });
        }
    },

    logOut: async () => {
        try {
            await axios.post(
                "https://mern-todo-4yw0.onrender.com/users/logout",
                {}, // ✅ Empty body
                { withCredentials: true } // ✅ Ensure cookies are sent
            );
    
            set({ authUser: null }); // ✅ Clear user state
            toast.success("Logout Successful!");
    
        } catch (error) {
            console.log("Logout error:", error);
            toast.error("Logout Failed!");
        }
    },
}));