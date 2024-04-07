import Link from 'next/link';
import { FOOTER_ITEMS, PAGE } from 'constants/general';
import styles from './styles/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footerTop}>
      <article>
        {FOOTER_ITEMS.map(({ title, items }) => (
          <section key={title}>
            <h2>{title}</h2>
            {items.map((item) => (
              <Link href={PAGE.DUMMY_LINK} key={item}>
                {item}
              </Link>
            ))}
          </section>
        ))}
      </article>
    </footer>
  );
};

export default Footer;
