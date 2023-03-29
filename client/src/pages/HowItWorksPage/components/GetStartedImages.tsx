import { Fragment } from 'react';
import { uniqueId } from 'lodash';
import { GET_STARTED_IMAGES } from 'constants/howItWorks';

const GetStartedImages = () => {
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

  return <article>{images}</article>;
};

export default GetStartedImages;
