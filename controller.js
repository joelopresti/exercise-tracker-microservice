import mongoose from 'mongoose';
import { userSchema } from './model';

const User = mongoose.model('User', userSchema);

export const addUser = (req,res) => {
  let newUser = new User(req.body);

  //validate that user does not exist.
  newUser.save().then( () => res.json(newUser) );
}
