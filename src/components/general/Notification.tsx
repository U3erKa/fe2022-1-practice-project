import Link from 'next/link';
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
    {contestId ? (
      <Link href={`/contest/${contestId}`} className={styles.goToContest}>
        Go to contest
      </Link>
    ) : null}
  </div>
);

export default Notification;
