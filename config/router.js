const AuthenticationController = require('../controllers/authentication'),
    express = require('express'),
    tokens = require("../factories/token.js"),
    passportService = require('./passport'),
    passport = require('passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
    // Initializing route groups
    const apiRoutes = express.Router(),
        authRoutes = express.Router(),
        OAuthRoutes = express.Router();

    //=========================
    // Auth Routes
    //=========================

    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);

    apiRoutes.get("/test", requireAuth, function(req, res){
        res.send("Woot!");
    });

    // Registration route
    authRoutes.post('/register', AuthenticationController.register);

    // Login route
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    /**
     * OAuth authentication routes. (Sign in)
     */
    // authRoutes.get('/instagram', passport.authenticate('instagram'));
    // authRoutes.get('/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
    //     res.redirect(req.session.returnTo || '/');
    // });
    // authRoutes.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
    // authRoutes.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    //     res.redirect(req.session.returnTo || '/');
    // });
    // authRoutes.get('/github', passport.authenticate('github'));
    // authRoutes.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    //     res.redirect(req.session.returnTo || '/');
    // });

    OAuthRoutes.get('/google', passport.authenticate('google', { scope: 'profile email' }));
    OAuthRoutes.get('/google/callback', function(req, res, next)
    {
        passport.authenticate('google', function (err, user, info)
        {
            if (err)
            {
                return next(err);
            }
            if (!user)
            {
                return res.redirect('/login');
            }
            req.logIn(user, function (err)
            {
                if (err)
                {
                    return next(err);
                }
                return res.redirect('/users/' + user.username);
            });
        })(req, res, next);
    });

    // authRoutes.get('/twitter', passport.authenticate('twitter'));
    // authRoutes.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
    //     res.redirect(req.session.returnTo || '/');
    // });
    // authRoutes.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
    // authRoutes.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
    //     res.redirect(req.session.returnTo || '/');
    // });

    // Set url for API group routes
    app.use('/api', apiRoutes);
    app.use('/oauth', OAuthRoutes);
};