import { Link } from 'react-router-dom';
import { DUMMY_LINK } from 'constants/general';
import { HOW_IT_WORKS_CARDS, HOW_CONTESTS_WORK } from 'constants/howItWorks';
import type { FC } from 'react';

export const HowItWorksIntro: FC = () => {
  return (
    <article>
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
    </article>
  );
};
export const HowItWorksCards: FC = () => {
  return (
    <article>
      <h4>Our Services</h4>
      <h2>3 Ways To Use Squadhelp</h2>
      <p>
        Squadhelp offers 3 ways to get you a perfect name for your business.
      </p>
      {HOW_IT_WORKS_CARDS.map(({ heading, text, src, href, linkText }, i) => (
        <section key={i}>
          <img src={src} alt="icon" />
          <h3>{heading}</h3>
          <p>{text}</p>
          <Link to={href ?? DUMMY_LINK}>{linkText ?? heading}</Link>
        </section>
      ))}
    </article>
  );
};
export const HowContestsWork: FC = () => {
  return (
    <article>
      <img src="" alt="icon" />
      <h2>How Do Naming Contests Work?</h2>
      <img src="" alt="person using laptop" />
      <ol>
        {HOW_CONTESTS_WORK.map((listEntry, i) => (
          <li key={i}>
            <p>{listEntry}</p>
          </li>
        ))}
      </ol>
    </article>
  );
};
