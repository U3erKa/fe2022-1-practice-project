import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { pay, clearPaymentStore } from 'store/slices/paymentSlice';
import { Error } from 'components';
import { PayForm } from 'components/FormComponents';

import { DUMMY_LINK, STATIC_IMAGES_PATH } from 'constants/general';
import styles from './Payment.module.sass';

const Payment = () => {
  const { error, contests } = useSelector((state) => ({
    error: state.payment.error,
    contests: state.contestCreationStore.contests,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const payMethod = (values) => {
    const contestArray = [];
    Object.keys(contests).forEach((key) =>
      contestArray.push({ ...contests[key] }),
    );
    const { number, expiry, cvc } = values;
    const formData = new FormData();
    for (let i = 0; i < contestArray.length; i++) {
      formData.append('files', contestArray[i].file);
      contestArray[i].haveFile = !!contestArray[i].file;
    }
    formData.append('number', number);
    formData.append('expiry', expiry);
    formData.append('cvc', cvc);
    formData.append('contests', JSON.stringify(contestArray));
    formData.append('price', '100');
    dispatch(pay({ data: { formData }, navigate }));
  };

  const goBack = () => {
    navigate(-1);
  };

  if (isEmpty(contests)) {
    navigate('startContest', { replace: true });
  }
  return (
    <div>
      <div className={styles.header}>
        <img src={`${STATIC_IMAGES_PATH}blue-logo.png`} alt="blue-logo" />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.paymentContainer}>
          <span className={styles.headerLabel}>Checkout</span>
          {error && (
            <Error
              data={error.data}
              status={error.status}
              clearError={() => dispatch(clearPaymentStore())}
            />
          )}
          <PayForm sendRequest={payMethod} back={goBack} isPayForOrder />
        </div>
        <div className={styles.orderInfoContainer}>
          <span className={styles.orderHeader}>Order Summary</span>
          <div className={styles.packageInfoContainer}>
            <span className={styles.packageName}>Package Name: Standard</span>
            <span className={styles.packagePrice}>$100 USD</span>
          </div>
          <div className={styles.resultPriceContainer}>
            <span>Total:</span>
            <span>$100.00 USD</span>
          </div>
          <Link to={DUMMY_LINK}>Have a promo code?</Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
