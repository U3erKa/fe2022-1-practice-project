import { STATIC_IMAGES_PATH } from 'constants/general';
import styles from '../styles/BundleBox.module.sass';

const BundleBox = ({ header, path, setBundle, describe }) => {
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
    const { children } = element.children[0];
    for (let i = 0; i < children.length; i++) {
      children[i].src = `${defaultPathToImages}blue_${path[i]}`;
    }
  };

  const mouseOutHandler = () => {
    const element = document.getElementById(header);
    const { children } = element.children[0];
    for (let i = 0; i < children.length; i++) {
      children[i].src = defaultPathToImages + path[i];
    }
  };

  const getBackClass = () =>
    path.length === 1 ? ' ' : ` ${styles.combinedBundle}`;

  return (
    <div
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      onClick={() => setBundle(header)}
      id={header}
      className={styles.bundleContainer + getBackClass()}
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
