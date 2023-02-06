import React from 'react';
import {
  ANONYM_IMAGE_PATH,
  publicURL,
  STATIC_IMAGES_PATH,
} from '../../../constants';
import { PROFILE_NAVBAR } from 'headerConstants';
import ProfileNavBar from '../ProfileNavBar/ProfileNavBar';
import styles from './LoginButtons.module.sass';

export default function LoginButtons({ data, logOut }) {
  return (
    <>
      <div className={styles.userInfo}>
        <img
          src={
            data.avatar === 'anon.png'
              ? ANONYM_IMAGE_PATH
              : `${publicURL}${data.avatar}`
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
