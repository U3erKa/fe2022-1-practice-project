'use client';

import { useSelector } from 'hooks';
import {
  CreatorDashboard,
  CustomerDashboard,
  ModeratorDashboard,
} from 'components/dashboard';
import { Header } from 'components/general';
import { CREATOR, CUSTOMER, MODERATOR } from 'constants/general';

const Dashboard = () => {
  const role = useSelector((state) => state.userStore.data?.role);

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
