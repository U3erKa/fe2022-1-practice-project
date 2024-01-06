import {
  faCircleCheck,
  faCircleXmark,
  faClock,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEqual from 'fast-deep-equal/es6/react';
import Image from 'next/image';
import { type FC, useCallback } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'hooks';
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
import type { OfferId, UserId } from 'types/_common';
import type { Offer } from 'types/contest';
import type {
  OfferStatus,
  OfferStatus as OfferStatusIcon,
  Rating as _Rating,
} from 'types/offer';
import type { ContestData, UserState } from 'types/slices';
import styles from './styles/OfferBox.module.scss';
import './styles/confirmStyle.css';

export type Props = {
  readonly contestData: ContestData;
  readonly data: Offer;
  readonly setOfferStatus: (
    creatorId: UserId,
    offerId: OfferId,
    command: any,
  ) => void;
};

export type Props2 = {
  readonly role: NonNullable<UserState['data']>['role'];
  readonly status: OfferStatus;
};

const fullSymbol = <Image alt="star" src={StarIcon} />;
const emptySymbol = <Image alt="star-outline" src={StarOutlineIcon} />;

const OfferStatusIcon = ({ status, role }: Props2) => {
  switch (status) {
    case OFFER_STATUS_REJECTED:
    case OFFER_STATUS_DISCARDED:
      return <FontAwesomeIcon className={styles.reject} icon={faCircleXmark} />;
    case OFFER_STATUS_WON:
    case role === MODERATOR && OFFER_STATUS_APPROVED:
      return (
        <FontAwesomeIcon className={styles.resolve} icon={faCircleCheck} />
      );
    case role === CREATOR && (OFFER_STATUS_PENDING as any):
      return <FontAwesomeIcon className={styles.pending} icon={faClock} />;
    default:
      return null;
  }
};

const OfferBox: FC<Props> = ({ data, contestData, setOfferStatus }) => {
  const selector = useSelector(({ userStore, chatStore }) => {
    const { id, role } =
      userStore.data ?? ({} as NonNullable<UserState['data']>);
    const { messagesPreview } = chatStore;

    return { id, messagesPreview, role };
  });
  const dispatch = useDispatch();

  const { id: userId, role, messagesPreview } = selector;
  const { id, avatar, firstName, lastName, email, rating } = data.User;

  const findConversationInfo = useCallback(() => {
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
  }, [id, messagesPreview, userId]);

  const resolveOffer = useCallback(() => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setOfferStatus(
              id,
              data.id,
              role === MODERATOR
                ? OFFER_COMMAND_APPROVE
                : OFFER_COMMAND_RESOLVE,
            );
          },
        },
        {
          label: 'No',
        },
      ],
    });
  }, [data.id, id, role, setOfferStatus]);

  const rejectOffer = useCallback(() => {
    confirmAlert({
      title: 'confirm',
      message: 'Are u sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setOfferStatus(
              id,
              data.id,
              role === MODERATOR ? OFFER_COMMAND_DISCARD : OFFER_COMMAND_REJECT,
            );
          },
        },
        {
          label: 'No',
        },
      ],
    });
  }, [data.id, id, role, setOfferStatus]);

  const changeMarkMethod = useCallback(
    (value: number) => {
      dispatch(clearChangeMarkError());
      dispatch(
        changeMark({
          creatorId: id,
          isFirst: !data.mark,
          mark: value as _Rating,
          offerId: data.id,
        }),
      );
    },
    [data.id, data.mark, dispatch, id],
  );

  const goChat = useCallback(() => {
    dispatch(
      goToExpandedDialog({
        conversationData: findConversationInfo(),
        interlocutor: data.User,
      }),
    );
  }, [data.User, findConversationInfo, dispatch]);

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

  const handleLogoClick = useCallback(
    () =>
      dispatch(
        changeShowImage({
          imagePath: data.fileName,
          isShowOnFull: true,
        }),
      ),
    [data.fileName, dispatch],
  );

  return (
    <div className={styles.offerContainer}>
      <OfferStatusIcon role={role} status={data.status} />
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
              readonly
              emptySymbol={emptySymbol}
              fractions={2}
              fullSymbol={fullSymbol}
              initialRating={rating}
              placeholderSymbol={fullSymbol}
            />
          </div>
        </div>
        <div className={styles.responseConainer}>
          {(contestData.contestType ?? data.contestType) === LOGO_CONTEST ? (
            <Image
              alt="logo"
              className={styles.responseLogo}
              height={100}
              src={`${PUBLIC_URL}${data.fileName}`}
              width={150}
              onClick={handleLogoClick}
            />
          ) : (
            <span className={styles.response}>{data.text}</span>
          )}
          {id !== userId && role === CUSTOMER && (
            // @ts-expect-error
            <Rating
              emptySymbol={emptySymbol}
              fractions={2}
              fullSymbol={fullSymbol}
              placeholderRating={data.mark}
              placeholderSymbol={fullSymbol}
              onClick={changeMarkMethod}
            />
          )}
        </div>

        {role !== CREATOR && (
          <FontAwesomeIcon icon={faComments} onClick={goChat} />
        )}
      </div>
      {needButtons(data.status) && (
        <div className={styles.btnsContainer}>
          <div className={styles.resolveBtn} onClick={resolveOffer}>
            Resolve
          </div>
          <div className={styles.rejectBtn} onClick={rejectOffer}>
            Reject
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferBox;
