import type { UUID } from 'crypto';

export type With_id<T extends Id = Id, K extends string = '_id'> = {
  [key in K]: T;
};
export type WithId<T extends Id = Id, K extends string = 'id'> = {
  [key in K]: T;
};
export type WithUUID<K extends string = 'id'> = {
  [key in K]: UUID;
};

export type Context<T extends Record<string, string> | undefined = undefined> =
  { params: T };

export type WithFile = { fileName: string; originalFileName: string };
export type WithTimeStamps = { createdAt: TimeStamp; updatedAt: TimeStamp };
export type WithLifeSpan = { iat: NumTimeStamp; exp: NumTimeStamp };
export type WithPagination = { limit: number; offset: number };

/** SQL's unique id parameter */
export type Id = number;
/** JSON Web Token */
export type JWT = string;

export type CatalogId = Id;
export type CatalogListId = Id;
export type ChatId = Id;
export type ConversationId = Id;
export type MessageId = Id;

export type ContestId = Id;
export type CreatorId = Id;
export type OfferId = Id;
export type InterlocutorId = Id;
export type SenderId = Id;
export type UserId = Id;

export type OrderId = UUID;

export type TimeStamp = string;
export type NumTimeStamp = number;
