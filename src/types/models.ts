import type { Attributes, Model, Sequelize } from 'sequelize';
import type { Col, Fn, Literal } from 'sequelize/types/utils';
import type { Types } from 'mongoose';
import type _Bank from 'models/bank';
import type _Catalog from 'models/catalog';
import type _Contest from 'models/contest';
import type _Event from 'models/event';
import type _Conversation from 'models/conversation';
import type _Message from 'models/message';
import type _Offer from 'models/offer';
import type _Rating from 'models/rating';
import type _RefreshToken from 'models/refreshToken';
import type _Select from 'models/select';
import type _User from 'models/user';
import type __Catalog from 'models/mongoModels/Catalog';
import type __Conversation from 'models/mongoModels/Conversation';
import type __Message from 'models/mongoModels/Message';
import type { WithTimeStamps } from '.';

export interface DB {
  Bank: ReturnType<typeof _Bank>;
  Catalog: ReturnType<typeof _Catalog>;
  Contest: ReturnType<typeof _Contest>;
  Event: ReturnType<typeof _Event>;
  Conversation: ReturnType<typeof _Conversation>;
  Message: ReturnType<typeof _Message>;
  Offer: ReturnType<typeof _Offer>;
  Rating: ReturnType<typeof _Rating>;
  RefreshToken: ReturnType<typeof _RefreshToken>;
  Select: ReturnType<typeof _Select>;
  User: ReturnType<typeof _User>;
}

/** @deprecated */
export type CatalogSchema = {
  userId: User['id'];
  catalogName: string;
  chats: Types.ObjectId;
};

/** @deprecated */
export type ConversationSchema = WithTimeStamps & {
  participants: [number, number];
  blackList: [boolean, boolean];
  favoriteList: [boolean, boolean];
};

/** @deprecated */
export type MessageSchema = WithTimeStamps & {
  sender: User['id'];
  body: string;
  conversation: Types.ObjectId;
};

export interface Bank extends InstanceType<DB['Bank']> {}
export interface Catalog extends InstanceType<DB['Catalog']> {}
export interface Contest extends InstanceType<DB['Contest']> {}
export interface Conversation extends InstanceType<DB['Conversation']> {}
export interface Event extends InstanceType<DB['Event']> {}
export interface Message extends InstanceType<DB['Message']> {}
export interface Offer extends InstanceType<DB['Offer']> {}
export interface Rating extends InstanceType<DB['Rating']> {}
export interface RefreshToken extends InstanceType<DB['RefreshToken']> {}
export interface Select extends InstanceType<DB['Select']> {}
export interface User extends InstanceType<DB['User']> {}

/** @deprecated */
export type _Catalog = InstanceType<typeof __Catalog>;
/** @deprecated */
export type _Conversation = InstanceType<typeof __Conversation>;
/** @deprecated */
export type _Message = InstanceType<typeof __Message>;

export type ModelUpdateAttributes<M extends Model> = {
  [key in keyof Attributes<M>]?: Attributes<M>[key] | Fn | Col | Literal;
};
