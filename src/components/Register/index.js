import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Auth from '../../api/auth';
import Header from '../Header';

class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
    };
    this.doRegister = this.doRegister.bind(this);
  }

  getAuthParams = () => ({
    connection: 'Username-Password-Authentication',
    responseType: 'token',
    username: this.state.username,
    password: this.state.password,
    email: this.state.email,
    sso: true,
    popup: true,
    auto_login: false,
    // state: '/',
  });

  handleChange(e) {
    const paramName = e.target.name;
    const paramValue = e.target.value;
    const currentState = this.state;
    currentState[paramName] = paramValue;
    this.setState(currentState);
  }

  doRegister() {
    if (this.state.password !== this.state.confirmPassword) {
      alert('Please check password and confirm password');
    }
    Auth.signup(this.getAuthParams(), (err) => {
      if (err) alert(err.message);
      else browserHistory.push('/');
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
                      <div id="register-form" >
                        <h2>REGISTER</h2>
                        <div className="form-group">
                          <input type="text" name="username" id="username" className="form-control" onChange={e => this.handleChange(e)} placeholder="Username" value={this.state.username} />
                        </div>
                        <div className="form-group">
                          <input type="email" name="email" id="email" className="form-control" onChange={e => this.handleChange(e)} placeholder="Email Address" value={this.state.email} />
                        </div>
                        <div className="form-group">
                          <input type="password" name="password" id="password" className="form-control" onChange={e => this.handleChange(e)} placeholder="Password" value={this.state.password} />
                        </div>
                        <div className="form-group">
                          <input type="password" name="confirmPassword" id="confirm-password" onChange={e => this.handleChange(e)} className="form-control" placeholder="Confirm Password" value={this.state.confirmPassword} />
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-sm-6 col-sm-offset-3">
                              <input type="submit" name="register-submit" id="register-submit" className="form-control btn btn-register" value="Register Now" onClick={() => this.doRegister()} />
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
        </div>
      </div>
    );
  }
}

export default Register;
