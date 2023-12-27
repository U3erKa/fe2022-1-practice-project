'use client';

import { useRouter } from 'next/navigation';
import { type FC, useEffect } from 'react';
import { useSelector } from 'hooks';
import { ContestForm } from 'components/contest';
import { Footer, Header, ProgressBar } from 'components/general';
import { PAGE } from 'constants/general';
import type { ContestType } from 'types/contest';
import styles from './styles/page.module.scss';

export type Props = {
  readonly params: { contestType: ContestType };
  readonly title: string;
};

const ContestCreationPage: FC<Props> = ({ params: { contestType }, title }) => {
  const bundle = useSelector(({ bundleStore }) => bundleStore.bundle);
  const router = useRouter();

  useEffect(() => {
    !bundle && router.replace(PAGE.START_CONTEST);
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
