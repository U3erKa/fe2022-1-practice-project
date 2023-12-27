import type { FC } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { Error } from 'components/general';
import {
  clearSetOfferStatusError,
  setOfferStatus,
} from 'store/slices/contestByIdSlice';
import { OfferBox } from '.';
import type { OfferId, UserId } from 'types/api/_common';
import type { Offer } from 'types/api/contest';
import type { CustomerCommand } from 'types/api/offer';
import type { ContestData } from 'types/slices';
import styles from './styles/ContestOfferList.module.scss';

export type Props = {
  contestData: ContestData;
  offers: Offer[];
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
      contestId: id,
      creatorId,
      offerId,
      orderId,
      priority,
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
