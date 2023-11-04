import { type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cards from 'react-credit-cards-2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'hooks';
import { changeFocusOnCard } from 'store/slices/paymentSlice';
import { PayInput } from 'components/input';
import {
  CashoutSchema,
  PaymentSchema,
} from 'utils/validators/validationSchems';
import { ROUTE } from 'constants/general';
import type { Card } from 'types/api/user';
import type { CardField } from 'types/api/offer';
import 'react-credit-cards-2/dist/es/styles.scss';
import styles from './styles/PayForm.module.sass';

export type Props = {
  sendRequest: (values: Card) => void;
  focusOnElement?: CardField;
  isPayForOrder?: boolean;
};

const classes = {
  container: styles.inputContainer,
  input: styles.input,
  notValid: styles.notValid,
  error: styles.error,
};

const PayForm: FC<Props> = ({ sendRequest, focusOnElement, isPayForOrder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const changeFocusOnCardMethod = (name: CardField) => {
    dispatch(changeFocusOnCard(name));
  };

  const isCashoutPage = location.pathname === ROUTE.ACCOUNT;
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
    resolver: yupResolver(isCashoutPage ? CashoutSchema : PaymentSchema),
  });
  const { name, number, expiry, cvc } = watch();

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
            isInputMask
            control={control}
            mask="9999 9999 9999 9999 999"
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
              isInputMask
              control={control}
              mask="99/99"
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
              isInputMask
              control={control}
              mask="9999"
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
          <div onClick={() => navigate(-1)} className={styles.backButton}>
            <span>Back</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayForm;
