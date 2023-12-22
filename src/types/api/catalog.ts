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
export type AddChatToCatalogResponse = Omit<ChatsInCatalog, 'chat'> & {
  chats: [ChatId];
};

export type RemoveChatFromCatalogParams = With_id<CatalogId, 'catalogId'> &
  With_id<ChatId, 'chatId'>;

export type RemoveChatFromCatalogResponse = With_id<ChatId> &
  WithId<UserId, 'userId'> &
  WithCatalogName &
  WithChats;

export type CreateCatalogParams = With_id<ChatId, 'chatId'> & WithCatalogName;
export type CreateCatalogResponse = ChatsInCatalog;

export type DeleteCatalogParams = With_id<CatalogId, 'catalogId'>;
export type DeleteCatalogResponse = With_id<CatalogId, 'catalogId'>;

export type ChangeCatalogNameParams = With_id<ChatId, 'catalogId'> &
  WithCatalogName;
export type ChangeCatalogNameResponse = ChatsInCatalog;

export type GetCatalogListResponse = (With_id<CatalogListId> &
  WithCatalogName &
  WithChats)[];

export type ChatsInCatalog = With_id<CatalogId> &
  WithId<UserId, 'userId'> &
  WithCatalogName &
  WithChats;

export type WithChats = { chats: ChatId[] };
export type WithCatalogName = { catalogName: string };
