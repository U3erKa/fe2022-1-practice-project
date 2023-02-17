import { Link } from 'react-router-dom';

import { DUMMY_LINK, FOOTER_ITEMS } from 'constants/general';
import styles from './styles/Footer.module.sass';

const Footer = () => {
  const topFooterRender = FOOTER_ITEMS.map(({ title, items }) => (
    <div key={title}>
      <h4>{title}</h4>
      {items.map((item) => (
        <Link key={item} to={DUMMY_LINK}>
          {item}
        </Link>
      ))}
    </div>
  ));

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div>{topFooterRender}</div>
      </div>
    </div>
  );
};

export default Footer;
