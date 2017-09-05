import Auth0 from 'auth0-js';
import decode from 'jwt-decode';

class AuthService {

  constructor() {
      // Configure Auth0
    this.auth0 = new Auth0({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH_DOMAIN,
      responseType: 'token',
      callbackURL: `${window.location.origin}/`,
    });

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  login(params, onError) {
    this.auth0.login(params, onError);
  }

  resetPassword(params, onError) {
    this.auth0.changePassword(params, onError);
  }

  signup(params, onError) {
    this.auth0.signup(params, onError);
  }

  parseHashFromQueryString(hash) {
    const authResult = this.auth0.parseHash(hash);
    if (authResult && authResult.idToken) {
      this.setToken(authResult.idToken);
    }
    return authResult.state;
  }

  fetchProfile() {
    const token = this.getToken();
    const that = this;
    return new Promise((resolve, reject) => {
      that.auth0.getProfile(token, (error, profile) => {
        if (error) {
          reject(error);
        }
        that.setProfile(profile);
        resolve(profile);
      });
    });
  }

  parseHash(hash) {
    const authResult = this.auth0.parseHash(hash);
    const that = this;

    return new Promise((resolve, reject) => {
      if (authResult && authResult.idToken) {
        that.setToken(authResult.idToken);
        that.auth0.getProfile(authResult.idToken, (error, profile) => {
          if (error) {
            reject(error);
          } else {
            that.setProfile(profile);
            resolve({ profile, state: authResult.state });
          }
        });
      } else {
        reject('Could not access profile');
      }
    });
  }

  getTokenExpirationDate(token) {
    const decoded = decode(token);
    if (!decoded.exp) {
      return null;
    }

    const date = new Date(0);// The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token) {
    const date = this.getTokenExpirationDate(token);
    const offsetSeconds = 0;
    if (date === null) {
      return false;
    }
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }

  loggedIn() {
        // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  setProfile(profile) {
        // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  getProfile() {
        // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : null;
  }

  setToken(idToken) {
        // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
        // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  clearTokens() {
    this.logout();
  }

  logout() {
        // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}

const auth = new AuthService();
export default auth;
