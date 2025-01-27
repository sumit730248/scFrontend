import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "./app/slices/authSlice";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <div className="w-full h-full">
      <NavBar
        searchPlaceHolder={"Search"}
      />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
