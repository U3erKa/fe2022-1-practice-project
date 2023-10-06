import clsx from 'clsx';
import { useSelector, useDispatch } from 'hooks';
import { changeNameMathesDomain } from 'store/slices/contestCreationSlice';
import { BUTTONS, NAME_ONLY_CHOISE } from 'constants/buttonGroup';
import styles from '../styles/ButtonGroup.module.sass';

export default function ButtonGroup() {
  const { nameMathesDomain } = useSelector(
    ({ contestCreationStore }) => contestCreationStore,
  );
  const dispatch = useDispatch();

  const buttons = BUTTONS.map(({ id, choise, text }) => (
    <button
      key={id}
      className={clsx({
        [styles.button]: true,
        [styles.active]: nameMathesDomain === choise,
      })}
      onClick={() => dispatch(changeNameMathesDomain(choise))}
    >
      <h3 className={styles.choise}>
        {choise !== NAME_ONLY_CHOISE ? 'Yes' : 'No'}
      </h3>
      <p className={styles.text}>{text}</p>
    </button>
  ));
  return <>{buttons}</>;
}
