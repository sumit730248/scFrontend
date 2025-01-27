import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, BookOpen } from "lucide-react";
import { loginUser } from "../app/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await dispatch(loginUser(data)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BookOpen className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-8 px-4 sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label className="text-gray-200">UserName</Label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    {...register("userName", {
                      required: "UserName is required",
                    })}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    placeholder="Enter your UserName"
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
                <Label className="text-gray-200">Password</Label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* <div className="flex items-center justify-between"> */}
              {/*   <div className="flex items-center"> */}
              {/*     <input */}
              {/*       type="checkbox" */}
              {/*       {...register("remember")} */}
              {/*       className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500" */}
              {/*     /> */}
              {/*     <label className="ml-2 block text-sm text-gray-300"> */}
              {/*       Remember me */}
              {/*     </label> */}
              {/*   </div> */}
              {/*   <Link */}
              {/*     to="#" */}
              {/*     className="text-sm text-blue-400 hover:text-blue-300" */}
              {/*   > */}
              {/*     Forgot password? */}
              {/*   </Link> */}
              {/* </div> */}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
               Login
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Sign up
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
export default LoginPage;
