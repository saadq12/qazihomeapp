var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require ('passport-local').Strategy;

var User = require('../models/user');


// Register
router.get('/register', function (req, res) {
	res.render('register',{title: 'Register', registerNavBarActive: true});
});

// Login
router.get('/login', function (req, res) {
	res.render('login',{title: 'Login', loginNavBarActive: true});
});


// Account
router.get('/account', function (req, res) {
	res.render('account', {title: 'Account', accountNavBarActive: true});
	//console.log('getting account info');
	// User.find({username:"test123"})
	// 	.exec(function(err, users){
	// 		if (err){
	// 		res.send('error has occured');
	// 		console.log('error getting all users');
	// 	} else {
	// 		console.log(users);
	// 		//res.json(users);
	// 	}
	// 	});
});

// Register User
router.post('/register', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	//console.log(name);

	// Validation
	req.checkBody('name', 'Name Is Required!').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors){
		res.render('register',{
			errors:errors
		})
		console.log('YES ERROR N REG FORM');
	} else {
		console.log('NO ERROR IN REG FORM');
		var newUser = new User({
				name: name,
				email: email,
				username: username,
				password: password
		});

		User.createUser(newUser, function (err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');
		res.redirect('/users/login');

	}
});

//Passport module code

passport.use(new LocalStrategy(
  function(username, password, done) {
  User.getUserByUsername(username, function(err, user){
		if (err) throw err;
		if (!user){
					return done (null, false, {message: 'Unknown User'});
		}

		User.comparePassword(password, user.password, function(err, isMatch){
			if (err) throw err;
			if(isMatch){
				return done(null, user);
			}
			else{
				return done(null, false, {message: 'Invalid password'});
			}
		});

	 });
  }));

	passport.serializeUser(function(user, done) {
	  done(null, user.id);
		//console.log(user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.getUserById(id, function(err, user) {
	    done(err, user);
	  });
	});

//Login Route after authenticated
router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

// Logout
router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg','You are logged out');

	res.redirect('/users/login');
});


// // Account Route
//
// router.get('/account', function(req, res){
//
// 	//get Username and console.log it
// 	session = req.sessionStore.sessions;
// 	console.log(session);
// 	console.log(req.session.id);
// 	console.log(req.session.passport.user);
//
// 	//pass session var to /account tab
//
// 	// var myUserID = req.session.passport.user;
// 	// var user;
// 	// User.getUserById(myUserID, function(err, user){
// 	// 	if (err){
// 	// 		console.log(err);
// 	// 	}else{
// 	// 		user = user;
// 	// 		console.log(user);
// 	// 		//done(user);
// 	// 	}
// 	// })
// 	res.render('account', {title: 'My Account', accountNavBarActive: true});
//
// });


module.exports = router;
