import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { addUser, getAllUsers, logExercise, getUserLog } from './controller';

const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/exerciseTracker', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static("./public"));

// 1. I can create a user by posting form data username to /api/exercise/new-user 
// and returned will be an object with username and _id.
app.post('/api/exercise/new-user', addUser);

// 2. I can get an array of all users by getting api/exercise/users 
// with the same info as when creating a user.
app.get('/api/exercise/users', getAllUsers);
/* 
3. I can add an exercise to any user by posting form data userId(_id), 
description, duration, and optionally date to /api/exercise/add. 
If no date supplied it will use current date. Returned will 
the the user object with also with the exercise fields added.
*/
app.post('/api/exercise/add', logExercise);

/*
4. I can retrieve a full exercise log of any user by getting /api/exercise/log 
with a parameter of userId(_id). Return will be the user object with added 
array log and count (total exercise count).

5. I can retrieve part of the log of any user by also passing along optional 
parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)
*/


app.get('/api/exercise/log/:userid', getUserLog);

app.listen(PORT, () => {
  console.log(`Exercise Tracker app is running on port ${PORT}`);
});