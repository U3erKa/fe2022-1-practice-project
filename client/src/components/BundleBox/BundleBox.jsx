import React from 'react';
import styles from './BundleBox.module.sass';
import CONSTANTS from '../../constants';

const BundleBox = props => {
  const defaultPathToImages = `${CONSTANTS.STATIC_IMAGES_PATH}contestLabels/`;

  const renderImage = () => {
    const array = [];
    for (let i = 0; i < props.path.length; i++) {
      array.push(
        <img
          src={defaultPathToImages + props.path[i]}
          key={i}
          className={styles.imgContainer}
          alt={props.path[i].replace(/.png/g, 'Contest')}
        />
      );
    }
    return array;
  };

  const mouseOverHandler = () => {
    const element = document.getElementById(props.header);
    for (let i = 0; i < element.children[0].children.length; i++) {
      element.children[0].children[
        i
      ].src = `${defaultPathToImages}blue_${props.path[i]}`;
    }
  };

  const mouseOutHandler = () => {
    const element = document.getElementById(props.header);
    for (let i = 0; i < element.children[0].children.length; i++) {
      element.children[0].children[i].src = defaultPathToImages + props.path[i];
    }
  };

  const getBackClass = () =>
    props.path.length === 1 ? ' ' : ` ${styles.combinedBundle}`;

  const { setBundle, header, describe } = props;
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
