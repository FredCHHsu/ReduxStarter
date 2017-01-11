import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';

const AppWrapper = (props) =>
  <Provider store={props.store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>;

AppWrapper.propTypes = {
  store: PropTypes.object,
};

export default AppWrapper;
