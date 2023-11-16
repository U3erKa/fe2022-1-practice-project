import { useRouter } from 'next/navigation';
import { type FC } from 'react';
import { capitalize } from 'radash';
import { Picture } from 'components/general';
import { getLongTimeStr } from 'utils/functions';
import {
  LOGO_CONTEST,
  NAME_CONTEST,
  STATIC_IMAGES_PATH,
} from 'constants/general';
import type { ContestId } from 'types/api/_common';
import type { Contest } from 'types/contest';
import styles from './styles/ContestBox.module.scss';

export type Props = { data: Contest };

const ContestBox: FC<Props> = ({ data }) => {
  const router = useRouter();

  const goToExtended = (contest_id: ContestId) => {
    router.push(`/contest/${contest_id}`);
  };

  const getPreferenceContest = () => {
    if (data.contestType === NAME_CONTEST) return data.typeOfName;
    if (data.contestType === LOGO_CONTEST) return data.brandStyle;
    return data.typeOfTagline;
  };

  const { id, title, contestType, prize, count } = data;
  return (
    <div
      className={styles.contestBoxContainer}
      onClick={() => goToExtended(id)}
    >
      <div className={styles.mainContestInfo}>
        <div className={styles.titleAndIdContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.id}>{`(#${id})`}</span>
        </div>
        <div className={styles.contestType}>
          <span>{`${capitalize(
            contestType,
          )} / ${getPreferenceContest()}`}</span>
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
          <div className={styles.prize}>
            <Picture
              srcSet={[
                `${STATIC_IMAGES_PATH}diamond.avif`,
                `${STATIC_IMAGES_PATH}diamond.webp`,
              ]}
              src={`${STATIC_IMAGES_PATH}diamond.png`}
              alt="diamond"
            />
            <span>{`$${prize}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.entryAndTimeContainer}>
        <div className={styles.entriesContainer}>
          <div className={styles.entriesCounter}>
            <Picture
              srcSet={[
                `${STATIC_IMAGES_PATH}entrieImage.avif`,
                `${STATIC_IMAGES_PATH}entrieImage.webp`,
              ]}
              src={`${STATIC_IMAGES_PATH}entrieImage.png`}
              alt="logo"
            />
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