'use client';

import { useRouter } from 'next/navigation';
import { type PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { PAGE } from 'constants/general';
import { clearAuthError } from 'store/slices/authSlice';

export default function OnlyAuthorizedUser({ children }: PropsWithChildren) {
  const user = useSelector(({ userStore }) => userStore.data);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(clearAuthError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) router.replace(PAGE.HOME);
  }, [router, user]);

  if (!user) return null;
  return children;
}
