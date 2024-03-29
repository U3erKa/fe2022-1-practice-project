import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { PAGE } from 'constants/general';
import PhoneImage from 'assets/howItWorks/phone.svg';
import styles from './styles/ContactUs.module.scss';

export const ContactUs: FC = () => (
  <article className={styles.container}>
    <ul className={styles.contentsContainer}>
      <li className={styles.contents}>
        <FontAwesomeIcon icon={faAngleRight} />
        <section>
          <h3 className={styles.smallHeading}>
            Pay a Fraction of cost vs hiring an agency
          </h3>
          <p className={styles.text}>
            For as low as $199, our naming contests and marketplace allow you to
            get an amazing brand quickly and affordably.
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
            <Link href={`${PAGE.HOW_IT_WORKS}#satisfaction`}>Learn more</Link>
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
        <Image alt="phone" src={PhoneImage} />
        (877) 355-3585
      </a>
      <p>Call us for assistance</p>
    </section>
  </article>
);

export default ContactUs;
