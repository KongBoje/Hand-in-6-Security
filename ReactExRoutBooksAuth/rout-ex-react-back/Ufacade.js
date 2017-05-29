var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1/test'
var connection = require("./db");
var bcrypt = require("bcrypt");

function getUsers(callback) {
    let db = connection.get();
    let collection = db.collection("bookusers")

    collection.find({}).toArray((err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(data);
        }
    })
}

function createUser(username, password, callback) {
    let hash = bcrypt.hashSync(password, 10) //Password is being hashed and salted and use 10 rounds when the salt is created.
    MongoClient.connect(url, (err, db) => {
        let collection = db.collection("bookusers")

        collection.insertOne({ username: username, password: hash }, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(data.ops[0]);
            }
        })
    })
}

function findUsersName(username, callback) {
    let db = connection.get();
    let collection = db.collection("bookusers")

    collection.findOne({ username: username }, (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(data);
        }
    })
}

function login(username, password, callback) {
    let db = connection.get();
    let collection = db.collection("bookusers")

    collection.findOne({ username: username }, (err, data) => {
        if (err) {
            callback(err, null);
        } else if (data == null) {
            callback({ user: null, success: false })
            return
        } else if (bcrypt.compareSync(password, data.password)) {
            callback({ user: data, success: true })
        } else {
            console.log("Failed to log in!")
            callback({ user: null, success: false })
        }
    })
}

var Ufacade = {
    createUser: createUser,
    findUsersName: findUsersName,
    login: login,
    getUsers: getUsers
}

module.exports = Ufacade