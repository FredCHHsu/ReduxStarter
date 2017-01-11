/* eslint global-require: 0 */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './appWrapper';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
  <AppContainer>
    <AppWrapper store={store} />
  </AppContainer>,
  document.querySelector('#app-entry-point')
);

if (module.hot) {
  module.hot.accept('./appWrapper', () => {
    const NextApp = require('./appWrapper').default;
    ReactDOM.render(
      <NextApp store={store} />,
      document.querySelector('#app-entry-point')
    );
  });
}
