import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/ChatError.module.sass';
import type { FC, MouseEventHandler } from 'react';

export type Props = {
  getData: MouseEventHandler<HTMLDivElement>;
};

const ChatError: FC<Props> = ({ getData }) => {
  return (
    <div className={styles.errorContainer} onClick={getData}>
      <div className={styles.container}>
        <span>Server Error</span>
        <FontAwesomeIcon icon={faRotateRight} />
      </div>
    </div>
  );
};

export default ChatError;
