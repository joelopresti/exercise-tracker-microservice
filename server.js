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

app.post('/api/exercise/new-user', addUser);
app.get('/api/exercise/users', getAllUsers);
app.post('/api/exercise/add', logExercise);
/*
5. I can retrieve part of the log of any user by also passing along optional 
parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)
*/
app.get('/api/exercise/log/:userid', getUserLog);

app.listen(PORT, () => {
  console.log(`Exercise Tracker app is running on port ${PORT}`);
});