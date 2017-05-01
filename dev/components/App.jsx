import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './signup';
import ClientDashboard from '../containers/ClientDashboard';
import Reducers from '../reducers';
import Promise from 'redux-promise';

class App extends Component {
  constructor() {
    super();

    this.createStoreWithMiddleware = applyMiddleware(Promise)(createStore);
  }
  render() {
    console.log(this.createStoreWithMiddleware);
    return (
      <Provider store={this.createStoreWithMiddleware(Reducers)}>
        <BrowserRouter basename="/client">
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/cdashboard">
              <ClientDashboard />
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
