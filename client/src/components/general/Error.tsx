import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Error.module.sass';

const Error = (props) => {
  const getMessage = () => {
    const { status, data } = props;
    switch (status) {
      case 404:
        return data;
      case 400:
        return 'Check the input data';
      case 409:
        return data;
      case 403:
        return 'Bank decline transaction';
      case 406:
        return data;
      default:
        return 'Server Error';
    }
  };

  const { clearError } = props;
  return (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      <FontAwesomeIcon icon={faCircleXmark} onClick={() => clearError()} />
    </div>
  );
};

export default Error;
