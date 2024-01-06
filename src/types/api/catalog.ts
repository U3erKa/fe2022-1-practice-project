import type { CatalogId, ChatId, With_id } from 'types/api/_common';

export type AddChatToCatalogParams = With_id<CatalogId, 'catalogId'> &
  With_id<ChatId, 'chatId'>;

export type RemoveChatFromCatalogParams = With_id<CatalogId, 'catalogId'> &
  With_id<ChatId, 'chatId'>;

export type CreateCatalogParams = With_id<ChatId, 'chatId'> & WithCatalogName;

export type DeleteCatalogParams = With_id<CatalogId, 'catalogId'>;

export type ChangeCatalogNameParams = With_id<ChatId, 'catalogId'> &
  WithCatalogName;

export type WithCatalogName = { catalogName: string };
