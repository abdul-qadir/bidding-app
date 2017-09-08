import React, { Component, PropTypes } from 'react';
import AuthService from '../../api/auth';
import Header from '../Header';

class ResetPassword extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
    };
  }

  /**
   onLogin =() => {
    browserHistory.replace('/home');
  };
   **/

  getAuthParams = () => ({
    connection: 'Username-Password-Authentication',
    clientID: AUTH0_CLIENT_ID,
    email: this.state.username,
    state: `${this.props.location.query.return_to}`,
  });


  handleChange(e) {
    const paramName = e.target.name;
    const paramValue = e.target.value;
    const currentState = this.state;
    currentState[paramName] = paramValue;
    this.setState(currentState);
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.doLoginPassword();
    }
  }

  doResetPassword() {
    AuthService.resetPassword(this.getAuthParams(), (err) => {
      if (err) alert(err.message);
    });
  }

  signUp() {
    AuthService.signup(this.getAuthParams(), (err) => {
      if (err) alert(err.message);
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="panel panel-login">
                <div className="panel-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <form data-toggle="validator" role="form" onSubmit={() => this.doResetPassword()}>
                        <div id="login-form">
                          <h2>Reset Password</h2>
                          <div className="form-group">
                            <input
                              type="email" name="username" id="username" className="form-control" placeholder="Email" value={this.state.username} onChange={e => this.handleChange(e)}
                              required
                              onKeyPress={e => this.handleKeyPress(e)} data-error="Bruh, that email address is invalid"
                            />
                          </div>
                          <div className="row">
                            <div className="col-xs-6">
                              <div className=" form-group btn-block pull-right">
                                <input type="submit" name="login-submit" id="login-submit" className="form-control btn  btn-login" value="Reset Password" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  location: PropTypes.shape({ query: PropTypes.shape({ return_to: PropTypes.string }) }),
};

export default ResetPassword;
