import mongoose from 'mongoose';

const PuzzleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['riddles', 'logic', 'math', 'wordplay', 'general']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard']
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
  },
  solvedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    solvedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

PuzzleSchema.index({ category: 1, difficulty: 1, language: 1 });
PuzzleSchema.index({ tags: 1 });
PuzzleSchema.index({ createdAt: -1 });

export default mongoose.models.Puzzle || mongoose.model('Puzzle', PuzzleSchema);