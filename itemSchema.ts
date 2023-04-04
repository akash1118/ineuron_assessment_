import mongoose from 'mongoose';

export interface ItemDocument extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const ItemModel = mongoose.model<ItemDocument>('Item', ItemSchema);
