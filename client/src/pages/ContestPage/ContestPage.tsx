import { useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import clsx from 'clsx';
import LightBox from 'yet-another-react-lightbox';
import { useDispatch, useSelector } from 'hooks';
import {
  getContestById,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from 'store/slices/contestByIdSlice';
import { Header, Spinner, TryAgain } from 'components/general';
import { OfferForm } from 'components/form';
import { Brief, ContestSideBar, ContestOffersList } from '.';
import { CONTEST_STATUS_ACTIVE, PUBLIC_URL, CREATOR } from 'constants/general';
import styles from './styles/ContestPage.module.sass';
import 'yet-another-react-lightbox/styles.css';

const ContestPage = () => {
  const {
    contestByIdStore: {
      isShowOnFull,
      imagePath,
      error,
      isFetching,
      isBrief,
      contestData,
      offers,
    },
    userStore: { data: user },
  } = useSelector(({ contestByIdStore, userStore }) => ({
    contestByIdStore,
    userStore,
  }));

  const dispatch = useDispatch();
  const match = useMatch('/contest/:id')!;
  const contestId = match.params.id as unknown as number;

  const { id: userId, role } = user || {};

  useEffect(() => {
    dispatch(getContestById({ contestId }));

    return () => {
      dispatch(changeEditContest(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isShowOnFull && (
        <LightBox
          open
          slides={[{ src: `${PUBLIC_URL}${imagePath}` }]}
          close={() =>
            dispatch(changeShowImage({ isShowOnFull: false, imagePath: null }))
          }
        />
      )}
      <Header />
      {error ? (
        <div className={styles.tryContainer}>
          <TryAgain getData={() => dispatch(getContestById({ contestId }))} />
        </div>
      ) : isFetching ? (
        <div className={styles.containerSpinner}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.mainInfoContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.buttonsContainer}>
              <span
                onClick={() => dispatch(changeContestViewMode(true))}
                className={clsx(styles.btn, {
                  [styles.activeBtn]: isBrief,
                })}
              >
                Brief
              </span>
              <span
                onClick={() => dispatch(changeContestViewMode(false))}
                className={clsx(styles.btn, {
                  [styles.activeBtn]: !isBrief,
                })}
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
          <ContestSideBar
            contestData={contestData}
            totalEntries={offers.length}
          />
        </div>
      )}
    </div>
  );
};

export default ContestPage;
