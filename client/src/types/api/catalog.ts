import type {
  CatalogId,
  CatalogListId,
  ChatId,
  UserId,
  WithId,
  With_id,
  With__v,
} from './_common';

export type AddChatToCatalogParams = With_id<CatalogId, 'catalogId'> &
  With_id<ChatId, 'chatId'>;
export type AddChatToCatalogResponse = Omit<ChatsInCatalog, 'chat'> & {
  chats: [ChatId];
};

export type RemoveChatFromCatalogParams = With_id<CatalogId, 'catalogId'>;
export type RemoveChatFromCatalogResponse = With_id<CatalogId, 'catalogId'>;

export type CreateCatalogParams = With_id<ChatId, 'chatId'> & WithCatalogName;
export type CreateCatalogResponse = ChatsInCatalog;

export type DeleteCatalogParams = With_id<CatalogId, 'catalogId'>;
export type DeleteCatalogResponse = With_id<CatalogId, 'catalogId'>;

export type ChangeCatalogNameParams = CreateCatalogParams;
export type ChangeCatalogNameResponse = ChatsInCatalog;

export type GetCatalogListResponse = With_id<CatalogListId> &
  WithCatalogName & {
    chats: { [k: string | number]: ChatId };
  };

export type ChatsInCatalog = With_id<CatalogId> &
  WithId<UserId, 'userId'> &
  With__v &
  WithCatalogName & {
    chats: ChatId[];
  };

export type WithCatalogName = { catalogName: string };
