import { type FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/TryAgain.module.sass';

export type Props = {
  getData: () => void;
};

const TryAgain: FC<Props> = ({ getData }) => {
  return (
    <div className={styles.container}>
      <span onClick={getData}>Server Error. Try again</span>
      <FontAwesomeIcon icon={faRotateRight} onClick={getData} />
    </div>
  );
};

export default TryAgain;
