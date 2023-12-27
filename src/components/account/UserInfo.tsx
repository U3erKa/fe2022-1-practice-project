import { type FC } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { UpdateUserInfoForm } from 'components/form';
import { UserImage } from 'components/general';
import { CREATOR, PUBLIC_URL } from 'constants/general';
import { changeEditModeOnUserProfile } from 'store/slices/userProfileSlice';
import { updateUser } from 'store/slices/userSlice';
import { uniqueId } from 'utils/functions';
import type { UserState } from 'types/slices';
import styles from './styles/UserInfo.module.scss';

export type Props = {
  readonly userData: Omit<NonNullable<UserState['data']>, 'avatar'>;
};

type Props2 = {
  readonly label: string;
  readonly value: string;
};

const InfoBlock: FC<Props2> = ({ label, value }) => {
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

  const { avatar, ...userData } =
    data || ({} as NonNullable<UserState['data']>);

  const updateUserData = (
    values: Pick<
      NonNullable<UserState['data']>,
      'firstName' | 'lastName' | 'displayName'
    > & { file: FileList },
  ) => {
    const formData = new FormData();

    formData.append('file', values.file[0]);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('displayName', values.displayName);

    dispatch(updateUser(formData));
  };

  return (
    <div className={styles.mainContainer}>
      {isEdit ? (
        // @ts-expect-error
        <UpdateUserInfoForm onSubmit={updateUserData} />
      ) : (
        <div className={styles.infoContainer}>
          <UserImage src={`${PUBLIC_URL}${avatar}`} className={styles.avatar} />
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
