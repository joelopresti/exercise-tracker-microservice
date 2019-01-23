import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import shortid from 'shortid';

export const userSchema = new Schema({
  _id: {
    'type': String,
    'default': shortid.generate
  },
  username: {
    type: String,
    required: true
  },
  count: Number,
  log: [
    {description: String,
    duration: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }]
});