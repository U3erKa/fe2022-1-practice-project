import { useSelector } from 'react-redux';

import { Spinner } from 'components';

const PrivateHoc = (Component, props) => {
  const Hoc = ({ isFetching, history, match }) => {
    const user = useSelector((state) => state.userStore.data);

    return (
      <>
        {isFetching ? (
          <Spinner />
        ) : user ? (
          <Component history={history} match={match} {...props} />
        ) : (
          history.replace('/login')
        )}
      </>
    );
  };

  return Hoc;
};

export default PrivateHoc;
