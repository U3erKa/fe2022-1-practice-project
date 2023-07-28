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

  const shouldNotifyAboutEvents = events.some(({ date, notify }) => {
    const plannedDate = Date.parse(date);
    const timeframe = plannedDate - currentDate;

    switch (notify) {
      case 'when event starts':
        return getRemainingTime(timeframe) === '0s';
      case '1 hour before':
        return getDays(timeframe) === 0 && getHours(timeframe) < 1;
      case '1 day before':
        return getDays(timeframe) < 1;
      case '1 week before':
        return getDays(timeframe) < 7;
      case 'never':
      default:
        return false;
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
        {shouldNotifyAboutEvents && <div className={styles.badge}></div>}
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
