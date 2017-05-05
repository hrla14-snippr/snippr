import { EventEmitter } from 'events';
import Auth0Lock from 'auth0-lock';
import { isTokenExpired } from './jwtHelper';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain, history, prefill) {
    super();
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: `${window.location.origin}/client/loggingIn`,
        responseType: 'token',
      },
      additionalSignUpFields: [{
        type: 'select',
        name: 'AccountType',
        placeholder: 'Choose an account type',
        prefill,
        options: [
          { value: 'Snyppr', label: 'Snyppr' },
          { value: 'Snypee', label: 'Snypee' },
        ],
      }],
      languageDictionary: {
        title: 'Snyppr',
      },
      theme: {
        logo: 'http://www.free-icons-download.net/images/scissor-logo-icon-77931.png',
        primaryColor: 'mediumspringgreen',
      },
    });
    this.history = history;
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this));
    // binds login and logout functions to keep this context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken);
    // navigate to the home route
    this.history.push('/dashboard');
    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
      } else {
        this.setProfile(profile);
      }
    });
  }

  _authorizationError(error) {
    // Unexpected authentication error
    console.log('Authentication Error', error);
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show({ allowSignUp: false });
  }

  signup() {
    this.lock.show({ allowLogin: false });
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile);
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  getAuthId() {
    return this.getProfile().user_id;
  }

  getAccountType() {
    return this.getProfile().user_metadata.account_type;
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.history.push('/');
  }
}
