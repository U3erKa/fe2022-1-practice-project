import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import classNames from 'classnames';
import LightBox from 'react-image-lightbox';

import {
  getContestById,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from 'store/slices/contestByIdSlice';

import { Header, Brief, Spinner, TryAgain } from 'components';
import { ContestSideBar, ContestOffersList } from 'components/Contest';
import { OfferForm } from 'components/FormComponents';

import { CONTEST_STATUS_ACTIVE, PUBLIC_URL, CREATOR } from 'constants/general';
import styles from './ContestPage.module.sass';
import 'react-image-lightbox/style.css';

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
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const match = useMatch('/contest/:id');

  const { role } = user || {};

  useEffect(() => {
    dispatch(getContestById({ contestId: match.params.id }));

    return () => {
      dispatch(changeEditContest(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* <Chat/> */}
      {isShowOnFull && (
        <LightBox
          mainSrc={`${PUBLIC_URL}${imagePath}`}
          onCloseRequest={() =>
            dispatch(changeShowImage({ isShowOnFull: false, imagePath: null }))
          }
        />
      )}
      <Header />
      {error ? (
        <div className={styles.tryContainer}>
          <TryAgain
            getData={() =>
              dispatch(getContestById({ contestId: match.params.id }))
            }
          />
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
                className={classNames(styles.btn, {
                  [styles.activeBtn]: isBrief,
                })}
              >
                Brief
              </span>
              <span
                onClick={() => dispatch(changeContestViewMode(false))}
                className={classNames(styles.btn, {
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
                  contestData.status === CONTEST_STATUS_ACTIVE && (
                    <OfferForm
                      contestType={contestData.contestType}
                      contestId={contestData.id}
                      customerId={contestData.User.id}
                    />
                  )}
                <ContestOffersList
                  userId={user.id}
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
