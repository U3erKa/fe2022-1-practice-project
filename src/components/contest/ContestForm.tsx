import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'hooks';
import { OptionalSelects } from 'components/contest';
import { Spinner, TryAgain } from 'components/general';
import {
  FieldFileInput,
  FormInput,
  FormTextArea,
  SelectInput,
} from 'components/input';
import {
  LOGO_CONTEST,
  NAME_CONTEST,
  PAGE,
  TAGLINE_CONTEST,
} from 'constants/general';
import { saveContestToStore } from 'store/slices/contestCreationSlice';
import { getDataForContest } from 'store/slices/dataForContestSlice';
import { type Contest, ContestSchema } from 'utils/schemas';
import type { ContestInfo, SaveContestToStore } from 'types/contest';
import type { ContestType } from 'types/contest';
import styles from './styles/ContestForm.module.scss';

const variableOptions = {
  [NAME_CONTEST]: {
    styleName: '',
    typeOfName: '',
  },
  [LOGO_CONTEST]: {
    nameVenture: '',
    brandStyle: '',
  },
  [TAGLINE_CONTEST]: {
    nameVenture: '',
    typeOfTagline: '',
  },
};

export type Props = {
  readonly contestType: ContestType;
};

const inputClasses = {
  container: styles.componentInputContainer,
  input: styles.input,
  warning: styles.warning,
};
const selectClasses = {
  inputContainer: styles.selectInputContainer,
  inputHeader: styles.selectHeader,
  selectInput: styles.select,
  warning: styles.warning,
};
const textareaClasses = {
  container: styles.componentInputContainer,
  inputStyle: styles.textArea,
  warning: styles.warning,
};
const fileClasses = {
  fileInput: styles.fileInput,
  fileNameClass: styles.fileName,
  fileUploadContainer: styles.fileUploadContainer,
  labelClass: styles.label,
  warning: styles.warning,
};

const ContestForm: FC<Props> = ({ contestType }) => {
  const { bundle, contests, dataForContest, isEditContest } = useSelector(
    ({
      bundleStore,
      contestByIdStore,
      contestCreationStore,
      dataForContest,
    }) => {
      const { bundle } = bundleStore;
      const { contests } = contestCreationStore;
      const { isEditContest } = contestByIdStore;
      return { bundle, contests, dataForContest, isEditContest };
    },
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const defaultContestData = contests[contestType]
    ? contests[contestType]
    : ({ contestType } as unknown as ContestInfo);
  const { isFetching, error, data: contestData } = dataForContest;

  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      file: '',
      focusOfWork: '',
      industry: '',
      targetCustomer: '',
      title: '',
      ...variableOptions[contestType],
      ...defaultContestData,
    },
    resolver: zodResolver(ContestSchema),
  });

  useEffect(() => {
    getPreference();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contestType]);

  const onSubmit = (values: Contest) => {
    const { file, ...restValues } = values;

    dispatch(
      saveContestToStore({
        info: restValues,
        type: contestType,
      } as SaveContestToStore),
    );
    const route =
      bundle![contestType] === 'payment'
        ? PAGE.PAYMENT
        : `${PAGE.START_CONTEST}/${bundle![contestType]}`;
    router.push(route);
  };

  const getPreference = useCallback(() => {
    switch (contestType) {
      case NAME_CONTEST: {
        dispatch(
          getDataForContest({
            characteristic1: 'nameStyle',
            characteristic2: 'typeOfName',
          }),
        );
        break;
      }
      case TAGLINE_CONTEST: {
        dispatch(getDataForContest({ characteristic1: 'typeOfTagline' }));
        break;
      }
      case LOGO_CONTEST: {
        dispatch(getDataForContest({ characteristic1: 'brandStyle' }));
        break;
      }
      default: {
        throw new TypeError(`${contestType} is not supported contest type`);
      }
    }
  }, [contestType, dispatch]);

  if (error) {
    return <TryAgain getData={getPreference} />;
  }
  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <span className={styles.inputHeader}>Title of contest</span>
          <FormInput
            classes={inputClasses}
            control={control}
            name="title"
            placeholder="Title"
          />
        </div>
        <div className={styles.inputContainer}>
          <SelectInput
            classes={selectClasses}
            control={control}
            header="Describe industry associated with your venture"
            name="industry"
            // @ts-expect-error
            optionsArray={contestData?.industry}
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.inputHeader}>
            What does your company / business do?
          </span>
          <FormTextArea
            classes={textareaClasses}
            control={control}
            name="focusOfWork"
            placeholder="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.inputHeader}>
            Tell us about your customers
          </span>
          <FormTextArea
            classes={textareaClasses}
            control={control}
            name="targetCustomer"
            placeholder="customers"
          />
        </div>
        <OptionalSelects contestType={contestType} control={control} />
        <FieldFileInput
          classes={fileClasses}
          control={control}
          name="file"
          register={register}
        />
        {isEditContest ? (
          <button className={styles.changeData} type="submit">
            Set Data
          </button>
        ) : null}
        <div className={styles.footerButtonsContainer}>
          <div className={styles.lastContainer}>
            <div className={styles.buttonsContainer}>
              <button
                className={styles.prevButtonContainer}
                type="button"
                onClick={router.back}
              >
                Back
              </button>
              <button className={styles.nextButtonContainer} type="submit">
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContestForm;
