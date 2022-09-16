const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', function (req, res) {
    res.render('../views/index.ejs');
})

router.get('/profile', isLoggedIn, function(req, res){
    res.render('../views/profile.ejs', {
        user: req.user
    });
})

router.get('/error', isLoggedIn, function(req, res){
    res.render('../views/error.ejs');
})

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope:'email'
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/profile',
        failureRedirect : '/error'
    })
);

router.get('/logout', function(req, res){
    res.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated){
        return next();
    } else{
        res.redirect('/');
    }
};

module.exports = router;