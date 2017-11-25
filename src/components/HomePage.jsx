import React from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>/ route</h1>
        <Link to="/test">
          Test
        </Link>
      </div>
    );
  }
}
