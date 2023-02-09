import { useDispatch, useSelector } from 'react-redux';

import {
  setOfferStatus,
  clearSetOfferStatusError,
} from 'store/slices/contestByIdSlice';
import { OfferBox, Error } from 'components';

import styles from './ContestPage.module.sass';

export const ContestOffersList = ({ offers, contestData, userId }) => {
  const { setOfferStatusError } = useSelector(
    (state) => state.contestByIdStore,
  );
  const dispatch = useDispatch();

  const setOfferStatusMethod = (creatorId, offerId, command) => {
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
              userId={userId}
              setOfferStatus={setOfferStatusMethod}
              contestData={contestData}
              date={new Date()}
            />
          ))
        )}
      </div>
    </>
  );
};
