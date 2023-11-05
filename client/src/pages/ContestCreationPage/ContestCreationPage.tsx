import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'hooks';
import { Footer, Header, ProgressBar } from 'components/general';
import { ContestForm } from 'components/contest';
import { ROUTE } from 'constants/general';
import type { ContestType } from 'types/contest';
import styles from './styles/ContestCreationPage.module.scss';

export type Props = {
  contestType: ContestType;
  title: string;
};

const ContestCreationPage: FC<Props> = ({ contestType, title }) => {
  const bundle = useSelector(({ bundleStore }) => bundleStore.bundle);
  const navigate = useNavigate();

  useEffect(() => {
    !bundle && navigate(ROUTE.START_CONTEST, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bundle]);

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
          <ContestForm contestType={contestType} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContestCreationPage;
