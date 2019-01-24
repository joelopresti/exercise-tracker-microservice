import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {
  addUser, getAllUsers, logExercise, getUserLog,
} from './controller';

const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/exerciseTracker', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('./public'));
app.post('/api/exercise/new-user', addUser);
app.get('/api/exercise/users', getAllUsers);
app.post('/api/exercise/add', logExercise);
app.get('/api/exercise/log/:userid', getUserLog);

app.listen(PORT);
