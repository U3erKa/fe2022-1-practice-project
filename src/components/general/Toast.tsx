'use client';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'store';
import { getEvents } from 'store/slices/eventSlice';
import { refresh } from 'store/slices/userSlice';
import { ChatContainer } from 'components/chat';
import { REFRESH_TOKEN } from 'constants/general';

function Toast({ children }: React.PropsWithChildren) {
  const user = useSelector(({ userStore }) => userStore.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getEvents());
      return;
    }
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (refreshToken) {
      dispatch(refresh(refreshToken));
    }
  }, [dispatch, user]);

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
      {children}
      <ChatContainer />
    </>
  );
}

export default Toast;
