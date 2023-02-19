export type AddChatToCatalogParams = WithCatalogId & WithChatId;
export type AddChatToCatalogResponse = Omit<ChatsInCatalog, 'chat'> & {
  chats: [string];
};

export type RemoveChatFromCatalogParams = WithCatalogId;
export type RemoveChatFromCatalogResponse = WithCatalogId;

export type CreateCatalogParams = WithChatId & WithCatalogName;
export type CreateCatalogResponse = ChatsInCatalog;

export type DeleteCatalogParams = WithCatalogId;
export type DeleteCatalogResponse = WithCatalogId;

export type ChangeCatalogNameParams = CreateCatalogParams;
export type ChangeCatalogNameResponse = ChatsInCatalog;

export type GetCatalogListResponse = With_id &
  WithCatalogName & {
    chats: { [k: string | number]: string };
  };

export type ChatsInCatalog = With_id &
  WithCatalogName & {
    chats: string[];
    __v: number;
    userId: number;
  };

export type With_id = { _id: string };
export type WithCatalogId = { catalogId: string };
export type WithChatId = { chatId: number };
export type WithCatalogName = { catalogName: string };
