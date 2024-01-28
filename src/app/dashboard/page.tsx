'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'hooks';
import {
  CreatorDashboard,
  CustomerDashboard,
  ModeratorDashboard,
} from 'components/dashboard';
import { Header } from 'components/general';
import { CREATOR, CUSTOMER, MODERATOR, PAGE } from 'constants/general';

const Dashboard = () => {
  const user = useSelector((state) => state.userStore.data);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace(PAGE.HOME);
  }, [router, user]);
  const { role } = user ?? {};

  return (
    <div>
      <Header />
      {role === CUSTOMER && <CustomerDashboard />}
      {role === CREATOR && <CreatorDashboard />}
      {role === MODERATOR && <ModeratorDashboard />}
    </div>
  );
};

export default Dashboard;
