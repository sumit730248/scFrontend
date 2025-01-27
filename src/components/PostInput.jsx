import { useState } from "react";
import { Send, Camera, Link as LinkIcon, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentStatus } from "@/app/slices/authSlice";
import { addPosts, clearPostsState } from "@/app/slices/postSlice";
import { useForm } from "react-hook-form";

const PostInput = () => {
  const isAuthenticated = useSelector(selectCurrentStatus);
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  if (!isAuthenticated) return null;

  const onSubmit = async(data) => {
    const formData = new FormData();
    formData.append("content", data.content);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }
    console.log(data)
    await dispatch(addPosts(formData)).unwrap();
    dispatch(clearPostsState())
    reset();
    setImagePreview("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="mb-6 bg-white dark:bg-gray-800">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("content", { required: "Content is required" })}
            placeholder="What's on your mind?"
            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
          
          {imagePreview && (
            <div className="mt-3">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-20 w-40 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="flex justify-between items-center mt-3">
            <div className="flex relative space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-gray-500 dark:text-gray-400"
              >
                <Camera className="h-5 w-5 mr-2" />
                Photo
              </Button>
              <input
                id="image-upload"
                type="file"
                {...register("image")}
                onChange={handleImageChange}
                accept="image/*"
                className="absolute opacity-0 max-w-20"
              />
            </div>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostInput;
