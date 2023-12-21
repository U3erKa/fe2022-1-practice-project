'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'store';
import { Footer, Header, ProgressBar } from 'components/general';
import { BundleBox, ButtonGroup } from 'components/startContest';
import { CUSTOMER, PAGE } from 'constants/general';
import { updateBundle } from 'store/slices/bundleSlice';
import LogoIcon from 'assets/contestLabels/Logo.png';
import NameIcon from 'assets/contestLabels/Name.png';
import TaglineIcon from 'assets/contestLabels/Tagline.png';
import BlueLogoIcon from 'assets/contestLabels/blue_Logo.png';
import BlueNameIcon from 'assets/contestLabels/blue_Name.png';
import BlueTaglineIcon from 'assets/contestLabels/blue_Tagline.png';
import type { Bundle } from 'types/slices';
import styles from './styles/page.module.scss';

const StartContestPage = () => {
  const userStore = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (userStore.data?.role !== CUSTOMER) {
      router.replace(PAGE.HOME);
    }
  }, [router, userStore.data?.role]);

  const setBundle = (bundleStr: string) => {
    const array = bundleStr.toLowerCase().split('+');
    const bundleList = { first: array[0] } as unknown as Bundle;
    for (let i = 0; i < array.length; i++) {
      bundleList[array[i] as keyof typeof bundleList] =
        i === array.length - 1 ? 'payment' : array[i + 1];
    }
    dispatch(updateBundle(bundleList));
    router.push(`${PAGE.START_CONTEST}/${bundleList.first}`);
  };

  return (
    <div>
      <Header />
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
          <BundleBox
            icons={[[NameIcon, BlueNameIcon]]}
            header="Name"
            describe="Get up and running with the perfect name."
            setBundle={setBundle}
          />
          <BundleBox
            icons={[[LogoIcon, BlueLogoIcon]]}
            header="Logo"
            describe="Kickstart your venture with a unique, memorable logo."
            setBundle={setBundle}
          />
          <BundleBox
            icons={[[TaglineIcon, BlueTaglineIcon]]}
            header="Tagline"
            describe="Connect deeply with your target audience with an on-target tagline."
            setBundle={setBundle}
          />
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
          <BundleBox
            icons={[
              [NameIcon, BlueNameIcon],
              [LogoIcon, BlueLogoIcon],
            ]}
            header="Name+Logo"
            describe="Get the essentials needed to establish your brand together and save."
            setBundle={setBundle}
          />
          <BundleBox
            icons={[
              [NameIcon, BlueNameIcon],
              [TaglineIcon, BlueTaglineIcon],
            ]}
            header="Name+Tagline"
            describe="Communicate your vision with the perfect Name/Tagline combo."
            setBundle={setBundle}
          />
          <BundleBox
            icons={[
              [LogoIcon, BlueLogoIcon],
              [TaglineIcon, BlueTaglineIcon],
            ]}
            header="Tagline+Logo"
            describe="Description for Logo + Tagline will come here."
            setBundle={setBundle}
          />
          <BundleBox
            icons={[
              [NameIcon, BlueNameIcon],
              [LogoIcon, BlueLogoIcon],
              [TaglineIcon, BlueTaglineIcon],
            ]}
            header="Name+Tagline+Logo"
            describe="Establish your entire brand identity and save with this bundle."
            setBundle={setBundle}
          />
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <ButtonGroup />
      </div>
      <Footer />
    </div>
  );
};

export default StartContestPage;
