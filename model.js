import mongoose from 'mongoose';
import shortid from 'shortid';

const { Schema } = mongoose;

export const exerciseSchema = new Schema({
  description: String,
  duration: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

export const userSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  username: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  log: [exerciseSchema],
});

userSchema.pre('save', function doesUserExist(next) {
  const self = this;
  mongoose.models.User.findOne({ username: self.username }, (err, user) => {
    if (!user) {
      next();
    } else {
      next(new Error('Username already exists!'));
    }
  });
});
