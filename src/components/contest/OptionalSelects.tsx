import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { useSelector } from 'hooks';
import { Spinner } from 'components/general';
import { FormInput, SelectInput } from 'components/input';
import { LOGO_CONTEST, NAME_CONTEST, TAGLINE_CONTEST } from 'constants/general';
import type { ContestType } from 'types/contest';
import styles from './styles/ContestForm.module.scss';

export type Props = {
  readonly control: Control<any>;
  readonly contestType: ContestType;
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
  const { data, isFetching } = useSelector(({ dataForContest }) => {
    const { data, isFetching } = dataForContest;
    return { data, isFetching };
  });

  const [firstContestName, secondContestName] = CONTEST_NAME[contestType];

  if (isFetching || !data) {
    return <Spinner />;
  }

  switch (contestType) {
    case NAME_CONTEST: {
      return (
        <>
          <SelectInput
            classes={selectClasses}
            control={control}
            header="type of company"
            name={firstContestName}
            optionsArray={data.typeOfName!}
          />
          <SelectInput
            classes={selectClasses}
            control={control}
            header="Style name"
            name={secondContestName}
            optionsArray={data.nameStyle!}
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
              classes={inputClasses}
              control={control}
              name={firstContestName}
              placeholder="name of venture"
            />
          </div>
          <SelectInput
            classes={selectClasses}
            control={control}
            header="Brand Style"
            name={secondContestName}
            optionsArray={data.brandStyle!}
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
              classes={inputClasses}
              control={control}
              name={firstContestName}
              placeholder="name of venture"
            />
          </div>
          <SelectInput
            classes={selectClasses}
            control={control}
            header="Type tagline"
            name={secondContestName}
            optionsArray={data.typeOfTagline!}
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
