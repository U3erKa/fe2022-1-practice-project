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
import type { OfferId, UserId } from 'types/api/_common';
import type { ModeratorCommand } from 'types/api/offer';
import { CustomFilter } from './CustomFilter';
import styles from './styles/CustomerDashboard.module.scss';

const buttons = [
  { filter: false, name: 'Offers to review' },
  { filter: true, name: 'Reviewed offers' },
];

export default function ModeratorDashboard() {
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
      contestData={contestData}
      data={offer}
      key={offer.id}
      setOfferStatus={setOfferStatusMethod}
    />
  ));

  return (
    <div className={styles.mainContainer}>
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
    </div>
  );
}
