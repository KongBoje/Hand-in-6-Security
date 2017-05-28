import React from 'react'
import { Link } from 'react-router'
import { observer } from 'mobx-react'
import FormedBooks from './FormedBooks'


const Products = observer((props) => {

  let books = props.bookStore.getBooks()
  if (books == null) books = []
  const MappedBooks = books.map((book) => {
    return (
      <li key={book.id}>
        <p>
        {book.title} - 
        <Link to={`products/details/${book.id}`}> (details)</Link>
        </p>
      </li>
    )
  })


  return (
    <div>
      <h2>Our Products</h2>
      <h4>All our great books </h4>
      <ul>
        {MappedBooks}
      </ul>
      <FormedBooks bookStore={props.bookStore} />
    </div>
  )
})

export default Products