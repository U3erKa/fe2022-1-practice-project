import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import { addOffer, clearAddOfferError } from 'store/slices/contestByIdSlice';
import { Error } from 'components';
import { FormInput, ImageUpload } from 'components/InputComponents';

import {
  LogoOfferSchema,
  TextOfferSchema,
} from 'utils/validators/validationSchems';
import { LOGO_CONTEST } from 'constants/general';
import styles from './OfferForm.module.sass';

const OfferInput = ({ contestType }) => {
  return contestType === LOGO_CONTEST ? (
    <ImageUpload
      name="offerData"
      classes={{
        uploadContainer: styles.imageUploadContainer,
        inputContainer: styles.uploadInputContainer,
        imgStyle: styles.imgStyle,
      }}
    />
  ) : (
    <FormInput
      name="offerData"
      classes={{
        container: styles.inputContainer,
        input: styles.input,
        warning: styles.fieldWarning,
        notValid: styles.notValid,
      }}
      type="text"
      label="your suggestion"
    />
  );
};

const OfferForm = ({ contestId, contestType, customerId }) => {
  const { addOfferError } = useSelector((state) => state.contestByIdStore);
  const dispatch = useDispatch();

  const validationSchema =
    contestType === LOGO_CONTEST ? LogoOfferSchema : TextOfferSchema;

  const setOffer = (values, { resetForm }) => {
    dispatch(clearAddOfferError());
    const data = new FormData();

    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('customerId', customerId);
    data.append('offerData', values.offerData);

    dispatch(addOffer(data));
    resetForm();
  };

  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={() => dispatch(clearAddOfferError())}
        />
      )}
      <Formik
        onSubmit={setOffer}
        initialValues={{ offerData: '' }}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          <OfferInput contestType={contestType} />

          <button type="submit" className={styles.btnOffer}>
            Send Offer
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default OfferForm;
