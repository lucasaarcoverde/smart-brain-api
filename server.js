const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const images = require('./controllers/images');
const profile = require('./controllers/profiles');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'lucasarcoverde',
		password: '',
		database: 'smart-brain'
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
	res.json(database.users);
});

app.get('/profiles/:id', profile.handleProfileGet(db));
app.put('/images', images.handleImages(db));
app.post('/imagesurl', images.handleApiCall());
app.post('/signin', signIn.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));

app.listen(3000, () => {
	console.log('app is running on port 3000');
});