import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'store';
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
  const { isFetching, haveMore, error, offers, isReviewed, contestData } =
    useSelector(({ contestByIdStore }) => contestByIdStore);
  const dispatch = useDispatch();

  useEffect(() => {
    getOffersMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewed]);

  const getOffersMethod = (offset = 0) => {
    dispatch(getOffers({ isReviewed, limit: 8, offset }));
  };

  const setOfferStatusMethod = (
    _creatorId: UserId,
    offerId: OfferId,
    command: ModeratorCommand,
  ) => {
    dispatch(clearSetOfferStatusError());
    const obj = { command, offerId };
    dispatch(setOfferStatus(obj));
  };

  const items = offers.map((offer) => (
    <OfferBox
      data={offer}
      key={offer.id}
      setOfferStatus={setOfferStatusMethod}
      contestData={contestData}
    />
  ));

  const setOfferReviewStatus = (status: boolean) => {
    return setIsReviewed(status);
  };

  return (
    <div className={styles.mainContainer}>
      <CustomFilter
        buttons={buttons}
        predicate={isReviewed}
        filterAction={
          setOfferReviewStatus as ActionCreatorWithPayload<any, string>
        }
      />
      <div className={styles.contestsContainer}>
        {error ? (
          <TryAgain getData={getOffersMethod} />
        ) : (
          <ItemsContainer
            isFetching={isFetching}
            haveMore={haveMore}
            items={items}
            loadMore={getOffersMethod}
          />
        )}
      </div>
    </div>
  );
}
