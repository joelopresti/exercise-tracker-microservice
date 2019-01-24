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
  User.find({}, (err, docs) => res.json(docs)).select({ _id: 0 });
};

export const logExercise = (req, res) => {
  User.findOneAndUpdate({ _id: req.body.id },
    {
      $push: { log: req.body },
      $inc: { count: 1 },
    }, (err, docs) => (
      docs ? res.json(req.body) : res.send('User does not exist.')));
};

export const getUserLog = (req, res) => {
  const { userid } = req.params;
  const { from, to, limit } = req.query;

  const fromFilter = (currentDate, fromDate) => (fromDate
    ? Date.parse(currentDate) > Date.parse(fromDate) : currentDate);

  const toFilter = (currentDate, toDate) => (toDate
    ? Date.parse(currentDate) < Date.parse(toDate) : currentDate);

  // const limitFilter = logs => (logs ? {logs.length =} : logs);
  User.findById(userid).then((user) => {
    const logs = user.log
      .filter(l => fromFilter(l.date, from))
      .filter(l => toFilter(l.date, to));
    if (limit && limit < logs.length) {
      logs.length = limit;
      res.send(logs);
    } else {
      res.send(logs);
    }
  });
};
