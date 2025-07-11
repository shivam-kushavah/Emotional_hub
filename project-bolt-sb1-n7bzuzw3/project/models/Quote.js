import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
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
    enum: ['motivational', 'life', 'success', 'morning', 'night', 'wisdom', 'love', 'friendship']
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

QuoteSchema.index({ category: 1, language: 1 });
QuoteSchema.index({ tags: 1 });
QuoteSchema.index({ createdAt: -1 });

export default mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);