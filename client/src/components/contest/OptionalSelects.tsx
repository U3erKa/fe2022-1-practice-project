import { type FC } from 'react';
import { Spinner } from 'components/general';
import { FormInput, SelectInput } from 'components/input';
import { useSelector } from 'hooks';
import { LOGO_CONTEST, NAME_CONTEST, TAGLINE_CONTEST } from 'constants/general';
import type {
  ContestType,
  LogoContest,
  NameContest,
  TaglineContest,
} from 'types/contest';
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

  if (isFetching || !data) {
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
            optionsArray={data.typeOfName as NameContest['typeOfName'][]}
          />
          <SelectInput
            name="styleName"
            header="Style name"
            classes={selectClasses}
            optionsArray={data.nameStyle as NameContest['styleName'][]}
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
            optionsArray={data.brandStyle as LogoContest['brandStyle'][]}
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
            optionsArray={
              data.typeOfTagline as TaglineContest['typeOfTagline'][]
            }
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
