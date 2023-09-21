import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/ChatError.module.sass';

const ChatError = (props) => {
  const { getData } = props;
  return (
    <div className={styles.errorContainer} onClick={() => getData()}>
      <div className={styles.container}>
        <span>Server Error</span>
        <FontAwesomeIcon icon={faRotateRight} />
      </div>
    </div>
  );
};

export default ChatError;
