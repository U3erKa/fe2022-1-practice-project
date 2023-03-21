import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { uniqueId } from 'lodash';
import {
  DUMMY_LINK,
  HOW_IT_WORKS_PATH,
  STATIC_IMAGES_PATH,
} from 'constants/general';
import {
  HOW_IT_WORKS_CARDS,
  HOW_CONTESTS_WORK,
  GET_STARTED_IMAGES,
  FEATURED,
} from 'constants/howItWorks';
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
        <img src={`${HOW_IT_WORKS_PATH}main.svg`} alt="main icon" />
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
          <img src={`${HOW_IT_WORKS_PATH}howContestsWork1.svg`} alt="icon" />
      <h2>How Do Naming Contests Work?</h2>
        <img
          src={`${HOW_IT_WORKS_PATH}howContestsWork2.svg`}
          alt="how contests work icon"
        />
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

export const GetStarted: FC = () => {
  const images = GET_STARTED_IMAGES.map(({ src, alt, caption }) => {
    const captionElement = caption.map((entry) => (
      <Fragment key={uniqueId('caption')}>{entry}</Fragment>
    ));

    return (
      <figure key={uniqueId('img')}>
        <img src={src} alt={alt} />
        <figcaption>{captionElement}</figcaption>
      </figure>
    );
  });

  return (
    <article>
      <section>
        <h2>Ready to get started?</h2>
        <p>
          Fill out your contest brief and begin receiving custom name
          suggestions within minutes.
        </p>
        <Link to={'/startContest'}>Start A Contest</Link>
      </section>
      <section>{images}</section>
    </article>
  );
};

export const ContactUs: FC = () => {
  return (
    <article>
      <div>
        <section>
          <h3>Pay a Fraction of cost vs hiring an agency</h3>
          <p>
            For as low as $199, our naming contests and marketplace allow you to
            get an amazing brand quickly and affordably.
          </p>
        </section>
        <section>
          <h3>Satisfaction Guarantee</h3>
          <p>
            Of course! We have policies in place to ensure that you are
            satisfied with your experience.{' '}
            <Link to={'/how-it-works#satisfaction'}>Learn more</Link>
          </p>
        </section>
      </div>
      <section>
        <h3>Questions?</h3>
        <p>
          Speak with a Squadhelp platform expert to learn more and get your
          questions answered.
        </p>
        <button>Schedule Consultation</button>
        <a href="tel:+8773553585">
          <img src={`${STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          (877) 355-3585
        </a>
        <p>Call us for assistance</p>
      </section>
    </article>
  );
};

export const Featured: FC = () => {
  return (
    <article>
      <h2>Featured In</h2>
      {FEATURED.map(({ src, alt, href }) => (
        <a key={alt} href={href}>
          <img src={src} alt={alt} />
        </a>
      ))}
    </article>
  );
};
