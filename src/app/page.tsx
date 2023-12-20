'use client';

import Link from 'next/link';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { Footer, Header, Picture, Spinner } from 'components/general';
import { SlideBar } from 'components/home';
import {
  EXAMPLE_SLIDER,
  EXAMPLE_SLIDER_IMAGES,
  FEEDBACK_SLIDER,
  FEEDBACK_SLIDER_IMAGES,
  MAIN_SLIDER,
  MAIN_SLIDER_IMAGES,
} from 'constants/carousel';
import {
  HEADER_ANIMATION_TEXT,
  PAGE,
  STATIC_IMAGES_PATH,
} from 'constants/general';
import styles from './styles/page.module.scss';

const Home = () => {
  const { isFetching } = useSelector((state) => state.userStore);
  const [index, setIndex] = useState(0);
  const [styleName, setStyle] = useState(styles.headlineStatic);

  const text = HEADER_ANIMATION_TEXT[index % HEADER_ANIMATION_TEXT.length];

  useEffect(() => {
    const timeout = setInterval(() => {
      setIndex(index + 1);
      setStyle('');
    }, 3000);

    return () => {
      setStyle(styles.headlineStatic);
      clearInterval(timeout);
    };
  });

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
                <Link className={styles.buttonLink} href={PAGE.DASHBOARD}>
                  DASHBOARD
                </Link>
              </div>
            </div>
            <div className={styles.greyContainer}>
              <SlideBar
                images={MAIN_SLIDER_IMAGES}
                carouselType={MAIN_SLIDER}
              />
            </div>
            <div className={styles.containerDescription}>
              <h2 className={styles.blueUnderline}>Why Squadhelp?</h2>
              <div className={styles.cardContainer}>
                <div className={styles.card}>
                  <Picture
                    srcSet={[
                      `${STATIC_IMAGES_PATH}more-benifits-world-icon.avif`,
                      `${STATIC_IMAGES_PATH}more-benifits-world-icon.webp`,
                    ]}
                    src={`${STATIC_IMAGES_PATH}more-benifits-world-icon.png`}
                    alt="globe"
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
                  <Picture
                    srcSet={[
                      `${STATIC_IMAGES_PATH}more-benifits-high-quality-icon.avif`,
                      `${STATIC_IMAGES_PATH}more-benifits-high-quality-icon.webp`,
                    ]}
                    src={`${STATIC_IMAGES_PATH}more-benifits-high-quality-icon.png`}
                    alt="desktop"
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
                  <Picture
                    srcSet={[
                      `${STATIC_IMAGES_PATH}more-benifits-trademark-icon.avif`,
                      `${STATIC_IMAGES_PATH}more-benifits-trademark-icon.webp`,
                    ]}
                    src={`${STATIC_IMAGES_PATH}more-benifits-trademark-icon.png`}
                    alt="cards"
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
                  <Picture
                    srcSet={[
                      `${STATIC_IMAGES_PATH}sponsors/Forbes-inactive.avif`,
                      `${STATIC_IMAGES_PATH}sponsors/Forbes-inactive.webp`,
                    ]}
                    src={`${STATIC_IMAGES_PATH}sponsors/Forbes-inactive.png`}
                    alt="forbes"
                  />
                  <Picture
                    srcSet={[
                      `${STATIC_IMAGES_PATH}sponsors/Forbes-active.avif`,
                      `${STATIC_IMAGES_PATH}sponsors/Forbes-active.webp`,
                    ]}
                    src={`${STATIC_IMAGES_PATH}sponsors/Forbes-active.png`}
                    alt="forbes"
                  />
                </div>
                <div className={styles.images}>
                  <Picture
                    srcSet={[
                      `${STATIC_IMAGES_PATH}sponsors/the_next_web_inactive.avif`,
                      `${STATIC_IMAGES_PATH}sponsors/the_next_web_inactive.webp`,
                    ]}
                    src={`${STATIC_IMAGES_PATH}sponsors/the_next_web_inactive.png`}
                    alt="web"
                  />
                  <Picture
                    srcSet={[
                      `${STATIC_IMAGES_PATH}sponsors/the_next_web_active.avif`,
                      `${STATIC_IMAGES_PATH}sponsors/the_next_web_active.webp`,
                    ]}
                    src={`${STATIC_IMAGES_PATH}sponsors/the_next_web_active.png`}
                    alt="web"
                  />
                </div>
                <div className={styles.images}>
                  <Picture
                    srcSet={[
                      `${STATIC_IMAGES_PATH}sponsors/mashable-inactive.avif`,
                      `${STATIC_IMAGES_PATH}sponsors/mashable-inactive.webp`,
                    ]}
                    src={`${STATIC_IMAGES_PATH}sponsors/mashable-inactive.png`}
                    alt="mashable"
                  />
                  <Picture
                    srcSet={[
                      `${STATIC_IMAGES_PATH}sponsors/mashable-active.avif`,
                      `${STATIC_IMAGES_PATH}sponsors/mashable-active.webp`,
                    ]}
                    src={`${STATIC_IMAGES_PATH}sponsors/mashable-active.png`}
                    alt="mashable"
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
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: '#006d00' }}
                    />
                    <span>
                      Start your project right with our proven Naming Brief
                      template
                    </span>
                  </p>
                  <p>
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: '#006d00' }}
                    />
                    <span>
                      We’ll walk you through exactly what you need to share
                      about your project in order to get an awesome Name
                    </span>
                  </p>
                </div>
                <Picture
                  srcSet={[`${STATIC_IMAGES_PATH}gif/1-compressed.avif`]}
                  src={`${STATIC_IMAGES_PATH}gif/1-compressed.gif`}
                  alt="compressed"
                />
              </div>
            </div>
            <div className={styles.greenContainer}>
              <div className={styles.step}>
                <Picture
                  srcSet={[`${STATIC_IMAGES_PATH}gif/2-compressed-new.avif`]}
                  src={`${STATIC_IMAGES_PATH}gif/2-compressed-new.gif`}
                  alt="compressed"
                />
                <div className={styles.greenStep}>
                  <h3>Step 2: Ideas start pouring in within minutes</h3>
                  <p>
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: '#006d00' }}
                    />
                    <span>
                      100s of naming experts start submitting name ideas
                    </span>
                  </p>
                  <p>
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: '#006d00' }}
                    />
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
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: '#006d00' }}
                    />
                    <span>Provide instant feedback on Names</span>
                  </p>
                  <p>
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: '#006d00' }}
                    />
                    <span>
                      Send private feedback or public messages to all creatives
                    </span>
                  </p>
                  <p>
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: '#006d00' }}
                    />
                    <span>
                      The more entries you rate - the submissions get better and
                      better
                    </span>
                  </p>
                </div>
                <Picture
                  srcSet={[`${STATIC_IMAGES_PATH}gif/3-compressed.avif`]}
                  src={`${STATIC_IMAGES_PATH}gif/3-compressed.gif`}
                  alt="compressed"
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
              images={EXAMPLE_SLIDER_IMAGES}
              carouselType={EXAMPLE_SLIDER}
            />
            <div className={styles.button}>
              <Link className={styles.buttonLink} href={PAGE.DASHBOARD}>
                DASHBOARD
              </Link>
            </div>
            <div className={styles.blueContainer}>
              <h2 className={styles.whiteUnderline}>What our customers say</h2>
              <SlideBar
                images={FEEDBACK_SLIDER_IMAGES}
                carouselType={FEEDBACK_SLIDER}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
