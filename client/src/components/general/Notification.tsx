import { Link } from 'react-router-dom';

import styles from './styles/Notification.module.scss';

export type Props = {
  contestId?: number;
  message: string;
};

const Notification = ({ contestId, message }: Props) => (
  <div>
    <br />
    <span>{message}</span>
    <br />
    {contestId && (
      <Link to={`/contest/${contestId}`} className={styles.goToContest}>
        Go to contest
      </Link>
    )}
  </div>
);

export default Notification;
