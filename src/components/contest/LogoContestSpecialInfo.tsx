import type { FC } from 'react';
import type { GetContestResponse } from 'api/rest/contestController';
import styles from './styles/ContestInfo.module.scss';

export type Props = Pick<GetContestResponse, 'brandStyle' | 'nameVenture'>;

const LogoContestSpecialInfo: FC<Props> = ({ nameVenture, brandStyle }) => {
  return (
    <>
      {nameVenture ? (
        <div className={styles.dataContainer}>
          <span className={styles.label}>Name ventrure</span>
          <span className={styles.data}>{nameVenture}</span>
        </div>
      ) : null}
      <div className={styles.dataContainer}>
        <span className={styles.label}>Brand Style</span>
        <span className={styles.data}>{brandStyle}</span>
      </div>
    </>
  );
};

export default LogoContestSpecialInfo;
