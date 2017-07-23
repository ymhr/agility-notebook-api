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

app.use(cors({origin: process.env.CLIENT_URL}));
app.use(session({secret}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/.well-known', express.static(path.resolve(__dirname, './.well-known')));

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

app.get('/test', (req, res) => {
	console.log(req);
	console.log(res);
	res.end('Welcome to the Hotel California');
})

app.get('/shows', tokenCheck({secret}), routes.shows.getAll);
app.get('/shows/:id', tokenCheck({secret}), routes.shows.get);
app.post('/shows', tokenCheck({secret}), routes.shows.create);
app.post('/shows/:id', tokenCheck({secret}), routes.shows.update);
app.post('/shows/:showId/delete', tokenCheck({secret}), routes.shows.destroy);

app.get('/shows/:showId/runs', tokenCheck({secret}), routes.runs.getByShow);
app.post('/shows/:showId/runs', tokenCheck({secret}), routes.runs.create);
app.get('/shows/:showId/runs/:runId', tokenCheck({secret}), routes.runs.get);
app.post('/shows/:showId/runs/:runId', tokenCheck({secret}), routes.runs.update);
app.post('/shows/:showId/runs/:runId/delete', tokenCheck({secret}), routes.runs.destroy);

app.get('/profile', tokenCheck({secret}), routes.users.get);

app.get('/dogs', tokenCheck({secret}), routes.dogs.getAll);
app.post('/dogs', tokenCheck({secret}), routes.dogs.create);
app.get('/dogs/:id', tokenCheck({secret}), routes.dogs.get);
app.post('/dogs/:id', tokenCheck({secret}), routes.dogs.update);

app.get('/handlers', tokenCheck({secret}), routes.handlers.getAll);
app.post('/handlers', tokenCheck({secret}), routes.handlers.create);
app.get('/handlers/:id', tokenCheck({secret}), routes.handlers.get);
app.post('/handlers/:id', tokenCheck({secret}), routes.handlers.update);

app.get('/settings', tokenCheck({secret}), routes.settings.getAll);
app.post('/settings', tokenCheck({secret}), routes.settings.update);


/*
Run the API server.
 */
app.listen(process.env.PORT || 3000, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});