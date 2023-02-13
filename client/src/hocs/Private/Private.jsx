import { Spinner } from 'components/general';

const PrivateHoc = (Component, props) => {
  const Hoc = ({ isFetching, history, match }) => {
    return (
      <>
        {isFetching ? (
          <Spinner />
        ) : (
          <Component history={history} match={match} {...props} />
        )}
      </>
    );
  };

  return Hoc;
};

export default PrivateHoc;
