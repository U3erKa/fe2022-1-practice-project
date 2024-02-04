'use client';

import { useSelector } from 'hooks';
import {
  CreatorDashboard,
  CustomerDashboard,
  ModeratorDashboard,
} from 'components/dashboard';
import { Header, OnlyAuthorizedUser } from 'components/general';
import { CREATOR, CUSTOMER, MODERATOR } from 'constants/general';

const Dashboard = () => {
  const role = useSelector((state) => state.userStore.data?.role);

  return (
    <OnlyAuthorizedUser>
      <Header />
      {role === CUSTOMER && <CustomerDashboard />}
      {role === CREATOR && <CreatorDashboard />}
      {role === MODERATOR && <ModeratorDashboard />}
    </OnlyAuthorizedUser>
  );
};

export default Dashboard;
