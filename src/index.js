/* eslint-disable import/no-extraneous-dependencies */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './appWrapper';
import configureStore from './configureStore';

const appWrapper = require('./appWrapper');

const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <AppWrapper store={store} />
  </AppContainer>,
  document.querySelector('#app-entry-point'),
);

if (module.hot) {
  module.hot.accept('./appWrapper', () => {
    const NextApp = appWrapper.default;
    ReactDOM.render(
      <NextApp store={store} />,
      document.querySelector('#app-entry-point'),
    );
  });
}
