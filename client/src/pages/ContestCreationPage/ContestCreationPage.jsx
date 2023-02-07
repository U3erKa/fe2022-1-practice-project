import { useRef } from 'react';
import { connect } from 'react-redux';

import { saveContestToStore } from 'store/slices/contestCreationSlice';
import { ProgressBar, Footer, Header } from 'components';
import { ContestForm } from 'components/Contest';
import { NextButton, BackButton } from 'components/InputComponents';

import styles from './ContestCreationPage.module.sass';

const ContestCreationPage = (props) => {
  const formRef = useRef();
  const contestData = props.contestCreationStore.contests[props.contestType]
    ? props.contestCreationStore.contests[props.contestType]
    : { contestType: props.contestType };

  const handleSubmit = (values) => {
    props.saveContest({ type: props.contestType, info: values });
    const route =
      props.bundleStore.bundle[props.contestType] === 'payment'
        ? '/payment'
        : `${props.bundleStore.bundle[props.contestType]}Contest`;
    props.history.push(route);
  };

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  !props.bundleStore.bundle && props.history.replace('/startContest');

  return (
    <div>
      <Header />
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>{props.title}</h2>
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
            contestType={props.contestType}
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

const mapStateToProps = (state) => {
  const { contestCreationStore, bundleStore } = state;
  return { contestCreationStore, bundleStore };
};

const mapDispatchToProps = (dispatch) => ({
  saveContest: (data) => dispatch(saveContestToStore(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContestCreationPage);
