const express = require("express");
const app = express();
const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy
const session = require('express-session');
const PORT = 3000;

app.set("view engine", "ejs");

app.use(session({
     resave: false,
     saveUninitialized: true,
    secret: 'SECRET'
}));
app.use(passport.initialize());
app.use(passport.session());



//make our facebook strategy
passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
        'clientID' : "934684130781562",
        'clientSecret' : "a994a852205ac3308c0527b78956c35e",
        'callbackURL' : "http://localhost:3000/facebook/callback",
        'profileFields' : ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email'],

},// facebook will send back the token and profile
    function (token, refreshToken, profile, done) {

        console.log(profile)
        return done(null,profile)

    }));



app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/auth/facebook', passport.authenticate('facebook', {
    scope:'email'
}));

app.get('/facebook/callback', passport.authenticate('facebook',{
    successRedirect: '/profile',
    failureRedirect: '/failed'
}))


app.get('/profile', (req, res) => {
    res.send("You are a Valid User")   
})

app.get('/failed', (req, res) => {
    res.send("You are a non Valid User")
})

passport.serializeUser(function (user, done) {
    done (null, user)
});

passport.deserializeUser(function (id, done) {
    return done(null, id)
});

app.listen(PORT, console.log("Server is running on port" + PORT));