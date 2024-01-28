import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { capitalize } from 'radash';
import type { FC } from 'react';
import { LOGO_CONTEST, NAME_CONTEST } from 'constants/general';
import { getLongTimeStr } from 'utils/functions';
import DiamondIcon from 'assets/icons/diamond.png';
import EntryImageIcon from 'assets/icons/entrieImage.png';
import SmallCheckIcon from 'assets/icons/smallCheck.png';
import type { ContestId } from 'types/_common';
import type { Contest } from 'types/contest';
import styles from './styles/ContestBox.module.scss';

export type Props = { readonly data: Contest };

const ContestBox: FC<Props> = ({ data }) => {
  const router = useRouter();

  const goToExtended = (contest_id: ContestId) => {
    router.push(`/contest/${contest_id}`);
  };

  const {
    brandStyle,
    contestType,
    count,
    id,
    prize,
    title,
    typeOfName,
    typeOfTagline,
  } = data;

  let preferenceContest:
    | typeof brandStyle
    | typeof typeOfName
    | typeof typeOfTagline = typeOfTagline;
  if (contestType === NAME_CONTEST) preferenceContest = typeOfName;
  else if (contestType === LOGO_CONTEST) preferenceContest = brandStyle;

  return (
    <div
      className={styles.contestBoxContainer}
      onClick={() => {
        goToExtended(id);
      }}
    >
      <div className={styles.mainContestInfo}>
        <div className={styles.titleAndIdContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.id}>{`(#${id})`}</span>
        </div>
        <div className={styles.contestType}>
          <span>{`${capitalize(contestType)} / ${preferenceContest}`}</span>
        </div>
        <div className={styles.contestType}>
          <span>
            This is an Invitation Only Contest and is only open to those
            Creatives who have achieved a Tier A status.
          </span>
        </div>
        <div className={styles.prizeContainer}>
          <div className={styles.guaranteedContainer}>
            <div>
              <Image alt="check" src={SmallCheckIcon} />
            </div>
            <span>Guaranteed prize</span>
          </div>
          <div className={styles.prize}>
            <Image alt="diamond" src={DiamondIcon} />
            <span>{`$${prize}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.entryAndTimeContainer}>
        <div className={styles.entriesContainer}>
          <div className={styles.entriesCounter}>
            <Image alt="entry image" src={EntryImageIcon} />
            <span>{count}</span>
          </div>
          <span>Entries</span>
        </div>
        <div className={styles.timeContainer}>
          <span className={styles.timeContest}>
            {getLongTimeStr(data.createdAt)}
          </span>
          <span>Going</span>
        </div>
      </div>
    </div>
  );
};

export default ContestBox;
