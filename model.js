import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import shortid from 'shortid';

export const userSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  username: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  log: [
    {
    description: String,
    duration: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  
});

userSchema.pre('save', function (next) {
  var self = this;
  mongoose.models["User"].findOne({username: self.username}, (err, user) => {
     if (!user) {
         next();
     } else {
         next(new Error("Username already exists!"));
     }
 })
});