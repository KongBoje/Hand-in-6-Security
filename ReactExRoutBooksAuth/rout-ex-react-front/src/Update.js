import React from 'react'
import { observer } from 'mobx-react'
import './models/BookStore'

const Update = observer(({bookStore, book}) => {

    function handleSubmit(evt) {
        evt.preventDefault()
        const target = evt.target
        var updatedBook = {}
        updatedBook.id = book.id
        updatedBook.title = target.title.value
        updatedBook.info = target.info.value
        updatedBook.moreInfo = target.moreInfo.value
        bookStore.updateBook(updatedBook)
        location.reload()
    }

    let title = book.title
    let info = book.info
    let moreInfo = book.moreInfo

    return (
        <div className="col-md-6">
            <h3>Updating book now!</h3>
            <form id="fid" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" defaultValue={title} className="form-control" id="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="info">Info</label>
                    <input type="text" defaultValue={info} className="form-control" id="info" />
                </div>
                <div className="form-group">
                    <label htmlFor="moreInfo">More Info</label>
                    <input type="text" defaultValue={moreInfo} className="form-control" id="moreInfo" />
                </div>
                <button type="submit" className="btn">
                    Add Updates
                </button>
            </form>
        </div>
    )
})

export default Update