'use client';

import { useRouter } from 'next/navigation';
import type { FC } from 'react';
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
  const { bundle, user } = useSelector(({ bundleStore, userStore }) => {
    const { bundle } = bundleStore;
    const { data: user } = userStore;
    return { bundle, user };
  });
  const router = useRouter();

  if (!user || !bundle) {
    router.replace(user ? PAGE.START_CONTEST : PAGE.HOME);
    return null;
  }

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
