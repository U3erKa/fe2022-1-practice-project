import Link from 'next/link';
import styles from './styles/Notification.module.scss';

export type Props = {
  readonly contestId?: number;
  readonly message: string;
};

const Notification = ({ contestId, message }: Props) => (
  <div>
    <br />
    <span>{message}</span>
    <br />
    {contestId ? (
      <Link className={styles.goToContest} href={`/contest/${contestId}`}>
        Go to contest
      </Link>
    ) : null}
  </div>
);

export default Notification;
