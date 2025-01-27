import React, { useState, useEffect } from "react";
import { ThumbsUp, MoreHorizontal, Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import PostInput from "@/components/PostInput";
import { useSelector } from "react-redux";
import { selectCurrentStatus } from "@/app/slices/authSlice";
import ProfileInfo from "@/components/ProfileInfo";
import LatestJobs from "@/components/LatestJobs";
import PostFeed from "@/components/PostFeed";

const HomePage = () => {
  const isAuthenticated = useSelector(selectCurrentStatus);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-20 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="md:col-span-3">
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
        </div>

        {/* Middle Column - Posts */}
        <div className="md:col-span-6">
          <PostInput />
          {!isAuthenticated && (
            <Alert className="mb-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
              <Lock className="h-4 w-4" />
              <AlertDescription className="dark:text-gray-300">
                Please{" "}
                <Link
                  to="/login"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  login
                </Link>{" "}
                or{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  register
                </Link>{" "}
                to interact with posts.
              </AlertDescription>
            </Alert>
          )}

          {/* Posts Feed */}
          <PostFeed />
        </div>

        {/* Right Column - Latest Jobs */}
        <LatestJobs />
      </div>
    </div>
  );
};

export default HomePage;
