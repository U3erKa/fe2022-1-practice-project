import type {
  CatalogId,
  CatalogListId,
  ChatId,
  UserId,
  WithId,
  With_id,
} from 'types/api/_common';

export type AddChatToCatalogParams = With_id<CatalogId, 'catalogId'> &
  With_id<ChatId, 'chatId'>;

export type RemoveChatFromCatalogParams = With_id<CatalogId, 'catalogId'> &
  With_id<ChatId, 'chatId'>;

export type CreateCatalogParams = With_id<ChatId, 'chatId'> & WithCatalogName;

export type DeleteCatalogParams = With_id<CatalogId, 'catalogId'>;

export type ChangeCatalogNameParams = With_id<ChatId, 'catalogId'> &
  WithCatalogName;

export type ChatsInCatalog = With_id<CatalogId> &
  WithCatalogName &
  WithChats &
  WithId<UserId, 'userId'>;

export type WithChats = { chats: ChatId[] };
export type WithCatalogName = { catalogName: string };
