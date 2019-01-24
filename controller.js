import mongoose from 'mongoose';
import { userSchema, exerciseSchema } from './model';

const User = mongoose.model('User', userSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

export const addUser = (req,res) => {
  let newUser = new User(req.body);
  newUser
    .save()
    .then( () => res.json(newUser) )
    .catch((err) => res.send('User exists'));
}

export const getAllUsers = (req,res) => {
  User.find({}, (err,docs)=> res.json(docs)).select({'_id':0});
}

export const logExercise = (req,res) => {
  User.findOneAndUpdate({'_id': req.body.id}, 
  {
    $push: {log: req.body},
    $inc: {count: 1}
  })
    .then(()=> res.json(req.body));
}

export const getUserLog = (req,res) => {
  let userid = req.params.userid;
  let { from , to , limit } = req.query;

  from = moment(from, 'YYYY-MM-DD').isValid() ? moment(from, 'YYYY-MM-DD') : 0;
  to = moment(to, 'YYYY-MM-DD').isValid() ? moment(to, 'YYYY-MM-DD') : moment().add(999999999999);
  
//[&from][&to][&limit]
  User.findById(userid).then
    
    // (err,docs)=> res.json(docs)).select({'count': 1,'log': 1,'_id':0});
}
