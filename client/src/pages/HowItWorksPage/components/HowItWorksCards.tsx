import { Link } from 'react-router-dom';
import { DUMMY_LINK } from 'constants/general';
import { HOW_IT_WORKS_CARDS } from 'constants/howItWorks';
import type { FC } from 'react';

export const HowItWorksCards: FC = () => {
  const cards = HOW_IT_WORKS_CARDS.map(
    ({ heading, text, src, href, linkText }) => (
      <section key={src}>
        <img src={src} alt={`${heading.toLowerCase()} icon`} />
        <h3>{heading}</h3>
        <p>{text}</p>
        <Link to={href ?? DUMMY_LINK}>{linkText ?? heading}</Link>
      </section>
    ),
  );

  return (
    <article>
      <h4>Our Services</h4>
      <h2>3 Ways To Use Squadhelp</h2>
      <p>
        Squadhelp offers 3 ways to get you a perfect name for your business.
      </p>
      {cards}
    </article>
  );
};

export default HowItWorksCards;
