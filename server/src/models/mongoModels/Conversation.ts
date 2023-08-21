import mongoose from 'mongoose';
import { deprecate } from 'util';
import { MONGO_DEPRECATED_MESSAGE } from '../../constants';
import type { ConversationSchema } from '../../types/models';

const Schema = new mongoose.Schema(
  {
    participants: {
      type: [Number],
      required: true,
    },
    blackList: {
      type: [Boolean],
      required: true,
    },
    favoriteList: {
      type: [Boolean],
      required: true,
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
