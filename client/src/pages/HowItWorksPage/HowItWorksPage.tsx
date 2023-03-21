import { Footer, Header } from 'components/general';
import {
  HowItWorksIntro,
  HowItWorksCards,
  HowContestsWork,
  HowItWorksQnA,
  GetStarted,
  ContactUs,
  Featured,
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
        <GetStarted />
        <ContactUs />
        <Featured />
      </main>
      <Footer />
    </>
  );
};

export default HowItWorksPage;
