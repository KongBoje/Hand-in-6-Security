var express = require("express")
var session = require('express-session');
var facade = require("./facade")
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var lo = require("lodash");

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var users = [
    {
        id: 1,
        name: 'michael',
        password: '12f34'
    },
    {
        id: 2,
        name: 'Bob',
        password: 'Bob'
    }
];

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'I like a lot of games';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    var user = users[lo.findIndex(users, { id: jwt_payload.id })];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

var app = express();
app.use(passport.initialize());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Books
app.get('/api/books', function (req, res) {
    facade.getBooks((msg) => {
        console.log(msg);
        res.json(msg)
    })
})


app.post('/api/addbook', (req, res) => {
    let book = req.body.book
    facade.addBook(book, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json("Book has been added" + book);
        }
    })
})


app.put('/api/editbook', (req, res) => {
    var book = req.body.book
    facade.updateBook(book, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            console.log(data)
            res.json({ updatedBook: data })
        }
    })
})


app.delete('/api/deletebook/:id', (req, res) => {
    var bookid = parseInt(req.params.id)
    facade.deleteBook(bookid, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    })
})


// Users for login
app.post('/login', (req, res) => {
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
    }
    var user = users[lo.findIndex(users, { name: name })];
    if (!user) {
        res.status(401).json({ message: "Failed to login" });
    }

    if (user.password === req.body.password) {
        var payload = { id: user.id, info: { a: "I'm an admin" }, userType: "admin" };
        //setTimeout(function () { payload }, 3000);
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ message: "ok", token: token });
    } else {
        res.status(401).json({ message: "Failed to login" });
    }
});

app.get('/secret', passport.authenticate('jwt', {session:false}), function(req,res){
    res.json({message: "Success! You can not see this without a token"});
});

console.log("server has started on 3100")
module.exports = app;