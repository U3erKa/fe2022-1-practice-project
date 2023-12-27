'use client';

import clsx from 'clsx';
import { useDispatch, useSelector } from 'hooks';
import { UserInfo } from 'components/account';
import { PayForm } from 'components/form';
import { Error, Header } from 'components/general';
import { CASHOUT_MODE, CREATOR, USER_INFO_MODE } from 'constants/general';
import { cashOut, clearPaymentStore } from 'store/slices/paymentSlice';
import { changeProfileViewMode } from 'store/slices/userProfileSlice';
import type { CashOutParams } from 'types/api/offer';
import styles from './styles/page.module.scss';

const UserProfile = () => {
  const { balance, role, profileViewMode, error } = useSelector((state) => {
    const { balance, role } = state.userStore.data || {};
    const { profileViewMode } = state.userProfile;
    const { error } = state.payment;

    return { balance, error, profileViewMode, role };
  });

  const dispatch = useDispatch();

  const pay = ({ number, expiry, cvc, sum }: CashOutParams) => {
    dispatch(cashOut({ cvc, expiry, number, sum }));
  };

  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.aside}>
          <span className={styles.headerAside}>Select Option</span>
          <div className={styles.optionsContainer}>
            <div
              className={clsx(styles.optionContainer, {
                [styles.currentOption]: profileViewMode === USER_INFO_MODE,
              })}
              onClick={() => dispatch(changeProfileViewMode(USER_INFO_MODE))}
            >
              UserInfo
            </div>
            {role === CREATOR && (
              <div
                className={clsx(styles.optionContainer, {
                  [styles.currentOption]: profileViewMode === CASHOUT_MODE,
                })}
                onClick={() => dispatch(changeProfileViewMode(CASHOUT_MODE))}
              >
                Cashout
              </div>
            )}
          </div>
        </div>
        {profileViewMode === USER_INFO_MODE ? (
          <UserInfo />
        ) : (
          <div className={styles.container}>
            {balance ? (
              <div>
                {error ? (
                  <Error
                    data={error.data}
                    status={error.status}
                    clearError={clearPaymentStore}
                  />
                ) : null}
                <PayForm sendRequest={pay} />
              </div>
            ) : (
              <span className={styles.notMoney}>
                There is no money on your balance
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
