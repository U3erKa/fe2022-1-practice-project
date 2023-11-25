import mongoose from 'mongoose';
import { deprecate } from 'util';
import { MONGO_DEPRECATED_MESSAGE } from 'constants/backend';
import type { MessageSchema } from 'types/models';

const Schema = new mongoose.Schema(
  {
    sender: {
      type: 'Number',
      required: true,
    },
    body: {
      type: 'String',
      required: true,
    },
    conversation: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/** @deprecated */
const Message = deprecate(
  mongoose.model<MessageSchema>('Message', Schema),
  MONGO_DEPRECATED_MESSAGE,
);
export default Message;
