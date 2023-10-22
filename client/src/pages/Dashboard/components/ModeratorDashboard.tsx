import { useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import {
  clearSetOfferStatusError,
  getOffers,
  setIsReviewed,
  setOfferStatus,
} from 'store/slices/contestByIdSlice';
import { OfferBox } from 'pages/ContestPage';
import { ItemsContainer, TryAgain } from 'components/general';
import { CustomFilter } from './CustomFilter';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { ModeratorCommand } from 'types/api/offer';
import type { OfferId, UserId } from 'types/api/_common';
import styles from '../styles/CustomerDashboard.module.sass';

const buttons = [
  { name: 'Offers to review', filter: false },
  { name: 'Reviewed offers', filter: true },
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
    dispatch(getOffers({ limit: 8, offset, isReviewed }));
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
