import { usePathname, useRouter } from 'next/navigation';
import { type FC } from 'react';
import type { Replacement } from '@react-input/mask';
import Cards from 'react-credit-cards-2';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'hooks';
import { changeFocusOnCard } from 'store/slices/paymentSlice';
import { PayInput } from 'components/input';
import {
  CashoutSchema,
  type Payment,
  PaymentSchema,
} from 'utils/validators/validationSchems';
import { PAGE } from 'constants/general';
import type { CardField } from 'types/api/offer';
import 'react-credit-cards-2/dist/es/styles.scss';
import styles from './styles/PayForm.module.scss';

export type Props = {
  sendRequest: (values: Payment) => void;
  focusOnElement?: CardField;
  isPayForOrder?: boolean;
};

const classes = {
  container: styles.inputContainer,
  notValid: styles.notValid,
  error: styles.error,
};

const PayForm: FC<Props> = ({ sendRequest, focusOnElement, isPayForOrder }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const changeFocusOnCardMethod = (name: CardField) => {
    dispatch(changeFocusOnCard(name));
  };

  const isCashoutPage = pathname === PAGE.ACCOUNT;
  const defaultValues = {
    focusOnElement: '',
    name: '',
    number: '',
    cvc: '',
    expiry: '',
  };

  if (isCashoutPage) Object.assign(defaultValues, { sum: '' });

  const { handleSubmit, control, watch } = useForm({
    defaultValues,
    resolver: zodResolver(isCashoutPage ? CashoutSchema : PaymentSchema),
  });
  const { name, number, expiry, cvc } = watch();

  const replacement = { _: /\d/ } satisfies string | Replacement;
  return (
    <div className={styles.payFormContainer}>
      <span className={styles.headerInfo}>Payment Information</span>
      <div className={styles.cardContainer}>
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focusOnElement}
        />
      </div>
      <form
        id="myForm"
        onSubmit={handleSubmit(sendRequest)}
        className={styles.formContainer}
      >
        <div className={styles.bigInput}>
          <span>Name</span>
          <PayInput
            name="name"
            control={control}
            classes={classes}
            type="text"
            placeholder="name"
            changeFocus={changeFocusOnCardMethod}
          />
        </div>
        {!isPayForOrder && (
          <div className={styles.bigInput}>
            <span>Sum</span>
            <PayInput
              name="sum"
              control={control}
              classes={classes}
              type="text"
              placeholder="sum"
              changeFocus={changeFocusOnCardMethod}
            />
          </div>
        )}
        <div className={styles.bigInput}>
          <span>Card Number</span>
          <PayInput
            control={control}
            mask="____ ____ ____ ____ ___"
            replacement={replacement}
            name="number"
            classes={classes}
            type="text"
            placeholder="card number"
            changeFocus={changeFocusOnCardMethod}
          />
        </div>
        <div className={styles.smallInputContainer}>
          <div className={styles.smallInput}>
            <span>* Expires</span>
            <PayInput
              control={control}
              mask="__/__"
              replacement={replacement}
              name="expiry"
              classes={classes}
              type="text"
              placeholder="expiry"
              changeFocus={changeFocusOnCardMethod}
            />
          </div>
          <div className={styles.smallInput}>
            <span>* Security Code</span>
            <PayInput
              control={control}
              mask="____"
              replacement={replacement}
              name="cvc"
              classes={classes}
              type="text"
              placeholder="cvc"
              changeFocus={changeFocusOnCardMethod}
            />
          </div>
        </div>
      </form>
      {isPayForOrder && (
        <div className={styles.totalSum}>
          <span>Total: $100.00</span>
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <button form="myForm" className={styles.payButton} type="submit">
          <span>{isPayForOrder ? 'Pay Now' : 'CashOut'}</span>
        </button>
        {isPayForOrder && (
          <div onClick={router.back} className={styles.backButton}>
            <span>Back</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayForm;
