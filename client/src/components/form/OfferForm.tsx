import { type FC } from 'react';
import { Formik, Form, type FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'hooks';
import { addOffer, clearAddOfferError } from 'store/slices/contestByIdSlice';
import { Error } from 'components/general';
import { FormInput, ImageUpload } from 'components/input';
import {
  LogoOfferSchema,
  TextOfferSchema,
} from 'utils/validators/validationSchems';
import { LOGO_CONTEST } from 'constants/general';
import type { ContestType } from 'types/contest';
import styles from './styles/OfferForm.module.sass';
import type { Id, WithId } from 'types/api/_common';

export type Props = {
  contestType: ContestType;
};
export type OfferFormProps = WithId<Id, 'contestId' | 'customerId'> & Props;

const OfferInput: FC<Props> = ({ contestType }) => {
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

const OfferForm: FC<OfferFormProps> = ({
  contestId,
  contestType,
  customerId,
}) => {
  const { addOfferError } = useSelector((state) => state.contestByIdStore);
  const dispatch = useDispatch();

  const validationSchema =
    contestType === LOGO_CONTEST ? LogoOfferSchema : TextOfferSchema;

  const setOffer = (
    values: { offerData: string },
    { resetForm }: FormikHelpers<{ offerData: string }>,
  ) => {
    dispatch(clearAddOfferError());
    const data = new FormData();

    data.append('contestId', contestId as unknown as string);
    data.append('contestType', contestType);
    data.append('customerId', customerId as unknown as string);
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
