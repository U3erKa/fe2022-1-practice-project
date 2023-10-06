import { useNavigate } from 'react-router-dom';
import { Picture } from 'components/general';
import { getDays, getHours } from 'utils/functions';
import {
  LOGO_CONTEST,
  NAME_CONTEST,
  STATIC_IMAGES_PATH,
} from 'constants/general';
import styles from './styles/ContestBox.module.sass';

const ContestBox = ({ data }) => {
  const navigate = useNavigate();

  const goToExtended = (contest_id) => {
    navigate(`/contest/${contest_id}`);
  };

  const getTimeStr = () => {
    const diff = new Date().valueOf() - new Date(data.createdAt).valueOf();
    const days = getDays(diff);
    const hours = getHours(diff);
    let str = '';

    if (days !== 0) str = `${days}d `;
    if (hours !== 0) str += `${hours}h`;
    return str || 'less than one hour';
  };

  const getPreferenceContest = () => {
    if (data.contestType === NAME_CONTEST) return data.typeOfName;
    if (data.contestType === LOGO_CONTEST) return data.brandStyle;
    return data.typeOfTagline;
  };

  const ucFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

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
          <span>{`${ucFirstLetter(
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
          <span className={styles.timeContest}>{getTimeStr()}</span>
          <span>Going</span>
        </div>
      </div>
    </div>
  );
};

export default ContestBox;
