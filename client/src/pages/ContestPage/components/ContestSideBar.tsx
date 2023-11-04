import { useSelector } from 'hooks';
import { Picture } from 'components/general';
import { getLongTimeStr } from 'utils/functions';
import {
  ANONYM_IMAGE_PATH,
  PUBLIC_URL,
  STATIC_IMAGES_PATH,
} from 'constants/general';
import type { FC } from 'react';
import type { ContestData } from 'types/slices';
import styles from '../styles/ContestSideBar.module.sass';

export type Props = {
  totalEntries: number;
  contestData: ContestData;
};

const ContestSideBar: FC<Props> = ({ totalEntries, contestData }) => {
  const { data } = useSelector((state) => state.userStore);
  const { User, prize, createdAt } = contestData ?? {};

  if (!User) return null;

  return (
    <div className={styles.contestSideBarInfo}>
      <div className={styles.contestInfo}>
        <div className={styles.awardAndTimeContainer}>
          <div className={styles.prizeContainer}>
            <Picture
              srcSet={[
                `${STATIC_IMAGES_PATH}big-diamond.avif`,
                `${STATIC_IMAGES_PATH}big-diamond.webp`,
              ]}
              src={`${STATIC_IMAGES_PATH}big-diamond.png`}
              alt="diamond"
            />
            <span>{`$ ${prize}`}</span>
          </div>
          <div className={styles.timeContainer}>
            <div className={styles.timeDesc}>
              <Picture
                srcSet={[
                  `${STATIC_IMAGES_PATH}clock.avif`,
                  `${STATIC_IMAGES_PATH}clock.webp`,
                ]}
                src={`${STATIC_IMAGES_PATH}clock.png`}
                alt="clock"
              />
              <span>Going</span>
            </div>
            <span className={styles.time}>{getLongTimeStr(createdAt)}</span>
          </div>
          <div className={styles.guaranteedPrize}>
            <div>
              <Picture
                srcSet={[
                  `${STATIC_IMAGES_PATH}smallCheck.avif`,
                  `${STATIC_IMAGES_PATH}smallCheck.webp`,
                ]}
                src={`${STATIC_IMAGES_PATH}smallCheck.png`}
                alt="check"
              />
            </div>
            <span>Guaranteed prize</span>
          </div>
        </div>
        <div className={styles.contestStats}>
          <span>Contest Stats</span>
          <div className={styles.totalEntrie}>
            <span className={styles.totalEntriesLabel}>Total Entries</span>
            <span>{totalEntries}</span>
          </div>
        </div>
      </div>
      {data?.id !== User.id && (
        <div className={styles.infoCustomerContainer}>
          <span className={styles.labelCustomerInfo}>About Contest Holder</span>
          <div className={styles.customerInfo}>
            <img
              src={
                User.avatar === 'anon.png'
                  ? ANONYM_IMAGE_PATH
                  : `${PUBLIC_URL}${User.avatar}`
              }
              alt="user"
            />
            <div className={styles.customerNameContainer}>
              <span>{`${User.firstName} ${User.lastName}`}</span>
              <span>{User.displayName}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestSideBar;
