LAB 14 

Project Name: Access Control

Author: Tammy Ip

Links and Resources (see below)
submission PR: `https://github.com/tammyip-401-advanced-javascript/lab14/pull/1`
Heroku Deployment:  `https://js401n16-lab14.herokuapp.com/`
Code Fellows Supergoose: https://www.npmjs.com/package/@code-fellows/supergoose

Documentation
https://jestjs.io/docs/en/configuration
https://jsdoc.app/about-getting-started.html


Setup
+ npm install
+ npm install @code-fellows/supergoose
+ npm start
+ npm run start-dev
+ To view server running in your browser, go to`http://localhost:3000`
+ The route to create an user is : `http://localhost:3000/signup`
+ The route to sign in is: `http://localhost:3000/signin`
+ The route to get a list of users is: `http://localhost:3000/users`
+ The route to show the currnt logged in user is: `http://localhost:3000/user`
+ To connect to Mongo database, use the following information:
MONGODB_URI=mongodb://localhost:27017/api-server
HOST=localhost:3000
start your database by typing the path of your database file in the teriminal: mongod --dbpath=/Users/path/to/data/db
start the server with nodemon index.js

Tests
Testing command: `npm test` from root directory

UML
https://docs.google.com/spreadsheets/d/1jTPJISU_-kvoNvuk_PucrSONDy2ZWLaJq2EUl536hBM/edit?usp=sharing
