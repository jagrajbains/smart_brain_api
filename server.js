const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const signinHandler = require('./controllers/signin');
const registerHandler = require('./controllers/register');
const profileHandler = require('./controllers/profile');
const imageHandler = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '+March@1994$',
    database : 'smart_brain'
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.send(database.users);
})

app.post('/signin', (req,res) => {signinHandler.handleSignin(req,res,db,bcrypt)});

app.post('/register', (req, res) => {registerHandler.handleRegister(req,res,db,bcrypt)});

app.post('/imageurl', (req, res) => { imageHandler.handleApiCall(req, res) });

app.get('/profile/:id', (req, res) => {profileHandler.handleProfile(req,res,db)});

app.put('/image', (req, res) => {imageHandler.handleImage(req,res,db)});

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT} `);
})
