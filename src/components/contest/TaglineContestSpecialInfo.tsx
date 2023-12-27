import { type FC } from 'react';
import type { TaglineContestInfo } from 'types/api/contest';
import styles from './styles/ContestInfo.module.scss';

export type Props = Pick<TaglineContestInfo, 'nameVenture' | 'typeOfTagline'>;

const TaglineContestSpecialInfo: FC<Props> = ({
  nameVenture,
  typeOfTagline,
}) => {
  return (
    <>
      {nameVenture ? (
        <div className={styles.dataContainer}>
          <span className={styles.label}>Name ventrure</span>
          <span className={styles.data}>{nameVenture}</span>
        </div>
      ) : null}
      <div className={styles.dataContainer}>
        <span className={styles.label}>Type of Taglinee</span>
        <span className={styles.data}>{typeOfTagline}</span>
      </div>
    </>
  );
};

export default TaglineContestSpecialInfo;
