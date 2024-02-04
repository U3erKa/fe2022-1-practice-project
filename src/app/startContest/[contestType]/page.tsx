'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'hooks';
import { ContestForm } from 'components/contest';
import { Footer, Header, ProgressBar } from 'components/general';
import {
  LOGO_CONTEST,
  NAME_CONTEST,
  PAGE,
  TAGLINE_CONTEST,
} from 'constants/general';
import type { ContestType } from 'types/contest';
import styles from './styles/page.module.scss';

type Props = {
  readonly params: { readonly contestType: ContestType };
};

const TITLES = {
  [NAME_CONTEST]: 'COMPANY NAME',
  [LOGO_CONTEST]: 'LOGO',
  [TAGLINE_CONTEST]: 'TAGLINE',
};

const ContestCreationPage = ({ params: { contestType } }: Props) => {
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
    <>
      <Header />
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>{TITLES[contestType]}</h2>
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
    </>
  );
};

export default ContestCreationPage;
