import { Bundles } from 'components/contest';
import {
  Footer,
  Header,
  OnlyAuthorizedUser,
  ProgressBar,
} from 'components/general';
import { ButtonGroup } from 'components/startContest';
import { COMBO_BUNDLES, SINGLE_BUNDLES } from 'constants/contest';
import styles from './styles/page.module.scss';

const StartContestPage = () => (
  <OnlyAuthorizedUser>
    <Header />
    <main>
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>START A CONTEST</h2>
          <span>
            Launching a contest on Squadhelp is very simple. Select the type of
            contest you would like to launch from the list below. Provide a
            detailed brief and select a pricing package. Begin receiving
            submissions instantly!
          </span>
        </div>
        <ProgressBar currentStep={1} />
      </div>
      <div className={styles.baseBundleContainer}>
        <div className={styles.infoBaseBundles}>
          <span className={styles.headerInfo}>
            Our Most Popular <span>Categories</span>
          </span>
          <span className={styles.info}>
            Pick from our most popular categories, launch a contest and begin
            receiving submissions right away
          </span>
          <hr />
        </div>
        <div className={styles.baseBundles}>
          <Bundles bundles={SINGLE_BUNDLES} />
        </div>
      </div>
      <div className={styles.combinedBundles}>
        <div className={styles.infoCombinedBundles}>
          <span className={styles.headerInfo}>
            Save With Our Bundle Packages
          </span>
          <span className={styles.info}>
            Launch multiple contests and pay a discounted bundle price
          </span>
          <hr />
        </div>
        <div className={styles.baseBundles}>
          <Bundles bundles={COMBO_BUNDLES} />
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <ButtonGroup />
      </div>
    </main>
    <Footer />
  </OnlyAuthorizedUser>
);

export default StartContestPage;
