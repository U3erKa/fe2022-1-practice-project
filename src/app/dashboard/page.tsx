'use client';

import { useSelector } from 'store';
import {
  CreatorDashboard,
  CustomerDashboard,
  ModeratorDashboard,
} from 'components/dashboard';
import { Header } from 'components/general';
import { CREATOR, CUSTOMER, MODERATOR } from 'constants/general';

const Dashboard = () => {
  // @ts-expect-error
  const { role } = useSelector((state) => state.userStore?.data || {});

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
