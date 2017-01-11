import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import IndexPage from './containers/indexPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage} />
  </Route>
);
