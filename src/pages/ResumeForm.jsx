import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Linkedin,
  PlusCircle,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { changeProfileDetails, createProfile } from "@/app/slices/profileSlice";
import { selectCurrentStatus } from "@/app/slices/authSlice";

const ResumeForm = ({
  defaultValues: initialDefaultValues = {},
  onSubmitSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      about: "",
      location: "",
      githubUrl: "",
      linkedinUrl: "",
      links: [],
      experience: [],
      education: [],
      skills: [],
      ...initialDefaultValues,
    },
  });

  const dispatch = useDispatch();
  const links = watch("links");
  const experience = watch("experience");
  const education = watch("education");
  const skills = watch("skills");
  const isLogin = useSelector(selectCurrentStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await dispatch(changeProfileDetails(data)).unwrap();

      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Resume submission failed:", error);
    }
  };

  const addItem = (field, defaultValue) => {
    const currentItems = watch(field);
    setValue(field, [...currentItems, defaultValue]);
  };

  const removeItem = (field, index) => {
    const currentItems = watch(field);
    setValue(
      field,
      currentItems.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-white mb-6">
          Complete Your Professional Profile
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-200">
              Basic Information
            </h4>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-200">Professional Title</Label>
                <Input
                  {...register("title")}
                  placeholder="Senior Software Engineer"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-200">About</Label>
                <Textarea
                  {...register("about")}
                  placeholder="Write a brief introduction about yourself..."
                  className="bg-gray-700 border-gray-600 text-white h-32"
                />
              </div>
              <div>
                <Label className="text-gray-200">Location</Label>
                <Input
                  {...register("location")}
                  placeholder="City, Country"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-200">
              Social Profiles
            </h4>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-200">GitHub Profile</Label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                    <Github className="h-5 w-5" />
                  </span>
                  <Input
                    {...register("githubUrl")}
                    placeholder="https://github.com/username"
                    className="rounded-l-none bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-200">LinkedIn Profile</Label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                    <Linkedin className="h-5 w-5" />
                  </span>
                  <Input
                    {...register("linkedinUrl")}
                    placeholder="https://linkedin.com/in/username"
                    className="rounded-l-none bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Additional Links Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-200">
                Additional Links
              </h4>
              <Button
                type="button"
                variant="outline"
                onClick={() => addItem("links", { name: "", url: "" })}
                className="border-gray-600 bg-white text-gray-900 hover:bg-gray-700 hover:text-gray-200"
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Link
              </Button>
            </div>
            {links.map((link, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-200">Link Name</Label>
                        <Input
                          {...register(`links.${index}.name`)}
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="Portfolio, Blog, etc."
                        />
                      </div>
                      <div>
                        <Label className="text-gray-200">URL</Label>
                        <div className="flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
                            <LinkIcon className="h-5 w-5" />
                          </span>
                          <Input
                            {...register(`links.${index}.url`)}
                            className="rounded-l-none bg-gray-600 border-gray-500 text-white"
                            placeholder="https://"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeItem("links", index)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Experience Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-200">
                Work Experience
              </h4>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  addItem("experience", {
                    title: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
                className="border-gray-600 bg-white text-gray-900 hover:bg-gray-700 hover:text-gray-200"
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Experience
              </Button>
            </div>
            {experience.map((exp, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-200">Job Title</Label>
                        <Input
                          {...register(`experience.${index}.title`)}
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="Senior Developer"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-200">Company</Label>
                        <Input
                          {...register(`experience.${index}.company`)}
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="Tech Corp"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-200">Start Date</Label>
                        <Input
                          type="date"
                          {...register(`experience.${index}.startDate`)}
                          className="bg-gray-600 border-gray-500 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-200">End Date</Label>
                        <Input
                          type="date"
                          {...register(`experience.${index}.endDate`)}
                          className="bg-gray-600 border-gray-500 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-200">Description</Label>
                      <Textarea
                        {...register(`experience.${index}.description`)}
                        className="bg-gray-600 border-gray-500 text-white h-24"
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeItem("experience", index)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Education Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-200">Education</h4>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  addItem("education", {
                    school: "",
                    degree: "",
                    field: "",
                    graduationYear: "",
                  })
                }
                className="border-gray-600 bg-white text-gray-900 hover:bg-gray-700 hover:text-gray-200"
              >
                <PlusCircle className="h-4 w-4 mr-2" /> Add Education
              </Button>
            </div>
            {education.map((edu, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-200">School</Label>
                        <Input
                          {...register(`education.${index}.school`)}
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="University Name"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-200">Degree</Label>
                        <Input
                          {...register(`education.${index}.degree`)}
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="Bachelor's, Master's, etc."
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-200">Field of Study</Label>
                        <Input
                          {...register(`education.${index}.field`)}
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="Computer Science"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-200">Graduation Year</Label>
                        <Input
                          type="number"
                          {...register(`education.${index}.graduationYear`)}
                          className="bg-gray-600 border-gray-500 text-white"
                          placeholder="2024"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeItem("education", index)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Skills Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-gray-200">Skills</h4>
              <div className="flex gap-2">
                <Input
                  id="newSkill"
                  placeholder="Enter a skill"
                  className="bg-gray-700 border-gray-600 text-white"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const skillInput = e.target;
                      const newSkill = skillInput.value.trim();
                      if (newSkill && !skills.includes(newSkill)) {
                        addItem("skills", newSkill);
                        skillInput.value = "";
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const skillInput = document.getElementById("newSkill");
                    const newSkill = skillInput.value.trim();
                    if (newSkill && !skills.includes(newSkill)) {
                      addItem("skills", newSkill);
                      skillInput.value = "";
                    }
                  }}
                  className="border-gray-600 bg-white text-gray-900 hover:bg-gray-700 hover:text-gray-200"
                >
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Skill
                </Button>
              </div>
            </div>

            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-700 text-white rounded-full px-3 py-1 text-sm"
                  >
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem("skills", index)}
                      className="ml-2 p-0 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;
