import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  Edit,
  ExternalLink,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/slices/authSlice";
import { useParams } from "react-router-dom";
import {
  getProfile,
  getSubscribers,
  selectIsSubscribed,
  selectProfile,
  selectSubscribers,
  tonngleSubscription,
} from "@/app/slices/profileSlice";
import DownloadResume from "@/components/DownloadResume";
import ResumeForm from "./ResumeForm";

const Loader = () => {
  return (
    <div className="animate-pulse">
      <div className="w-28 h-28 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-1/3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-1/4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-full"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
    </div>
  );
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userId = useParams().userId;
  const user = useSelector(selectCurrentUser);
  const profile = useSelector(selectProfile);
  const isSubscribed = useSelector(selectIsSubscribed);
  const connections = useSelector(selectSubscribers);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        await dispatch(getProfile(userId)).unwrap();
        dispatch(getSubscribers(userId));
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch, userId]);
  const handleConnect = async () => {
    await dispatch(tonngleSubscription(userId)).unwrap();
    dispatch(getSubscribers(userId));
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full mt-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="h-48 bg-gray-300 dark:bg-gray-700">
          {profile?.owner?.coverImage && (
            <img
              src={profile.owner?.coverImage}
              className="h-full w-full object-cover"
              alt="Cover"
            />
          )}
        </div>
        <div className="absolute -bottom-12 left-10 lg:left-20">
          <div className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600">
            {profile.owner?.avatar && (
              <img
                src={profile.owner?.avatar}
                className="rounded-full w-full h-full object-cover"
                alt="Avatar"
              />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-14 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.owner?.fullName || "User Name"}{" "}
                <span className="text-lg text-gray-300">
                  {" "}
                  @{profile.owner.userName}
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {profile.title}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {profile.location}
              </p>
              <span className="text-blue-600"> {connections} Connections</span>
              <div className="flex items-center gap-4 mt-2">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                <DownloadResume profile={profile} />

                {/* Additional Links Section */}
                {profile.links &&
                  profile.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center"
                    >
                      <ExternalLink className="w-5 h-5 mr-1" /> {link.name}
                    </a>
                  ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {profile.owner._id === user._id ? (
                <Button
                  variant="outline"
                  onClick={() => setIsEditProfileOpen(true)}
                  className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              ) : (
                <Button
                  onClick={() => handleConnect()}
                  variant="default"
                  className={
                    isSubscribed
                      ? "bg-gray-600 hover:bg-gray-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }
                >
                  {isSubscribed ? "Connected" : "Connect"}
                </Button>
              )}
            </div>
          </div>
        </div>

        <Card className="mb-6 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              About
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{profile.about}</p>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Briefcase className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Experience
                </h2>
              </div>
              <div className="space-y-4">
                {profile?.experience?.map((exp, index) => (
                  <div
                    key={index}
                    className="border-b dark:border-gray-700 last:border-0 pb-4"
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {exp.company}
                      </p>
                      <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-500">
                        <span>{exp.startDate}</span>
                        <span>-</span>
                        <span>{exp.endDate}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Education
                </h2>
              </div>
              <div className="space-y-4">
                {profile?.education?.map((edu, index) => (
                  <div
                    key={index}
                    className="border-b dark:border-gray-700 last:border-0 pb-4"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.school}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Graduating: {edu.graduationYear}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Your Professional Profile</DialogTitle>
          </DialogHeader>
          <ResumeForm
            defaultValues={profile}
            onSubmitSuccess={() => setIsEditProfileOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
