import { withRouter } from 'hocs';

import history from 'browserHistory';
import styles from './Notification.module.sass';

const Notification = (props) => (
  <div>
    <br />
    <span>{props.message}</span>
    <br />
    {props.contestId && (
      <span
        onClick={() => history.push(`/contest/${props.contestId}`)}
        className={styles.goToContest}
      >
        Go to contest
      </span>
    )}
  </div>
);

export default withRouter(Notification);
