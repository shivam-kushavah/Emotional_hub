import mongoose from 'mongoose';

const ShayariSchema = new mongoose.Schema({
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
    enum: ['romantic', 'sad', 'motivational', 'friendship', 'funny', 'life', 'love']
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

ShayariSchema.index({ category: 1, language: 1 });
ShayariSchema.index({ tags: 1 });
ShayariSchema.index({ createdAt: -1 });

export default mongoose.models.Shayari || mongoose.model('Shayari', ShayariSchema);