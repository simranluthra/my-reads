import React, { Component } from 'react'

class BookShelf extends Component {

    render() {
        const { title, updateShelf } = this.props
        return(
            <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {this.props.books.filter((book)=>(book.imageLinks)).map(book =>
                <li key={book.id} className="book">
                    <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                        width: 128,
                        height: 193,
                        backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                        }}
                    />
                    <div className="book-shelf-changer">
                        <select onChange={e => updateShelf(book, e.target.value)}
                            value={book.shelf ? book.shelf : ''}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </li>
                )}
            </ol>
            </div>
        </div>
        )
    }
}

export default BookShelf