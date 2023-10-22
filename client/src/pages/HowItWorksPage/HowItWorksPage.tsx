import { Footer, Header } from 'components/general';
import {
  ContactUs,
  Featured,
  GetStarted,
  GetStartedImages,
  HowContestsWork,
  HowItWorksCards,
  HowItWorksIntro,
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
        <GetStarted />
        <GetStartedImages />
        <ContactUs />
        <Featured />
      </main>
      <Footer />
    </>
  );
};

export default HowItWorksPage;
