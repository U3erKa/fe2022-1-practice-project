import { Link } from 'react-router-dom';

import styles from './styles/Notification.module.sass';

const Notification = ({ contestId, message }) => (
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
