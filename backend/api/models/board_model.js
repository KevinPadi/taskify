import mongoose from 'mongoose'

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Board', boardSchema)