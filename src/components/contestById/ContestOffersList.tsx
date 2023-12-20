import type { FC } from 'react';
import { useDispatch, useSelector } from 'store';
import { Error } from 'components/general';
import {
  clearSetOfferStatusError,
  setOfferStatus,
} from 'store/slices/contestByIdSlice';
import type { OfferId, UserId } from 'types/api/_common';
import type { Offer } from 'types/api/contest';
import type { CustomerCommand } from 'types/api/offer';
import type { ContestData } from 'types/slices';
import { OfferBox } from '.';
import styles from './styles/ContestOfferList.module.scss';

export type Props = {
  offers: Offer[];
  contestData: ContestData;
  userId?: UserId;
};

const ContestOffersList: FC<Props> = ({ offers, contestData }) => {
  const { setOfferStatusError } = useSelector(
    (state) => state.contestByIdStore,
  );
  const dispatch = useDispatch();

  const setOfferStatusMethod = (
    creatorId: UserId,
    offerId: OfferId,
    command: CustomerCommand,
  ) => {
    dispatch(clearSetOfferStatusError());
    const { id, orderId, priority } = contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    dispatch(setOfferStatus(obj));
  };

  return (
    <>
      {setOfferStatusError && (
        <Error
          data={setOfferStatusError.data}
          status={setOfferStatusError.status}
          clearError={() => dispatch(clearSetOfferStatusError())}
        />
      )}

      <div className={styles.offers}>
        {offers.length === 0 ? (
          <div className={styles.notFound}>
            There is no suggestion at this moment
          </div>
        ) : (
          offers.map((offer) => (
            <OfferBox
              data={offer}
              key={offer.id}
              setOfferStatus={setOfferStatusMethod}
              contestData={contestData}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ContestOffersList;
