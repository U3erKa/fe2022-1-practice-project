import clsx from 'clsx/lite';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { OfferForm } from 'components/form';
import { Spinner, TryAgain } from 'components/general';
import { CONTEST_STATUS_ACTIVE, CREATOR } from 'constants/general';
import {
  changeContestViewMode,
  getContestById,
} from 'store/slices/contestByIdSlice';
import { Brief, ContestOffersList, ContestSideBar } from '.';
import type { WithId } from 'types/_common';
import styles from './styles/ContestPage.module.scss';

function ContestPageContents({ contestId }: WithId<'contestId'>) {
  const { contestData, error, isBrief, isFetching, offers, role, userId } =
    useSelector(({ contestByIdStore, userStore }) => {
      const { error, isFetching, isBrief, contestData, offers } =
        contestByIdStore;
      const { data: user } = userStore;
      const { id: userId, role } = user ?? {};
      return { contestData, error, isBrief, isFetching, offers, role, userId };
    });
  const dispatch = useDispatch();

  const getData = useCallback(
    () => void dispatch(getContestById({ contestId })),
    [contestId, dispatch],
  );

  if (error) {
    return (
      <div className={styles.tryContainer}>
        <TryAgain getData={getData} />
      </div>
    );
  }
  if (isFetching) {
    <div className={styles.containerSpinner}>
      <Spinner />
    </div>;
  }

  return (
    <div className={styles.mainInfoContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.buttonsContainer}>
          <span
            className={clsx(styles.btn, isBrief && styles.activeBtn)}
            onClick={() => dispatch(changeContestViewMode(true))}
          >
            Brief
          </span>
          <span
            className={clsx(styles.btn, !isBrief && styles.activeBtn)}
            onClick={() => dispatch(changeContestViewMode(false))}
          >
            Offer
          </span>
        </div>
        {isBrief ? (
          <Brief />
        ) : (
          <div className={styles.offersContainer}>
            {role === CREATOR &&
              contestData?.status === CONTEST_STATUS_ACTIVE && (
                <OfferForm
                  contestId={contestData.id}
                  contestType={contestData.contestType}
                  customerId={contestData.User.id}
                />
              )}
            <ContestOffersList
              contestData={contestData}
              offers={offers}
              userId={userId}
            />
          </div>
        )}
      </div>
      <ContestSideBar contestData={contestData} totalEntries={offers.length} />
    </div>
  );
}

export default ContestPageContents;
