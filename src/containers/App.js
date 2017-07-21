import React, { Component, PropTypes } from 'react';

import TablePage from '../components/TablePage';


export default class App extends Component {
  render() {
    return (
      <div className="main-app-container">
        <TablePage />
      </div>
    );
  }
}
