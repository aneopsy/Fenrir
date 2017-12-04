import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import { Provider } from 'react-redux';
import {
    createStore,
    applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';
import api from './redux/middleware/api';
const middleware = [ thunk, api ];
import reducers from './redux/reducers';
const store = createStore(
    reducers,
    applyMiddleware(...middleware)
);

import Auth from './redux/Auth'
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Auth.isUserAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
)

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './redux/containers/Full'

// Views
import Login from './redux/containers/login'
import Register from './redux/containers/register'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'

ReactDOM.render((
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login}/>
          <Route exact path="/register" name="Register Page" component={Register}/>
          <Route exact path="/404" name="Page 404" component={Page404}/>
          <Route exact path="/500" name="Page 500" component={Page500}/>
          <PrivateRoute path="/" name="Home" component={Full}/>
        </Switch>
      </Router>
    </Provider>
), document.getElementById('root'));
