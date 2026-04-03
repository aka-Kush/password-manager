import { useState } from "react"
import generatePassword from "../helper/generatePassword"
import copyToClipboard from "../helper/copyToClipboard";
import toast from "react-hot-toast";

const Generate = () => {
    const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
        length: 8,
        uppercase: false,
        lowercase: true,
        number: false,
        special: false
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { uppercase, lowercase, number, special, length } = formData;

        if (!uppercase && !lowercase && !number && !special) {
            toast.error("Please select at least one character type.");
            return;
        }

        const password = generatePassword(formData);
        setPassword(password);
    }

    const handleCopy = (e) => {
        e.preventDefault();
        copyToClipboard(password);
        toast.success("Copied to clipboard")
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 pt-12 pb-12">
            <div className="w-full max-w-md">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-gray-900 font-bold text-2xl tracking-tight">Generate password</h1>
                    <p className="text-gray-400 text-sm mt-1">Customize and copy a secure password</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col gap-6">

                    {/* Length */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-gray-400 uppercase tracking-widest">Length</label>
                        <input
                            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-yellow-400"
                            type="number"
                            name="length"
                            value={formData.length}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="flex flex-col gap-3">
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Include</p>

                        {[
                            { name: "uppercase", label: "Uppercase", hint: "A–Z" },
                            { name: "lowercase", label: "Lowercase", hint: "a–z" },
                            { name: "number", label: "Numbers", hint: "0–9" },
                            { name: "special", label: "Symbols", hint: "@#$%" },
                        ].map(({ name, label, hint }) => (
                            <label key={name} className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">{label}</p>
                                    <p className="text-xs text-gray-400">{hint}</p>
                                </div>
                                <input
                                    type="checkbox"
                                    name={name}
                                    checked={formData[name]}
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-yellow-400 cursor-pointer"
                                />
                            </label>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* Generate Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-yellow-900 font-semibold text-sm py-2.5 rounded-lg cursor-pointer"
                    >
                        Generate
                    </button>

                    {/* Output */}
                    {password && (
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1.5">
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Generated password</p>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 font-mono text-sm text-gray-800 break-all">
                                    {password}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="w-full text-sm font-medium py-2.5 rounded-lg border border-gray-200 text-gray-500 cursor-pointer"
                            >
                                Copy
                            </button>
                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}

export default Generate
