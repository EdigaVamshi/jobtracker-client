import axios from 'axios';
import React, { useState } from 'react'

function JobForm({ initialData, onJobApplied, onJobModified }) {
    const isModify = !!initialData;

    const [formData, setFormData] = useState(initialData || {
        company: "",
        role: "",
        status: "Applied",
        appliedDate: new Date().toISOString(),
        link: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isModify) {
            const response = await axios.patch(`https://jobtracker-server-qqgr.onrender.com/applied-jobs/${initialData._id}`, formData);
            if (response.data) {
                onJobModified?.(response.data);
                alert("Updated");
            }
        } else {
            const response = await axios.post('https://jobtracker-server-qqgr.onrender.com/applied-jobs', formData);
            if (response.data) {
                onJobApplied?.(response.data);
                alert("Applied");
                setFormData({ company: "", role: "", status: "Applied", appliedDate: new Date().toISOString(), link: "" });
            }
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
            <h1 className="text-2xl font-semibold text-center mb-6">
                {isModify ? "Update Job Application" : "New Job Application"}
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Company */}

                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <label htmlFor="company" className="w-full sm:w-1/3 font-medium">Company</label>
                    <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full sm:w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Role */}

                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <label htmlFor="role" className="w-full sm:w-1/3 font-medium">Role</label>
                    <input
                        id="role"
                        name="role"
                        type="text"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full sm:w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Status */}

                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <label htmlFor="status" className="w-full sm:w-1/3 font-medium">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full sm:w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                {/* Link */}

                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <label htmlFor="link" className="w-full sm:w-1/3 font-medium">Link</label>
                    <input
                        id="link"
                        name="link"
                        type="text"
                        value={formData.link}
                        onChange={handleChange}
                        className="w-full sm:w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Buttons */}

                <div className="flex justify-evenly mt-4">
                    <button
                        type="submit"
                        className="bg-[#00a5ec] text-white px-6 py-2 rounded-sm font-semibold hover:cursor-pointer "
                    >
                        {isModify ? "Update" : "Apply"}
                    </button>
                    {isModify && (
                        <button
                            type="button"
                            onClick={() => onJobModified(null)}
                            className="text-red-600 font-semibold px-6 py-2 border rounded-sm border-red-600 hover:bg-red-600 hover:text-white hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>

    )
}

export default JobForm