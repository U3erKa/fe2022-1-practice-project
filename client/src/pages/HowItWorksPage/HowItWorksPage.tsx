import { Footer, Header } from 'components/general';
import {
  HowItWorksIntro,
  HowItWorksCards,
  HowContestsWork,
  HowItWorksQnA,
} from '.';
import type { FC } from 'react';

const HowItWorksPage: FC = () => {
  return (
    <>
      <Header />
      <main>
        <HowItWorksIntro />
        <HowItWorksCards />
        <HowContestsWork />
        <HowItWorksQnA />
      </main>
      <Footer />
    </>
  );
};

export default HowItWorksPage;
