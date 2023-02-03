import React from 'react';
import styles from './ContestInfo.module.sass';

const NameContestSpecialInfo = props => {
  const { typeOfName, styleName } = props;
  return (
    <>
      <div className={styles.dataContainer}>
        <span className={styles.label}>Type of Name</span>
        <span className={styles.data}>{typeOfName}</span>
      </div>
      <div className={styles.dataContainer}>
        <span className={styles.label}>Style of Name</span>
        <span className={styles.data}>{styleName}</span>
      </div>
    </>
  );
};

export default NameContestSpecialInfo;
