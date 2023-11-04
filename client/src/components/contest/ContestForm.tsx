import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import { useDispatch, useSelector } from 'hooks';
import { saveContestToStore } from 'store/slices/contestCreationSlice';
import { getDataForContest } from 'store/slices/dataForContestSlice';
import { Spinner, TryAgain } from 'components/general';
import { OptionalSelects } from 'components/contest';
import {
  FieldFileInput,
  FormInput,
  FormTextArea,
  SelectInput,
} from 'components/input';
import { ContestSchem } from 'utils/validators/validationSchems';
import {
  LOGO_CONTEST,
  NAME_CONTEST,
  ROUTE,
  TAGLINE_CONTEST,
} from 'constants/general';
import type { ContestType } from 'types/contest';
import type { SaveContestToStore } from 'types/api/contest';
import styles from './styles/ContestForm.module.sass';

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
  contestType: ContestType;
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
  fileUploadContainer: styles.fileUploadContainer,
  labelClass: styles.label,
  fileNameClass: styles.fileName,
  fileInput: styles.fileInput,
  warning: styles.warning,
};

const ContestForm: FC<Props> = ({ contestType }) => {
  const { isEditContest, dataForContest, bundle, contests } = useSelector(
    ({
      contestCreationStore,
      contestByIdStore,
      dataForContest,
      bundleStore,
    }) => ({
      isEditContest: contestByIdStore.isEditContest,
      dataForContest,
      bundle: bundleStore.bundle,
      contests: contestCreationStore.contests,
    }),
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultContestData = contests[contestType]
    ? contests[contestType]
    : { contestType };
  const { isFetching, error, data: contestData } = dataForContest;

  const { handleSubmit, control, register } = useForm({
    defaultValues: {
      title: '',
      industry: '',
      focusOfWork: '',
      targetCustomer: '',
      file: '',
      ...variableOptions[contestType],
      ...defaultContestData,
    },
    resolver: yupResolver(ContestSchem),
  });

  useEffect(() => {
    getPreference();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contestType]);

  const onSubmit = (values: InferType<typeof ContestSchem>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { file, ...restValues } = values;

    dispatch(
      saveContestToStore({
        type: contestType,
        info: restValues,
      } as SaveContestToStore),
    );
    const route =
      bundle![contestType] === 'payment'
        ? ROUTE.PAYMENT
        : `${ROUTE.START_CONTEST}/${bundle![contestType]}Contest`;
    navigate(route);
  };

  const getPreference = () => {
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
  };

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
            name="title"
            control={control}
            placeholder="Title"
            classes={inputClasses}
          />
        </div>
        <div className={styles.inputContainer}>
          <SelectInput
            name="industry"
            control={control}
            classes={selectClasses}
            header="Describe industry associated with your venture"
            // @ts-expect-error
            optionsArray={contestData?.industry}
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.inputHeader}>
            What does your company / business do?
          </span>
          <FormTextArea
            name="focusOfWork"
            control={control}
            placeholder="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
            classes={textareaClasses}
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.inputHeader}>
            Tell us about your customers
          </span>
          <FormTextArea
            name="targetCustomer"
            control={control}
            placeholder="customers"
            classes={textareaClasses}
          />
        </div>
        <OptionalSelects control={control} contestType={contestType} />
        <FieldFileInput
          name="file"
          control={control}
          register={register}
          classes={fileClasses}
        />
        {isEditContest ? (
          <button type="submit" className={styles.changeData}>
            Set Data
          </button>
        ) : null}
        <div className={styles.footerButtonsContainer}>
          <div className={styles.lastContainer}>
            <div className={styles.buttonsContainer}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={styles.prevButtonContainer}
              >
                Back
              </button>
              <button type="submit" className={styles.nextButtonContainer}>
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
