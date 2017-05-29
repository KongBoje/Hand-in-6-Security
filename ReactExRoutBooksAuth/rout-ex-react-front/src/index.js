// Note these four lines are "done" like this because this app's runs via CDN's
// and Babel-transpiling are done one the client
import React from "react";
import ReactDOM from "react-dom";
import RouterComponent from './RouterComponent';
import BookStore from './models/BookStore';
import './style.css';

window.React = React

ReactDOM.render(
  <div><RouterComponent bookStore={BookStore}/></div>, document.getElementById("root")
)