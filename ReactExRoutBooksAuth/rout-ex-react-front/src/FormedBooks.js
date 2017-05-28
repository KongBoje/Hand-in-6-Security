import React from 'react'

class FormedBooks extends React.Component {
    /*constructor(props) {
        super(props);
    }*/

    handleSubmit = (evt) => {
        evt.preventDefault()
        const target = evt.target
        let book = {}
        book.title = target.title.value
        book.info = target.info.value
        book.moreInfo = target.moreInfo.value
        this.props.bookStore.addBook(book)
    }

    render() {
        return (
            <div>
                <form style={{ marginTop: 40 }} onSubmit={this.handleSubmit} >
                    <div className="row">
                        <div className="col-sm-1">
                            <p>Title:</p>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="title" />
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-sm-1">
                            <p>Info:</p>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="info" />
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-sm-1">
                            <p>MoreInfo:</p>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" id="moreInfo" />
                        </div>
                    </div><br />

                    <button className="btn">Add</button>
                </form>
            </div>
        )
    }
}

export default FormedBooks