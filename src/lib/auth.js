module.exports = {
	isLoggedIn(req, res, next) {
		// true isAuthenticated, si usuraio esta logeado
		if(req.isAuthenticated()){
			return next();
		}
		return res.redirect('/signin');
	},

	isNotLoggedIn(req, res, next) {
		if (!req.isAuthenticated()){
			return next();
		}
		return res.redirect('profile');
	}
};