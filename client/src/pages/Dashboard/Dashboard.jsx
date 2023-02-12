import { useSelector } from 'react-redux';

import { CustomerDashboard, CreatorDashboard, Header } from 'components';
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
