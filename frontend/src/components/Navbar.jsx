import axios from "axios";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom"

const Navbar = () => {
    const logout = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`, {}, { withCredentials: true });
            localStorage.removeItem("auth-storage");
            window.location.reload();
        } catch (err) {
            toast.error(`Error: ${err.message}`)
        }
    }

    return (
        <nav className="w-full h-16 border-b border-gray-200 bg-white px-4 sm:px-8 flex items-center justify-between shadow-sm">

            {/* Logo */}
            <NavLink to="/dashboard" className="relative inline-block text-gray-900 font-bold text-xl tracking-tight">
                S H U S H
                <span className="absolute -bottom-1 left-[30%] right-[-16%] h-0.5 bg-yellow-400" />
            </NavLink>

            {/* Nav Links + Logout */}
            <div className="flex items-center gap-2 sm:gap-4">
                <NavLink
                    to="/dashboard/generate"
                    className={({ isActive }) =>
                        `text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${isActive
                            ? "bg-yellow-50 text-yellow-600"
                            : "text-gray-500 hover:text-gray-900"
                        }`
                    }
                >
                    Generate
                </NavLink>

                <NavLink
                    to="/dashboard/newlogin"
                    className={({ isActive }) =>
                        `text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${isActive
                            ? "bg-yellow-50 text-yellow-600"
                            : "text-gray-500 hover:text-gray-900"
                        }`
                    }
                >
                    New login
                </NavLink>

                <button
                    type="button"
                    className="text-sm font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 transition-colors cursor-pointer"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>

        </nav>
    )
}

export default Navbar
