import cx from 'classnames';
import { BUTTONS, NAME_ONLY_CHOISE } from 'constants/buttonGroup';

import styles from '../styles/ButtonGroup.module.sass';
export default function ButtonGroup() {
  const buttons = BUTTONS.map(({ choise, text }) => (
    <button
      className={cx({
        [styles.button]: true,
        [styles.active]: nameMathesDomain === choise,
      })}
    >
      <h3 className={styles.choise}>
        {choise !== NAME_ONLY_CHOISE ? 'Yes' : 'No'}
      </h3>
      <p className={styles.text}>{text}</p>
    </button>
  ));
  return <>{buttons}</>;
}
