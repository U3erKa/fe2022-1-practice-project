import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/TryAgain.module.sass';

const TryAgain = (props) => {
  const { getData } = props;
  return (
    <div className={styles.container}>
      <span onClick={() => getData()}>Server Error. Try again</span>
      <FontAwesomeIcon icon={faRotateRight} onClick={() => getData()} />
    </div>
  );
};

export default TryAgain;
