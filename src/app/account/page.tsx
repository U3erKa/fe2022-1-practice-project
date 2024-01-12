'use client';

import clsx from 'clsx/lite';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { UserInfo } from 'components/account';
import { PayForm } from 'components/form';
import { Error, Header } from 'components/general';
import { CASHOUT_MODE, CREATOR, PAGE, USER_INFO_MODE } from 'constants/general';
import { cashOut, clearPaymentStore } from 'store/slices/paymentSlice';
import { changeProfileViewMode } from 'store/slices/userProfileSlice';
import type { CashOutParams } from 'types/offer';
import styles from './styles/page.module.scss';

const UserProfile = () => {
  const { error, profileViewMode, user } = useSelector(
    ({ userStore, userProfile, payment }) => {
      const { data: user } = userStore;
      const { profileViewMode } = userProfile;
      const { error } = payment;

      return { error, profileViewMode, user };
    },
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const pay = useCallback(
    ({ number, expiry, cvc, sum }: CashOutParams) => {
      dispatch(cashOut({ cvc, expiry, number, sum }));
    },
    [dispatch],
  );

  if (!user) {
    router.replace(PAGE.HOME);
    return null;
  }
  const { balance, role } = user;

  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.aside}>
          <span className={styles.headerAside}>Select Option</span>
          <div className={styles.optionsContainer}>
            <div
              className={clsx(
                styles.optionContainer,
                profileViewMode === USER_INFO_MODE && styles.currentOption,
              )}
              onClick={() => dispatch(changeProfileViewMode(USER_INFO_MODE))}
            >
              UserInfo
            </div>
            {role === CREATOR && (
              <div
                className={clsx(
                  styles.optionContainer,
                  profileViewMode === CASHOUT_MODE && styles.currentOption,
                )}
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
                    clearError={clearPaymentStore}
                    data={(error as any).data}
                    status={(error as any).status}
                  />
                ) : null}
                <PayForm sendRequest={pay as any} />
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
