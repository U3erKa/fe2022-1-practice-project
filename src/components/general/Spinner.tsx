import { ClipLoader } from 'react-spinners';
import styles from './styles/Spinner.module.scss';

const SpinnerLoader = () => (
  <div className={styles.loaderContainer}>
    <ClipLoader
      loading
      color="#46568a"
      cssOverride={{ borderColor: '#46568a' }}
      size={50}
    />
  </div>
);

export default SpinnerLoader;
