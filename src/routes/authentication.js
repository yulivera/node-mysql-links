const express = require('express');
const router = express.Router();

const passport = require('passport');
// proteger rutas
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// registrar usuario
router.get('/signup', isNotLoggedIn, (req, res) => {
	res.render('auth/signup');
});

// router.post('/signup', (req, res) => {
// 	passport.authenticate('local.signup', {
// 		successRedirect: '/profile',
// 		failureRedirect: '/signup',
// 		failureFlash: true
// 	});
	// console.log(req.body);
	// res.send('recivido');
// });

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

// logeo renderizar
router.get('/signin', isNotLoggedIn, (req, res) => {
	res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
	
	passport.authenticate('local.signin', {
		successRedirect: '/profile',
		failureRedirect: '/signin',
		failureFlash: true
	})(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
	res.render('profile');
});
// terminar sesion de usuario
router.get('/logout', isLoggedIn, (req,res) => {
	req.logOut();
	res.redirect('/signin');
});

module.exports = router;