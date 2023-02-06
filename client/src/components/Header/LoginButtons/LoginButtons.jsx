import React from 'react';
import CONSTANTS from '../../../constants';
import HEADER_CONSTANTS from 'headerConstants';
import ProfileNavBar from '../ProfileNavBar/ProfileNavBar';
import styles from './LoginButtons.module.sass';

export default function LoginButtons({ data, logOut }) {
  return (
    <>
      <div className={styles.userInfo}>
        <img
          src={
            data.avatar === 'anon.png'
              ? CONSTANTS.ANONYM_IMAGE_PATH
              : `${CONSTANTS.publicURL}${data.avatar}`
          }
          alt="user"
        />
        <span>{`Hi, ${data.displayName}`}</span>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt="menu" />
        <ProfileNavBar list={HEADER_CONSTANTS.PROFILE_NAVBAR} logOut={logOut} />
      </div>
      <img
        src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
        className={styles.emailIcon}
        alt="email"
      />
    </>
  );
}
