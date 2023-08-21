import mongoose from 'mongoose';
import { deprecate } from 'util';
import { MONGO_DEPRECATED_MESSAGE } from '../../constants';
import type { CatalogSchema } from '../../types/models';

const Schema = new mongoose.Schema({
  userId: {
    type: 'Number',
    required: true,
  },
  catalogName: {
    type: 'String',
    required: true,
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: false,
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
