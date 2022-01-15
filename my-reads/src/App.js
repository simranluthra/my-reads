import React from 'react'
import { Route } from "react-router-dom";
import BookList from './components/BookList'
import BookSearch from './components/BookSearch'

import './App.css'

class BooksApp extends React.Component {

  render() {
      return (
        <div className="app">
          <Route exact path="/" render={() => <BookList/>} />
          <Route path="/search" render={() => <BookSearch/>}/>
        </div>
      );
  }
}

export default BooksApp