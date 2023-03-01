import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';

import styles from './styles/Spinner.module.sass';

const override = css`
  border-color: #46568a;
`;

const SpinnerLoader = () => (
  <div className={styles.loaderContainer}>
    <ClipLoader
      // @ts-expect-error
      sizeUnit="px"
      css={override}
      size={50}
      color="#46568a"
      loading
    />
  </div>
);

export default SpinnerLoader;
