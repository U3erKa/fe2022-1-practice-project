export type WithId<T extends Id = Id> = { id: T };
export type With_id<T extends _Id = _Id> = { _id: T };
export type With__v = { __v: __V };
export type WithId<K extends string = 'id', T extends Id = Id> = {
  [key in K]: T;
};

export type WithCatalogId = { catalogId: CatalogId };
export type WithChatId = { chatId: ChatId };
export type WithTimeStamps = { createdAt: TimeStamp; updatedAt: TimeStamp };

/** Unique integer */
export type Id = number;
/** MongoDB's `_id` parameter */
export type _Id = string;
/** MongoDB's `__v` parameter */
export type __V = 0;

export type CatalogId = _Id;
export type CatalogListId = _Id;
export type ChatId = _Id;
export type UserId = Id;

export type TimeStamp = string;
