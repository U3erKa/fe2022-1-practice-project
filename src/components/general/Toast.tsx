'use client';

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'hooks';
import { ChatContainer } from 'components/chat';
import { REFRESH_TOKEN } from 'constants/general';
import { getEvents } from 'store/slices/eventSlice';
import { refresh } from 'store/slices/userSlice';

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
        closeOnClick
        draggable
        hideProgressBar
        pauseOnHover
        // @ts-expect-error
        pauseOnVisibilityChange
        autoClose={5000}
        newestOnTop={false}
        position="top-center"
        rtl={false}
      />
      {children}
      <ChatContainer />
    </>
  );
}

export default Toast;
