import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { refresh } from 'store/slices/userSlice';
import { ChatContainer } from 'components/chat';

import { REFRESH_TOKEN } from 'constants/general';
import { routes } from 'routes';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(routes);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (refreshToken) {
      dispatch(refresh(refreshToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
      <ChatContainer />
    </>
  );
};

export default App;
