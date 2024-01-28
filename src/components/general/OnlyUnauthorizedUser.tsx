'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { PAGE } from 'constants/general';
import { clearAuthError } from 'store/slices/authSlice';

export default function OnlyUnauthorizedUser({ children }: PropsWithChildren) {
  const user = useSelector(({ userStore }) => userStore.data);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user) {
    router.replace(PAGE.HOME);
    return null;
  }

  return children;
}
