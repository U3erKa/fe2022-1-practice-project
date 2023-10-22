import { useSelector } from 'hooks';
import { Header } from 'components/general';
import { CreatorDashboard, CustomerDashboard, ModeratorDashboard } from '.';
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
