# Exercise Tracker API

Microservice project build for FreeCodeCamp

## Getting Started

Before you clone this repository, make sure you have an instance of Node, NPM and MongoDB up and running.  

Clone this repository to your machine, open your CLI to the directory and run:

```
npm install
```
Then run 

```
npm start
```

### POSTING to the API

The index page will handle POST requests to the API.  

You will be able to POST a new user and POST a new exercise within the user record.  

### GETTING data from the API

You will be able to get a record of all users by accessing 

```
http://localhost:3000/api/exercise/users
```

You can then grab an id from one of the users and access an individuals users exercise logs by going to 

```
http://localhost:3000/api/exercise/log/:userid
```


