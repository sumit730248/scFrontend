import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

export default JobDetailDialog;
