// Note these four lines are "done" like this because this app's runs via CDN's
// and Babel-transpiling are done one the client
import React from "react";
import ReactDOM from "react-dom";
import RouterComponent from './RouterComponent';
import BookStore from './models/BookStore';
import './style.css';

/*class BookStore {

  constructor() {
    this._books = [
      { id: 1,title: "How to Learn JavaScript - Vol 1", info: "Study hard",moreInfo: "" },
      { id: 2,title: "How to Learn ES6", info: "Complete all exercises :-)",moreInfo: "" },
      { id: 3,title: "How to Learn React",info: "Complete all your CA's",moreInfo: ""},
      { id: 4,title: "Learn JavaScript, React and MobX",info: "Don't drink beers, until Friday (after four)",
                      moreInfo: "5 Points = 5 beers ;-)"
      }
    ]
  }
  get books(){
    return this._books;
  }
}*/

window.React = React

ReactDOM.render(
  <div><RouterComponent bookStore={BookStore}/></div>, document.getElementById("root")
)