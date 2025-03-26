import { useEffect, useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobs,
  selectJobError,
  selectJobStatus,
  selectJobs,
} from "@/app/slices/jobSlice";
import ProfileInfo from "@/components/ProfileInfo";
import { selectCurrentStatus } from "@/app/slices/authSlice";
import JobSearchFilter from "@/components/jobSearchFilter";
import JobDetailDialog from "@/components/JobDetailDialog";

const JobsPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [pramsObj, setPramsObj] = useState({
    query: "frontend developer",
    location: "remote",
    page: "1",
    num_pages: "1",
  });
  const dispatch = useDispatch();
  const jobs = useSelector(selectJobs);
  const status = useSelector(selectJobStatus);
  const error = useSelector(selectJobError);
  const isAuthenticated = useSelector(selectCurrentStatus);

  useEffect(() => {
    dispatch(getJobs(pramsObj));
  }, [dispatch, pramsObj]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const handleFilterChange = (filters) => {
    // Handle the filter parameters here
    setPramsObj(() => filters);
  };
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto pt-20 px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column - Profile & Filters */}
          <div className="md:col-span-3 space-y-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors duration-200">
              {isAuthenticated ? (
                <ProfileInfo />
              ) : (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Welcome to SocialCircle
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Join our professional community:
                  </p>
                  {/* Welcome content with dark mode classes */}
                </div>
              )}
            </div>
            {/* Filters */}
            <JobSearchFilter onFilterChange={handleFilterChange} />
          </div>

          {/* Right Column - Jobs */}
          <div className="md:col-span-9">
            {status === "loading" && (
              <div className="flex flex-col gap-4">
                <div className="bg-white/80 py-16 dark:bg-gray-800/80 animate-pulse"></div>
                <div className="bg-white/80 py-16 dark:bg-gray-800/80 animate-pulse"></div>
                <div className="bg-white/80 py-16 dark:bg-gray-800/80 animate-pulse"></div>
                <div className="bg-white/80 py-16 dark:bg-gray-800/80 animate-pulse"></div>
                <div className="bg-white/80 py-16 dark:bg-gray-800/80 animate-pulse"></div>
              </div>
            )}
            {status === "failed" && (
              <div className="text-center py-8 text-red-500 dark:text-red-400">
                Error: {error}
              </div>
            )}
            {status === "succeeded" && (
              <div className="space-y-4">
                {jobs?.map((job) => (
                  <div
                    key={job.job_id}
                    onClick={() => setSelectedJob(job)}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {job.job_title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {job.employer_name}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-gray-500 dark:text-gray-400 text-sm">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.job_city}, {job.job_state}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(job.job_posted_at_datetime_utc)}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {job.job_employment_type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Job Detail Dialog */}
      <JobDetailDialog
        selectedJob={selectedJob}
        formatDate={formatDate}
        onOpenChange={() => setSelectedJob(null)}
      />
    </div>
  );
};
export default JobsPage;
