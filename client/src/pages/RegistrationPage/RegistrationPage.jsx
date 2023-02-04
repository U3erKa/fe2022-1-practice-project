import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../../components/Logo';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.sass';
import { clearAuthError } from '../../store/slices/authSlice';
import CONSTANTS from '../../constants';

const RegistrationPage = (props) => {
  props.clearError();

  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <div className={styles.headerSignUpPage}>
          <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} />
          <div className={styles.linkLoginContainer}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <span>Login</span>
            </Link>
          </div>
        </div>
        <RegistrationForm history={props.history} />
      </div>
      <div className={styles.footer}>
        <div className={styles.articlesMainContainer}>
          <div className={styles.ColumnContainer}>
            <div className={styles.headerArticle}>
              Why should I use Squadhelp?
            </div>
            <div className={styles.article}>
              You always have an option of hiring a consultant or coming up with
              the name yourself. However, Squadhelp builds great brands that
              succeed faster by connecting you with the most creative people
              across the globe. Most importantly, Squadhelp provides you with
              choice: you get to see ideas from dozens (in some cases, hundreds)
              of contestants before you select a winner. Typically, you would
              spend far less money with Squadhelp (our contests start at $199)
              than hiring an agency. Also, you will receive immediate results -
              most contests begin receiving submissions within minutes of
              starting.
            </div>
            <div className={styles.headerArticle}>
              How is Squadhelp Different?
            </div>
            <div className={styles.article}>
              Since 2011, we have been committed to disrupting the traditional
              agency model. Our platform offers much more than a typical
              crowdsourcing experience. From Machine Learning to Audience
              Testing to Comprehensive Trademark Validation, you receive
              best-in-class support for your branding projects. Breadth: Our
              Contest-Based Crowdsourcing approach allows you to receive an
              unmatched breadth of name ideas from dozens of unique, creative
              minds while working with the world's largest branding community.
              Quality and Collaboration: Using an advanced Quality Scoring
              Algorithm, we ensure that you receive more ideas from our
              top-quality creatives, and we use Gamification best practices to
              encourage high-quality brainstorming and two-way communication
              throughout your contest. We don’t stop at ideation: Choose your
              name with confidence through our high-end validation services.
              Poll your target demographics to get unbiased feedback on your
              favorite names, and receive Trademark Risk and Linguistics
              Analysis Reports developed by a Licensed Trademark Attorney.
            </div>
          </div>
          <div className={styles.ColumnContainer}>
            <div className={styles.headerArticle}>
              I’ve never used Squadhelp before. What should I expect?
            </div>
            <div className={styles.article}>
              Most customers tell us that Squadhelp’s process is effective,
              easy, fast, and even fun. We constantly hear extremely positive
              feedback with respect to the breadth of ideas submitted to each
              contest, and many customers are surprised at how insightful
              working with dozens of creative individuals from across the globe
              can be.
            </div>
            <div className={styles.headerArticle}>How much does it cost?</div>
            <div className={styles.article}>
              Our naming competitions start at $199, and our logo design
              competitions start at $299. Also, there are three additional
              contest level that each offer more features and benefits. See our
              Pricing Page for details.
            </div>
            <div className={styles.headerArticle}>
              Do you offer any discount for multiple contests?
            </div>
            <div className={styles.article}>
              Yes! We have many contest bundles - our most popular being our
              Name, Tagline, and Logo bundle. Bundles allow you to purchase
              multiple contests at one time and save as much as from $75 - $400.
              You can learn more about our bundle options on our Pricing Page.
            </div>
            <div className={styles.headerArticle}>
              Will you help me validate my name?
            </div>
            <div className={styles.article}>
              Yes! We believe that validating and securing your name is a
              critical part of your branding process. Squadhelp offers domain
              checks, Trademark support, linguistics analysis, and professional
              audience testing to help you choose your name with confidence. We
              even have special prices for Trademark filing for our customers.
            </div>
            <div className={styles.headerArticle}>
              I have other questions! How can I get in touch with Squadhelp?
            </div>
            <div className={styles.article}>
              Check out our <span className={styles.orangeSpan}>FAQs</span> or
              send us a<span className={styles.orangeSpan}>message</span>. For
              assistance with launching a contest, you can also call us at (877)
              355-3585 or schedule a
              <span className={styles.orangeSpan}>Branding Consultation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearError: () => dispatch(clearAuthError()),
});

export default connect(null, mapDispatchToProps)(RegistrationPage);
