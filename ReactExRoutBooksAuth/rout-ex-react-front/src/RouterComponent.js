import React from 'react'
import Home from './Home'
import Blog from './Blog'
import Products from './Product'
import Details from './Details'
import Company from './Company'
import App from './App'
import NotFoundPage from './NotFoundPage'
//import { observer } from 'mobx-react'
import { Router, hashHistory, IndexRoute, Route } from 'react-router'

//@observer
class RouterComponent extends React.Component {

    reRender = () => {
        this.forceUpdate()
    }

    render() {
        var bookStore = this.props.bookStore;
        return (
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Home}></IndexRoute>
                        <Route path="/product" component={() => (<Products bookStore={bookStore}/>)}></Route>
                        <Route path="/products/details/:id" render={(props) =>( <Details bookStore={this.props.bookStore} id={props.match.params.id} />)} ></Route>
                        <Route path="/company" component={Company} />
                        <Route path="/blog" component={Blog} />
                        <Route path="/*" component={NotFoundPage} />
                    </Route>
                </Router>
            </div>
        );
    }
}

export default RouterComponent