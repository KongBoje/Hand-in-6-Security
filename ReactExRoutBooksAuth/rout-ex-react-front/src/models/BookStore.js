import { action, useStrict, extendObservable } from 'mobx'
var fetchURL = "http://localhost:3100"
import axios from 'axios'
import A from './Authentication'

useStrict(true)
class BookStore {

  constructor() {
    extendObservable(this, {
      _books: []
    })
    this._books = this.fetchBooks()
  }


  getBooks() {
    return this._books
  }

  getOneBook = action((id) => {
    if (this._books == null) {
      return null
    }
    var bookReturn;
    this._books.forEach((book, index) => {
      if (book.id === id) {
        bookReturn = this._books[index]
      }
    })
    return bookReturn;
  })

  BooksChanged = action((books) => {
    this._books = books
  })

  addBook = action((book) => {

      var auth = {
        headers: {'Authorization' : "JWT " + A.getToken()}
      }

      axios.post(`${fetchURL}/api/addbook`, { book }, auth)
        .then((res) => {
          console.log(res)
          this.fetchBooks()
        })
        .catch((err) => {
          console.log(err)
        })
    })

  updateBook = (book) => {

      var auth = {
        headers: {'Authorization' : "JWT " + A.getToken()}
      }

      if (book.id == null) throw Error("Missing id!")
      axios.put(`${fetchURL}/api/editbook`, { book }, auth)
        .then((res) => {
          console.log(res)
          this.fetchBooks()
        })
        .catch((err) => {
          console.log(err)
        })
    }

  deleteBook = action((bookid) => {

      var auth = {
        headers: {'Authorization' : "JWT " + A.getToken()}
      }

      axios.delete(`${fetchURL}/api/deletebook/${bookid}`, auth)
        .then((res) => {
          console.log(res)
          this.fetchBooks()
        })
        .catch((err) => {
          console.log(err)
        })
    })
  
  fetchBooks = () => {
      fetch(`${fetchURL}/api/books`)
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          this.BooksChanged(res)
          console.log("Got books from server");
        })
        .catch((err) => {
          console.log(err)
        })
    }
}

let bookstore = new BookStore()
window.bookstore = bookstore

export default bookstore