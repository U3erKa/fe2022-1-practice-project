import { ClipLoader } from 'react-spinners';

import styles from './styles/Spinner.module.scss';

const SpinnerLoader = () => (
  <div className={styles.loaderContainer}>
    <ClipLoader
      cssOverride={{ borderColor: '#46568a' }}
      size={50}
      color="#46568a"
      loading
    />
  </div>
);

export default SpinnerLoader;
