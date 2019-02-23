import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';

const AppWrapper = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);

AppWrapper.propTypes = {
  store: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

AppWrapper.defaultProps = {
  store: {},
};

export default AppWrapper;
