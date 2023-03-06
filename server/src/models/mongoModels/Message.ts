import mongoose from 'mongoose';

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
      // @ts-expect-error
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model('Message', Schema);

export default Message;
