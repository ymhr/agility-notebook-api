require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const moment = require('moment');
const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const tokenCheck = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./db/models/user');

const routes = require('./routes/index');

const secret = process.env.JWT_SECRET;

const FacebookStrategy = require('passport-facebook').Strategy;

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
};

const isAuthed = (req, res, next) => {
	jwt.verify();
};

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
	done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function(user, done) {
	User.findById(user.id).then(function(dbUser) {
		done(null, dbUser);
	});
});

passport.use(new FacebookStrategy({
	clientID: process.env.FACEBOOK_CLIENT_ID,
	clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
	callbackURL: `${process.env.SERVER_URL}/auth/facebook/callback`,
	profileFields: ['id', 'emails', 'name']
}, (accessToken, refreshToken, profile, done) => {

	console.log('finding user by facebook id:', profile.id);

	User.findOne({where: {facebookId: profile.id}}).then((user) => {
		console.log('found user:', user.id);
			user.update({
				facebookToken: accessToken,
				facebookRefreshToken: refreshToken
			});
			done(null, user);
	})
	.catch((err) => {
		const newUser = User.create({
			facebookId: profile.id,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			facebookToken: accessToken,
			email: profile.emails[0].value
		}).then(u => {
			done(null, u);
	});
	});

}));

app.use(session({secret}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, '../release')));
app.use(cors({origin: process.env.CLIENT_URL}));

app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/auth/complete',
		failureRedirect: '/test'
	}));

app.get('/auth/complete', (req, res) => {
	const token = jwt.sign(req.user.dataValues, secret);
	res.redirect(process.env.CLIENT_URL + '?token='+ token+'#');
});

/*
Check that the current user can perform API actions. Logs the client out if returns an error
 */
app.get('/api/check', tokenCheck({secret}), (req, res) => {
	res.json({
		congrats: 'authed'
	});
});

/*
	ROUTES
 */

app.get('/', (req, res) => { res.end('Nothing to see here');  });

app.get('/shows', tokenCheck({secret}), routes.shows.getAll);
app.get('/shows/:id', tokenCheck({secret}), routes.shows.get);
app.post('/shows', tokenCheck({secret}), routes.shows.create);
app.post('/shows/:id', tokenCheck({secret}), routes.shows.update);
app.get('/shows/:showId/runs', tokenCheck({secret}), routes.runs.getByShow);
app.post('/shows/:showId/runs', tokenCheck({secret}), routes.runs.create);

app.get('/profile', tokenCheck({secret}), routes.users.get);

app.get('/dogs', tokenCheck({secret}), routes.dogs.getAll);
app.post('/dogs', tokenCheck({secret}), routes.dogs.create);
app.get('/dogs/:id', tokenCheck({secret}), routes.dogs.get);
app.post('/dogs/:id', tokenCheck({secret}), routes.dogs.update);

app.get('/settings', tokenCheck({secret}), routes.settings.getAll);
app.post('/settings', tokenCheck({secret}), routes.settings.update);


/*
Run the API server.
 */
app.listen(process.env.PORT || 3000, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});
