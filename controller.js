import mongoose from 'mongoose';
import { userSchema } from './model';


const User = mongoose.model('User', userSchema);

export const addUser = (req,res) => {
  let newUser = new User(req.body);
  newUser
    .save()
    .then( () => res.json(newUser) )
    .catch((err) => res.send('User exists'));
}

export const getUsers = (req,res) => {
  User.find({}, (err,docs)=> res.json(docs)).select({'_id':0});
}


export const logExercise = (req,res) => {
  User.findByIdAndUpdate(req.body.id, {$push: {log: req.body}});
}

