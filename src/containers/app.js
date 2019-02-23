import React from 'react';
import PropTypes from 'prop-types';

const App = ({ children }) => (
  <div id="app">
    <h2>Header</h2>
    {children}
    <h2>Footer</h2>
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
