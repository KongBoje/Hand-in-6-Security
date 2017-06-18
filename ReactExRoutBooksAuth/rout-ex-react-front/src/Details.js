import React from 'react';
import { Link } from 'react-router'
//import {observer} from 'mobx-react'
import Update from './Update'

//@observer
class Details extends React.Component {

  constructor(props) {
    super(props)
    console.log("HER")
  }

  deleteBooks = () => {
    this.props.route.bookStore.deleteBook(this.props.routeParams.id)
  }

  reRender = () => {
    this.forceUpdate()
  }

  render() {
    let id = this.props.routeParams.id
    let book = this.props.route.bookStore.getOneBook(id)

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
          <div>
            <Link to="/product">Products</Link>
          </div>
          <div>
            <button type="button" className="btn btn-danager">
              <Link to="/product" onClick={this.deleteBooks}>Delete Book</Link>
            </button>
          </div>
        </div>
        <Update reRender={this.reRender} bookStore={this.props.route.bookStore} book={book} />
      </div>
    );
  }
}

export default Details