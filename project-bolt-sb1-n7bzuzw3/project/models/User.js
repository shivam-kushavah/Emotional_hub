import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  language: {
    type: String,
    enum: ['en', 'hi'],
    default: 'en'
  },
  favorites: [{
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'favorites.contentType'
    },
    contentType: {
      type: String,
      enum: ['Wish', 'Quote', 'Shayari', 'Puzzle']
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdCards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }]
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);