import { useSelector } from 'react-redux';

import { Spinner } from 'components/general';

const OnlyNotAuthorizedUserHoc = (Component, props) => {
  const HocForLoginSignup = ({ isFetching, history }) => {
    const user = useSelector((state) => state.userStore.data);

    return (
      <>
        {isFetching ? (
          <Spinner />
        ) : !user ? (
          <Component history={history} {...props} />
        ) : (
          history.replace('/')
        )}
      </>
    );
  };

  return HocForLoginSignup;
};

export default OnlyNotAuthorizedUserHoc;
