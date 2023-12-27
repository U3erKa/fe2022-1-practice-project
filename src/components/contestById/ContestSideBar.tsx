import Image from 'next/image';
import type { FC } from 'react';
import { useSelector } from 'hooks';
import { UserImage } from 'components/general';
import { PUBLIC_URL } from 'constants/general';
import { getLongTimeStr } from 'utils/functions';
import BigDiamondIcon from 'assets/icons/big-diamond.png';
import ClockIcon from 'assets/icons/clock.png';
import SmallCheckIcon from 'assets/icons/smallCheck.png';
import type { ContestData } from 'types/slices';
import styles from './styles/ContestSideBar.module.scss';

export type Props = {
  readonly totalEntries: number;
  readonly contestData: ContestData;
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
            <Image src={BigDiamondIcon} alt="diamond" />
            <span>{`$ ${prize}`}</span>
          </div>
          <div className={styles.timeContainer}>
            <div className={styles.timeDesc}>
              <Image src={ClockIcon} alt="clock" />
              <span>Going</span>
            </div>
            <span className={styles.time}>{getLongTimeStr(createdAt)}</span>
          </div>
          <div className={styles.guaranteedPrize}>
            <div>
              <Image src={SmallCheckIcon} alt="check" />
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
            <UserImage src={`${PUBLIC_URL}${User.avatar}`} />
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
