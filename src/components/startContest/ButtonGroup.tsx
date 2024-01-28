'use client';

import clsx from 'clsx/lite';
import { useDispatch, useSelector } from 'hooks';
import { BUTTONS, NAME_ONLY_CHOISE } from 'constants/buttonGroup';
import { changeNameMathesDomain } from 'store/slices/contestCreationSlice';
import styles from './styles/ButtonGroup.module.scss';

const ButtonGroup = () => {
  const nameMathesDomain = useSelector(
    ({ contestCreationStore }) => contestCreationStore.nameMathesDomain,
  );
  const dispatch = useDispatch();

  return BUTTONS.map(({ id, choise, text }) => (
    <button
      key={id}
      className={clsx(
        styles.button,
        nameMathesDomain === choise && styles.active,
      )}
      onClick={() => dispatch(changeNameMathesDomain(choise))}
    >
      <h3 className={styles.choise}>
        {choise !== NAME_ONLY_CHOISE ? 'Yes' : 'No'}
      </h3>
      <p className={styles.text}>{text}</p>
    </button>
  ));
};

export default ButtonGroup;
