/* eslint-disable jsx-no-bind */
import React, { Component, PropTypes } from 'react';
import { applyRouterMiddleware, browserHistory, Router, Route, IndexRoute, IndexRedirect } from 'react-router';
import { connect } from 'react-redux';
// import _ from 'lodash';
import { useScroll } from 'react-router-scroll';

import NotFound from './../../components/NotFound';
import Login from './../../components/Login';
import ResetPassword from './../../components/ResetPassword';
import Register from './../../components/Register';
import BiddingImage from './../../components/Bidding/BiddingImage';
import App from './App';
import auth from './../../api/auth';

import { loginRequest } from './../../actions/loginActions';

class Routes extends Component {

  constructor(props, context) {
    super(props, context);
    this.requireAuth = this.requireAuth.bind(this);
    this.parseAuthHash = this.parseAuthHash.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logout === true) {
      browserHistory.push('/login');
    }
  }

  requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
      auth.clearTokens();
      const query = nextState.location.pathname !== '/' ? { query: { return_to: nextState.location.pathname } } : {};
      replace({
        pathname: '/login',
        ...query,
      });
    } else {
      auth.fetchProfile().then((profile) => {
        this.props.loginRequest(profile);
      });
    }
  }

  parseAuthHash(nextState, replace, callback) {
    if (auth.loggedIn()) {
      replace({ pathname: '/' });
    }

    if (nextState.location.hash) {
      const state = auth.parseHashFromQueryString(nextState.location.hash);
      const redirect = state === 'undefined' ? '/' : state;

      replace({ pathname: redirect });

      callback();
    } else {
      callback();
    }
  }

  render() {
    return (
      <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
        <Route path="login" component={Login} onEnter={this.parseAuthHash} />
        <Route path="reset" component={ResetPassword} />
        <Route path="register" component={Register} />
        <Route path="/" component={App} onEnter={this.requireAuth}>
          <IndexRoute component={BiddingImage} />
          <Route path="*" component={NotFound} />
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
}

Routes.propTypes = {
  loginRequest: PropTypes.func,
  logout: PropTypes.bool,
};

export default connect(null, { loginRequest })(Routes);
