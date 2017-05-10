import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import Promise from 'redux-promise';
import Reducers from '../reducers';
import Routing from '../containers/Routing';


const createStoreWithMiddleware = applyMiddleware(Promise)(createStore);

const App = () => (
  <Provider store={createStoreWithMiddleware(Reducers)}>
    <BrowserRouter basename="/client">
      <Routing />
    </BrowserRouter>
  </Provider>
    );


export default App;
