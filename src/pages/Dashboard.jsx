import React, { useEffect, useState } from 'react'
import JobForm from '../components/JobForm'
import JobList from '../components/JobList'
import axios from 'axios';

function Dashboard() {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [modifyJob, setModifyJob] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://jobtracker-server-qqgr.onrender.com/applied-jobs');
            setAppliedJobs(response.data);
        }
        fetchData();
    }, [])

    const handleJobApplied = (newjob) => {
        setAppliedJobs(prev => [...prev, newjob]);
    };

    const handleJobModified = (modifiedJob) => {
        if (!modifiedJob) {
            setModifyJob(null);
            return;
        }
        setAppliedJobs(prev => prev.map(job => (job._id === modifiedJob._id ? modifiedJob : job)));
        setModifyJob(null);

    }

    const handleJobDeleted = (id) => {
        setAppliedJobs(prev => prev.filter(job => job._id !== id));
    }

    const statusFrequency = (jobs) => {
        return jobs.reduce((acc, job) => {
            acc[job.status] = (acc[job.status] || 0) + 1;
            return acc;
        }, {});
    };

    const statusSummary = statusFrequency(appliedJobs);
    
    return (
        <div>
            <div className='flex justify-evenly border-b-2 border-gray-300 py-4'>
                <div className='text-center'>
                    <p className='text-gray-600 text-sm'>Applied</p>
                    <p className='text-xl font-semibold'>{statusSummary.Applied || 0}</p>
                </div>
                <div className='text-center'>
                    <p className='text-gray-600 text-sm'>Interview</p>
                    <p className='text-xl font-semibold'>{statusSummary.Interview || 0}</p>
                </div>
                <div className='text-center'>
                    <p className='text-gray-600 text-sm'>Offer</p>
                    <p className='text-xl font-semibold'>{statusSummary.Offer || 0}</p>
                </div>
                <div className='text-center'>
                    <p className='text-gray-600 text-sm'>Rejected</p>
                    <p className='text-xl font-semibold'>{statusSummary.Rejected || 0}</p>
                </div>
            </div>

            {!modifyJob ? (
                <JobForm onJobApplied={handleJobApplied} />
            ) : (
                <JobForm initialData={modifyJob} onJobModified={handleJobModified} />
            )}
            {appliedJobs.length === 0 ? (
                <div className="bg-[#f0fbff] min-h-screen py-10 px-4 mt-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <h1 className="text-2xl font-semibold text-gray-800">Applied Jobs</h1>
                    </div>
                    <h1 className='text-center text-2xl text-gray-500 font-semibold'>Apply to keep track of jobs</h1>
                </div>
            ) : (
                <JobList
                    jobs={appliedJobs}
                    onModify={(job) => setModifyJob(job)}
                    onJobDeleted={handleJobDeleted}
                />
            )}
        </div>
    )
}

export default Dashboard