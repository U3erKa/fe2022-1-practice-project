import type { FC } from 'react';
import type { GetContestResponse } from 'api/rest/contestController';
import styles from './styles/ContestInfo.module.scss';

export type Props = Pick<GetContestResponse, 'nameVenture' | 'typeOfTagline'>;

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
