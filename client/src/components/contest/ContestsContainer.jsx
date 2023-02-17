import { useSelector } from 'react-redux';

import { Spinner } from 'components/general';
import styles from './styles/ContestContainer.module.sass';
import { useNavigate } from 'react-router-dom';
import ContestBox from './ContestBox';

const ContestsContainer = ({ loadMore }) => {
  const { isFetching, haveMore, contests } = useSelector(
    (state) => state.contestsList,
  );
  const navigate = useNavigate();

  const goToExtended = (contest_id) => {
    navigate(`/contest/${contest_id}`);
  };

  const onClick = () => {
    const isScrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;

    if (!contests.length) {
      return;
    }
    if (isScrolledToBottom && haveMore) {
      loadMore(contests.length);
    }
  };

  if (isFetching) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  if (contests.length === 0) {
    return <div className={styles.notFound}>Nothing was found</div>;
  }

  return (
    <div>
      {contests.map((contest) => (
        <ContestBox
          data={contest}
          key={contest.id}
          goToExtended={goToExtended}
        />
      ))}
      <button onClick={onClick} disabled={!haveMore}>
        Load more
      </button>
    </div>
  );
};

export default ContestsContainer;
