import { uniqueId } from 'utils/functions';
import ExampleSliderImage1 from 'assets/example_slider/1.jpg';
import ExampleSliderImage2 from 'assets/example_slider/2.jpg';
import ExampleSliderImage3 from 'assets/example_slider/3.jpg';
import ExampleSliderImage4 from 'assets/example_slider/4.jpg';
import ExampleSliderImage5 from 'assets/example_slider/5.jpg';
import ExampleSliderImage6 from 'assets/example_slider/6.jpg';
import ExampleSliderImage7 from 'assets/example_slider/7.jpg';
import ExampleSliderImage8 from 'assets/example_slider/8.jpg';
import ExampleSliderImage9 from 'assets/example_slider/9.jpg';
import ExampleSliderImage10 from 'assets/example_slider/10.jpg';
import ExampleSliderImage11 from 'assets/example_slider/11.jpg';
import ExampleSliderImage12 from 'assets/example_slider/12.jpg';
import FeedbackSliderImage1 from 'assets/feedback_slider/Blue dress professional Lynne Lowder-avatar.jpg';
import FeedbackSliderImage2 from 'assets/feedback_slider/Bonnie Linked-avatar.jpg';
import FeedbackSliderImage3 from 'assets/feedback_slider/IMG_0232-avatar.jpg';
import FeedbackSliderImage5 from 'assets/feedback_slider/MoonFamily web size-avatar.jpg';
import FeedbackSliderImage7 from 'assets/feedback_slider/Simon-avatar.jpg';
import FeedbackSliderImage9 from 'assets/feedback_slider/Unbenannt1-avatar.jpg';
import FeedbackSliderImage4 from 'assets/feedback_slider/me (5)-avatar.jpeg';
import FeedbackSliderImage6 from 'assets/feedback_slider/nathan2-avatar.jpg';
import FeedbackSliderImage8 from 'assets/feedback_slider/squad-avatar.jpg';
import MainSliderImage1 from 'assets/main_slider/21..jpg';
import MainSliderImage2 from 'assets/main_slider/B_1_01.jpg';
import MainSliderImage3 from 'assets/main_slider/B_2_15.jpg';
import MainSliderImage4 from 'assets/main_slider/Banner_Visual_Name_AA_48_StyleRevolver.jpg';
import MainSliderImage5 from 'assets/main_slider/Banner_Visual_Name_AD_32_Monvelli.jpg';
import MainSliderImage6 from 'assets/main_slider/Banner_Visual_Name_AG_15_Trusthaven.jpg';
import MainSliderImage7 from 'assets/main_slider/Banner_Visual_Name_AK_03_pawxie.jpg';
import MainSliderImage8 from 'assets/main_slider/Banner_Visual_Name_L_09_lush.jpg';
import MainSliderImage9 from 'assets/main_slider/Banner_Visual_Name_P_42_Avanti.jpg';
import MainSliderImage10 from 'assets/main_slider/Banner_Visual_Name_S_25_Autovity.jpg';
import MainSliderImage11 from 'assets/main_slider/Banner_Visual_Name_W_33_Quantic.jpg';
import MainSliderImage12 from 'assets/main_slider/Banner_Visual_Name_Y_29_Vechetti.jpg';

export const MAIN_SLIDER = 'main_slider';
export const EXAMPLE_SLIDER = 'example_slider';
export const FEEDBACK_SLIDER = 'feedback_slider';

export const MAIN_SLIDER_IMAGES = [
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage1 },
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage2 },
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage3 },
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage4 },
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage5 },
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage6 },
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage7 },
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage8 },
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage9 },
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage10 },
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage11 },
  { id: uniqueId(MAIN_SLIDER), src: MainSliderImage12 },
];

export const EXAMPLE_SLIDER_IMAGES = [
  { src: ExampleSliderImage1, text: 'vib.io' },
  { src: ExampleSliderImage2, text: 'Exactly.com' },
  { src: ExampleSliderImage3, text: 'Luresome.com' },
  { src: ExampleSliderImage4, text: 'Galore.com' },
  { src: ExampleSliderImage5, text: 'Dazzlia.com' },
  { src: ExampleSliderImage6, text: 'Overview.com' },
  { src: ExampleSliderImage7, text: 'GladAble.com' },
  { src: ExampleSliderImage8, text: 'Boltmetrics.com' },
  { src: ExampleSliderImage9, text: 'urbanyx.com' },
  { src: ExampleSliderImage10, text: 'upzin.com' },
  { src: ExampleSliderImage11, text: 'SurePawz.com' },
  { src: ExampleSliderImage12, text: 'CityScroll.com' },
];

export const FEEDBACK_SLIDER_IMAGES = [
  {
    src: FeedbackSliderImage1,
    name: 'Lynne',
    feedback:
      'Fantastic experience...so incredibly helpful. ' +
      'I never could have come up with such a great name on my own!',
  },
  {
    src: FeedbackSliderImage2,
    name: 'remad24',
    feedback:
      'This was a great way to get a name nailed down. ' +
      'I will definitely be using this service again and recommend! ' +
      "I'm so overwhelmed with the amazing entries and the " +
      'step-by-step process made things so go very smoothly',
  },
  {
    src: FeedbackSliderImage3,
    name: 'James Lunny',
    feedback:
      'This has been an awesome experience. I like how Squadhelp ' +
      'kept me engaged and offered assistance and hints throughout the entire competition.' +
      " The names submitted were very inventive and creative... I've been very impressed," +
      ' from start to finish. Thanks so much.',
  },
  {
    src: FeedbackSliderImage4,
    name: 'Ely Marcio',
    feedback:
      'It was great to run the contest. I achieved  by far more than I expected. ' +
      'The platform is easy to use. A lot of starting entrepreneurs believe that the know more ' +
      'than anyone else about their business. Those ones have no clue how higher they ' +
      'can reach using brainstorming. I would definitely recommend Squadhelp to anyone starting a business.',
  },
  {
    src: FeedbackSliderImage5,
    name: 'Michael Caldwell',
    feedback:
      'Squadhelp is a fantastic platform. The UX is really intuitive and feels so easy to use. ' +
      "You've taken a complex, stressful process and made it fun. Kudos.",
  },
  {
    src: FeedbackSliderImage6,
    name: 'Chris Heydemann',
    feedback:
      'Squadhelp platform and experience was excellent. It was so much fun to get all the input ' +
      'from Creatives, names I never would have thought of, and think about which my team and I liked ' +
      'the most, and why. Highly recommended!',
  },
  {
    src: FeedbackSliderImage7,
    name: 'Pate Moon',
    feedback:
      'This was a great experience for setting up a new brand - saved loads of time!!!',
  },
  {
    src: FeedbackSliderImage8,
    name: 'HappyGal',
    feedback:
      'Loved my experience with Squadhelp, was fantastic to be able to interact with the Creatives' +
      ' and receive entries that were tailored according to my feedback and requests. ' +
      'So glad I decided to try this!',
  },
  {
    src: FeedbackSliderImage9,
    name: 'Bonnie Larson',
    feedback:
      'I am very pleased with the quantity and quality of the several hundred submissions by the' +
      ' Creatives! It seemed everyone did their best to find just the right name. ' +
      "I will definitely use your program again should we need to - and I've already let hundreds of my " +
      'LinkedIn connections know you all ROCK!',
  },
];
