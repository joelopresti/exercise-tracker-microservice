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
  // [&from][&to][&limit]

  const fromFilter = (currentDate, fromDate) => (fromDate
    ? Date.parse(currentDate) > Date.parse(fromDate) : currentDate);

  const toFilter = (currentDate, toDate) => (toDate
    ? Date.parse(currentDate) < Date.parse(toDate) : currentDate);

  // const limitFilter = logs => (logs ? logs.slice(0, limit) : logs);
  User.findById(userid).then((user) => {
    const logs = user.log
      .filter(l => fromFilter(l.date, from))
      .filter(l => toFilter(l.date, to));
    // logs.filter(limitFilter);
    res.send(logs);
  });

// (err,docs)=> res.json(docs)).select({'count': 1,'log': 1,'_id':0});
};
