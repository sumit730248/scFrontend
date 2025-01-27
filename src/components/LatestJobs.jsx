import React from "react";
import { Link } from "react-router-dom";

const LatestJobs = () => {
  const latestJobs = [
    {
      id: 1,
      company: "Google",
      position: "Senior Frontend Developer",
      location: "Remote",
      salary: "$120k - $180k",
    },
    {
      id: 2,
      company: "Meta",
      position: "Full Stack Engineer",
      location: "New York",
      salary: "$140k - $200k",
    },
    {
      id: 3,
      company: "Amazon",
      position: "React Developer",
      location: "Seattle",
      salary: "$130k - $190k",
    },
  ];
  return (
    <div className="md:col-span-3">
      <div className=" bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-colors duration-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Latest Jobs
          </h2>
          <Link
            to="/jobs"
            className="text-blue-600 dark:text-blue-400 text-sm hover:text-blue-800 dark:hover:text-blue-300"
          >
            View all
          </Link>
        </div>
        <div className="space-y-4">
          {latestJobs.map((job) => (
            <div
              key={job.id}
              className="border-b dark:border-gray-700 last:border-b-0 pb-4 last:pb-0"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {job.position}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {job.company}
              </p>
              <div className="flex justify-between mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span>{job.location}</span>
                <span>{job.salary}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
