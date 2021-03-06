import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import Promise from 'redux-promise';
import Reducers from '../reducers';
import Routing from '../containers/Routing';


class App extends Component {
  constructor() {
    super();

    this.createStoreWithMiddleware = applyMiddleware(Promise)(createStore);
  }

  render() {
    return (
      <Provider store={this.createStoreWithMiddleware(Reducers)}>
        <BrowserRouter basename="/client">
          <Routing />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
