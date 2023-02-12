import { useEffect } from 'react';

import { Spinner } from 'components';
import styles from './ContestContainer.module.sass';

const ContestsContainer = ({ haveMore, isFetching, loadMore, children }) => {
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollHandler = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (haveMore) {
        loadMore(children.length);
      }
    }
  };

  if (isFetching) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  if (!isFetching && children.length === 0) {
    return <div className={styles.notFound}>Nothing was found</div>;
  }

  return <div>{children}</div>;
};

export default ContestsContainer;
