import { useDispatch, useSelector } from 'react-redux';

import { updateUser } from 'store/slices/userSlice';
import { changeEditModeOnUserProfile } from 'store/slices/userProfileSlice';
import { UpdateUserInfoForm } from 'components/FormComponents';

import { ANONYM_IMAGE_PATH, PUBLIC_URL, CREATOR } from 'constants/general';
import styles from './UserInfo.module.sass';

const UserInfoData = ({ userData }) => {
  const { firstName, lastName, displayName, email, role, balance } = userData;

  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoBlock}>
        <span className={styles.label}>First Name</span>
        <span className={styles.info}>{firstName}</span>
      </div>
      <div className={styles.infoBlock}>
        <span className={styles.label}>Last Name</span>
        <span className={styles.info}>{lastName}</span>
      </div>
      <div className={styles.infoBlock}>
        <span className={styles.label}>Display Name</span>
        <span className={styles.info}>{displayName}</span>
      </div>
      <div className={styles.infoBlock}>
        <span className={styles.label}>Email</span>
        <span className={styles.info}>{email}</span>
      </div>
      <div className={styles.infoBlock}>
        <span className={styles.label}>Role</span>
        <span className={styles.info}>{role}</span>
      </div>
      {role === CREATOR && (
        <div className={styles.infoBlock}>
          <span className={styles.label}>Balance</span>
          <span className={styles.info}>{`${balance}$`}</span>
        </div>
      )}
    </div>
  );
};

const UserInfo = () => {
  const { data, isEdit } = useSelector((state) => {
    const { data } = state.userStore;
    const { isEdit } = state.userProfile;
    return { data, isEdit };
  });
  const dispatch = useDispatch();

  const { avatar, ...userData } = data || {};

  const updateUserData = (values) => {
    const formData = new FormData();

    formData.append('file', values.file);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('displayName', values.displayName);

    dispatch(updateUser(formData));
  };

  return (
    <div className={styles.mainContainer}>
      {isEdit ? (
        <UpdateUserInfoForm onSubmit={updateUserData} />
      ) : (
        <div className={styles.infoContainer}>
          <img
            src={
              avatar === 'anon.png'
                ? ANONYM_IMAGE_PATH
                : `${PUBLIC_URL}${avatar}`
            }
            className={styles.avatar}
            alt="user"
          />
          <UserInfoData userData={userData} />
        </div>
      )}
      <div
        onClick={() => dispatch(changeEditModeOnUserProfile(!isEdit))}
        className={styles.buttonEdit}
      >
        {isEdit ? 'Cancel' : 'Edit'}
      </div>
    </div>
  );
};

export default UserInfo;
