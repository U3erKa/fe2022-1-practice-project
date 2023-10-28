import { type FC, type MutableRefObject, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'hooks';
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
import { LOGO_CONTEST, NAME_CONTEST, TAGLINE_CONTEST } from 'constants/general';
import type { ContestType } from 'types/contest';
import type { ContestInfo } from 'types/api/contest';
import styles from './styles/ContestForm.module.sass';
import type { InferType } from 'yup';

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
  name?: string;
  contestType: ContestType;
  defaultData: Partial<ContestInfo>;
  handleSubmit: (values: InferType<typeof ContestSchem>) => void;
  formRef?: MutableRefObject<HTMLFormElement>;
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

const ContestForm: FC<Props> = (props) => {
  const { isEditContest, dataForContest } = useSelector(
    ({ contestByIdStore, dataForContest }) => ({
      isEditContest: contestByIdStore.isEditContest,
      dataForContest,
    }),
  );
  const dispatch = useDispatch();

  const { contestType, defaultData, handleSubmit: onSubmit, formRef } = props;
  const { isFetching, error, data: contestData } = dataForContest;
  const { handleSubmit, control } = useForm({
    defaultValues: {
      title: '',
      industry: '',
      focusOfWork: '',
      targetCustomer: '',
      file: '',
      ...variableOptions[contestType],
      ...defaultData,
    },
    resolver: yupResolver(ContestSchem),
  });

  useEffect(() => {
    getPreference();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contestType]);

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
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
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
            type="text"
            label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
            classes={textareaClasses}
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.inputHeader}>
            Tell us about your customers
          </span>
          <FormTextArea
            name="targetCustomer"
            type="text"
            label="customers"
            classes={textareaClasses}
          />
        </div>
        <OptionalSelects {...props} />
        <FieldFileInput name="file" classes={fileClasses} type="file" />
        {isEditContest ? (
          <button type="submit" className={styles.changeData}>
            Set Data
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default ContestForm;
