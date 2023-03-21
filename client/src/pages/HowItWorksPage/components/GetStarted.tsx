import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { GET_STARTED_IMAGES } from 'constants/howItWorks';
import type { FC } from 'react';

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

export default GetStarted;
