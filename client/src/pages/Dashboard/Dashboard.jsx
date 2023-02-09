import { useSelector } from 'react-redux';

import { CustomerDashboard, CreatorDashboard, Header } from 'components';
import { CUSTOMER } from 'constants/general';

const Dashboard = ({ history, match }) => {
  const { role } = useSelector((state) => state.userStore?.data || {});

  return (
    <div>
      <Header />
      {role === CUSTOMER ? (
        <CustomerDashboard history={history} match={match} />
      ) : (
        <CreatorDashboard history={history} match={match} />
      )}
    </div>
  );
};

export default Dashboard;
