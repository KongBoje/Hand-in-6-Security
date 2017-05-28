let connection = require("./db");
let ObjectId = require('mongodb').ObjectID;
let autoIncrement = require("mongodb-autoincrement");

function getBooks(callback) {
    let db = connection.get();
    let collection = db.collection("bookdb")

    collection.find({}).toArray((err, data) => {
        if (err) {
            callback(err, null);
        } else {
            callback(data);
        }
    })
}

function addBook(book, callback) {
    console.log(book)
    let db = connection.get();

    autoIncrement.getNextSequence(db, "bookdb", (err, autoIndex) => {
        let collection = db.collection("bookdb")
        book.id = autoIndex

        collection.insertOne({ id: book.id, title: book.title, info: book.info, moreInfo: book.moreInfo }, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                let result = data.ops[0]
                callback(result)
            }
        })
    })
}

function updateBook(id, book, callback) {
    let db = connection.get();
    let collection = db.collection("bookdb")

    collection.replaceOne({ "_id": new ObjectId(id) }, book, (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback("Book edited was: " + data);
        }
    })
}


function deleteBook(id, callback) {
    let db = connection.get();
    let collection = db.collection("bookdb")

    collection.deleteOne({ "_id": new ObjectId(id) }, (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback("Book deleted was: " + data);
        }
    })
}

var facade = {
    getBooks: getBooks,
    addBook: addBook,
    updateBook: updateBook,
    deleteBook: deleteBook
}

module.exports = facade