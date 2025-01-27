import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { getCurrentUser } from './app/slices/authSlice';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <div className='w-screen h-screen bg-gray-900'>
      <NavBar searchPlaceHolder={'Search'} />
      <div className='h-screen overflow-x-hidden'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
