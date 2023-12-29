import clsx from 'clsx';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';
import styles from './styles/BundleBox.module.scss';

export type Props = {
  readonly header: string;
  readonly describe: string;
  readonly icons: [StaticImageData, StaticImageData][];
  readonly setBundle: (bundleStr: string) => void;
};

const BundleBox: FC<Props> = ({ header, icons, setBundle, describe }) => {
  const images = icons.map(([image, activeImage]) => (
    <div className={styles.images} key={`${image.src}_${activeImage.src}`}>
      <Image
        alt={image.src.replace(/.png/g, 'Contest')}
        className={styles.imgContainer}
        height={48}
        src={image}
        width={48}
      />
      <Image
        alt={image.src.replace(/.png/g, 'Contest')}
        className={styles.imgContainer}
        height={48}
        src={activeImage}
        width={48}
      />
    </div>
  ));

  return (
    <div
      id={header}
      className={clsx(styles.bundleContainer, {
        [styles.combinedBundle]: icons.length === 1,
      })}
      onClick={() => {
        setBundle(header);
      }}
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
