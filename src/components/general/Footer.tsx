import Link from 'next/link';

import { DUMMY_LINK, FOOTER_ITEMS } from 'constants/general';
import styles from './styles/Footer.module.scss';

const Footer = () => {
  const topFooterRender = FOOTER_ITEMS.map(({ title, items }) => (
    <section key={title}>
      <h2>{title}</h2>
      {items.map((item) => (
        <Link key={item} href={DUMMY_LINK}>
          {item}
        </Link>
      ))}
    </section>
  ));

  return (
    <footer className={styles.footerTop}>
      <article>{topFooterRender}</article>
    </footer>
  );
};

export default Footer;