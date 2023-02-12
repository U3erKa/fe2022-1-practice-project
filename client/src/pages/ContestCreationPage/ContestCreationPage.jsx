import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { saveContestToStore } from 'store/slices/contestCreationSlice';
import { ProgressBar, Footer, Header } from 'components';
import { ContestForm } from 'components/Contest';
import { NextButton, BackButton } from 'components/InputComponents';

import styles from './ContestCreationPage.module.sass';
import history from 'browserHistory';

const ContestCreationPage = ({ contestType, title }) => {
  const {
    contestCreationStore: { contests },
    bundleStore: { bundle },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const formRef = useRef();
  const contestData = contests[contestType]
    ? contests[contestType]
    : { contestType: contestType };

  const handleSubmit = (values) => {
    dispatch(saveContestToStore({ type: contestType, info: values }));
    const route =
      bundle[contestType] === 'payment'
        ? '/payment'
        : `${bundle[contestType]}Contest`;
    history.push(route);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  !bundle && history.replace('/startContest');

  return (
    <div>
      <Header />
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>{title}</h2>
          <span>
            Tell us a bit more about your business as well as your preferences
            so that creatives get a better idea about what you are looking for
          </span>
        </div>
        <ProgressBar currentStep={2} />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <ContestForm
            contestType={contestType}
            handleSubmit={handleSubmit}
            formRef={formRef}
            defaultData={contestData}
          />
        </div>
      </div>
      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          <div className={styles.buttonsContainer}>
            <BackButton />
            <NextButton submit={submitForm} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContestCreationPage;
