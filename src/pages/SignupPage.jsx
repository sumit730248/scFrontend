import defaultAvatar from "../assets/avatar.png";
import defaultCover from "../assets/cover.png";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, BookOpen, UserCircle } from "lucide-react";
import { loginUser, registerUser } from "../app/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import ResumeForm from "./ResumeForm";
import { createProfile } from "@/app/slices/profileSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const [showResumeForm, setShowResumeForm] = useState(false);
  const [imagePreview, setImagePreview] = useState({
    avatar: null,
    cover: null,
  });
  const [defaultImages, setDefaultImages] = useState({
    avatar: null,
    cover: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      fullName: "",
      password: "",
      avatar: null,
      coverImage: null,
    },
  });

  // Load and convert default images to blobs on component mount
  useEffect(() => {
    const loadDefaultImages = async () => {
      try {
        const avatarResponse = await fetch(defaultAvatar);
        const avatarBlob = await avatarResponse.blob();
        const coverResponse = await fetch(defaultCover);
        const coverBlob = await coverResponse.blob();

        setDefaultImages({
          avatar: avatarBlob,
          cover: coverBlob,
        });
      } catch (error) {
        console.error("Error loading default images:", error);
      }
    };

    loadDefaultImages();
  }, []);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setValue(type, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => ({
          ...prev,
          [type === "avatar" ? "avatar" : "cover"]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    if (!defaultImages.avatar || !defaultImages.cover) {
      return;
    }

    const formDataToSend = new FormData();

    // Add text fields
    formDataToSend.append("userName", data.userName);
    formDataToSend.append("email", data.email);
    formDataToSend.append("fullName", data.fullName);
    formDataToSend.append("password", data.password);

    // Add files with proper fallbacks
    formDataToSend.append(
      "avatar",
      data.avatar || defaultImages.avatar,
      "avatar.png",
    );
    formDataToSend.append(
      "coverImage",
      data.coverImage || defaultImages.cover,
      "cover.png",
    );

    try {
      await dispatch(registerUser(formDataToSend)).unwrap();
      await dispatch(loginUser(formDataToSend)).unwrap();
      await dispatch(createProfile({})).unwrap();
      setShowResumeForm(true);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BookOpen className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-8 px-4 sm:px-10">
            {!showResumeForm ? (
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <Label className="text-gray-200">Username</Label>
                  <div className="mt-1 relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      {...register("userName", {
                        required: "Username is required",
                      })}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Enter your username"
                    />
                  </div>
                  {errors.userName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.userName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-gray-200">Email</Label>
                  <div className="mt-1 relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-gray-200">Full Name</Label>
                  <div className="mt-1 relative">
                    <UserCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      {...register("fullName", {
                        required: "Full name is required",
                      })}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-gray-200">Avatar</Label>
                  <div className="mt-1">
                    <div className="flex items-center space-x-4">
                      <img
                        src={imagePreview.avatar || defaultAvatar}
                        alt="Avatar preview"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "avatar")}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-200">Cover Image</Label>
                  <div className="mt-1">
                    <div className="space-y-2">
                      <img
                        src={imagePreview.cover || defaultCover}
                        alt="Cover preview"
                        className="w-full h-32 object-cover rounded"
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "coverImage")}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-200">Password</Label>
                  <div className="mt-1 relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      placeholder="Create a password"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Sign up
                </Button>
              </form>
            ) : (
                <ResumeForm />
            )}

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Login
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
