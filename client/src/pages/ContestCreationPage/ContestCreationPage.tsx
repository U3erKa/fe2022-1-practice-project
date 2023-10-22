import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'hooks';
import { saveContestToStore } from 'store/slices/contestCreationSlice';

import { Footer, Header, ProgressBar } from 'components/general';
import { ContestForm } from 'components/contest';
import { ROUTE } from 'constants/general';
import styles from './styles/ContestCreationPage.module.sass';

import type { FC } from 'react';
import type { ContestInfo, SaveContestToStore } from 'types/api/contest';
import type { ContestType } from 'types/contest';
import type { FormikProps } from 'formik';

export type Props = {
  contestType: ContestType;
  title: string;
};

const ContestCreationPage: FC<Props> = ({ contestType, title }) => {
  const {
    contestCreationStore: { contests },
    bundleStore: { bundle },
  } = useSelector(({ contestCreationStore, bundleStore }) => ({
    contestCreationStore,
    bundleStore,
  }));
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formRef = useRef<FormikProps<ContestInfo>>();
  const contestData = contests[contestType]
    ? contests[contestType]!
    : { contestType: contestType };

  useEffect(() => {
    !bundle && navigate(ROUTE.START_CONTEST, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bundle]);

  const handleSubmit = (values: ContestInfo) => {
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

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

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
            defaultData={contestData as ContestInfo}
          />
        </div>
      </div>
      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          <div className={styles.buttonsContainer}>
            <div
              onClick={() => navigate(-1)}
              className={styles.prevButtonContainer}
            >
              <span>Back</span>
            </div>
            <div onClick={submitForm} className={styles.nextButtonContainer}>
              <span>Next</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContestCreationPage;
