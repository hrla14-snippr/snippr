/* eslint import/no-extraneous-dependencies: 0 */
import 'react-hot-loader/patch';

import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// const reactHotLoader = require('react-hot-loader');


const render = (Component) => {
  // let AppContainer = reactHotLoader.AppContainer
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('main'),
  );
};
render(App);

if (module.hot) {
  module.hot.accept(() => {
    render(App);
  });
}
