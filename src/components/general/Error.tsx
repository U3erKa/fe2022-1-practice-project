import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC } from 'react';
import styles from './styles/Error.module.scss';

export type Props = {
  readonly status: number;
  readonly data: string;
  readonly clearError: () => void;
};

const Error: FC<Props> = ({ status, data, clearError }) => {
  let message = 'Server Error';
  switch (status) {
    case 400:
      message = 'Check the input data';
      break;
    case 403:
      message = 'Bank decline transaction';
      break;
    case 404:
    case 406:
    case 409:
      message = data;
  }

  return (
    <p className={styles.errorContainer}>
      <span>{message}</span>
      <FontAwesomeIcon icon={faCircleXmark} onClick={clearError} />
    </p>
  );
};

export default Error;
