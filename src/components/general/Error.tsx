import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type FC } from 'react';
import styles from './styles/Error.module.scss';

export type Props = {
  status: number;
  data: string;
  clearError: () => void;
};

const Error: FC<Props> = ({ status, data, clearError }) => {
  const getMessage = () => {
    switch (status) {
      case 400:
        return 'Check the input data';
      case 403:
        return 'Bank decline transaction';
      case 404:
      case 406:
      case 409:
        return data;
      default:
        return 'Server Error';
    }
  };

  return (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      <FontAwesomeIcon icon={faCircleXmark} onClick={clearError} />
    </div>
  );
};

export default Error;
