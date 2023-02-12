import { withRouter } from 'hocs';

import history from 'browserHistory';
import styles from './BackButton.module.sass';

const BackButton = (props) => {
  function clickHandler() {
    history.back();
  }

  return (
    <div onClick={clickHandler} className={styles.buttonContainer}>
      <span>Back</span>
    </div>
  );
};

export default withRouter(BackButton);
