import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Footer, Header } from 'components/general';
import { Headline, SlideBar } from 'components/home';
import {
  EXAMPLE_SLIDER,
  FEEDBACK_SLIDER,
  MAIN_SLIDER,
} from 'constants/carousel';
import { PAGE } from 'constants/general';
import CompressedIcon1 from 'assets/gif/1-compressed.gif';
import CompressedIcon2 from 'assets/gif/2-compressed-new.gif';
import CompressedIcon3 from 'assets/gif/3-compressed.gif';
import MoreBenefitsHighQualityIcon from 'assets/icons/more-benifits-high-quality-icon.png';
import MoreBenefitsTrademarkIcon from 'assets/icons/more-benifits-trademark-icon.png';
import MoreBenefitsIcon from 'assets/icons/more-benifits-world-icon.png';
import ForbesActiveIcon from 'assets/sponsors/Forbes-active.png';
import ForbesInactiveIcon from 'assets/sponsors/Forbes-inactive.png';
import MashableActiveIcon from 'assets/sponsors/mashable-active.png';
import MashableInactiveIcon from 'assets/sponsors/mashable-inactive.png';
import TheNextWebActiveIcon from 'assets/sponsors/the_next_web_active.png';
import TheNextWebInactiveIcon from 'assets/sponsors/the_next_web_inactive.png';
import styles from './styles/page.module.scss';

const GREEN_COLOR = { color: '#006d00' } satisfies CSSProperties;

const Home = () => (
  <>
    <Header />
    <main className={styles.container}>
      <div className={styles.headerBar}>
        <Headline />
        <p>
          Launch a naming contest to engage hundreds of naming experts as you’re
          guided through our agency-level naming process. Or, explore our
          hand-picked collection of premium names available for immediate
          purchase
        </p>
        <div className={styles.button}>
          <Link className={styles.buttonLink} href={PAGE.DASHBOARD}>
            DASHBOARD
          </Link>
        </div>
      </div>
      <div className={styles.greyContainer}>
        <SlideBar carouselType={MAIN_SLIDER} />
      </div>
      <div className={styles.containerDescription}>
        <h2 className={styles.blueUnderline}>Why Squadhelp?</h2>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <Image alt="globe" height={85} src={MoreBenefitsIcon} />
            <h3>Largest Naming Community</h3>
            <p>
              Our unique approach allows you to receive an unmatched breadth of
              business name ideas from world's largest community of naming
              experts. With 75,000+ creatives and 15,000+ successful naming
              projects, Squadhelp is by far the largest naming platform across
              the globe.
            </p>
          </div>
          <div className={styles.card}>
            <Image
              alt="desktop"
              height={85}
              src={MoreBenefitsHighQualityIcon}
            />
            <h3>High Quality & Collaboration</h3>
            <p>
              Using an advanced Quality Scoring Algorithm and Machine Learning,
              we ensure that you receive more ideas from our top-quality
              creatives, and Gamification best practices ensure two-way
              communication throughout your contest.
            </p>
          </div>
          <div className={styles.card}>
            <Image alt="desktop" height={85} src={MoreBenefitsTrademarkIcon} />
            <h3>Agency-Level Features</h3>
            <p>
              Squadhelp's high end Audience Testing service allows you to poll
              your target demographics to get unbiased feedback on your favorite
              names. Also receive Trademark support from our team of Licensed
              Trademark Attorneys, so you can pick your name with confidence.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.greyContainer}>
        <div className={styles.adv}>
          <div className={styles.images}>
            <Image alt="forbes" height={50} src={ForbesInactiveIcon} />
            <Image alt="forbes" height={50} src={ForbesActiveIcon} />
          </div>
          <div className={styles.images}>
            <Image alt="web" height={40} src={TheNextWebInactiveIcon} />
            <Image alt="web" height={40} src={TheNextWebActiveIcon} />
          </div>
          <div className={styles.images}>
            <Image alt="mashable" height={20} src={MashableInactiveIcon} />
            <Image alt="mashable" height={20} src={MashableActiveIcon} />
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
              <FontAwesomeIcon icon={faCheck} style={GREEN_COLOR} />
              <span>
                Start your project right with our proven Naming Brief template
              </span>
            </p>
            <p>
              <FontAwesomeIcon icon={faCheck} style={GREEN_COLOR} />
              <span>
                We’ll walk you through exactly what you need to share about your
                project in order to get an awesome Name
              </span>
            </p>
          </div>
          <Image alt="compressed" src={CompressedIcon1} />
        </div>
      </div>
      <div className={styles.greenContainer}>
        <div className={styles.step}>
          <Image alt="compressed" src={CompressedIcon2} />
          <div className={styles.greenStep}>
            <h3>Step 2: Ideas start pouring in within minutes</h3>
            <p>
              <FontAwesomeIcon icon={faCheck} style={GREEN_COLOR} />
              <span>100s of naming experts start submitting name ideas</span>
            </p>
            <p>
              <FontAwesomeIcon icon={faCheck} style={GREEN_COLOR} />
              <span>Names automatically checked for URL availability</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.greyContainer}>
        <div className={styles.stepReverse}>
          <div>
            <h3>Step 3: Rate Entries & Brainstorm with Creatives</h3>
            <p>
              <FontAwesomeIcon icon={faCheck} style={GREEN_COLOR} />
              <span>Provide instant feedback on Names</span>
            </p>
            <p>
              <FontAwesomeIcon icon={faCheck} style={GREEN_COLOR} />
              <span>
                Send private feedback or public messages to all creatives
              </span>
            </p>
            <p>
              <FontAwesomeIcon icon={faCheck} style={GREEN_COLOR} />
              <span>
                The more entries you rate - the submissions get better and
                better
              </span>
            </p>
          </div>
          <Image alt="compressed" src={CompressedIcon3} />
        </div>
      </div>
      <div className={styles.headerBar}>
        <h3>Names For Sale</h3>
        <p className={styles.blueUnderline}>
          Not interested in launching a contest? Purchase a name instantly from
          our hand-picked collection of premium names. Price includes a
          complimentary Trademark Report, a Domain name as well as a Logo design
        </p>
      </div>
      <SlideBar carouselType={EXAMPLE_SLIDER} />
      <div className={styles.button}>
        <Link className={styles.buttonLink} href={PAGE.DASHBOARD}>
          DASHBOARD
        </Link>
      </div>
      <div className={styles.blueContainer}>
        <h2 className={styles.whiteUnderline}>What our customers say</h2>
        <SlideBar carouselType={FEEDBACK_SLIDER} />
      </div>
    </main>
    <Footer />
  </>
);

export default Home;
