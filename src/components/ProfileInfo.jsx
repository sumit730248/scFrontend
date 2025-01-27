import { useEffect } from "react";
import defaultAvatar from "../assets/avatar.png";
import defaultCover from "../assets/cover.png";
import { selectCurrentUser } from "@/app/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribers, selectSubscribers } from "@/app/slices/profileSlice";

const ProfileInfo = () => {
  const currentUser = useSelector(selectCurrentUser);
  const connections = useSelector(selectSubscribers)
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) dispatch(getSubscribers( currentUser._id ));
  }, [dispatch, currentUser]);
  return (
    <div className=" flex flex-col">
      <div className="relative">
        <img
          src={currentUser?.coverImage || defaultCover}
          className="h-24 w-full bg-blue-600 dark:bg-blue-800 rounded-t-lg relative"
        />
        <img
          src={currentUser?.avatar || defaultAvatar}
          alt={currentUser?.fullName}
          className="absolute bottom-0 object-cover transform translate-y-1/2 left-4 w-20 h-20 rounded-full border-4 border-white dark:border-gray-800"
        />
      </div>
      <div className="pt-12 p-4 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {currentUser?.fullName}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          @{currentUser?.userName}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          {currentUser?.location || "no location"}
        </p>
        <div className="mt-4 border-t dark:border-gray-700 pt-4">
          <div className="flex justify-between text-sm">
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500 dark:text-gray-400">
              Connections
            </span>
            <span className="text-gray-900 dark:text-white font-medium">
              {connections || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
