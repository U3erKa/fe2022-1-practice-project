import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import CONSTANTS from '../../constants';
import SlideBar from '../../components/SlideBar/SlideBar';
import Footer from '../../components/Footer/Footer';
import styles from './Home.module.sass';
import carouselConstants from '../../carouselConstants';
import Spinner from '../../components/Spinner/Spinner';

const Home = props => {
  const [index, setIndex] = useState(0);
  const [styleName, setStyle] = useState(styles.headline__static);
  let timeout;

  useEffect(() => {
    timeout = setInterval(() => {
      setIndex(index + 1);
      setStyle(styles.headline__isloading);
    }, 3000);
    return () => {
      setStyle(styles.headline__static);
      clearInterval(timeout);
    };
  });

  const { isFetching } = props;
  const text =
    CONSTANTS.HEADER_ANIMATION_TEXT[
      index % CONSTANTS.HEADER_ANIMATION_TEXT.length
    ];
  return (
    <>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.headerBar}>
              <div className={styles.headline}>
                <span>Find the Perfect Name for</span>
                <span className={styleName}>{text}</span>
              </div>
              <p>
                Launch a naming contest to engage hundreds of naming experts as
                you’re guided through our agency-level naming process. Or,
                explore our hand-picked collection of premium names available
                for immediate purchase
              </p>
              <div className={styles.button}>
                <Link className={styles.button__link} to='/dashboard'>
                  DASHBOARD
                </Link>
              </div>
            </div>
            <div className={styles.greyContainer}>
              <SlideBar
                images={carouselConstants.mainSliderImages}
                carouselType={carouselConstants.MAIN_SLIDER}
              />
            </div>
            <div className={styles.container__description}>
              <h2 className={styles.blueUnderline}>Why Squadhelp?</h2>
              <div className={styles.cardContainer}>
                <div className={styles.card}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}more-benifits-world-icon.png`}
                    alt='globe'
                  />
                  <h3>Largest Naming Community</h3>
                  <p>
                    Our unique approach allows you to receive an unmatched
                    breadth of business name ideas from world's largest
                    community of naming experts. With 75,000+ creatives and
                    15,000+ successful naming projects, Squadhelp is by far the
                    largest naming platform across the globe .
                  </p>
                </div>
                <div className={styles.card}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}more-benifits-high-quality-icon.png`}
                    alt='desktop'
                  />
                  <h3>High Quality & Collaboration</h3>
                  <p>
                    Using an advanced Quality Scoring Algorithm and Machine
                    Learning, we ensure that you receive more ideas from our
                    top-quality creatives, and Gamification best practices
                    ensure two-way communication throughout your contest.
                  </p>
                </div>
                <div className={styles.card}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}more-benifits-trademark-icon.png`}
                    alt='cards'
                  />
                  <h3>Agency-Level Features</h3>
                  <p>
                    Squadhelp's high end Audience Testing service allows you to
                    poll your target demographics to get unbiased feedback on
                    your favorite names. Also receive Trademark support from our
                    team of Licensed Trademark Attorneys, so you can pick your
                    name with confidence.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.greyContainer}>
              <div className={styles.adv}>
                <div className={styles.images}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/Forbes-inactive.png`}
                    alt='forbes'
                  />
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/Forbes-active.png`}
                    alt='forbes'
                  />
                </div>
                <div className={styles.images}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/the_next_web_inactive.png`}
                    alt='web'
                  />
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/the_next_web_active.png`}
                    alt='web'
                  />
                </div>
                <div className={styles.images}>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/mashable-inactive.png`}
                    alt='mashable'
                  />
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/mashable-active.png`}
                    alt='mashable'
                  />
                </div>
              </div>
              <div className={styles.stats}>
                <div>
                  <p>119,525</p>
                  <span>Creatives</span>
                </div>
                <div>
                  <p>21,875</p>
                  <span>Customers</span>
                </div>
                <div>
                  <p>85</p>
                  <span>Industries</span>
                </div>
              </div>
            </div>
            <h2>How Do Name Contest Work?</h2>
            <div className={styles.whiteContainer}>
              <div className={styles.stepReverse}>
                <div>
                  <h3>Step 1: Launch a Naming Contest</h3>
                  <p>
                    <i className='fas fa-check' />
                    <span>
                      Start your project right with our proven Naming Brief
                      template
                    </span>
                  </p>
                  <p>
                    <i className='fas fa-check' />
                    <span>
                      We’ll walk you through exactly what you need to share
                      about your project in order to get an awesome Name
                    </span>
                  </p>
                </div>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}gif/1-compressed.gif`}
                  alt='compressed'
                />
              </div>
            </div>
            <div className={styles.greenContainer}>
              <div className={styles.step}>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}gif/2-compressed-new.gif`}
                  alt='compressed'
                />
                <div className={styles.greenStep}>
                  <h3>Step 2: Ideas start pouring in within minutes</h3>
                  <p>
                    <i className='fas fa-check' />
                    <span>
                      100s of naming experts start submitting name ideas
                    </span>
                  </p>
                  <p>
                    <i className='fas fa-check' />
                    <span>
                      Names automatically checked for URL availability
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.greyContainer}>
              <div className={styles.stepReverse}>
                <div>
                  <h3>Step 3: Rate Entries & Brainstorm with Creatives</h3>
                  <p>
                    <i className='fas fa-check' />
                    <span>Provide instant feedback on Names</span>
                  </p>
                  <p>
                    <i className='fas fa-check' />
                    <span>
                      Send private feedback or public messages to all creatives
                    </span>
                  </p>
                  <p>
                    <i className='fas fa-check' />
                    <span>
                      The more entries you rate - the submissions get better and
                      better
                    </span>
                  </p>
                </div>
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}gif/3-compressed.gif`}
                  alt='compressed'
                />
              </div>
            </div>
            <div className={styles.headerBar}>
              <h3>Names For Sale</h3>
              <p className={styles.blueUnderline}>
                Not interested in launching a contest? Purchase a name instantly
                from our hand-picked collection of premium names. Price includes
                a complimentary Trademark Report, a Domain name as well as a
                Logo design
              </p>
            </div>
            <SlideBar
              images={carouselConstants.exampleSliderImages}
              carouselType={carouselConstants.EXAMPLE_SLIDER}
            />
            <div className={styles.button}>
              <Link className={styles.button__link} to='/dashboard'>
                DASHBOARD
              </Link>
            </div>
            <div className={styles.blueContainer}>
              <h2 className={styles.whiteUnderline}>What our customers say</h2>
              <SlideBar
                images={carouselConstants.feedbackSliderImages}
                carouselType={carouselConstants.FEEDBACK_SLIDER}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const { isFetching } = state.userStore;
  return { isFetching };
};

export default connect(mapStateToProps, null)(Home);
