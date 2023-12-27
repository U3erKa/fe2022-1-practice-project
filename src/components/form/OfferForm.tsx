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
  readonly contestType: ContestType;
  readonly control: Control<any>;
  readonly register: UseFormRegister<any>;
};

export type OfferFormProps = WithId<Id, 'contestId' | 'customerId'> & {
  readonly contestType: ContestType;
};

const formInputClassses = {
  container: styles.inputContainer,
  input: styles.input,
  notValid: styles.notValid,
  warning: styles.fieldWarning,
} satisfies FormInputClasses;

const imageUploadClasses = {
  imgStyle: styles.imgStyle,
  inputContainer: styles.uploadInputContainer,
  uploadContainer: styles.imageUploadContainer,
};

const OfferInput: FC<Props> = ({ control, register, contestType }) => {
  return contestType === LOGO_CONTEST ? (
    <ImageUpload
      classes={imageUploadClasses}
      control={control}
      name="offerData"
      register={register}
    />
  ) : (
    <FormInput
      classes={formInputClassses}
      control={control}
      name="offerData"
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
      {addOfferError ? (
        <Error
          clearError={() => dispatch(clearAddOfferError())}
          data={addOfferError.data}
          status={addOfferError.status}
        />
      ) : null}
      <form className={styles.form} onSubmit={handleSubmit(setOffer)}>
        <OfferInput
          contestType={contestType}
          control={control}
          register={register}
        />
        <button className={styles.btnOffer} type="submit">
          Send Offer
        </button>
      </form>
    </div>
  );
};

export default OfferForm;
