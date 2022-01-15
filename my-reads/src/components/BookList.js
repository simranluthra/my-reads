import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

import { Link } from "react-router-dom"

class BookList extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        this.updateData()
    }

    updateData = () => {
        BooksAPI.getAll().then(books => {
            this.setState({
                books: books
            })
        })   
      }

    updateShelf = (book, shelf) => {
        
        const id = book.id
        const currentBooks = [...this.state.books]
        const indexToUpdate = currentBooks.findIndex(book => book.id === id)
        const newBookToUpdate = Object.assign({}, currentBooks[indexToUpdate], {
            shelf: shelf
        });

        this.setState({
            books: [...currentBooks.slice(0, indexToUpdate), newBookToUpdate, 
            ...currentBooks.slice(indexToUpdate + 1)]
        })

        BooksAPI.update(book, shelf)
    }

    render() {
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <BookShelf
                    key="currently"
                    books={[...this.state.books].filter(book => book.shelf === "currentlyReading")}
                    updateShelf={this.updateShelf}
                    title="Currently Reading"
                />
                <BookShelf
                    key="wantToRead"
                    books={[...this.state.books].filter(book => book.shelf === "wantToRead")}
                    updateShelf={this.updateShelf}
                    title="Want to Read"
                />
                <BookShelf
                    key="read"
                    books={[...this.state.books].filter(book => book.shelf === "read")}
                    updateShelf={this.updateShelf}
                    title="Read"
                />
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookList