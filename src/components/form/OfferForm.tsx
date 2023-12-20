import { zodResolver } from '@hookform/resolvers/zod';
import { type FC } from 'react';
import { type Control, type UseFormRegister, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'hooks';
import { Error } from 'components/general';
import { FormInput, ImageUpload } from 'components/input';
import type { FormInputClasses } from 'components/input/FormInput';
import { LOGO_CONTEST } from 'constants/general';
import { addOffer, clearAddOfferError } from 'store/slices/contestByIdSlice';
import {
  type LogoOffer,
  LogoOfferSchema,
  type TextOffer,
  TextOfferSchema,
} from 'utils/schemas';
import type { Id, WithId } from 'types/api/_common';
import type { ContestType } from 'types/contest';
import styles from './styles/OfferForm.module.scss';

export type Props = {
  contestType: ContestType;
  control: Control<any>;
  register: UseFormRegister<any>;
};

export type OfferFormProps = WithId<Id, 'contestId' | 'customerId'> & {
  contestType: ContestType;
};

const formInputClassses = {
  container: styles.inputContainer,
  input: styles.input,
  warning: styles.fieldWarning,
  notValid: styles.notValid,
} satisfies FormInputClasses;

const imageUploadClasses = {
  uploadContainer: styles.imageUploadContainer,
  inputContainer: styles.uploadInputContainer,
  imgStyle: styles.imgStyle,
};

const OfferInput: FC<Props> = ({ control, register, contestType }) => {
  return contestType === LOGO_CONTEST ? (
    <ImageUpload
      name="offerData"
      control={control}
      register={register}
      classes={imageUploadClasses}
    />
  ) : (
    <FormInput
      name="offerData"
      control={control}
      classes={formInputClassses}
      placeholder="your suggestion"
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
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: { offerData: '' },
    resolver: zodResolver(
      contestType === LOGO_CONTEST ? LogoOfferSchema : TextOfferSchema,
    ),
  });

  const setOffer = ({ offerData }: LogoOffer | TextOffer) => {
    dispatch(clearAddOfferError());
    const data = new FormData();

    data.append('contestId', contestId as unknown as string);
    data.append('contestType', contestType);
    data.append('customerId', customerId as unknown as string);
    data.append(
      'offerData',
      offerData instanceof FileList ? (offerData[0] as File) : offerData,
    );

    dispatch(addOffer(data));
    reset();
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
      <form className={styles.form} onSubmit={handleSubmit(setOffer)}>
        <OfferInput
          control={control}
          register={register}
          contestType={contestType}
        />
        <button type="submit" className={styles.btnOffer}>
          Send Offer
        </button>
      </form>
    </div>
  );
};

export default OfferForm;
