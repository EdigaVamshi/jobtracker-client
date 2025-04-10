import axios from 'axios';
import React, { useState } from 'react'

function JobList({ jobs, onModify, onJobDeleted }) {
    const [sortByDate, setSortByDate] = useState(false);

    const handleDelete = async (id) => {
        await axios.delete(`https://jobtracker-server-qqgr.onrender.com/applied-jobs/${id}`);
        onJobDeleted(id);
    }

    const sortedJobs = sortByDate ? [...jobs].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)) : jobs;

    return (
        <div className="bg-[#f0fbff] min-h-screen py-10 px-4 mt-10">

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-semibold text-gray-800">Applied Jobs</h1>
                <button
                    className="text-sm text-blue-600 underline hover:text-blue-800"
                    onClick={() => setSortByDate(!sortByDate)}
                >
                    Sort by Date {sortByDate ? "(Latest)" : "(Default)"}
                </button>
            </div>

            {/* Job Card */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedJobs.map((job) => (
                    <div
                        key={job._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col justify-between"
                    >
                        <div className="mb-4">
                            <p className="text-xl font-semibold text-gray-800 mb-1">{job.company}</p>
                            <p className="text-sm text-gray-600">Role: {job.role}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <p className="text-sm font-medium text-gray-700">Status: {job.status}</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    className="text-red-500 hover:text-red-700 text-sm hover:cursor-pointer"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => onModify(job)}
                                    className="text-white font-semibold py-2 px-4 rounded-md bg-green-500 text-sm hover:cursor-pointer"
                                >
                                    Modify
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default JobList