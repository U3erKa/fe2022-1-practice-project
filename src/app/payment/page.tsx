'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isEmpty } from 'radash';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks';
import { PayForm } from 'components/form';
import { Error, Logo } from 'components/general';
import { PAGE } from 'constants/general';
import { clearPaymentStore, pay } from 'store/slices/paymentSlice';
import { type Payment } from 'utils/schemas';
import styles from './styles/page.module.scss';

const Payment = () => {
  const { error, contests } = useSelector((state) => ({
    contests: state.contestCreationStore.contests,
    error: state.payment.error,
  }));
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isEmpty(contests)) {
      router.replace(PAGE.START_CONTEST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contests]);

  const payMethod = (values: Payment) => {
    const submittedContests: any[] = Object.keys(contests).map((key) => ({
      ...contests[key as keyof typeof contests],
    }));

    const { number, expiry, cvc } = values;
    const formData = new FormData();
    for (const contest of submittedContests) {
      formData.append('files', contest.file);
      contest.haveFile = !!contest.file;
    }
    formData.append('number', number);
    formData.append('expiry', expiry);
    formData.append('cvc', cvc);
    formData.append('contests', JSON.stringify(submittedContests));
    formData.append('price', '100');
    dispatch(pay({ data: { formData }, navigate: router.push }));
  };

  return (
    <div>
      <div className={styles.header}>
        <Logo />
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
          <PayForm sendRequest={payMethod} isPayForOrder />
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
          <Link href={PAGE.DUMMY_LINK}>Have a promo code?</Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;
