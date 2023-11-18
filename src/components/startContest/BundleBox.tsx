import type { FC } from 'react';
import clsx from 'clsx';
import { STATIC_IMAGES_PATH } from 'constants/general';
import styles from './styles/BundleBox.module.scss';

export type Props = {
  header: string;
  describe: string;
  path: string[];
  setBundle: (bundleStr: string) => void;
};

const BundleBox: FC<Props> = ({ header, path, setBundle, describe }) => {
  const defaultPathToImages = `${STATIC_IMAGES_PATH}contestLabels/`;

  const renderImage = () => {
    const array: JSX.Element[] = [];
    for (let i = 0; i < path.length; i++) {
      array.push(
        <img
          src={defaultPathToImages + path[i]}
          key={i}
          className={styles.imgContainer}
          alt={path[i].replace(/.png/g, 'Contest')}
        />,
      );
    }
    return array;
  };

  const mouseOverHandler = () => {
    const element = document.getElementById(header);
    const [{ children }] = element!.children;
    for (let i = 0; i < children.length; i++) {
      (children[i] as HTMLImageElement).src =
        `${defaultPathToImages}blue_${path[i]}`;
    }
  };

  const mouseOutHandler = () => {
    const element = document.getElementById(header);
    const [{ children }] = element!.children;
    for (let i = 0; i < children.length; i++) {
      (children[i] as HTMLImageElement).src = defaultPathToImages + path[i];
    }
  };

  return (
    <div
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      onClick={() => setBundle(header)}
      id={header}
      className={clsx(styles.bundleContainer, {
        [styles.combinedBundle]: path.length === 1,
      })}
    >
      <div>{renderImage()}</div>
      <div className={styles.infoContainer}>
        <span className={styles.bundleName}>{header}</span>
        <hr />
        <span className={styles.infoBundle}>{describe}</span>
      </div>
    </div>
  );
};

export default BundleBox;
