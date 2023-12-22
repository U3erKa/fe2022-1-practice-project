import mongoose from 'mongoose';
import { deprecate } from 'util';
import { MONGO_DEPRECATED_MESSAGE } from 'constants/backend';
import type { ConversationSchema } from 'types/models';

const Schema = new mongoose.Schema(
  {
    participants: {
      required: true,
      type: [Number],
    },
    blackList: {
      required: true,
      type: [Boolean],
    },
    favoriteList: {
      required: true,
      type: [Boolean],
    },
  },
  {
    timestamps: true,
  },
);

/** @deprecated */
const Conversation = deprecate(
  mongoose.model<ConversationSchema>('Conversation', Schema),
  MONGO_DEPRECATED_MESSAGE,
);
export default Conversation;
