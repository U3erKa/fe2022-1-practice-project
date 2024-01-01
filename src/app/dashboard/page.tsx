'use client';

import { useRouter } from 'next/navigation';
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

  if (!user) {
    router.replace(PAGE.HOME);
    return null;
  }
  const { role } = user;

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
