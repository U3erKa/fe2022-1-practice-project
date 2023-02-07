import { connect } from 'react-redux';

import { CustomerDashboard, CreatorDashboard, Header } from 'components';
import { CUSTOMER } from 'constants/general';

const Dashboard = (props) => {
  const { role, history } = props;
  return (
    <div>
      <Header />
      {role === CUSTOMER ? (
        <CustomerDashboard history={history} match={props.match} />
      ) : (
        <CreatorDashboard history={history} match={props.match} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => state.userStore.data;

export default connect(mapStateToProps)(Dashboard);
