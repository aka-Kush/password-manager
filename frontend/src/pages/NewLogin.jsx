import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import api from "../api/axios";

const NewLogin = ({ id, username, name, password, onCardUpdate }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        username: username || "",
        name: name || "",
        password: password || "",
        id: id || null
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password.length < 8) return toast.error("Password must be atleast 8 digit long")
        try {
            const res = await api.post("/dashboard/login", data);
            setData({ username: "", name: "", password: "", id: null })
            if (onCardUpdate) onCardUpdate(res.data);
            toast.success("Login saved")
            navigate("/dashboard")
        } catch (err) {
            toast.error(`Error ${err.message}`)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 pt-12 pb-12">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-gray-900 font-bold text-2xl tracking-tight">Save a login</h1>
                    <p className="text-gray-400 text-sm mt-1">Store a new credential in your vault</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col gap-5">

                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-gray-400 uppercase tracking-widest">Item name</label>
                        <input
                            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-yellow-400"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="e.g. Gmail, Netflix"
                        />
                    </div>

                    {/* Username */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-gray-400 uppercase tracking-widest">Username</label>
                        <input
                            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-yellow-400"
                            type="text"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            placeholder="e.g. john@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-gray-400 uppercase tracking-widest">Password</label>
                        <div className="flex gap-2">
                            <input
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-yellow-400"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Enter password"
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
                        Save login
                    </button>

                </form>
            </div>
        </div>
    )
}

export default NewLogin
