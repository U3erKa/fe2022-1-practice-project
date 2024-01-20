'use client';

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'hooks';
import { ChatContainer } from 'components/chat';
import { REFRESH_TOKEN } from 'constants/general';
import { getEvents } from 'store/slices/eventSlice';
import { refresh } from 'store/slices/userSlice';
import { Spinner } from '.';

function Toast({ children }: React.PropsWithChildren) {
  const { isFetching, user } = useSelector(({ userStore, events }) => {
    const { data: user, isFetching: isFetchingUsers } = userStore;
    const { isFetching: isFetchingEvents } = events;
    return { isFetching: isFetchingUsers || isFetchingEvents, user };
  });
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

  if (isFetching) return <Spinner />;
  return (
    <>
      <ToastContainer
        closeOnClick
        draggable
        hideProgressBar
        pauseOnHover
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
