import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/exerciseTracker');

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static("./public"));

app.listen(PORT, () => {
  console.log(`Exercise Tracker app is running on port ${PORT}`);
});