import React, { useEffect, useState } from "react";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
const JobDetailDialog = ({ formatDate, selectedJob, onOpenChange }) => {
  if (!selectedJob) return null;

  return (
    <Dialog open={!!selectedJob} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="dark:text-white">
            {selectedJob.job_title}
          </DialogTitle>
          <div className="flex items-center gap-4 mt-4">
            <Badge>{selectedJob.job_employment_type}</Badge>
            <span className="text-gray-600 dark:text-gray-400">
              {selectedJob.job_city}, {selectedJob.job_state}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              Posted: {formatDate(selectedJob.job_posted_at_datetime_utc)}
            </span>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4 pr-2">
          <h3 className="font-semibold dark:text-white mb-2">Description</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {selectedJob.job_description}
          </p>

          {selectedJob.job_highlights?.Qualifications && (
            <>
              <h3 className="font-semibold dark:text-white mb-2">
                Qualifications
              </h3>
              <ul className="list-disc pl-4 text-gray-600 dark:text-gray-300 mb-4">
                {selectedJob.job_highlights.Qualifications.map(
                  (qual, index) => (
                    <li key={index} className="mb-1">
                      {qual}
                    </li>
                  ),
                )}
              </ul>
            </>
          )}

          {selectedJob.job_highlights?.Responsibilities && (
            <>
              <h3 className="font-semibold dark:text-white mb-2">
                Responsibilities
              </h3>
              <ul className="list-disc pl-4 text-gray-600 dark:text-gray-300 mb-4">
                {selectedJob.job_highlights.Responsibilities.map(
                  (resp, index) => (
                    <li key={index} className="mb-1">
                      {resp}
                    </li>
                  ),
                )}
              </ul>
            </>
          )}
        </div>

        <div className="flex-shrink-0 pt-4 mt-auto border-t">
          <Button
            className="w-full"
            onClick={() => window.open(selectedJob.job_apply_link, "_blank")}
          >
            Apply Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default JobsPage;
