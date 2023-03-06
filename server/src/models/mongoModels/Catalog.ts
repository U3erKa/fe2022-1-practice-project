import mongoose from 'mongoose';
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

const Catalog = mongoose.model<CatalogSchema>('Catalog', Schema);
export default Catalog;
