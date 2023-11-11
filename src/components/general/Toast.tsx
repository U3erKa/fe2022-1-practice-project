'use client';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'store';
import { getEvents } from 'store/slices/eventSlice';
import { ChatContainer } from 'components/chat';

function Toast({ children }: React.PropsWithChildren) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
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
