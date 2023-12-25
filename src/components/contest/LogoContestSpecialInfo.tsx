import { type FC } from 'react';
import type { LogoContestInfo } from 'types/api/contest';
import styles from './styles/ContestInfo.module.scss';

export type Props = Pick<LogoContestInfo, 'nameVenture' | 'brandStyle'>;

const LogoContestSpecialInfo: FC<Props> = ({ nameVenture, brandStyle }) => {
  return (
    <>
      {nameVenture && (
        <div className={styles.dataContainer}>
          <span className={styles.label}>Name ventrure</span>
          <span className={styles.data}>{nameVenture}</span>
        </div>
      )}
      <div className={styles.dataContainer}>
        <span className={styles.label}>Brand Style</span>
        <span className={styles.data}>{brandStyle}</span>
      </div>
    </>
  );
};

export default LogoContestSpecialInfo;
