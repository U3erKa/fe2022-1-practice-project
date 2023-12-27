import clsx from 'clsx';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { type FC } from 'react';
import styles from './styles/BundleBox.module.scss';

export type Props = {
  readonly header: string;
  readonly describe: string;
  readonly icons: [StaticImageData, StaticImageData][];
  readonly setBundle: (bundleStr: string) => void;
};

const BundleBox: FC<Props> = ({ header, icons, setBundle, describe }) => {
  const images = icons.map(([image, activeImage], i) => (
    <div className={styles.images} key={i}>
      <Image
        width={48}
        height={48}
        src={image}
        className={styles.imgContainer}
        alt={image.src.replace(/.png/g, 'Contest')}
      />
      <Image
        width={48}
        height={48}
        src={activeImage}
        className={styles.imgContainer}
        alt={image.src.replace(/.png/g, 'Contest')}
      />
    </div>
  ));

  return (
    <div
      onClick={() => setBundle(header)}
      id={header}
      className={clsx(styles.bundleContainer, {
        [styles.combinedBundle]: icons.length === 1,
      })}
    >
      {images}
      <div className={styles.infoContainer}>
        <span className={styles.bundleName}>{header}</span>
        <hr />
        <span className={styles.infoBundle}>{describe}</span>
      </div>
    </div>
  );
};

export default BundleBox;
