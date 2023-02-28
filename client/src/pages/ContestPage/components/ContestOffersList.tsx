import { useDispatch, useSelector } from 'hooks';
import {
  setOfferStatus,
  clearSetOfferStatusError,
} from 'store/slices/contestByIdSlice';

import { Error } from 'components/general';
import { OfferBox } from '..';

import styles from '../styles/ContestOfferList.module.sass';

const ContestOffersList = ({ offers, contestData, userId }) => {
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
