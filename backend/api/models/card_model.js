import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    list: {
      type: mongoose.Types.ObjectId,
      ref: 'List',
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    board: {
      type: mongoose.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Card', cardSchema);
