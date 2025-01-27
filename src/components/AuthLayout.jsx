import { useSelector } from "react-redux";
import { selectCurrentStatus } from "../app/slices/authSlice";
import LoginPopUp from "./LoginPopUp";

function AuthLayout({ children, authentication = true }) {
  const authStatus = useSelector(selectCurrentStatus);

  if (authentication && !authStatus) {
    return (
      <div className="text-white h-screen w-full bg-white dark:bg-gray-900 flex justify-center items-center p-6">
        <LoginPopUp />
      </div>
    );
  }
  return <>{children}</>;
}

export default AuthLayout;
