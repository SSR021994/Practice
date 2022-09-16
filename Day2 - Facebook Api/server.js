const express = require('express');
const app = express();
const DBConfig = require('./db');
const passport = require('passport');
const session = require('express-session');
const facebookStrategy = require('passport-facebook').Strategy
const User = require('./model/user.model');
const routes = require('./routes/userRoute');
PORT = 5050;

DBConfig();

//app.use(express.json());

app.set("view engine", "ejs");

app.use(session({ 
    resave : false,
    saveUninitialized : true,
    secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/user', User);


//make our facebook strategy
passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
        'clientID' : "447173664033839",
        'clientSecret' : "f19f496183eceaee44ff5bd37151ab86",
        'callbackURL' : "http://localhost:5050/facebook/callback",
        'profileFields' : ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email'],

},// facebook will send back the token and profile
    function (token, refreshToken, profile, done) {

        console.log(profile)
        return done(null,profile)

    }));

passport.serializeUser(function (user, callback) {
    callback (null, user)
});

passport.deserializeUser(function (obj, callback) {
    callback (null, obj)
});


app.listen(PORT, console.log("Server is running on port", PORT));