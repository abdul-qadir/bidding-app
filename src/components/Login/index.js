import React, { Component, PropTypes } from 'react';
import AuthService from '../../api/auth';
import Header from '../Header';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
    };
  }

/**
  onLogin =() => {
    browserHistory.replace('/home');
  };
**/

  getAuthParams = () => ({
    connection: 'Username-Password-Authentication',
    responseType: 'token',
    username: this.state.username,
    password: this.state.password,
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

  doLoginPassword() {
    AuthService.login(this.getAuthParams(), (err) => {
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
                      <div id="login-form">
                        <h2>LOGIN</h2>
                        <div className="form-group">
                          <input
                            type="text" name="username" id="username" className="form-control" placeholder="Username" value={this.state.username} onChange={e => this.handleChange(e)}
                            onKeyPress={e => this.handleKeyPress(e)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password" name="password" id="password" className="form-control" placeholder="Password" value={this.state.password} onChange={e => this.handleChange(e)}
                            onKeyPress={e => this.handleKeyPress(e)}
                          />
                        </div>
                        <div className="row">
                          <div className="col-xs-6" />
                          <div className="col-xs-6">
                            <div className=" form-group btn-block pull-right">
                              <input type="submit" name="login-submit" id="login-submit" className="form-control btn  btn-login" value="Log In" onClick={() => this.doLoginPassword()} />
                            </div>
                          </div>
                        </div>
                        <div className="form-group text-center">
                          <p> Not Registered? <a href="/register">Create an account</a></p>
                        </div>
                        <div className="form-group text-center">
                          <p> Forget Password? <a href="/reset">Reset Password</a></p>
                        </div>
                      </div>
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

Login.propTypes = {
  location: PropTypes.shape({ query: PropTypes.shape({ return_to: PropTypes.string }) }),
};

export default Login;
