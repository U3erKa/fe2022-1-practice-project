const serverIP = 'localhost';
const serverPort = 3000;

export const CUSTOMER = 'customer';
export const CREATOR = 'creator';
export const MODERATOR = 'moderator';
export const CONTEST_STATUS_ACTIVE = 'active';
export const CONTEST_STATUS_FINISHED = 'finished';
export const CONTEST_STATUS_PENDING = 'pending';
export const NAME_CONTEST = 'name';
export const LOGO_CONTEST = 'logo';
export const TAGLINE_CONTEST = 'tagline';
export const OFFER_STATUS_REJECTED = 'rejected';
export const OFFER_STATUS_WON = 'won';
export const OFFER_STATUS_DISCARDED = 'discarded';
export const OFFER_STATUS_APPROVED = 'approved';
export const OFFER_STATUS_PENDING = 'pending';
export const OFFER_COMMAND_RESOLVE = 'resolve';
export const OFFER_COMMAND_REJECT = 'reject';
export const OFFER_COMMAND_APPROVE = 'approve';
export const OFFER_COMMAND_DISCARD = 'discard';

export const SOCKET_CONNECTION = 'connection';
export const SOCKET_SUBSCRIBE = 'subscribe';
export const SOCKET_UNSUBSCRIBE = 'unsubscribe';
export const SOCKET_SUBSCRIBE_CHAT = `subscribeChat`;
export const SOCKET_UNSUBSCRIBE_CHAT = `unsubscribeChat`;
export const NOTIFICATION_ENTRY_CREATED = 'onEntryCreated';
export const NOTIFICATION_CHANGE_MARK = 'changeMark';
export const NOTIFICATION_CHANGE_OFFER_STATUS = 'changeOfferStatus';
export const NEW_MESSAGE = 'newMessage';

export const ANONYM_IMAGE_NAME = 'anon.png';
export const REFRESH_TOKEN = 'refreshToken';
export const PUBLIC_URL = '/images/';

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

export const timezoneOffsetInMs = new Date().getTimezoneOffset() * 1000 * 60;

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

export const NOTIFY_OPTIONS = [
  'never',
  'when event starts',
  '1 hour before',
  '1 day before',
  '1 week before',
] as const;

export const MIME_TYPE = {
  AVIF: 'image/avif',
  SVG: 'image/svg+xml',
  PNG: 'image/png',
  WEBP: 'image/webp',
} as const;

export const PAGE = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/registration',
  PAYMENT: '/payment',
  START_CONTEST: '/startContest',
  START_NAME_CONTEST: '/startContest/name',
  START_TAGLINE_CONTEST: '/startContest/tagline',
  START_LOGO_CONTEST: '/startContest/logo',
  DASHBOARD: '/dashboard',
  EVENTS: '/events',
  CONTEST_BY_ID: '/contest/:id',
  ACCOUNT: '/account',
  HOW_IT_WORKS: '/how-it-works',
  NOT_FOUND: '*',
  DUMMY_LINK: '/404',
} as const;

export const API_ROUTE = '/api';
export const BASE_URL = `http://${serverIP}:${serverPort}${API_ROUTE}` as const;

export const ROUTE = {
  ADD_NEW_CHAT_TO_CATALOG: '/addNewChatToCatalog',
  BLACKLIST: '/blackList',
  CASHOUT: '/cashout',
  CHANGE_MARK: '/changeMark',
  CONTESTS: '/contests',
  CREATE_CATALOG: '/createCatalog',
  DATA_FOR_CONTEST: '/dataForContest',
  DELETE_CATALOG: '/deleteCatalog',
  EVENTS: '/events',
  FAVORITE: '/favorite',
  GET_CATALOGS: '/getCatalogs',
  GET_CHAT: '/getChat',
  GET_PREVIEW: '/getPreview',
  LOGIN: '/auth/login',
  NEW_MESSAGE: '/newMessage',
  OFFERS: '/offers',
  PAY: '/pay',
  REFRESH: '/auth/refresh',
  REMOVE_CHAT_FROM_CATALOG: '/removeChatFromCatalog',
  REGISTER: '/auth/registration',
  SET_NEW_OFFER: '/setNewOffer',
  SET_OFFER_STATUS: '/setOfferStatus',
  UPDATE_NAME_CATALOG: '/updateNameCatalog',
  UPDATE_USER: '/updateUser',
} as const;

export const CONTEST_TYPES = [
  '',
  `${NAME_CONTEST},${TAGLINE_CONTEST},${LOGO_CONTEST}`,
  `${NAME_CONTEST}`,
  `${TAGLINE_CONTEST}`,
  `${LOGO_CONTEST}`,
  `${NAME_CONTEST},${TAGLINE_CONTEST}`,
  `${LOGO_CONTEST},${TAGLINE_CONTEST}`,
  `${NAME_CONTEST},${LOGO_CONTEST}`,
] as const;
