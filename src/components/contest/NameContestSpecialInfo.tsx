import { type FC } from 'react';
import type { NameContestInfo } from 'types/api/contest';
import styles from './styles/ContestInfo.module.scss';

export type Props = Pick<NameContestInfo, 'typeOfName' | 'styleName'>;

const NameContestSpecialInfo: FC<Props> = ({ typeOfName, styleName }) => {
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
