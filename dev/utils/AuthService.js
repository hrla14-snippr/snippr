import Auth0Lock from 'auth0-lock';

export default class AuthService {
  constructor(clientId, domain, history) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        // redirectUrl: `${window.location.origin}/client`,
        redirect: false,
        responseType: 'token',
      },
    });
    this.history = history;
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken);
    console.log(authResult);
    // navigate to the home route
    this.history.push('/');
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
    this.history.push('/login');
  }
}
