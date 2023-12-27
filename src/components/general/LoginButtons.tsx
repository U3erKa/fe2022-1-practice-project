import Image from 'next/image';
import { useSelector } from 'hooks';
import { ProfileNavBar, UserImage } from 'components/general';
import { PUBLIC_URL } from 'constants/general';
import { PROFILE_NAVBAR } from 'constants/header';
import { getDays, getHours, getRemainingTime } from 'utils/functions';
import EmailIcon from 'assets/icons/email.png';
import MenuIcon from 'assets/icons/menu-down.png';
import type { User } from 'types/models';
import styles from './styles/LoginButtons.module.scss';

type Props = {
  readonly data: Pick<User, 'avatar' | 'displayName'>;
};

export default function LoginButtons({ data }: Props) {
  const { avatar, displayName } = data;
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
        <UserImage src={`${PUBLIC_URL}${avatar}`} />
        {activeEvents > 0 && <div className={styles.badge} />}
        <span>{`Hi, ${displayName}`}</span>
        <Image src={MenuIcon} alt="menu" />
        <ProfileNavBar list={PROFILE_NAVBAR} activeEvents={activeEvents} />
      </div>
      <Image className={styles.emailIcon} src={EmailIcon} alt="email" />
    </>
  );
}
