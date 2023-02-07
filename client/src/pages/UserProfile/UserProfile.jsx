import { connect } from 'react-redux';
import classNames from 'classnames';

import { changeProfileViewMode } from 'store/slices/userProfileSlice';
import { cashOut, clearPaymentStore } from 'store/slices/paymentSlice';
import { Header, UserInfo, Error } from 'components';
import { PayForm } from 'components/FormComponents';

import { USER_INFO_MODE, CREATOR, CASHOUT_MODE } from 'constants/general';
import styles from './UserProfile.module.sass';

const UserProfile = (props) => {
  const pay = (values) => {
    const { number, expiry, cvc, sum } = values;
    props.cashOut({
      number,
      expiry,
      cvc,
      sum,
    });
  };

  const {
    balance,
    role,
    profileViewMode,
    changeProfileViewMode,
    error,
    clearPaymentStore,
  } = props;
  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.aside}>
          <span className={styles.headerAside}>Select Option</span>
          <div className={styles.optionsContainer}>
            <div
              className={classNames(styles.optionContainer, {
                [styles.currentOption]: profileViewMode === USER_INFO_MODE,
              })}
              onClick={() => changeProfileViewMode(USER_INFO_MODE)}
            >
              UserInfo
            </div>
            {role === CREATOR && (
              <div
                className={classNames(styles.optionContainer, {
                  [styles.currentOption]: profileViewMode === CASHOUT_MODE,
                })}
                onClick={() => changeProfileViewMode(CASHOUT_MODE)}
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
            {parseInt(balance) === 0 ? (
              <span className={styles.notMoney}>
                There is no money on your balance
              </span>
            ) : (
              <div>
                {error && (
                  <Error
                    data={error.data}
                    status={error.status}
                    clearError={clearPaymentStore}
                  />
                )}
                <PayForm sendRequest={pay} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { balance, role } = state.userStore.data || {};
  const { profileViewMode } = state.userProfile;
  const { error } = state.payment;
  return {
    balance,
    role,
    profileViewMode,
    error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  cashOut: (data) => dispatch(cashOut(data)),
  changeProfileViewMode: (data) => dispatch(changeProfileViewMode(data)),
  clearPaymentStore: () => dispatch(clearPaymentStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
