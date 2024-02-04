import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { OfferBox } from 'components/contestById';
import { ItemsContainer, TryAgain } from 'components/general';
import {
  clearSetOfferStatusError,
  getOffers,
  setIsReviewed,
  setOfferStatus,
} from 'store/slices/contestByIdSlice';
import type { OfferId, UserId } from 'types/_common';
import type { ModeratorCommand } from 'types/offer';
import { CustomFilter } from './CustomFilter';
import styles from './styles/CustomerDashboard.module.scss';

const buttons = [
  { filter: false, name: 'Offers to review' },
  { filter: true, name: 'Reviewed offers' },
];

const ModeratorDashboard = () => {
  const { contestData, error, haveMore, isFetching, isReviewed, offers } =
    useSelector(({ contestByIdStore }) => {
      const { contestData, error, haveMore, isFetching, isReviewed, offers } =
        contestByIdStore;
      return { contestData, error, haveMore, isFetching, isReviewed, offers };
    });
  const dispatch = useDispatch();

  useEffect(() => {
    getOffersMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewed]);

  const getOffersMethod = useCallback(
    (offset = 0) => {
      dispatch(getOffers({ isReviewed, limit: 8, offset }));
    },
    [isReviewed, dispatch],
  );

  const setOfferStatusMethod = useCallback(
    (_creatorId: UserId, offerId: OfferId, command: ModeratorCommand) => {
      dispatch(clearSetOfferStatusError());
      dispatch(setOfferStatus({ command, offerId }));
    },
    [dispatch],
  );

  const items = offers.map((offer) => (
    <OfferBox
      contestData={contestData as any}
      data={offer as any}
      key={offer.id}
      setOfferStatus={setOfferStatusMethod}
    />
  ));

  return (
    <main className={styles.mainContainer}>
      <CustomFilter
        buttons={buttons}
        filterAction={setIsReviewed}
        predicate={isReviewed}
      />
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={getOffersMethod} />
        ) : (
          <ItemsContainer
            haveMore={haveMore}
            isFetching={isFetching}
            items={items}
            loadMore={getOffersMethod}
          />
        )}
      </div>
    </main>
  );
};

export default ModeratorDashboard;
