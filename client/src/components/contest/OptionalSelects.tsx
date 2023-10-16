import { type FC } from 'react';
import { Spinner } from 'components/general';
import { SelectInput, FormInput } from 'components/input';
import { useSelector } from 'hooks';
import { NAME_CONTEST, LOGO_CONTEST, TAGLINE_CONTEST } from 'constants/general';
import type { ContestType } from 'types/contest';
import styles from './styles/ContestForm.module.sass';

export type Props = {
  contestType: ContestType;
};

const selectClasses = {
  inputContainer: styles.selectInputContainer,
  inputHeader: styles.selectHeader,
  selectInput: styles.select,
  warning: styles.warning,
};
const inputClasses = {
  container: styles.componentInputContainer,
  input: styles.input,
  warning: styles.warning,
};

const OptionalSelects: FC<Props> = ({ contestType }) => {
  const { data, isFetching } = useSelector(
    ({ dataForContest }) => dataForContest,
  );

  if (isFetching) {
    return <Spinner />;
  }

  switch (contestType) {
    case NAME_CONTEST: {
      return (
        <>
          <SelectInput
            name="typeOfName"
            header="type of company"
            classes={selectClasses}
            optionsArray={data!.typeOfName}
          />
          <SelectInput
            name="styleName"
            header="Style name"
            classes={selectClasses}
            optionsArray={data!.nameStyle}
          />
        </>
      );
    }
    case LOGO_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={inputClasses}
            />
          </div>
          <SelectInput
            name="brandStyle"
            classes={selectClasses}
            header="Brand Style"
            optionsArray={data!.brandStyle}
          />
        </>
      );
    }
    case TAGLINE_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={inputClasses}
            />
          </div>
          <SelectInput
            name="typeOfTagline"
            classes={selectClasses}
            header="Type tagline"
            optionsArray={data!.typeOfTagline}
          />
        </>
      );
    }
    default: {
      return null;
    }
  }
};

export default OptionalSelects;
