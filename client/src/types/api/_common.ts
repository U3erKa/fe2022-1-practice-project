export type With_id<T extends _Id = _Id> = { _id: T };
export type With__v = { __v: __V };
export type WithId<T extends Id = Id, K extends string = 'id'> = {
  [key in K]: T;
};
export type WithUUID<T extends UUID = UUID, K extends string = 'id'> = {
  [key in K]: T;
};

export type WithCatalogId = { catalogId: CatalogId };
export type WithChatId = { chatId: ChatId };
export type WithTimeStamps = { createdAt: TimeStamp; updatedAt: TimeStamp };
export type WithLifeSpan = { iat: NumTimeStamp; exp: NumTimeStamp };

/** SQL's unique id parameter */
export type Id = number;
/** MongoDB's `_id` parameter */
export type _Id = string;
/** MongoDB's `__v` parameter */
export type __V = 0;
export type UUID = string;

export type CatalogId = _Id;
export type CatalogListId = _Id;
export type ChatId = _Id;
export type ConversationId = _Id;
export type MessageId = _Id;

export type ContestId = Id;
export type CreatorId = Id;
export type OfferId = Id;
export type InterlocutorId = Id;
export type SenderId = Id;
export type UserId = Id;

export type OrderId = UUID;

export type TimeStamp = string;
export type NumTimeStamp = number;
