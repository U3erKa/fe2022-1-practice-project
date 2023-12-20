import { useSelector } from 'hooks';
import { ProfileNavBar, UserImage } from 'components/general';
import { PUBLIC_URL } from 'constants/general';
import { PROFILE_NAVBAR } from 'constants/header';
import { getDays, getHours, getRemainingTime } from 'utils/functions';
import type { User } from 'types/api/user';
import styles from './styles/LoginButtons.module.scss';

export default function LoginButtons({ data }: { data: User }) {
  const { events } = useSelector(({ events }) => events);
  const currentDate = Date.now();
  let activeEvents = 0;

  for (const { date, notify } of events) {
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
    }

    if (shouldNotify) {
      activeEvents++;
    }
  }

  return (
    <>
      <div className={styles.userInfo}>
        <UserImage
          avatar={data.avatar}
          src={`${PUBLIC_URL}${data.avatar}`}
        />
        {activeEvents > 0 && <div className={styles.badge}></div>}
        <span>{`Hi, ${data.displayName}`}</span>
        <Picture
          srcSet={[
            `${STATIC_IMAGES_PATH}menu-down.avif`,
            `${STATIC_IMAGES_PATH}menu-down.webp`,
          ]}
          src={`${STATIC_IMAGES_PATH}menu-down.png`}
          alt="menu"
        />
        <ProfileNavBar list={PROFILE_NAVBAR} activeEvents={activeEvents} />
      </div>
      <Picture
        srcSet={[
          `${STATIC_IMAGES_PATH}email.avif`,
          `${STATIC_IMAGES_PATH}email.webp`,
        ]}
        src={`${STATIC_IMAGES_PATH}email.png`}
        className={styles.emailIcon}
        alt="email"
      />
    </>
  );
}
