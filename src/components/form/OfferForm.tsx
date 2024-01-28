import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, type FC } from 'react';
import {
  useForm,
  type FieldValues,
  type UseControllerProps,
  type UseFormReturn,
} from 'react-hook-form';
import { useDispatch, useSelector } from 'hooks';
import { Error } from 'components/general';
import { FormInput, ImageUpload } from 'components/input';
import type { FormInputClasses } from 'components/input/FormInput';
import { LOGO_CONTEST } from 'constants/general';
import { addOffer, clearAddOfferError } from 'store/slices/contestByIdSlice';
import {
  LogoOfferSchema,
  TextOfferSchema,
  type LogoOffer,
  type TextOffer,
} from 'utils/schemas';
import type { WithId } from 'types/_common';
import type { ContestType } from 'types/contest';
import styles from './styles/OfferForm.module.scss';

export type Props<T extends FieldValues> = Pick<
  UseControllerProps<T>,
  'control'
> &
  Pick<UseFormReturn<T>, 'register'> & {
    readonly contestType: ContestType;
  };

export type OfferFormProps = WithId<'contestId' | 'customerId'> & {
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

const name = 'offerData';

const OfferInput = function ({
  control,
  register,
  contestType,
}: Props<{ [name]: string }>) {
  return contestType === LOGO_CONTEST ? (
    <ImageUpload
      classes={imageUploadClasses}
      control={control}
      name={name}
      register={register}
    />
  ) : (
    <FormInput
      classes={formInputClassses}
      control={control}
      name={name}
      placeholder="your suggestion"
    />
  );
};

const OfferForm: FC<OfferFormProps> = ({
  contestId,
  contestType,
  customerId,
}) => {
  const addOfferError = useSelector(
    ({ contestByIdStore }) => contestByIdStore.addOfferError,
  );
  const dispatch = useDispatch();
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: { offerData: '' },
    resolver: zodResolver(
      contestType === LOGO_CONTEST ? LogoOfferSchema : TextOfferSchema,
    ),
  });

  const setOffer = useCallback(
    ({ offerData }: LogoOffer | TextOffer) => {
      dispatch(clearAddOfferError());
      const data = new FormData();

      data.append('contestId', contestId as unknown as string);
      data.append('contestType', contestType);
      data.append('customerId', customerId as unknown as string);
      data.append(
        'offerData',
        offerData instanceof FileList ? offerData[0]! : offerData,
      );

      dispatch(addOffer(data));
      reset();
    },
    [contestId, contestType, customerId, dispatch, reset],
  );

  const handleClearError = useCallback(
    () => dispatch(clearAddOfferError()),
    [dispatch],
  );

  return (
    <div className={styles.offerContainer}>
      {addOfferError ? (
        <Error
          clearError={handleClearError}
          data={(addOfferError as any).data}
          status={(addOfferError as any).status}
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
