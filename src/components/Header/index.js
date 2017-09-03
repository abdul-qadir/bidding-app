import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import AuthService from '../../api/auth';
import { logoutSuccess } from './../../actions/loginActions';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleLogout = () => {
    AuthService.logout();
    this.props.logoutSuccess();
    browserHistory.push('/login');
  };

  home = () => {
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="row headerCont">
        <div className="container">
          <div className="headerClass">
            <div onClick={() => this.home()}>
              <h1>Bidding App</h1>
            </div>
            { AuthService.loggedIn() ?
              <div>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => this.handleLogout()}>Log out</button>
              </div>
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  logoutSuccess: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  logoutSuccess: () => dispatch(logoutSuccess()),
});

const HeaderCont = connect(null, mapDispatchToProps)(Header);
export default HeaderCont;
