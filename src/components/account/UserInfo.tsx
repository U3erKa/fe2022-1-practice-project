import { useCallback, type FC } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { UpdateUserInfoForm } from 'components/form';
import { UserImage } from 'components/general';
import { CREATOR, PUBLIC_URL } from 'constants/general';
import { changeEditModeOnUserProfile } from 'store/slices/userProfileSlice';
import { updateUser } from 'store/slices/userSlice';
import type { UserState } from 'types/slices';
import styles from './styles/UserInfo.module.scss';

export type Props = {
  readonly userData: UserState['data'];
};

type Props2 = {
  readonly label: string;
  readonly value: string;
};

const InfoBlock: FC<Props2> = ({ label, value }) => (
  <p className={styles.infoBlock}>
    <span className={styles.label}>{label}</span>
    <span className={styles.info}>{value}</span>
  </p>
);

const UserInfoData: FC<Props> = ({ userData }) => {
  const { firstName, lastName, displayName, email, role, balance } =
    userData ?? {};

  const userInfo = [
    { label: 'First Name', value: firstName },
    { label: 'Last Name', value: lastName },
    { label: 'Display Name', value: displayName },
    { label: 'Email', value: email },
    { label: 'Role', value: role },
  ];

  return (
    <div className={styles.infoContainer}>
      {userInfo.map(({ label, value }) => (
        <InfoBlock key={label} label={label} value={value!} />
      ))}
      {role === CREATOR && (
        <InfoBlock label={'Balance'} value={`${balance}$`} />
      )}
    </div>
  );
};

const UserInfo: FC = () => {
  const { userData, isEdit } = useSelector(({ userStore, userProfile }) => {
    const { data: userData } = userStore;
    const { isEdit } = userProfile;
    return { userData, isEdit };
  });
  const dispatch = useDispatch();

  const updateUserData = useCallback(
    (
      values: Pick<
        NonNullable<UserState['data']>,
        'displayName' | 'firstName' | 'lastName'
      > & { file: FileList },
    ) => {
      const formData = new FormData();

      formData.append('file', values.file[0]!);
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('displayName', values.displayName);

      dispatch(updateUser(formData));
    },
    [dispatch],
  );

  return (
    <article className={styles.mainContainer}>
      {isEdit ? (
        <UpdateUserInfoForm onSubmit={updateUserData as any} />
      ) : (
        <section className={styles.infoContainer}>
          <UserImage
            className={styles.avatar}
            src={`${PUBLIC_URL}${userData?.avatar}`}
          />
          <UserInfoData userData={userData} />
        </section>
      )}
      <button
        className={styles.buttonEdit}
        onClick={() => dispatch(changeEditModeOnUserProfile(!isEdit))}
      >
        {isEdit ? 'Cancel' : 'Edit'}
      </button>
    </article>
  );
};

export default UserInfo;
