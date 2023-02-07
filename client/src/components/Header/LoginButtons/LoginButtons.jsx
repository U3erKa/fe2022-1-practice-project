import { ProfileNavBar } from 'components/Header';

import {
  ANONYM_IMAGE_PATH,
  PUBLIC_URL,
  STATIC_IMAGES_PATH,
} from '../../../constants';
import { PROFILE_NAVBAR } from 'headerConstants';

import styles from './LoginButtons.module.sass';

export default function LoginButtons({ data, logOut }) {
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
        <span>{`Hi, ${data.displayName}`}</span>
        <img src={`${STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
        <ProfileNavBar list={PROFILE_NAVBAR} logOut={logOut} />
      </div>
      <img
        src={`${STATIC_IMAGES_PATH}email.png`}
        className={styles.emailIcon}
        alt="email"
      />
    </>
  );
}
