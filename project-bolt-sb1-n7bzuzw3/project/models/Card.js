import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  design: {
    template: {
      type: String,
      required: true
    },
    fontSize: {
      type: Number,
      default: 24
    },
    fontFamily: {
      type: String,
      default: 'Inter'
    },
    textColor: {
      type: String,
      default: '#000000'
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    backgroundImage: {
      type: String
    },
    textAlign: {
      type: String,
      enum: ['left', 'center', 'right'],
      default: 'center'
    },
    fontWeight: {
      type: String,
      enum: ['normal', 'bold'],
      default: 'normal'
    },
    fontStyle: {
      type: String,
      enum: ['normal', 'italic'],
      default: 'normal'
    }
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  downloads: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

CardSchema.index({ author: 1 });
CardSchema.index({ createdAt: -1 });
CardSchema.index({ isPublic: 1 });

export default mongoose.models.Card || mongoose.model('Card', CardSchema);