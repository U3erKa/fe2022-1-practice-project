import { useSelector } from 'react-redux';

import { Header } from 'components';
import { CustomerDashboard, CreatorDashboard } from '.';
import { CUSTOMER } from 'constants/general';

const Dashboard = () => {
  const { role } = useSelector((state) => state.userStore?.data || {});

  return (
    <div>
      <Header />
      {role === CUSTOMER ? <CustomerDashboard /> : <CreatorDashboard />}
    </div>
  );
};

export default Dashboard;
