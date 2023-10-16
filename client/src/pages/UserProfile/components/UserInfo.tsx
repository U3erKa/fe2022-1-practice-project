import { type FC } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { updateUser } from 'store/slices/userSlice';
import { changeEditModeOnUserProfile } from 'store/slices/userProfileSlice';
import { UpdateUserInfoForm } from 'components/form';
import { uniqueId } from 'utils/functions';
import { ANONYM_IMAGE_PATH, PUBLIC_URL, CREATOR } from 'constants/general';
import type { User } from 'types/api/user';
import styles from '../styles/UserInfo.module.sass';

export type Props = {
  userData: Omit<User, 'avatar'>;
};

const InfoBlock: FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div className={styles.infoBlock}>
      <span className={styles.label}>{label}</span>
      <span className={styles.info}>{value}</span>
    </div>
  );
};

const UserInfoData: FC<Props> = ({ userData }) => {
  const { firstName, lastName, displayName, email, role, balance } = userData;

  const userInfo = [
    { id: uniqueId(), label: 'First Name', value: firstName },
    { id: uniqueId(), label: 'Last Name', value: lastName },
    { id: uniqueId(), label: 'Display Name', value: displayName },
    { id: uniqueId(), label: 'Email', value: email },
    { id: uniqueId(), label: 'Role', value: role },
  ];

  return (
    <div className={styles.infoContainer}>
      {userInfo.map(({ id, label, value }) => (
        <InfoBlock key={id} label={label} value={value} />
      ))}
      {role === CREATOR && (
        <InfoBlock label={'Balance'} value={`${balance}$`} />
      )}
    </div>
  );
};

const UserInfo: FC = () => {
  const { data, isEdit } = useSelector((state) => {
    const { data } = state.userStore;
    const { isEdit } = state.userProfile;
    return { data, isEdit };
  });
  const dispatch = useDispatch();

  const { avatar, ...userData } = data || ({} as User);

  const updateUserData = (
    values: Pick<User, 'firstName' | 'lastName' | 'displayName'> & {
      file: string | Blob;
    },
  ) => {
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
        // @ts-ignore
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
