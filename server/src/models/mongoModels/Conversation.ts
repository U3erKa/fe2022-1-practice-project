import mongoose from 'mongoose';
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

const Conversation = mongoose.model<ConversationSchema>('Conversation', Schema);
export default Conversation;
