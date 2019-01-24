import mongoose from 'mongoose';
import { userSchema } from './model';

const User = mongoose.model('User', userSchema);

export const addUser = (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then(() => res.json(newUser))
    .catch(() => res.send('User exists'));
};

export const getAllUsers = (req, res) => {
  User.find({}, (err, docs) => res.json(docs)).select({ '_id':0 });
};

export const logExercise = (req, res) => {
  User.findOneAndUpdate({ '_id': req.body.id },
    {
      $push: { log: req.body },
      $inc: { count: 1 },
    })
    .then(() => res.json(req.body));
};

export const getUserLog = (req, res) => {
  const { userid } = req.params;
  let { from, to, limit } = req.query;
  let logs = [];
//[&from][&to][&limit]
  User.findById(userid).then((user) => {
    logs.push(user.log);
  });

  res.send(logs);
// (err,docs)=> res.json(docs)).select({'count': 1,'log': 1,'_id':0});
};
