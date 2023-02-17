import {
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
  FAVORITE_PREVIEW_CHAT_MODE,
  NORMAL_PREVIEW_CHAT_MODE,
} from 'constants/general';

export const dialogButtons = [
  { id: 0, name: 'Normal', mode: NORMAL_PREVIEW_CHAT_MODE },
  { id: 1, name: 'Favorite', mode: FAVORITE_PREVIEW_CHAT_MODE },
  { id: 2, name: 'Blocked', mode: BLOCKED_PREVIEW_CHAT_MODE },
  { id: 3, name: 'Catalog', mode: CATALOG_PREVIEW_CHAT_MODE },
];
