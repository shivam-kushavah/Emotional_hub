import mongoose from 'mongoose';

const WishSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['birthday', 'anniversary', 'festival', 'success', 'love', 'friendship', 'general']
  },
  language: {
    type: String,
    required: true,
    enum: ['en', 'hi']
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

WishSchema.index({ category: 1, language: 1 });
WishSchema.index({ tags: 1 });
WishSchema.index({ createdAt: -1 });

export default mongoose.models.Wish || mongoose.model('Wish', WishSchema);