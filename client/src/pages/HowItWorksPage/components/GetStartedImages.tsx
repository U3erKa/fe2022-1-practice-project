import { Fragment } from 'react';
import { uniqueId } from 'utils/functions';
import { GET_STARTED_IMAGES } from 'constants/howItWorks';
import styles from '../styles/GetStartedImages.module.sass';

const GetStartedImages = () => {
  const images = GET_STARTED_IMAGES.map(({ src, alt, caption }) => {
    const captionElement = caption.map((entry) => (
      <Fragment key={uniqueId('caption')}>{entry}</Fragment>
    ));

    return (
      <figure className={styles.card} key={uniqueId('img')}>
        <img className={styles.icon} src={src} alt={alt} />
        <figcaption className={styles.text}>{captionElement}</figcaption>
      </figure>
    );
  });

  return <article className={styles.cardContainer}>{images}</article>;
};

export default GetStartedImages;
