'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Replacement } from '@react-input/mask';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, type FC } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles.scss';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'hooks';
import { PayInput } from 'components/input';
import { PAGE } from 'constants/general';
import { changeFocusOnCard } from 'store/slices/paymentSlice';
import { CashoutSchema, PaymentSchema, type Payment } from 'utils/schemas';
import type { CardField } from 'types/offer';
import styles from './styles/PayForm.module.scss';

export type Props = {
  readonly sendRequest: (values: Payment) => void;
  readonly focusOnElement?: CardField;
  readonly isPayForOrder?: boolean;
};

const classes = {
  container: styles.inputContainer,
  error: styles.error,
  notValid: styles.notValid,
};

const PayForm: FC<Props> = ({ sendRequest, focusOnElement, isPayForOrder }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const changeFocusOnCardMethod = useCallback(
    (name: CardField) => {
      dispatch(changeFocusOnCard(name));
    },
    [dispatch],
  );

  const isCashoutPage = pathname === PAGE.ACCOUNT;
  const defaultValues = {
    focusOnElement: '',
    name: '',
    number: '',
    cvc: '',
    expiry: '',
    ...(isCashoutPage ? {} : { sum: '' }),
  };

  const { handleSubmit, control, watch } = useForm({
    defaultValues,
    resolver: zodResolver(isCashoutPage ? CashoutSchema : PaymentSchema),
  });
  // prettier-ignore
  const [name, number, expiry, cvc] = watch(['name', 'number', 'expiry', 'cvc']);

  const replacement = { _: /\d/ } satisfies string | Replacement;
  return (
    <div className={styles.payFormContainer}>
      <h2 className={styles.headerInfo}>Payment Information</h2>
      <div className={styles.cardContainer}>
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focusOnElement}
          name={name}
          number={number}
        />
      </div>
      <form
        className={styles.formContainer}
        id="myForm"
        onSubmit={handleSubmit(sendRequest)}
      >
        <label className={styles.bigInput}>
          <p>Name</p>
          <PayInput
            changeFocus={changeFocusOnCardMethod}
            classes={classes}
            control={control}
            name="name"
            placeholder="name"
            type="text"
          />
        </label>
        {!isPayForOrder && (
          <label className={styles.bigInput}>
            <p>Sum</p>
            <PayInput
              changeFocus={changeFocusOnCardMethod}
              classes={classes}
              control={control}
              name="sum"
              placeholder="sum"
              type="text"
            />
          </label>
        )}
        <label className={styles.bigInput}>
          <p>Card Number</p>
          <PayInput
            changeFocus={changeFocusOnCardMethod}
            classes={classes}
            control={control}
            mask="____ ____ ____ ____ ___"
            name="number"
            placeholder="card number"
            replacement={replacement}
            type="text"
          />
        </label>
        <div className={styles.smallInputContainer}>
          <label className={styles.smallInput}>
            <p>Expires *</p>
            <PayInput
              changeFocus={changeFocusOnCardMethod}
              classes={classes}
              control={control}
              mask="__/__"
              name="expiry"
              placeholder="expiry"
              replacement={replacement}
              type="text"
            />
          </label>
          <label className={styles.smallInput}>
            <p>Security Code *</p>
            <PayInput
              changeFocus={changeFocusOnCardMethod}
              classes={classes}
              control={control}
              mask="____"
              name="cvc"
              placeholder="cvc"
              replacement={replacement}
              type="text"
            />
          </label>
        </div>
      </form>
      {isPayForOrder ? (
        <div className={styles.totalSum}>
          <span>Total: $100.00</span>
        </div>
      ) : null}
      <div className={styles.buttonsContainer}>
        <button className={styles.payButton} form="myForm" type="submit">
          <span>{isPayForOrder ? 'Pay Now' : 'CashOut'}</span>
        </button>
        {isPayForOrder ? (
          <div className={styles.backButton} onClick={router.back}>
            <span>Back</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PayForm;
