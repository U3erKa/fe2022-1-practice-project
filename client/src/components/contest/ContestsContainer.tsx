import { useSelector } from 'hooks';
import { Spinner } from 'components/general';
import ContestBox from './ContestBox';

import styles from './styles/ContestContainer.module.sass';

const ContestsContainer = ({ loadMore }) => {
  const { isFetching, haveMore, contests } = useSelector(
    (state) => state.contestsList,
  );

  const contestsList = contests.map((contest) => (
    <ContestBox data={contest} key={contest.id} />
  ));

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

  return (
    <div>
      {contestsList}
      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
      {contests.length ? (
        <button
          className={styles.loadMoreBtn}
          onClick={onClick}
          disabled={!contests.length || !haveMore}
        >
          Load more
        </button>
      ) : (
        <div className={styles.notFound}>Nothing was found</div>
      )}
    </div>
  );
};

export default ContestsContainer;
