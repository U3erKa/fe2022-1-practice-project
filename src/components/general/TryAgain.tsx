import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import styles from './styles/TryAgain.module.scss';

export type Props = {
  readonly getData: () => void;
};

const TryAgain: FC<Props> = ({ getData }) => (
  <div className={styles.container}>
    <span onClick={getData}>Server Error. Try again</span>
    <FontAwesomeIcon icon={faRotateRight} onClick={getData} />
  </div>
);

export default TryAgain;
