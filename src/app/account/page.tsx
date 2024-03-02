'use client';

import clsx from 'clsx/lite';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { UserInfo } from 'components/account';
import { PayForm } from 'components/form';
import { Error, Header, OnlyAuthorizedUser } from 'components/general';
import { CASHOUT_MODE, CREATOR, USER_INFO_MODE } from 'constants/general';
import { cashOut, clearPaymentStore } from 'store/slices/paymentSlice';
import { changeProfileViewMode } from 'store/slices/userProfileSlice';
import type { CashOutParams } from 'types/offer';
import styles from './styles/page.module.scss';

const UserProfile = () => {
  const { balance, error, profileViewMode, role } = useSelector(
    ({ userStore, userProfile, payment }) => {
      const { data: user } = userStore;
      const { profileViewMode } = userProfile;
      const { error } = payment;
      const { balance, role } = user ?? {};

      return { balance, error, profileViewMode, role };
    },
  );

  const dispatch = useDispatch();

  const pay = useCallback(
    ({ number, expiry, cvc, sum }: CashOutParams) => {
      dispatch(cashOut({ cvc, expiry, number, sum }));
    },
    [dispatch],
  );

  return (
    <OnlyAuthorizedUser>
      <Header />
      <main className={styles.mainContainer}>
        <aside className={styles.aside}>
          <h2 className={styles.headerAside}>Select Option</h2>
          <section className={styles.optionsContainer}>
            <button
              className={clsx(
                styles.optionContainer,
                profileViewMode === USER_INFO_MODE && styles.currentOption,
              )}
              onClick={() => dispatch(changeProfileViewMode(USER_INFO_MODE))}
            >
              UserInfo
            </button>
            {role === CREATOR && (
              <button
                className={clsx(
                  styles.optionContainer,
                  profileViewMode === CASHOUT_MODE && styles.currentOption,
                )}
                onClick={() => dispatch(changeProfileViewMode(CASHOUT_MODE))}
              >
                Cashout
              </button>
            )}
          </section>
        </aside>
        {profileViewMode === USER_INFO_MODE ? (
          <UserInfo />
        ) : (
          <article className={styles.container}>
            {balance ? (
              <>
                {error ? (
                  <Error
                    clearError={clearPaymentStore}
                    data={(error as any).data}
                    status={(error as any).status}
                  />
                ) : null}
                <PayForm sendRequest={pay as any} />
              </>
            ) : (
              <p className={styles.notMoney}>
                There is no money on your balance
              </p>
            )}
          </article>
        )}
      </main>
    </OnlyAuthorizedUser>
  );
};

export default UserProfile;
