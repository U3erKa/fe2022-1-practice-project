import clsx from 'clsx';
import { useDispatch, useSelector } from 'store';
import {
  changeContestViewMode,
  getContestById,
} from 'store/slices/contestByIdSlice';
import { Spinner, TryAgain } from 'components/general';
import { OfferForm } from 'components/form';
import { Brief, ContestOffersList, ContestSideBar } from '.';
import { CONTEST_STATUS_ACTIVE, CREATOR } from 'constants/general';
import styles from './styles/ContestPage.module.scss';

function ContestPageContents({ contestId }: { contestId: number }) {
  const {
    contestByIdStore: { error, isFetching, isBrief, contestData, offers },
    userStore: { data: user },
  } = useSelector(({ contestByIdStore, userStore }) => ({
    contestByIdStore,
    userStore,
  }));
  const dispatch = useDispatch();
  const { id: userId, role } = user ?? {};

  if (error) {
    return (
      <div className={styles.tryContainer}>
        <TryAgain getData={() => dispatch(getContestById({ contestId }))} />
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
            onClick={() => dispatch(changeContestViewMode(true))}
            className={clsx(styles.btn, { [styles.activeBtn]: isBrief })}
          >
            Brief
          </span>
          <span
            onClick={() => dispatch(changeContestViewMode(false))}
            className={clsx(styles.btn, { [styles.activeBtn]: !isBrief })}
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
                  contestType={contestData.contestType}
                  contestId={contestData.id}
                  customerId={contestData.User.id}
                />
              )}
            <ContestOffersList
              userId={userId}
              offers={offers}
              contestData={contestData}
            />
          </div>
        )}
      </div>
      <ContestSideBar contestData={contestData} totalEntries={offers.length} />
    </div>
  );
}

export default ContestPageContents;
