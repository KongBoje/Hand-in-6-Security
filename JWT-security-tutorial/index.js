// file: index.js

var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport"); //framework where you hook in a strategy.
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var users = [
  {
    id: 1,
    name: 'jonathanmh',
    password: '%2yx4'
  },
  {
    id: 2,
    name: 'test',
    password: 'test'
  }
];

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
//Don't ever hardcode this value for a production system
jwtOptions.secretOrKey = 'Your mom is so fat, Jabba the Hutt said "DAAAAAIIIMMM!"'; //better way is to set an environment variable.

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

var app = express(); //middleware
app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

app.get("/", function(req, res) {
  res.json({message: "Express is up!"});
});

app.post("/login", function(req, res) {
  if(req.body.name && req.body.password){
    var name = req.body.name;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = users[_.findIndex(users, {name: name})]; //"_" = lodash which is a library package. "_" = also to similate a database
  if( ! user ){
      //don't do this, you're telling the hacker that the username is wrong with "{message:"no such user found"}"
    res.status(401).json({message:"Failed to login"}); //better with "Failed to login".
  }

  if(user.password === req.body.password) { //non-hash password.
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id, info:{a: "I'm an admin"}, userType: "admin"}; //don't add password here. also add a timeout value here.
    //Add lifetime to token
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({message: "ok", token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({message: "Success! You can not see this without a token"});
});

app.get("/secretDebug",
  function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json("debugging");
});

app.listen(3000, function() {
  console.log("Express running");
});

//With Postman:

//http://localhost:3000/login
//name = test
//password = test

//http://localhost:3000/secret
//Authorization = JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaW5mbyI6eyJhIjoiSSdtIGFuIGFkbWluIn0sInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE0OTQ4Mzc0MzF9.bmtPLhc7wIZI7At6XcfEkrpnU1XZW35TPAYdFsyeWhI