import React from 'react';
import {Link, IndexLink} from 'react-router';
import LoginStatus from './LoginStatus';
//import {observer} from 'mobx-react'

//@observer
class App extends React.Component {
  
  reRender = () => {
    this.forceUpdate()
  }
  
  render() {
    return (
      <div>
        <ul className="header">
          <li><IndexLink activeClassName="active" to="/">Home</IndexLink></li>
          <li><Link activeClassName="active" to="/product">Products</Link></li>
          <li><Link activeClassName="active" to="/company">Company</Link></li>
          <li><Link activeClassName="active" to="/blog">Blog</Link></li>
          <li style={{float:"right"}}> <LoginStatus /> </li>
        </ul>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
