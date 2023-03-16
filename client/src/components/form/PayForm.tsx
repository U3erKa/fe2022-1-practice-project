import { Form, Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import Cards from 'react-credit-cards-2';

import { useDispatch } from 'hooks';
import { changeFocusOnCard } from 'store/slices/paymentSlice';
import { PayInput } from 'components/input';

import {
  CashoutSchema,
  PaymentSchema,
} from 'utils/validators/validationSchems';

import 'react-credit-cards-2/lib/styles.scss';
import styles from './styles/PayForm.module.sass';

import type { FC } from 'react';

export type Props = {
  sendRequest: (values: object) => void;
  focusOnElement?: 'name' | 'number' | 'expiry' | 'cvc';
  isPayForOrder?: boolean;
};

const PayForm: FC<Props> = ({ sendRequest, focusOnElement, isPayForOrder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const changeFocusOnCardMethod = (name) => {
    dispatch(changeFocusOnCard(name));
  };

  const isCashoutPage = location.pathname === '/account';
  const initialValues = {
    focusOnElement: '',
    name: '',
    number: '',
    cvc: '',
    expiry: '',
  };

  if (isCashoutPage) Object.assign(initialValues, { sum: '' });

  return (
    <div className={styles.payFormContainer}>
      <span className={styles.headerInfo}>Payment Information</span>
      <Formik
        initialValues={initialValues}
        onSubmit={sendRequest}
        validationSchema={isCashoutPage ? CashoutSchema : PaymentSchema}
      >
        {({ values }) => {
          const { name, number, expiry, cvc } = values;

          return (
            <>
              <div className={styles.cardContainer}>
                <Cards
                  number={number}
                  name={name}
                  expiry={expiry}
                  cvc={cvc}
                  focused={focusOnElement}
                />
              </div>
              <Form id="myForm" className={styles.formContainer}>
                <div className={styles.bigInput}>
                  <span>Name</span>
                  <PayInput
                    name="name"
                    classes={{
                      container: styles.inputContainer,
                      input: styles.input,
                      notValid: styles.notValid,
                      error: styles.error,
                    }}
                    type="text"
                    label="name"
                    changeFocus={changeFocusOnCardMethod}
                  />
                </div>
                {!isPayForOrder && (
                  <div className={styles.bigInput}>
                    <span>Sum</span>
                    <PayInput
                      name="sum"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="text"
                      label="sum"
                    />
                  </div>
                )}
                <div className={styles.bigInput}>
                  <span>Card Number</span>
                  <PayInput
                    isInputMask
                    mask="9999 9999 9999 9999 999"
                    name="number"
                    classes={{
                      container: styles.inputContainer,
                      input: styles.input,
                      notValid: styles.notValid,
                      error: styles.error,
                    }}
                    type="text"
                    label="card number"
                    changeFocus={changeFocusOnCardMethod}
                  />
                </div>
                <div className={styles.smallInputContainer}>
                  <div className={styles.smallInput}>
                    <span>* Expires</span>
                    <PayInput
                      isInputMask
                      mask="99/99"
                      name="expiry"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="text"
                      label="expiry"
                      changeFocus={changeFocusOnCardMethod}
                    />
                  </div>
                  <div className={styles.smallInput}>
                    <span>* Security Code</span>
                    <PayInput
                      isInputMask
                      mask="9999"
                      name="cvc"
                      classes={{
                        container: styles.inputContainer,
                        input: styles.input,
                        notValid: styles.notValid,
                        error: styles.error,
                      }}
                      type="text"
                      label="cvc"
                      changeFocus={changeFocusOnCardMethod}
                    />
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
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
