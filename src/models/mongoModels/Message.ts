import mongoose from 'mongoose';
import { deprecate } from 'util';
import { MONGO_DEPRECATED_MESSAGE } from 'constants/backend';
import type { MessageSchema } from 'types/models';

const Schema = new mongoose.Schema(
  {
    conversation: {
      required: true,
      type: mongoose.Schema.ObjectId,
    },
    body: {
      required: true,
      type: 'String',
    },
    sender: {
      required: true,
      type: 'Number',
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
