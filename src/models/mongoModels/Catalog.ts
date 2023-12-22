import mongoose from 'mongoose';
import { deprecate } from 'util';
import { MONGO_DEPRECATED_MESSAGE } from 'constants/backend';
import type { CatalogSchema } from 'types/models';

const Schema = new mongoose.Schema({
  userId: {
    required: true,
    type: 'Number',
  },
  catalogName: {
    required: true,
    type: 'String',
  },
  chats: [
    {
      required: false,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      unique: false,
    },
  ],
});

/** @deprecated */
const Catalog = deprecate(
  mongoose.model<CatalogSchema>('Catalog', Schema),
  MONGO_DEPRECATED_MESSAGE,
);
export default Catalog;
