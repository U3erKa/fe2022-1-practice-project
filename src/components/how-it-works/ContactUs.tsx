import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { HOW_IT_WORKS_PATH } from 'constants/general';
import styles from './styles/ContactUs.module.scss';
import type { FC } from 'react';

export const ContactUs: FC = () => {
  return (
    <article className={styles.container}>
      <ul className={styles.contentsContainer}>
        <li className={styles.contents}>
          <FontAwesomeIcon icon={faAngleRight} />
          <section>
            <h3 className={styles.smallHeading}>
              Pay a Fraction of cost vs hiring an agency
            </h3>
            <p className={styles.text}>
              For as low as $199, our naming contests and marketplace allow you
              to get an amazing brand quickly and affordably.
            </p>
          </section>
        </li>
        <li className={styles.contents}>
          <FontAwesomeIcon icon={faAngleRight} />
          <section>
            <h3 className={styles.bigHeading}>Satisfaction Guarantee</h3>
            <p className={styles.text}>
              Of course! We have policies in place to ensure that you are
              satisfied with your experience.{' '}
              <Link href={'/how-it-works#satisfaction'}>Learn more</Link>
            </p>
          </section>
        </li>
      </ul>
      <section className={styles.contactsContainer}>
        <h3 className={styles.heading}>Questions?</h3>
        <p className={styles.text}>
          Speak with a Squadhelp platform expert to learn more and get your
          questions answered.
        </p>
        <button className={styles.button}>Schedule Consultation</button>
        <a className={styles.link} href="tel:+8773553585">
          <img src={`${HOW_IT_WORKS_PATH}phone.svg`} alt="phone" />
          (877) 355-3585
        </a>
        <p>Call us for assistance</p>
      </section>
    </article>
  );
};

export default ContactUs;
