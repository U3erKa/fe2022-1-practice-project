'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'hooks';
import { ProfileNavBar, UserImage } from 'components/general';
import { PAGE, PUBLIC_URL } from 'constants/general';
import { PROFILE_NAVBAR } from 'constants/header';
import { getDays, getHours, getRemainingTime } from 'utils/functions';
import EmailIcon from 'assets/icons/email.png';
import MenuIcon from 'assets/icons/menu-down.png';
import SpinnerLoader from './Spinner';
import styles from './styles/LoginButtons.module.scss';

const LoginButtons = () => {
  const { user, events, isFetching } = useSelector(({ userStore, events }) => {
    const { isFetching, data: user } = userStore;
    const { events: _events } = events;
    return { user, isFetching, events: _events };
  });

  if (isFetching) return <SpinnerLoader />;
  if (!user) {
    return (
      <>
        <Link href={PAGE.LOGIN} style={{ textDecoration: 'none' }}>
          <span>LOGIN</span>
        </Link>
        <Link href={PAGE.REGISTER} style={{ textDecoration: 'none' }}>
          <span>SIGN UP</span>
        </Link>
      </>
    );
  }

  const { avatar, displayName } = user;
  const currentDate = Date.now();
  let activeEvents = 0;

  for (const { date, notify } of events) {
    if (notify === 'never') continue;
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
        <Image alt="menu" src={MenuIcon} />
        <ProfileNavBar activeEvents={activeEvents} list={PROFILE_NAVBAR} />
      </div>
      <Image alt="email" className={styles.emailIcon} src={EmailIcon} />
    </>
  );
};

export default LoginButtons;
