import { HOW_IT_WORKS_PATH } from 'constants/general';
import type { FC } from 'react';

export const HowItWorksIntro: FC = () => {
  return (
    <article>
      <section>
        <h4>World's #1 Naming Platform</h4>
        <h1>How Does Squadhelp Work?</h1>
        <p>
          Squadhelp helps you come up with a great name for your business by
          combining the power of crowdsourcing with sophisticated technology and
          Agency-level validation services.
        </p>
        <a href="https://vimeo.com/368584367" target="_blank" rel="noreferrer">
          Play video
        </a>
      </section>
      <figure>
        <img src={`${HOW_IT_WORKS_PATH}main.svg`} alt="main icon" />
      </figure>
    </article>
  );
};

export default HowItWorksIntro;
