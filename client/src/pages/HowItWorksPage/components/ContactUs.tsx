import { Link } from 'react-router-dom';
import { STATIC_IMAGES_PATH } from 'constants/general';
import type { FC } from 'react';

export const ContactUs: FC = () => {
  return (
    <article>
      <div>
        <section>
          <h3>Pay a Fraction of cost vs hiring an agency</h3>
          <p>
            For as low as $199, our naming contests and marketplace allow you to
            get an amazing brand quickly and affordably.
          </p>
        </section>
        <section>
          <h3>Satisfaction Guarantee</h3>
          <p>
            Of course! We have policies in place to ensure that you are
            satisfied with your experience.{' '}
            <Link to={'/how-it-works#satisfaction'}>Learn more</Link>
          </p>
        </section>
      </div>
      <section>
        <h3>Questions?</h3>
        <p>
          Speak with a Squadhelp platform expert to learn more and get your
          questions answered.
        </p>
        <button>Schedule Consultation</button>
        <a href="tel:+8773553585">
          <img src={`${STATIC_IMAGES_PATH}phone.png`} alt="phone" />
          (877) 355-3585
        </a>
        <p>Call us for assistance</p>
      </section>
    </article>
  );
};

export default ContactUs;
