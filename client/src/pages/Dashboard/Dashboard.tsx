import { useSelector } from 'hooks';
import { Header } from 'components/general';
import { CustomerDashboard, CreatorDashboard } from '.';
import { CREATOR, CUSTOMER } from 'constants/general';

const Dashboard = () => {
  // @ts-expect-error
  const { role } = useSelector((state) => state.userStore?.data || {});

  return (
    <div>
      <Header />
      {role === CUSTOMER && <CustomerDashboard />}
      {role === CREATOR && <CreatorDashboard />}
    </div>
  );
};

export default Dashboard;
