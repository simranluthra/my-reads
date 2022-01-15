import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from '../BooksAPI'

class BookSearch extends Component {
  state = {
    books: [],
    currentBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        const booksId = books.map(book => ({ id: book.id,shelf: book.shelf }))
        this.setState({ currentBooks: booksId })
      })
  }

  onSearch = (event) => {
    const value = event.target.value
    
    if(value) {
      BooksAPI.search(value).then(books => {
        if(!books || books.hasOwnProperty('error')) {
          this.setState({ books: [] })
        } else {
            this.setState({ books: books })
        }  
      })
    } else {
      this.setState( { books: [] })
    }
  }

  updateShelf = (book, shelf) => {
    const newBooks = []
    BooksAPI.update(book, shelf)
      .then(books => {
        Object.keys(books)
          .forEach(shelf => {
            return books[shelf].map(id => ({ id: id, shelf: shelf}))
            .forEach(book => {
              newBooks.push(book)
            })
          })
          return newBooks
      })
      .then(newBooks => {
        this.setState({ currentBooks: newBooks })
      })
  }

  render() {

    const { books, currentBooks } = this.state
    let allBooks
    allBooks = books.map((book, index) => {
      currentBooks.forEach(currentbook => {
        if(currentbook.id === book.id) {
          book.shelf = currentbook.shelf
        }
      })

      return (
        <li key={index}>
          <div className="book">
            <div className="book-top">
                <div 
                    className="book-cover" 
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                    }}>                        
                </div>
                <div className="book-shelf-changer">
                    <select 
                        onChange={e => {
                          this.updateShelf(book, e.target.value);
                        }}
                        value={book.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none" selected>None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
        </li>
      ) 
    })
    

    return(
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              onChange={this.onSearch}
              placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {allBooks}
          </ol>
        </div>
      </div>
    ) 
  }
}

export default BookSearch;