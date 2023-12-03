import Link from 'next/link';
import { uniqueId } from 'utils/functions';
import { HOW_IT_WORKS_PATH, PAGE } from 'constants/general';
import type { QNAItems } from 'types/general';

const LINK_ID_PREFIX = 'link';
const QNA_ID_PREFIX = 'QNA';
const IMG_ID_PREFIX = 'img';

export const HOW_IT_WORKS_CARDS = [
  {
    heading: 'Launch a Contest',
    text:
      'Work with hundreds of creative experts to get custom name suggestions for your business or brand. ' +
      'All names are auto-checked for URL availability.',
    href: PAGE.START_CONTEST,
    src: `${HOW_IT_WORKS_PATH}launchContest.svg`,
  },
  {
    heading: 'Explore Names For Sale',
    text:
      'Our branding team has curated thousands of pre-made names that you can purchase instantly. ' +
      'All names include a matching URL and a complimentary Logo Design',
    src: `${HOW_IT_WORKS_PATH}exploreNames.svg`,
  },
  {
    heading: 'Agency-level Managed Contests',
    text:
      'Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. ' +
      'Get a complete agency-level experience at a fraction of Agency costs',
    linkText: 'Learn more',
    src: `${HOW_IT_WORKS_PATH}managedContest.svg`,
  },
];

export const HOW_CONTESTS_WORK: readonly string[] = [
  'Fill out your Naming Brief and begin receiving name ideas in minutes',
  'Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.',
  'Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.',
  'Pick a Winner. The winner gets paid for their submission.',
];

export const CONTEST_QUESTIONS: QNAItems = [
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'How long does it take to start receiving submissions?',
    answer:
      'For Naming contests, you will start receiving your submissions within ' +
      'few minutes of launching your contest. ' +
      'Since our creatives are located across the globe, you can expect to receive ' +
      'submissions 24 X 7 throughout the duration of the brainstorming phase.',
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'How long do Naming Contests last?',
    answer:
      'You can choose a duration from 1 day to 7 days. We recommend a duration ' +
      'of 3 Days or 5 Days. This allows for sufficient time for entry submission ' +
      'as well as brainstorming with creatives. If you take advantage of our ' +
      'validation services such as Audience Testing and Trademark Research, ' +
      'both will be an additional 4-7 days (3-5 business days for Audience ' +
      'Testing and 1-2 business days for Trademark Research).',
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'Where are the creatives located?',
    answer:
      'About 70% of our Creatives are located in the United States and other ' +
      'English speaking countries (i.e. United Kingdom, Canada, and Australia). ' +
      'We utilize an advanced rating score algorithm to ensure that high quality ' +
      'creatives receive more opportunities to participate in our contests.',
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'What if I do not like any submissions?',
    answer: {
      description:
        'While it is unusually rare that you will not like any names provided, we ' +
        'have a few options in case this problem occurs:',
      list: [
        "If the contest ends and you have not yet found a name that you'd " +
          'like to move forward with, we can provide complimentary extension of ' +
          'your contest as well as a complimentary consultation with one of our ' +
          'branding consultants (a $99 value).',
        'By exploring our premium domain marketplace you can apply the ' +
          'contest award towards the purchase of any name listed for sale.',
        [
          'If you choose the Gold package or Platinum package and keep the ' +
            'contest as "Not Guaranteed", you can request a partial refund if you ' +
            'choose not to move forward with any name from you project. (Please ' +
            'note that the refund is for the contest award). Here is a link to our ',
          <Link href={PAGE.DUMMY_LINK} key={uniqueId(LINK_ID_PREFIX)}>
            Refund Policy
          </Link>,
        ],
      ],
    },
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'How much does it cost?',
    answer: [
      [
        'Our naming competitions start at $299, and our logo design competitions ' +
          'start at $299. Also, there are three additional contest level that each ' +
          'offer more features and benefits. See our ',
        <Link href={PAGE.DUMMY_LINK} key={uniqueId(LINK_ID_PREFIX)}>
          Pricing Page
        </Link>,
        ' for details',
      ],
    ],
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question:
      'I need both a Name and a Logo. Do you offer any discount for multiple contests?',
    answer: [
      'Yes! We have many contest bundles - our most popular being our Name, ' +
        'Tagline, and Logo bundle. Bundles allow you to purchase multiple contests ' +
        'at one time and save as much as from $75 - $400. You can learn more about ' +
        'our bundle options on our ',
      <Link href={PAGE.DUMMY_LINK} key={uniqueId(LINK_ID_PREFIX)}>
        Pricing Page
      </Link>,
      '.',
    ],
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'What if I want to keep my business idea private?',
    answer:
      'You can select a Non Disclosure Agreement (NDA) option at the time of ' +
      'launching your competition. This will ensure that only those ' +
      'contestants who agree to the NDA will be able to read your project ' +
      'brief and participate in the contest. The contest details will be kept ' +
      'private from other users, as well as search engines.',
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'Can you serve customers outside the US?',
    answer:
      'Absolutely. Squadhelp services organizations across the globe. Our ' +
      'customer come from many countries, such as the United States, ' +
      "Australia, Canada, Europe, India, and MENA. We've helped more than " +
      '25,000 customer around the world.',
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'Can I see any examples?',
    answer: {
      description:
        'Our creatives have submitted more than 6 Million names and thousands of ' +
        'logos on our platform. Here are some examples of Names, Taglines, and ' +
        'Logos that were submitted in recent contests.',
      list: [
        <Link href={PAGE.DUMMY_LINK} key={uniqueId(LINK_ID_PREFIX)}>
          Name Examples
        </Link>,
        <Link href={PAGE.DUMMY_LINK} key={uniqueId(LINK_ID_PREFIX)}>
          Tagline Examples
        </Link>,
        <Link href={PAGE.DUMMY_LINK} key={uniqueId(LINK_ID_PREFIX)}>
          Logo Examples
        </Link>,
      ],
    },
  },
];

export const MARKETPLACE_QUESTIONS: QNAItems = [
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: "What's included with a Domain Purchase?",
    answer:
      'When you purchase a domain from our premium domain marketplace, you ' +
      'will receive the exact match .com URL, a complimentary logo design ' +
      '(along with all source files), as well as a complimentary Trademark ' +
      "report and Audience Testing if you're interested in validating your " +
      'name.',
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'How does the Domain transfer process work?',
    answer:
      'Once you purchase a Domain, our transfer specialists will reach out to ' +
      'you (typically on the same business day). In most cases we can ' +
      'transfer the domain to your preferred registrar (such as GoDaddy). ' +
      'Once we confirm the transfer details with you, the transfers are ' +
      'typically initiated to your account within 1 business day.',
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question:
      'If I purchase a Domain on installments, can I start using it to setup my website?',
    answer:
      'We offer payment plans for many domains in our Marketplace. If you ' +
      'purchase a domain on a payment plan, we hold the domain in an Escrow ' +
      'account until it is fully paid off. However our team can assist you ' +
      'with making any changes to the domains (such as Nameserver changes), ' +
      'so that you can start using the domain right away after making your ' +
      'first installment payment.',
  },
];

export const MANAGED_CONTEST_QUESTIONS: QNAItems = [
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'What are Managed Contests?',
    answer: [
      [
        "The 'Managed' option is a fully managed service by Squadhelp Branding " +
          'experts. It includes a formal brief preparation by Squadhelp team and ' +
          'management of your contest. Managed Contests are a great fit for companies ' +
          'that are looking for an "Agency" like experience and they do not want to ' +
          'manage the contest directly. Our branding team has directly managed ' +
          'hundreds of branding projects and has learned several best practices that ' +
          'lead to successful project outcomes. Our team will apply all best ' +
          'practices towards the management of your branding project. Learn more ' +
          'about our ',
        <Link href={PAGE.DUMMY_LINK} key={uniqueId(LINK_ID_PREFIX)}>
          Managed Contest Service
        </Link>,
      ],
    ],
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'What are Managed Contests?',
    answer: {
      description: 'The overall process takes 12-13 days.',
      list: [
        'The Managed projects start with a project kick-off call with your ' +
          'Branding Consultant. You can schedule this call online immediately ' +
          'after making your payment.',
        'After your kick-off call, the Branding consultant will write your ' +
          'project brief and send for your approval within 1 business day.',
        'Upon your approval, the contest will go live. The branding ' +
          'consultant will help manage your project throughout the ' +
          'brainstorming phase (typically 5 days).',
        'Upon the completion of brainstorming phase, the branding consultant ' +
          'will work with you to test the top 6 names from your Shortlist (3-5 ' +
          'Days). In addition, the branding consultant will coordinate the ' +
          'detailed Trademark screening (1-3 days)',
      ],
    },
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'How much do Managed Contests cost?',
    answer: {
      description:
        'We offer two levels of Managed Contests. Standard ($1499) and Enterprise ' +
        '($2999). The Enterprise managed contest includes:',
      list: [
        '(1) a $500 award amount (instead of $300), which will attract our ' +
          'top Creatives and provide more options to choose from;',
        '(2) we will ensure a senior member of our branding team is assigned ' +
          'to your project and the branding team will invest about 3X more time ' +
          'in the day-to-day management of your project;',
        '(3) you will receive more high-end trademark report and 5X more ' +
          'responses for your audience test.',
        [
          'Here is a link to our ',
          <Link href={PAGE.DUMMY_LINK} key={uniqueId(LINK_ID_PREFIX)}>
            Pricing page
          </Link>,
          ' with a detailed comparison of the two packages.',
        ],
      ],
    },
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'Where are the Branding Consultants located?',
    answer:
      'All our branding consultants are based in in our Headquarters (Hoffman ' +
      'Estates, IL). Our branding consultants have many years of experience in ' +
      'managing hundreds of branding projects for companies ranging from early ' +
      'stage startups to Fortune 500 corporations.',
  },
];

export const CREATIVES_QUESTIONS: QNAItems = [
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'Can anyone join your platform?',
    answer: [
      'We are open to anyone to signup. However, we have an extensive ',
      <Link href={PAGE.DUMMY_LINK} key={uniqueId(LINK_ID_PREFIX)}>
        "Quality Scoring"
      </Link>,
      ' process which ensures that ' +
        'high quality creatives have the ability to continue to participate in the ' +
        'platform. On the other hand, we limit the participation from those ' +
        'creatives who do not consistently receive high ratings.',
    ],
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'Can anyone join your platform?',
    answer:
      'When you initially signup, you are assigned few contests to assess your ' +
      'overall quality of submissions. Based upon the quality of your ' +
      'submissions, you will continue to be assigned additional contests. Once ' +
      'you have received enough high ratings on your submissions, your account ' +
      'will be upgraded to "Full Access", so that you can begin participating in ' +
      'all open contests.',
  },
  {
    id: uniqueId(QNA_ID_PREFIX),
    question: 'How Do I Get Paid?',
    answer:
      'We handle creative payouts via Paypal or Payoneer. Depending upon your ' +
      'country of residence, we may require additional documentation to verify ' +
      'your identity as well as your Tax status.',
  },
];

export const HOW_IT_WORKS_QNA = [
  {
    id: 'contests',
    title: 'Launching A Contest',
    questions: CONTEST_QUESTIONS,
  },
  {
    id: 'marketplace',
    title: 'Buying From Marketplace',
    questions: MARKETPLACE_QUESTIONS,
  },
  {
    id: 'managed',
    title: 'Managed Contests',
    questions: MANAGED_CONTEST_QUESTIONS,
  },
  {
    id: 'creatives',
    title: 'For Creatives',
    questions: CREATIVES_QUESTIONS,
  },
];

export const GET_STARTED_IMAGES = [
  {
    id: uniqueId(IMG_ID_PREFIX),
    src: `${HOW_IT_WORKS_PATH}stars.svg`,
    alt: 'stars icon',
    caption: [
      <b key={uniqueId()}>4.9 out of 5 stars</b>,
      ' from 25,000+ customers.',
    ],
  },
  {
    id: uniqueId(IMG_ID_PREFIX),
    src: `${HOW_IT_WORKS_PATH}brandingCommunity.webp`,
    alt: 'community icon',
    caption: [
      'Our branding community stands ',
      <b key={uniqueId()}>200,000+</b>,
      ' strong.',
    ],
  },
  {
    id: uniqueId(IMG_ID_PREFIX),
    src: `${HOW_IT_WORKS_PATH}industries.svg`,
    alt: 'industries icon',
    caption: [
      <b key={uniqueId()}>140+ Industries</b>,
      ' supported across more than ',
      <b key={uniqueId()}>85 countries</b>,
      ' - and counting.',
    ],
  },
];

export const FEATURED = [
  {
    id: uniqueId(IMG_ID_PREFIX),
    src: `${HOW_IT_WORKS_PATH}Forbes.svg`,
    alt: 'Forbes',
    href: 'http://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199',
  },
  {
    id: uniqueId(IMG_ID_PREFIX),
    src: `${HOW_IT_WORKS_PATH}TheNextWeb.png`,
    srcSet: [
      `${HOW_IT_WORKS_PATH}TheNextWeb.webp`,
      `${HOW_IT_WORKS_PATH}TheNextWeb.avif`,
    ],
    alt: 'The Next Web',
    href: 'http://thenextweb.com/contributors/crowdsource-startup-name-with-squadhelp/',
  },
  {
    id: uniqueId(IMG_ID_PREFIX),
    src: `${HOW_IT_WORKS_PATH}ChicagoTribune.svg`,
    alt: 'Chicago Tribune',
    href: 'http://www.chicagotribune.com/bluesky/originals/ct-squadhelp-startup-names-bsi-20170331-story.html',
  },
  {
    id: uniqueId(IMG_ID_PREFIX),
    src: `${HOW_IT_WORKS_PATH}Mashable.svg`,
    alt: 'Mashable',
    href: 'http://mashable.com/2011/04/01/make-money-crowdworking/',
  },
];
