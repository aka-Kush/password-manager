import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import api from "../api/axios";

const AuthPage = () => {
    const setUser = useAuthStore(state => state.setUser);
    const setJustLoggedIn = useAuthStore(state => state.setJustLoggedIn);
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 8) return toast.error("Password must be atleast 8 digit long")
        try {
            const res = await api.post(isLogin ? "/login" : "/register", formData);
            if (res.status == 200) {
                setUser(res.data);
                setJustLoggedIn(true);
                navigate("/dashboard");
            } else if (res.status == 201) {
                toast.success("Registeration successfull");
                setIsLogin(true);
                setFormData({
                    email: "",
                    password: "",
                    name: ""
                })
            }
            else {
                toast.error("Something went wrong. Please try again");
            }
        } catch (err) {
            if (err.status == 400) {
                toast.error("User already exists. Please login");
                setIsLogin(true);
                setFormData({
                    email: "",
                    password: "",
                    name: ""
                })
            } else if (err.status == 401) {
                toast.error("Incorrect email or password");
                setIsLogin(true);
                setFormData({
                    email: "",
                    password: "",
                    name: ""
                })
            } else toast.error(`Error: ${err.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <span className="relative inline-block text-gray-900 font-bold text-3xl tracking-tight">
                        S H U S H
                        <span className="absolute -bottom-1 left-[30%] right-[-16%] h-0.5 bg-yellow-400" />
                    </span>
                    <p className="text-gray-400 text-sm mt-3">
                        {isLogin ? "Welcome back. Sign in to your vault." : "Create an account to get started."}
                    </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col gap-5">

                    {/* Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => { setIsLogin(true); }}
                            className={`flex-1 text-sm font-medium py-1.5 rounded-md transition-colors cursor-pointer ${isLogin
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-400"
                                }`}
                        >
                            Sign in
                        </button>
                        <button
                            type="button"
                            onClick={() => { setIsLogin(false); }}
                            className={`flex-1 text-sm font-medium py-1.5 rounded-md transition-colors cursor-pointer ${!isLogin
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-400"
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Name — register only */}
                        {!isLogin && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-gray-400 uppercase tracking-widest">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 uppercase tracking-widest">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-yellow-400"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 uppercase tracking-widest">Password</label>
                            <div className="flex gap-2">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-yellow-400"
                                />
                                <button
                                    type="button"
                                    className="text-gray-400 cursor-pointer transition-colors duration-200 hover:text-yellow-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        // Eye off
                                        <HiOutlineEye className="h-4 w-4" />
                                    ) : (
                                        // Eye on
                                        <HiOutlineEyeOff className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>


                        {/* Divider */}
                        <div className="border-t border-gray-100" />

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-yellow-900 font-semibold text-sm py-2.5 rounded-lg cursor-pointer"
                        >
                            {isLogin ? "Sign in" : "Create account"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
