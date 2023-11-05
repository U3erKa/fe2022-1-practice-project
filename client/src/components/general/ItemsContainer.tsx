import { Spinner } from 'components/general';
import type { FC, ReactNode } from 'react';
import styles from './styles/ContestContainer.module.scss';

export type Props = {
  isFetching?: boolean;
  haveMore: boolean;
  items: ReactNode[];
  loadMore: (offset: number) => void;
};

const ItemsContainer: FC<Props> = ({
  isFetching,
  haveMore,
  items,
  loadMore,
}) => {
  const onClick = () => {
    const isScrolledToBottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;

    if (!items.length) {
      return;
    }
    if (isScrolledToBottom && haveMore) {
      loadMore(items.length);
    }
  };

  return (
    <div className={styles.container}>
      {items}
      {isFetching ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : items.length ? (
        <button
          className={styles.loadMoreBtn}
          onClick={onClick}
          disabled={!items.length || !haveMore}
        >
          Load more
        </button>
      ) : (
        <div className={styles.notFound}>Nothing was found</div>
      )}
    </div>
  );
};

export default ItemsContainer;
