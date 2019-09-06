import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { hot } from 'react-hot-loader';
import Home from './containers/home';
import Admin from './containers/admin';

const App = () => {

    return (
        <Router>
            <Route exact path="/" component={Home} />
            <Route path="/admin" component={Admin} />
        </Router>
    );
};

export default hot(module)(App);
