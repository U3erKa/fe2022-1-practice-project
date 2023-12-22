import {
  faCircleCheck,
  faCircleXmark,
  faClock,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { isEqual } from 'radash';
import type { FC } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'store';
import { UserImage } from 'components/general';
import {
  CONTEST_STATUS_ACTIVE,
  CREATOR,
  CUSTOMER,
  LOGO_CONTEST,
  MODERATOR,
  OFFER_COMMAND_APPROVE,
  OFFER_COMMAND_DISCARD,
  OFFER_COMMAND_REJECT,
  OFFER_COMMAND_RESOLVE,
  OFFER_STATUS_APPROVED,
  OFFER_STATUS_DISCARDED,
  OFFER_STATUS_PENDING,
  OFFER_STATUS_REJECTED,
  OFFER_STATUS_WON,
  PUBLIC_URL,
} from 'constants/general';
import { goToExpandedDialog } from 'store/slices/chatSlice';
import {
  changeMark,
  changeShowImage,
  clearChangeMarkError,
} from 'store/slices/contestByIdSlice';
import StarOutlineIcon from 'assets/icons/star-outline.png';
import StarIcon from 'assets/icons/star.png';
import type { OfferId, UserId } from 'types/api/_common';
import type { Offer } from 'types/api/contest';
import type {
  OfferStatus,
  OfferStatus as OfferStatusIcon,
  Rating as _Rating,
} from 'types/api/offer';
import type { User } from 'types/api/user';
import type { ContestData } from 'types/slices';
import styles from './styles/OfferBox.module.scss';
import './styles/confirmStyle.css';

export type Props = {
  contestData: ContestData;
  data: Offer;
  setOfferStatus: (creatorId: UserId, offerId: OfferId, command: any) => void;
};

export type Props2 = {
  role: User['role'];
  status: OfferStatus;
};

const fullSymbol = <Image src={StarIcon} alt="star" />;
const emptySymbol = <Image src={StarOutlineIcon} alt="star-outline" />;

const OfferStatusIcon = ({ status, role }: Props2) => {
  switch (status) {
    case OFFER_STATUS_REJECTED:
    case OFFER_STATUS_DISCARDED:
      return <FontAwesomeIcon icon={faCircleXmark} className={styles.reject} />;
    case OFFER_STATUS_WON:
    case role === MODERATOR && OFFER_STATUS_APPROVED:
      return (
        <FontAwesomeIcon icon={faCircleCheck} className={styles.resolve} />
      );
    case role === CREATOR && (OFFER_STATUS_PENDING as any):
      return <FontAwesomeIcon icon={faClock} className={styles.pending} />;
    default:
      return null;
  }
};

const OfferBox: FC<Props> = ({ data, contestData, setOfferStatus }) => {
  const selector = useSelector(({ userStore, chatStore }) => {
    const { id, role } = userStore.data ?? ({} as User);
    const { messagesPreview } = chatStore;

    return { id, messagesPreview, role };
  });
  const dispatch = useDispatch();

  const { id: userId, role, messagesPreview } = selector;
  const { id, avatar, firstName, lastName, email, rating } = data.User;

  const findConversationInfo = () => {
    const currentParticipants = [userId, id].sort(
      (participant1, participant2) => participant1 - participant2,
    );
    for (const preview of messagesPreview) {
      const { _id, blackList, favoriteList, participants } = preview;
      if (isEqual(currentParticipants, participants)) {
        return { _id, blackList, favoriteList, participants };
      }
    }
    throw new Error(`Conversation info not found: ${currentParticipants}`);
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
              role === MODERATOR
                ? OFFER_COMMAND_APPROVE
                : OFFER_COMMAND_RESOLVE,
            ),
        },
        {
          label: 'No',
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
              role === MODERATOR ? OFFER_COMMAND_DISCARD : OFFER_COMMAND_REJECT,
            ),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const changeMarkMethod = (value: number) => {
    dispatch(clearChangeMarkError());
    dispatch(
      changeMark({
        creatorId: id,
        isFirst: !data.mark,
        mark: value as _Rating,
        offerId: data.id,
      }),
    );
  };

  const goChat = () => {
    dispatch(
      goToExpandedDialog({
        conversationData: findConversationInfo(),
        interlocutor: data.User,
      }),
    );
  };

  const needButtons = (offerStatus: OfferStatusIcon) => {
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
      <OfferStatusIcon status={data.status} role={role} />
      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <UserImage src={`${PUBLIC_URL}${avatar}`} />
            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>Creative Rating </span>
            {/* @ts-expect-error */}
            <Rating
              fractions={2}
              fullSymbol={fullSymbol}
              placeholderSymbol={fullSymbol}
              emptySymbol={emptySymbol}
              initialRating={rating}
              readonly
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {(contestData?.contestType ?? data?.contestType) === LOGO_CONTEST ? (
            <Image
              onClick={() =>
                dispatch(
                  changeShowImage({
                    imagePath: data.fileName,
                    isShowOnFull: true,
                  }),
                )
              }
              className={styles.responseLogo}
              width={150}
              height={100}
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
              fullSymbol={fullSymbol}
              placeholderSymbol={fullSymbol}
              emptySymbol={emptySymbol}
              onClick={changeMarkMethod}
              placeholderRating={data.mark}
            />
          )}
        </div>

        {role !== CREATOR && (
          <FontAwesomeIcon icon={faComments} onClick={goChat} />
        )}
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
