import type {
  CatalogId,
  CatalogListId,
  ChatId,
  UserId,
  WithCatalogId,
  WithChatId,
  With_id,
  With__v,
} from './_common';

export type AddChatToCatalogParams = WithCatalogId & WithChatId;
export type AddChatToCatalogResponse = Omit<ChatsInCatalog, 'chat'> & {
  chats: [ChatId];
};

export type RemoveChatFromCatalogParams = WithCatalogId;
export type RemoveChatFromCatalogResponse = WithCatalogId;

export type CreateCatalogParams = WithChatId & WithCatalogName;
export type CreateCatalogResponse = ChatsInCatalog;

export type DeleteCatalogParams = WithCatalogId;
export type DeleteCatalogResponse = WithCatalogId;

export type ChangeCatalogNameParams = CreateCatalogParams;
export type ChangeCatalogNameResponse = ChatsInCatalog;

export type GetCatalogListResponse = With_id<CatalogListId> &
  WithCatalogName & {
    chats: { [k: string | number]: ChatId };
  };

export type ChatsInCatalog = With_id<CatalogId> &
  With__v &
  WithCatalogName & {
    userId: UserId;
    chats: ChatId[];
  };

export type WithCatalogName = { catalogName: string };
