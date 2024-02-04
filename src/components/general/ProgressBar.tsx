import type { FC, JSX } from 'react';
import styles from './styles/ProgressBar.module.scss';

export type Props = { readonly currentStep: number };

const renderBar = (count: number, currentStep: number) => {
  let classOuter = styles.outerNotActive;
  let classInner = styles.innerNotActive;
  let classProgress = '';
  if (count === currentStep) {
    classOuter = styles.outerActive;
    classInner = styles.innerActive;
    classProgress = styles.progressContainer;
  } else if (count < currentStep) {
    classOuter = styles.outerComplete;
    classInner = styles.innerComplete;
  }
  return (
    <div className={classProgress} key={count}>
      <div className={styles.progressBarContainer}>
        <div className={classOuter}>
          <div className={classInner} />
        </div>
        {count !== 3 && <div className={styles.lineBar} />}
      </div>
    </div>
  );
};

const ProgressBar: FC<Props> = ({ currentStep }) => {
  const renderProgress = () => {
    const array: JSX.Element[] = [];
    for (let i = 1; i <= 3; i++) {
      array.push(renderBar(i, currentStep));
    }
    return array;
  };

  return <div className={styles.progressBarContainer}>{renderProgress()}</div>;
};
export default ProgressBar;
