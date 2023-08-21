const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 3000;

export const CUSTOMER = 'customer';
export const CREATOR = 'creator';
export const CONTEST_STATUS_ACTIVE = 'active';
export const CONTEST_STATUS_FINISHED = 'finished';
export const CONTEST_STATUS_PENDING = 'pending';
export const NAME_CONTEST = 'name';
export const LOGO_CONTEST = 'logo';
export const TAGLINE_CONTEST = 'tagline';
export const OFFER_STATUS_REJECTED = 'rejected';
export const OFFER_STATUS_WON = 'won';
export const OFFER_STATUS_PENDING = 'pending';

export const STATIC_IMAGES_PATH = '/staticImages/';
export const ANONYM_IMAGE_PATH = `${STATIC_IMAGES_PATH}anonym.png` as const;
export const HOW_IT_WORKS_PATH = `${STATIC_IMAGES_PATH}howItWorks/` as const;
export const BASE_URL = `http://${serverIP}:${serverPort}/` as const;
export const REFRESH_TOKEN = 'refreshToken';

export const PUBLIC_URL =
  env === 'production'
    ? (`http://${serverIP}:80/images/` as const)
    : (`http://${serverIP}:${serverPort}/public/images/` as const);

export const DUMMY_LINK = '/404';

export const NORMAL_PREVIEW_CHAT_MODE = 'NORMAL_PREVIEW_CHAT_MODE';
export const FAVORITE_PREVIEW_CHAT_MODE = 'FAVORITE_PREVIEW_CHAT_MODE';
export const BLOCKED_PREVIEW_CHAT_MODE = 'BLOCKED_PREVIEW_CHAT_MODE';
export const CATALOG_PREVIEW_CHAT_MODE = 'CATALOG_PREVIEW_CHAT_MODE';
export const CHANGE_BLOCK_STATUS = 'CHANGE_BLOCK_STATUS';
export const ADD_CHAT_TO_OLD_CATALOG = 'ADD_CHAT_TO_OLD_CATALOG';
export const CREATE_NEW_CATALOG_AND_ADD_CHAT =
  'CREATE_NEW_CATALOG_AND_ADD_CHAT';
export const USER_INFO_MODE = 'USER_INFO_MODE';
export const CASHOUT_MODE = 'CASHOUT_MODE';

export const AUTH_MODE = {
  REGISTER: 'REGISTER',
  LOGIN: 'LOGIN',
} as const;

export const HEADER_ANIMATION_TEXT = [
  'a Company',
  'a Brand',
  'a Website',
  'a Service',
  'a Book',
  'a Business',
  'an App',
  'a Product',
  'a Startup',
];

export const FOOTER_ITEMS = [
  {
    title: 'SQUADHELP',
    items: ['About', 'Contact', 'How It Works?', 'Testimonials', 'Our Work'],
  },
  {
    title: 'RESOURCES',
    items: [
      'How It Works',
      'Become a Creative',
      'Business Name Generator',
      'Discussion Forum',
      'Blog',
      'Download eBook',
      'Pricing',
      'Help & FAQs',
    ],
  },
  {
    title: 'OUR SERVICES',
    items: [
      'Naming',
      'Logo Design',
      'Taglines',
      'Premium Names For Sale',
      'Creative Owned Names For Sale',
      'Audience Testing',
      'Trademark Research & Filling',
      'Managed Agency Service',
    ],
  },
  {
    title: 'LEGAL',
    items: ['Terms of Service', 'Privacy Policy', 'Cookie Policy'],
  },
];
