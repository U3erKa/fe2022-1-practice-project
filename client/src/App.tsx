import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useDispatch } from 'hooks';
import { refresh } from 'store/slices/userSlice';
import { ChatContainer } from 'components/chat';

import { REFRESH_TOKEN } from 'constants/general';
import { routes } from 'routes';

import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'hooks';
import { Spinner } from 'components/general';

const router = createBrowserRouter(routes);

const App = () => {
  const { isFetching } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (refreshToken) {
      dispatch(refresh(refreshToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        // @ts-expect-error
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
