import { useState } from "react"
import copyToClipboard from "../helper/copyToClipboard"
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeOff, HiTrash, HiOutlinePencil } from "react-icons/hi";

const Logincard = ({ id, name, username, password, deleteCard, editCard }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleCopy = (e, text) => {
        e.preventDefault();
        copyToClipboard(text);
        toast.success("Copied to clipboard");
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleteCard(id);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        editCard(id, name, username, password);
    }

    return (
        <div className="w-full">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <div className="w-9 h-9 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-center text-yellow-600 text-sm font-bold shrink-0">
                            {name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <h1 className="text-gray-900 font-semibold text-lg tracking-tight truncate">{name}</h1>
                    </div>
                    <div className="flex gap-2">
                        <button type="button" className="text-gray-400 cursor-pointer transition-colors duration-200 hover:text-green-400" onClick={(e) => handleEdit(e)}>
                            <HiOutlinePencil className="w-5 h-5" />
                        </button>

                        <button type="button" className="text-gray-400 cursor-pointer transition-colors duration-200 hover:text-red-400" onClick={() => setOpenDeleteModal(true)}>
                            <HiTrash className="w-5 h-5" />
                        </button>

                        {openDeleteModal &&

                            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                                <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm flex flex-col gap-4">

                                    {/* Title */}
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Delete this item?
                                    </h2>

                                    {/* Message */}
                                    <p className="text-sm text-gray-500">
                                        This action cannot be undone. Are you sure you want to delete this login?
                                    </p>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 mt-2">
                                        <button
                                            className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
                                            onClick={() => setOpenDeleteModal(false)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                            onClick={(e) => handleDelete(e)}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Username Row */}
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Username</p>
                        <p className="text-gray-700 text-sm truncate">{username}</p>
                    </div>
                    <button
                        type="button"
                        className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 cursor-pointer transition-colors duration-200 hover:border-yellow-400 hover:text-yellow-600"
                        onClick={(e) => handleCopy(e, username)}
                    >
                        Copy
                    </button>
                </div>

                {/* Password Row */}
                <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Password</p>
                        <p className="text-gray-600 text-sm font-mono tracking-wider truncate">
                            {showPassword
                                ? password
                                : "•".repeat(Math.min(password?.length || 8, 12))
                            }
                        </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Eye toggle */}
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

                        {/* Copy */}
                        <button
                            type="button"
                            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 cursor-pointer transition-colors duration-200 hover:border-yellow-400 hover:text-yellow-600"
                            onClick={(e) => handleCopy(e, password)}
                        >
                            Copy
                        </button>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Logincard
