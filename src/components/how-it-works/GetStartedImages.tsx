import Image from 'next/image';
import { GET_STARTED_IMAGES } from 'constants/howItWorks';
import styles from './styles/GetStartedImages.module.scss';

const GetStartedImages = () => {
  const images = GET_STARTED_IMAGES.map(({ id, src, alt, caption }) => {
    return (
      <figure className={styles.card} key={id}>
        <Image alt={alt} className={styles.icon} src={src} />
        <figcaption className={styles.text}>{caption}</figcaption>
      </figure>
    );
  });

  return <article className={styles.cardContainer}>{images}</article>;
};

export default GetStartedImages;
