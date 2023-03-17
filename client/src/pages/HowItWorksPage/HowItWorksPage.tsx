import { Footer, Header } from 'components/general';
import {
  HowItWorksIntro,
  HowItWorksCards,
  HowContestsWork,
} from './components/HowItWorks';
import type { FC } from 'react';

const HowItWorksPage: FC = () => {
  return (
    <>
      <Header />
      <main>
        <HowItWorksIntro />
        <HowItWorksCards />
        <HowContestsWork />
      </main>
      <Footer />
    </>
  );
};

export default HowItWorksPage;
