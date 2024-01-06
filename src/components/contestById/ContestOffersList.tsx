import { type FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { Error } from 'components/general';
import {
  clearSetOfferStatusError,
  setOfferStatus,
} from 'store/slices/contestByIdSlice';
import { OfferBox } from '.';
import type { OfferId, UserId } from 'types/_common';
import type { Offer } from 'types/contest';
import type { CustomerCommand } from 'types/offer';
import type { ContestData } from 'types/slices';
import styles from './styles/ContestOfferList.module.scss';

export type Props = {
  readonly contestData: ContestData;
  readonly offers: Offer[];
  readonly userId?: UserId;
};

const ContestOffersList: FC<Props> = ({ offers, contestData }) => {
  const setOfferStatusError = useSelector(
    ({ contestByIdStore }) => contestByIdStore.setOfferStatusError,
  );
  const dispatch = useDispatch();

  const handleSetOfferStatus = useCallback(
    (creatorId: UserId, offerId: OfferId, command: CustomerCommand) => {
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
    },
    [contestData, dispatch],
  );

  const handleClearError = useCallback(
    () => dispatch(clearSetOfferStatusError()),
    [dispatch],
  );

  return (
    <>
      {setOfferStatusError ? (
        <Error
          clearError={handleClearError}
          data={setOfferStatusError.data}
          status={setOfferStatusError.status}
        />
      ) : null}

      <div className={styles.offers}>
        {offers.length === 0 ? (
          <div className={styles.notFound}>
            There is no suggestion at this moment
          </div>
        ) : (
          offers.map((offer) => (
            <OfferBox
              contestData={contestData}
              data={offer}
              key={offer.id}
              setOfferStatus={handleSetOfferStatus}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ContestOffersList;
