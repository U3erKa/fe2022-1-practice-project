import { ProfileNavBar } from '.';
import { useSelector } from 'hooks';
import { getDays, getHours, getRemainingTime } from 'utils/functions';
import {
  ANONYM_IMAGE_PATH,
  PUBLIC_URL,
  STATIC_IMAGES_PATH,
} from 'constants/general';
import { PROFILE_NAVBAR } from 'constants/header';
import styles from './styles/LoginButtons.module.sass';

export default function LoginButtons({ data }) {
  const { events } = useSelector(({ events }) => events);
  const currentDate = Date.now();
  let activeEvents = 0;
  let shouldNotifyAboutEvents = false;

  events.forEach(({ date, notify }) => {
    if (notify === 'never') return;
    const plannedDate = Date.parse(date);
    const timeframe = plannedDate - currentDate;

    let shouldNotify = false;
    switch (notify) {
      case 'when event starts':
        shouldNotify = getRemainingTime(timeframe) === '0s';
        break;
      case '1 hour before':
        shouldNotify = getDays(timeframe) === 0 && getHours(timeframe) < 1;
        break;
      case '1 day before':
        shouldNotify = getDays(timeframe) < 1;
        break;
      case '1 week before':
        shouldNotify = getDays(timeframe) < 7;
        break;
      default:
        shouldNotify = false;
    }

    if (shouldNotify) {
      activeEvents++;
      shouldNotifyAboutEvents = true;
    }
  });

  return (
    <>
      <div className={styles.userInfo}>
        <img
          src={
            data.avatar === 'anon.png'
              ? ANONYM_IMAGE_PATH
              : `${PUBLIC_URL}${data.avatar}`
          }
          alt="user"
        />
        {shouldNotifyAboutEvents && (
          <div className={styles.badge}>{activeEvents}</div>
        )}
        <span>{`Hi, ${data.displayName}`}</span>
        <img src={`${STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
        <ProfileNavBar list={PROFILE_NAVBAR} />
      </div>
      <img
        src={`${STATIC_IMAGES_PATH}email.png`}
        className={styles.emailIcon}
        alt="email"
      />
    </>
  );
}
