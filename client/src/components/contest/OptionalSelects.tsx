import { type FC } from 'react';
import { type Control } from 'react-hook-form';
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
  control: Control<any>;
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

const CONTEST_NAME = {
  [NAME_CONTEST]: ['typeOfName', 'styleName'],
  [LOGO_CONTEST]: ['nameVenture', 'brandStyle'],
  [TAGLINE_CONTEST]: ['nameVenture', 'typeOfTagline'],
} as const;

const OptionalSelects: FC<Props> = ({ contestType, control }) => {
  const { data, isFetching } = useSelector(
    ({ dataForContest }) => dataForContest,
  );

  const [firstContestName, secondContestName] = CONTEST_NAME[contestType];

  if (isFetching || !data) {
    return <Spinner />;
  }

  switch (contestType) {
    case NAME_CONTEST: {
      return (
        <>
          <SelectInput
            name={firstContestName}
            header="type of company"
            control={control}
            classes={selectClasses}
            optionsArray={data.typeOfName as NameContest['typeOfName'][]}
          />
          <SelectInput
            name={secondContestName}
            header="Style name"
            control={control}
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
              name={firstContestName}
              placeholder="name of venture"
              control={control}
              classes={inputClasses}
            />
          </div>
          <SelectInput
            name={secondContestName}
            header="Brand Style"
            control={control}
            classes={selectClasses}
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
              name={firstContestName}
              placeholder="name of venture"
              control={control}
              classes={inputClasses}
            />
          </div>
          <SelectInput
            name={secondContestName}
            header="Type tagline"
            control={control}
            classes={selectClasses}
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
