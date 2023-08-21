import type Sequelize from 'sequelize';
import type { Types } from 'mongoose';
import type _Bank from '../models/bank';
import type _Catalog from '../models/catalog';
import type _Contest from '../models/contest';
import type _Event from '../models/event';
import type _Conversation from '../models/conversation';
import type _Message from '../models/message';
import type _Offer from '../models/offer';
import type _Rating from '../models/rating';
import type _RefreshToken from '../models/refreshToken';
import type _Select from '../models/select';
import type _User from '../models/user';
import type __Catalog from '../models/mongoModels/Catalog';
import type __Conversation from '../models/mongoModels/Conversation';
import type __Message from '../models/mongoModels/Message';
import type { WithTimeStamps } from '.';

export type DB = {
  sequelize: InstanceType<(typeof Sequelize)['Sequelize']>;
  Sequelize: typeof Sequelize;
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
};

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

export type Bank = InstanceType<DB['Bank']>;
export type Catalog = InstanceType<DB['Catalog']>;
export type Contest = InstanceType<DB['Contest']>;
export type Conversation = InstanceType<DB['Conversation']>;
export type Message = InstanceType<DB['Message']>;
export type Offer = InstanceType<DB['Offer']>;
export type Rating = InstanceType<DB['Rating']>;
export type RefreshToken = InstanceType<DB['RefreshToken']>;
export type Select = InstanceType<DB['Select']>;
export type User = InstanceType<DB['User']>;

/** @deprecated */
export type _Catalog = InstanceType<typeof __Catalog>;
/** @deprecated */
export type _Conversation = InstanceType<typeof __Conversation>;
/** @deprecated */
export type _Message = InstanceType<typeof __Message>;
