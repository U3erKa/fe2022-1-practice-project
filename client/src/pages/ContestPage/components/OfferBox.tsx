import { confirmAlert } from 'react-confirm-alert';
import Rating from 'react-rating';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'hooks';
import { goToExpandedDialog } from 'store/slices/chatSlice';
import {
  changeMark,
  clearChangeMarkError,
  changeShowImage,
} from 'store/slices/contestByIdSlice';

import {
  OFFER_STATUS_REJECTED,
  OFFER_STATUS_WON,
  ANONYM_IMAGE_PATH,
  PUBLIC_URL,
  STATIC_IMAGES_PATH,
  LOGO_CONTEST,
  CREATOR,
  CUSTOMER,
  CONTEST_STATUS_ACTIVE,
  OFFER_STATUS_APPROVED,
  MODERATOR,
} from 'constants/general';

import 'react-confirm-alert/src/react-confirm-alert.css';
import '../styles/confirmStyle.css';
import styles from '../styles/OfferBox.module.sass';

const OfferBox = ({ data, contestData, setOfferStatus }) => {
  const selector = useSelector((state) => {
    const { id, role } = state.userStore.data!;
    const { messagesPreview } = state.chatStore;

    return { id, role, messagesPreview };
  });
  const dispatch = useDispatch();

  const { id: userId, role, messagesPreview } = selector;
  const { id, avatar, firstName, lastName, email, rating } = data.User;

  const findConversationInfo = () => {
    const participants = [userId, id];
    participants.sort(
      (participant1, participant2) => participant1 - participant2,
    );
    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }
    return null;
  };

  const resolveOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            setOfferStatus(
              id,
              data.id,
              role === MODERATOR ? 'approve' : 'resolve',
            ),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            setOfferStatus(
              id,
              data.id,
              role === MODERATOR ? 'discard' : 'reject',
            ),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const changeMarkMethod = (value) => {
    dispatch(clearChangeMarkError());
    dispatch(
      changeMark({
        mark: value,
        offerId: data.id,
        isFirst: !data.mark,
        creatorId: id,
      }),
    );
  };

  const offerStatus = () => {
    const { status } = data;
    if (status === OFFER_STATUS_REJECTED) {
      return (
        <i
          className={classNames('fas fa-times-circle reject', styles.reject)}
        />
      );
    }
    if (status === OFFER_STATUS_WON) {
      return (
        <i
          className={classNames('fas fa-check-circle resolve', styles.resolve)}
        />
      );
    }
    return null;
  };

  const goChat = () => {
    dispatch(
      goToExpandedDialog({
        interlocutor: data.User,
        // @ts-ignore
        conversationData: findConversationInfo(),
      }),
    );
  };

  const needButtons = (offerStatus) => {
    if (role === MODERATOR) return true;

    const contestCreatorId = contestData.User.id;
    const contestStatus = contestData.status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONTEST_STATUS_ACTIVE &&
      offerStatus === OFFER_STATUS_APPROVED
    );
  };

  return (
    <div className={styles.offerContainer}>
      {offerStatus()}
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={
                avatar === 'anon.png'
                  ? ANONYM_IMAGE_PATH
                  : `${PUBLIC_URL}${avatar}`
              }
              alt="user"
            />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            {/* @ts-expect-error */}
            <Rating
              initialRating={rating}
              fractions={2}
              fullSymbol={
                <img src={`${STATIC_IMAGES_PATH}star.png`} alt="star" />
              }
              placeholderSymbol={
                <img src={`${STATIC_IMAGES_PATH}star.png`} alt="star" />
              }
              emptySymbol={
                <img
                  src={`${STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline"
                />
              }
              readonly
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {contestData?.contestType === LOGO_CONTEST ? (
            <img
              onClick={() =>
                dispatch(
                  changeShowImage({
                    imagePath: data.fileName,
                    isShowOnFull: true,
                  }),
                )
              }
              className={styles.responseLogo}
              src={`${PUBLIC_URL}${data.fileName}`}
              alt="logo"
            />
          ) : (
            <span className={styles.response}>{data.text}</span>
          )}
          {id !== userId && role === CUSTOMER && (
            // @ts-expect-error
            <Rating
              fractions={2}
              fullSymbol={
                <img src={`${STATIC_IMAGES_PATH}star.png`} alt="star" />
              }
              placeholderSymbol={
                <img src={`${STATIC_IMAGES_PATH}star.png`} alt="star" />
              }
              emptySymbol={
                <img src={`${STATIC_IMAGES_PATH}star-outline.png`} alt="star" />
              }
              onClick={changeMarkMethod}
              placeholderRating={data.mark}
            />
          )}
        </div>
        {role !== CREATOR && <i onClick={goChat} className="fas fa-comments" />}
      </div>
      {needButtons(data.status) && (
        <div className={styles.btnsContainer}>
          <div onClick={resolveOffer} className={styles.resolveBtn}>
            Resolve
          </div>
          <div onClick={rejectOffer} className={styles.rejectBtn}>
            Reject
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferBox;
