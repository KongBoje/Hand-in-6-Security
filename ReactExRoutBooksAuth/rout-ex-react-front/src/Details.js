import React from 'react';
import { Link } from 'react-router'
//import {observer} from 'mobx-react'
import Update from './Update'

//@observer
class Details extends React.Component {

  constructor(props) {
    super(props)
  }

  deleteBooks = () => {
    this.props.bookStore.deleteBook(this.props.id)
  }

  render() {
    let id = this.props.id
    let book = this.props.bookStore.getOneBook(id)

    if (book == null) {
      setTimeout(() => {
        this.forceUpdate()
      }, 1000)
      return (
        <div>
          <h1>Fetching book..</h1>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 style={{ color: "steelblue" }}>Detailed info for the title: {book.title}</h3>
          <h4> {book.info}</h4>
          <h4>{book.moreInfo}</h4>
          <br />
          <Link to="/products">Products</Link>
        </div>
        <div>
          <button type="button" className="btn btn-danager">
            <Link to="/products" onClick={this.deleteBooks}>Delete Book</Link>
          </button>
        </div>
        <Update bookStore={this.props.bookStore} book={book} />
      </div>
    );
  }
}

export default Details