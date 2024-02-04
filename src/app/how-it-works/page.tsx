import type { FC } from 'react';
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
} from 'components/how-it-works';

const HowItWorksPage = (() => (
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
)) satisfies FC;

export default HowItWorksPage;
