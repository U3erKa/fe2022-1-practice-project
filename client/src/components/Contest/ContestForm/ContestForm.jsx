import { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { getDataForContest } from 'store/slices/dataForContestSlice';
import { Spinner, TryAgain } from 'components/general';
import { OptionalSelects } from 'components/Contest';
import {
  FormInput,
  SelectInput,
  FieldFileInput,
  FormTextArea,
} from 'components/InputComponents';

import { ContestSchem } from 'utils/validators/validationSchems';
import { NAME_CONTEST, LOGO_CONTEST, TAGLINE_CONTEST } from 'constants/general';
import styles from './ContestForm.module.sass';

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

const ContestForm = (props) => {
  const { isEditContest, dataForContest } = useSelector(
    ({ contestByIdStore, dataForContest }) => ({
      isEditContest: contestByIdStore.isEditContest,
      dataForContest,
    }),
  );
  const dispatch = useDispatch();

  const { contestType, defaultData, handleSubmit, formRef } = props;
  const { isFetching, error, data: contestData } = dataForContest;

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

  useEffect(() => {
    getPreference();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <TryAgain getData={getPreference} />;
  }
  if (isFetching) {
    return <Spinner />;
  }

  return (
    <>
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            title: '',
            industry: '',
            focusOfWork: '',
            targetCustomer: '',
            file: '',
            ...variableOptions[contestType],
            ...defaultData,
          }}
          onSubmit={handleSubmit}
          validationSchema={ContestSchem}
          innerRef={formRef}
          enableReinitialize
        >
          <Form>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>Title of contest</span>
              <FormInput
                name="title"
                type="text"
                label="Title"
                classes={{
                  container: styles.componentInputContainer,
                  input: styles.input,
                  warning: styles.warning,
                }}
              />
            </div>
            <div className={styles.inputContainer}>
              <SelectInput
                name="industry"
                classes={{
                  inputContainer: styles.selectInputContainer,
                  inputHeader: styles.selectHeader,
                  selectInput: styles.select,
                  warning: styles.warning,
                }}
                header="Describe industry associated with your venture"
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
                classes={{
                  container: styles.componentInputContainer,
                  inputStyle: styles.textArea,
                  warning: styles.warning,
                }}
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
                classes={{
                  container: styles.componentInputContainer,
                  inputStyle: styles.textArea,
                  warning: styles.warning,
                }}
              />
            </div>
            <OptionalSelects {...props} />
            <FieldFileInput
              name="file"
              classes={{
                fileUploadContainer: styles.fileUploadContainer,
                labelClass: styles.label,
                fileNameClass: styles.fileName,
                fileInput: styles.fileInput,
                warning: styles.warning,
              }}
              type="file"
            />
            {isEditContest ? (
              <button type="submit" className={styles.changeData}>
                Set Data
              </button>
            ) : null}
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default ContestForm;
